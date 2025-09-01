#!/usr/bin/env node

/**
 * SUPER SYSTEM AUTOSAVE v2.0
 * Умная система автоматического сохранения состояния
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class AutosaveSystem {
  constructor() {
    this.config = {
      intervals: {
        quick: 300,        // 5 минут в секундах
        checkpoint: 1800,  // 30 минут
        cleanup: 86400    // 24 часа
      },
      retention: {
        quick_saves: 10,
        checkpoints_days: 7,
        history_days: 30
      },
      paths: {
        autosave_dir: '/workspace/.autosave',
        current: '/workspace/.autosave/current.json',
        checkpoint: '/workspace/.autosave/checkpoint.json',
        history: '/workspace/.autosave/history',
        current_state: '/workspace/CURRENT-STATE.md',
        brain_index: '/workspace/BRAIN-INDEX.md'
      }
    };
    
    this.ensureDirectories();
  }

  // Создание необходимых директорий
  ensureDirectories() {
    const dirs = [
      this.config.paths.autosave_dir,
      this.config.paths.history,
      path.join(this.config.paths.history, this.getCurrentDate())
    ];
    
    dirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`📁 Создана директория: ${dir}`);
      }
    });
  }

  // Получение текущей даты
  getCurrentDate() {
    return new Date().toISOString().split('T')[0];
  }

  // Получение текущего времени
  getCurrentTime() {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}-${now.getMinutes().toString().padStart(2, '0')}`;
  }

  // Сбор состояния системы
  collectSystemState() {
    const state = {
      timestamp: new Date().toISOString(),
      system: {
        health: 'operational',
        version: '1.0.0',
        uptime: process.uptime()
      },
      projects: {},
      hemispheres: {},
      memory: {},
      tasks: {},
      metrics: {}
    };

    // Читаем состояние полушарий
    try {
      const leftHemisphere = path.join('/workspace/Annoris/hemisphere-status.json');
      if (fs.existsSync(leftHemisphere)) {
        state.hemispheres.left = JSON.parse(fs.readFileSync(leftHemisphere, 'utf8'));
      }
    } catch (e) {
      state.hemispheres.left = { status: 'unknown', error: e.message };
    }

    try {
      const rightHemisphere = path.join('/workspace/offerspsp-mvp/hemisphere-status.json');
      if (fs.existsSync(rightHemisphere)) {
        state.hemispheres.right = JSON.parse(fs.readFileSync(rightHemisphere, 'utf8'));
      }
    } catch (e) {
      state.hemispheres.right = { status: 'unknown', error: e.message };
    }

    // Читаем состояние проектов из CURRENT-STATE.md
    try {
      if (fs.existsSync(this.config.paths.current_state)) {
        const content = fs.readFileSync(this.config.paths.current_state, 'utf8');
        
        // Парсим статус OffersPSP
        if (content.includes('OffersPSP')) {
          state.projects.offerspsp = {
            status: 'production',
            priority: 1,
            tasks: this.extractTasks(content, 'OffersPSP')
          };
        }
        
        // Парсим статус Annoris
        if (content.includes('Annoris')) {
          state.projects.annoris = {
            status: 'development',
            priority: 2,
            tasks: this.extractTasks(content, 'Annoris')
          };
        }
      }
    } catch (e) {
      console.error('❌ Ошибка чтения CURRENT-STATE:', e.message);
    }

    // Добавляем метрики
    state.metrics = this.collectMetrics();

    // Добавляем Git информацию
    try {
      const gitStatus = execSync('cd /workspace && git status --short', { encoding: 'utf8' });
      const gitBranch = execSync('cd /workspace && git branch --show-current', { encoding: 'utf8' }).trim();
      const lastCommit = execSync('cd /workspace && git log -1 --oneline', { encoding: 'utf8' }).trim();
      
      state.git = {
        branch: gitBranch,
        modified_files: gitStatus.split('\n').filter(line => line.trim()).length,
        last_commit: lastCommit,
        has_changes: gitStatus.trim().length > 0
      };
    } catch (e) {
      state.git = { error: e.message };
    }

    return state;
  }

  // Извлечение задач из текста
  extractTasks(content, project) {
    const tasks = [];
    const lines = content.split('\n');
    let inProject = false;
    
    for (const line of lines) {
      if (line.includes(project)) {
        inProject = true;
      } else if (inProject && line.startsWith('###')) {
        break;
      } else if (inProject && (line.includes('- [ ]') || line.includes('- [x]'))) {
        tasks.push({
          completed: line.includes('- [x]'),
          text: line.replace(/- \[.\]/, '').trim()
        });
      }
    }
    
    return tasks;
  }

  // Сбор метрик
  collectMetrics() {
    const metrics = {
      autosave_count: 0,
      storage_used: '0MB',
      oldest_save: null
    };

    try {
      // Подсчёт количества сохранений
      const historyDir = path.join(this.config.paths.history, this.getCurrentDate());
      if (fs.existsSync(historyDir)) {
        metrics.autosave_count = fs.readdirSync(historyDir).length;
      }

      // Размер .autosave директории
      const size = execSync(`du -sh ${this.config.paths.autosave_dir} | cut -f1`, { encoding: 'utf8' }).trim();
      metrics.storage_used = size;

      // Самое старое сохранение
      const historyDirs = fs.readdirSync(this.config.paths.history).sort();
      if (historyDirs.length > 0) {
        metrics.oldest_save = historyDirs[0];
      }
    } catch (e) {
      console.error('⚠️ Ошибка сбора метрик:', e.message);
    }

    return metrics;
  }

  // Quick Save - быстрое сохранение
  quickSave() {
    console.log('⚡ Quick Save запущен...');
    
    try {
      const state = this.collectSystemState();
      state.save_type = 'quick';
      
      // Сохраняем в current.json
      fs.writeFileSync(
        this.config.paths.current,
        JSON.stringify(state, null, 2)
      );
      
      console.log(`✅ Quick Save завершён: ${state.timestamp}`);
      
      // Обновляем CURRENT-STATE.md
      this.updateCurrentState(state);
      
      return state;
    } catch (error) {
      console.error('❌ Ошибка Quick Save:', error.message);
      return null;
    }
  }

  // Checkpoint - контрольная точка
  checkpoint() {
    console.log('📍 Checkpoint Save запущен...');
    
    try {
      const state = this.collectSystemState();
      state.save_type = 'checkpoint';
      
      // Сохраняем checkpoint
      fs.writeFileSync(
        this.config.paths.checkpoint,
        JSON.stringify(state, null, 2)
      );
      
      // Сохраняем в историю
      const historyFile = path.join(
        this.config.paths.history,
        this.getCurrentDate(),
        `${this.getCurrentTime()}.json`
      );
      
      fs.writeFileSync(historyFile, JSON.stringify(state, null, 2));
      
      console.log(`✅ Checkpoint сохранён: ${historyFile}`);
      
      // Git commit если есть изменения
      if (state.git && state.git.has_changes) {
        this.gitCommit(state);
      }
      
      // Синхронизация полушарий
      this.syncHemispheres(state);
      
      return state;
    } catch (error) {
      console.error('❌ Ошибка Checkpoint:', error.message);
      return null;
    }
  }

  // Cleanup - очистка старых файлов
  cleanup() {
    console.log('🧹 Cleanup запущен...');
    
    let cleaned = 0;
    
    try {
      const historyDirs = fs.readdirSync(this.config.paths.history);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - this.config.retention.history_days);
      
      for (const dir of historyDirs) {
        const dirDate = new Date(dir);
        if (dirDate < cutoffDate) {
          const dirPath = path.join(this.config.paths.history, dir);
          fs.rmSync(dirPath, { recursive: true, force: true });
          console.log(`  🗑️ Удалена старая директория: ${dir}`);
          cleaned++;
        }
      }
      
      console.log(`✅ Cleanup завершён. Удалено директорий: ${cleaned}`);
    } catch (error) {
      console.error('❌ Ошибка Cleanup:', error.message);
    }
    
    return cleaned;
  }

  // Git commit
  gitCommit(state) {
    try {
      console.log('📝 Создание Git commit...');
      
      // Добавляем изменения
      execSync('cd /workspace && git add .autosave/ CURRENT-STATE.md', { stdio: 'pipe' });
      
      // Создаём commit message
      const message = `🔄 Autosave: ${state.timestamp.split('T')[0]} ${this.getCurrentTime()}
      
Projects: OffersPSP (${state.projects.offerspsp?.status || 'unknown'}), Annoris (${state.projects.annoris?.status || 'unknown'})
Hemispheres: Left (${state.hemispheres.left?.status || 'unknown'}), Right (${state.hemispheres.right?.status || 'unknown'})
Modified files: ${state.git.modified_files}`;
      
      // Делаем commit
      execSync(`cd /workspace && git commit -m "${message}"`, { stdio: 'pipe' });
      
      console.log('✅ Git commit создан');
    } catch (error) {
      if (!error.message.includes('nothing to commit')) {
        console.error('⚠️ Git commit пропущен:', error.message);
      }
    }
  }

  // Синхронизация полушарий
  syncHemispheres(state) {
    console.log('🔄 Синхронизация полушарий...');
    
    try {
      // Обновляем статус в каждом полушарии
      const syncData = {
        last_sync: state.timestamp,
        system_health: state.system.health,
        projects: state.projects,
        metrics: state.metrics
      };
      
      // Левое полушарие (Annoris)
      const leftSync = path.join('/workspace/Annoris/.sync-state.json');
      fs.writeFileSync(leftSync, JSON.stringify(syncData, null, 2));
      
      // Правое полушарие (offerspsp-mvp)
      const rightSync = path.join('/workspace/offerspsp-mvp/.sync-state.json');
      fs.writeFileSync(rightSync, JSON.stringify(syncData, null, 2));
      
      console.log('✅ Полушария синхронизированы');
    } catch (error) {
      console.error('❌ Ошибка синхронизации:', error.message);
    }
  }

  // Обновление CURRENT-STATE.md
  updateCurrentState(state) {
    try {
      if (fs.existsSync(this.config.paths.current_state)) {
        let content = fs.readFileSync(this.config.paths.current_state, 'utf8');
        
        // Обновляем timestamp
        content = content.replace(
          /\*\*Last Update:\*\* .*/,
          `**Last Update:** ${state.timestamp.split('T')[0]} (автоматически обновляется)`
        );
        
        // Обновляем метрики если есть
        if (state.metrics) {
          const metricsSection = `
### System:
- **Uptime:** ${Math.floor(state.system.uptime / 3600)} hours
- **Autosaves today:** ${state.metrics.autosave_count}
- **Storage used:** ${state.metrics.storage_used}`;
          
          // Заменяем или добавляем секцию метрик
          if (content.includes('### System:')) {
            content = content.replace(/### System:[\s\S]*?(?=##|$)/, metricsSection + '\n');
          }
        }
        
        fs.writeFileSync(this.config.paths.current_state, content);
      }
    } catch (error) {
      console.error('⚠️ Не удалось обновить CURRENT-STATE:', error.message);
    }
  }

  // Emergency save - экстренное сохранение
  emergencySave(reason = 'unknown') {
    console.log(`🚨 EMERGENCY SAVE: ${reason}`);
    
    const state = this.collectSystemState();
    state.save_type = 'emergency';
    state.reason = reason;
    
    // Сохраняем везде
    const emergencyFile = path.join(
      this.config.paths.history,
      this.getCurrentDate(),
      `EMERGENCY-${this.getCurrentTime()}.json`
    );
    
    fs.writeFileSync(emergencyFile, JSON.stringify(state, null, 2));
    fs.writeFileSync(this.config.paths.current, JSON.stringify(state, null, 2));
    fs.writeFileSync(this.config.paths.checkpoint, JSON.stringify(state, null, 2));
    
    // Форсированный git commit
    this.gitCommit(state);
    
    console.log(`✅ Emergency save завершён: ${emergencyFile}`);
    return state;
  }

  // Восстановление из последнего сохранения
  restore() {
    console.log('🔄 Восстановление из autosave...');
    
    try {
      // Пробуем checkpoint
      if (fs.existsSync(this.config.paths.checkpoint)) {
        const checkpoint = JSON.parse(fs.readFileSync(this.config.paths.checkpoint, 'utf8'));
        console.log(`✅ Восстановлено из checkpoint: ${checkpoint.timestamp}`);
        return checkpoint;
      }
      
      // Пробуем current
      if (fs.existsSync(this.config.paths.current)) {
        const current = JSON.parse(fs.readFileSync(this.config.paths.current, 'utf8'));
        console.log(`✅ Восстановлено из current: ${current.timestamp}`);
        return current;
      }
      
      console.log('⚠️ Нет сохранений для восстановления');
      return null;
    } catch (error) {
      console.error('❌ Ошибка восстановления:', error.message);
      return null;
    }
  }

  // Статистика autosave
  stats() {
    const stats = {
      current_exists: fs.existsSync(this.config.paths.current),
      checkpoint_exists: fs.existsSync(this.config.paths.checkpoint),
      history_days: 0,
      total_saves: 0,
      storage_used: '0MB'
    };
    
    try {
      // Подсчёт дней в истории
      if (fs.existsSync(this.config.paths.history)) {
        const dirs = fs.readdirSync(this.config.paths.history);
        stats.history_days = dirs.length;
        
        // Подсчёт общего количества сохранений
        for (const dir of dirs) {
          const files = fs.readdirSync(path.join(this.config.paths.history, dir));
          stats.total_saves += files.length;
        }
      }
      
      // Размер хранилища
      const size = execSync(`du -sh ${this.config.paths.autosave_dir} 2>/dev/null | cut -f1`, 
                           { encoding: 'utf8' }).trim();
      stats.storage_used = size || '0MB';
      
    } catch (e) {
      // Ignore errors
    }
    
    return stats;
  }
}

// CLI interface
if (require.main === module) {
  const autosave = new AutosaveSystem();
  const command = process.argv[2] || 'help';
  
  switch (command) {
    case 'quick':
      autosave.quickSave();
      break;
      
    case 'checkpoint':
      autosave.checkpoint();
      break;
      
    case 'cleanup':
      autosave.cleanup();
      break;
      
    case 'emergency':
      const reason = process.argv[3] || 'manual trigger';
      autosave.emergencySave(reason);
      break;
      
    case 'restore':
      const restored = autosave.restore();
      if (restored) {
        console.log(JSON.stringify(restored, null, 2));
      }
      break;
      
    case 'stats':
      const stats = autosave.stats();
      console.log('📊 Autosave Statistics:');
      console.log(JSON.stringify(stats, null, 2));
      break;
      
    case 'help':
    default:
      console.log(`
🔄 SUPER SYSTEM AUTOSAVE v2.0

Usage: node autosave.js [command]

Commands:
  quick       - Quick save (текущее состояние)
  checkpoint  - Checkpoint save (с git commit)
  cleanup     - Очистка старых сохранений
  emergency   - Экстренное сохранение
  restore     - Восстановить последнее сохранение
  stats       - Показать статистику
  help        - Показать эту справку

Examples:
  node autosave.js quick
  node autosave.js checkpoint
  node autosave.js emergency "critical error"
`);
  }
}

module.exports = AutosaveSystem;
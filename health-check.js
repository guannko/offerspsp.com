#!/usr/bin/env node

/**
 * SUPER SYSTEM HEALTH CHECK
 * Мониторинг состояния всей системы
 */

const fs = require('fs');
const path = require('path');

// Конфигурация
const CONFIG = {
  maxSizeKB: {
    eyes: 500,      // offerspsp.com должен быть < 500KB
    hemisphere: 5000 // полушария могут быть больше
  },
  criticalFiles: [
    '/workspace/BRAIN-INDEX.md',
    '/workspace/CURRENT-STATE.md',
    '/workspace/userPreferences-STABLE.md'
  ],
  hemispheres: {
    left: '/workspace/Annoris/hemisphere-status.json',
    right: '/workspace/offerspsp-mvp/hemisphere-status.json'
  }
};

// Цвета для консоли
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

// Класс для health check
class SystemHealthCheck {
  constructor() {
    this.results = {
      timestamp: new Date().toISOString(),
      overall: 'HEALTHY',
      checks: [],
      warnings: [],
      errors: []
    };
  }

  // Проверка размера директории
  getDirectorySize(dirPath) {
    let totalSize = 0;
    
    try {
      const files = fs.readdirSync(dirPath);
      
      for (const file of files) {
        const filePath = path.join(dirPath, file);
        const stats = fs.statSync(filePath);
        
        if (stats.isFile()) {
          totalSize += stats.size;
        } else if (stats.isDirectory() && !file.startsWith('.')) {
          totalSize += this.getDirectorySize(filePath);
        }
      }
    } catch (error) {
      return -1;
    }
    
    return totalSize;
  }

  // Проверка критических файлов
  checkCriticalFiles() {
    console.log(`${colors.cyan}🔍 Проверка критических файлов...${colors.reset}`);
    
    for (const file of CONFIG.criticalFiles) {
      const exists = fs.existsSync(file);
      const status = exists ? 'OK' : 'MISSING';
      
      this.results.checks.push({
        type: 'critical_file',
        file: file,
        status: status
      });
      
      if (exists) {
        console.log(`  ✅ ${path.basename(file)}: ${colors.green}OK${colors.reset}`);
      } else {
        console.log(`  ❌ ${path.basename(file)}: ${colors.red}MISSING${colors.reset}`);
        this.results.errors.push(`Critical file missing: ${file}`);
        this.results.overall = 'CRITICAL';
      }
    }
  }

  // Проверка размера репозитория глаз
  checkEyesSize() {
    console.log(`${colors.cyan}📏 Проверка размера offerspsp.com (глаза)...${colors.reset}`);
    
    const eyesPath = '/workspace';
    const sizeBytes = this.getDirectorySize(eyesPath);
    const sizeKB = Math.round(sizeBytes / 1024);
    
    this.results.checks.push({
      type: 'eyes_size',
      path: eyesPath,
      sizeKB: sizeKB,
      maxKB: CONFIG.maxSizeKB.eyes
    });
    
    if (sizeKB < CONFIG.maxSizeKB.eyes) {
      console.log(`  ✅ Размер: ${sizeKB}KB < ${CONFIG.maxSizeKB.eyes}KB ${colors.green}OK${colors.reset}`);
    } else {
      console.log(`  ⚠️ Размер: ${sizeKB}KB > ${CONFIG.maxSizeKB.eyes}KB ${colors.yellow}WARNING${colors.reset}`);
      this.results.warnings.push(`Eyes repository too large: ${sizeKB}KB`);
      if (this.results.overall === 'HEALTHY') {
        this.results.overall = 'WARNING';
      }
    }
  }

  // Проверка полушарий
  checkHemispheres() {
    console.log(`${colors.cyan}🧠 Проверка полушарий...${colors.reset}`);
    
    for (const [name, statusFile] of Object.entries(CONFIG.hemispheres)) {
      if (fs.existsSync(statusFile)) {
        try {
          const status = JSON.parse(fs.readFileSync(statusFile, 'utf8'));
          
          this.results.checks.push({
            type: 'hemisphere',
            name: name,
            status: status.status,
            health: status.health
          });
          
          if (status.status === 'operational') {
            console.log(`  ✅ ${name} полушарие: ${colors.green}OPERATIONAL${colors.reset}`);
          } else {
            console.log(`  ⚠️ ${name} полушарие: ${colors.yellow}${status.status}${colors.reset}`);
            this.results.warnings.push(`${name} hemisphere not operational`);
          }
        } catch (error) {
          console.log(`  ❌ ${name} полушарие: ${colors.red}ERROR${colors.reset}`);
          this.results.errors.push(`Cannot read ${name} hemisphere status`);
        }
      } else {
        console.log(`  ⚠️ ${name} полушарие: ${colors.yellow}NO STATUS FILE${colors.reset}`);
        this.results.warnings.push(`${name} hemisphere status file missing`);
      }
    }
  }

  // Проверка дубликатов
  checkDuplicates() {
    console.log(`${colors.cyan}🔍 Проверка дубликатов...${colors.reset}`);
    
    const patterns = ['*userPreferences*', '*memory*', '*autosave*'];
    let duplicatesFound = 0;
    
    // Simplified check - just count files
    const countFiles = (pattern) => {
      try {
        const { execSync } = require('child_process');
        const result = execSync(`find /workspace -name "${pattern}" -type f 2>/dev/null | wc -l`, 
                               { encoding: 'utf8' });
        return parseInt(result.trim());
      } catch {
        return 0;
      }
    };
    
    const userPrefCount = countFiles('*userPreferences*');
    if (userPrefCount > 1) {
      console.log(`  ⚠️ userPreferences: найдено ${userPrefCount} файлов ${colors.yellow}(должен быть 1)${colors.reset}`);
      this.results.warnings.push(`Multiple userPreferences files: ${userPrefCount}`);
      duplicatesFound += userPrefCount - 1;
    } else {
      console.log(`  ✅ userPreferences: ${colors.green}OK${colors.reset}`);
    }
    
    this.results.checks.push({
      type: 'duplicates',
      found: duplicatesFound
    });
  }

  // Генерация отчёта
  generateReport() {
    console.log(`\n${colors.cyan}📊 ИТОГОВЫЙ ОТЧЁТ${colors.reset}`);
    console.log('=================\n');
    
    // Определяем цвет для статуса
    let statusColor = colors.green;
    if (this.results.overall === 'WARNING') statusColor = colors.yellow;
    if (this.results.overall === 'CRITICAL') statusColor = colors.red;
    
    console.log(`Общий статус: ${statusColor}${this.results.overall}${colors.reset}`);
    console.log(`Время проверки: ${this.results.timestamp}`);
    
    if (this.results.warnings.length > 0) {
      console.log(`\n${colors.yellow}⚠️ Предупреждения:${colors.reset}`);
      this.results.warnings.forEach(w => console.log(`  - ${w}`));
    }
    
    if (this.results.errors.length > 0) {
      console.log(`\n${colors.red}❌ Ошибки:${colors.reset}`);
      this.results.errors.forEach(e => console.log(`  - ${e}`));
    }
    
    // Сохраняем результаты в файл
    const reportPath = '/workspace/health-check-report.json';
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
    console.log(`\n📄 Детальный отчёт сохранён в: ${reportPath}`);
    
    // Обновляем CURRENT-STATE.md
    this.updateCurrentState();
  }

  // Обновление CURRENT-STATE.md
  updateCurrentState() {
    const statePath = '/workspace/CURRENT-STATE.md';
    
    if (fs.existsSync(statePath)) {
      let content = fs.readFileSync(statePath, 'utf8');
      
      // Обновляем статус здоровья
      const healthEmoji = this.results.overall === 'HEALTHY' ? '🟢' : 
                          this.results.overall === 'WARNING' ? '🟡' : '🔴';
      
      content = content.replace(
        /\*\*System Health:\*\* .+ /,
        `**System Health:** ${healthEmoji} ${this.results.overall}`
      );
      
      content = content.replace(
        /\*\*Last Update:\*\* .+/,
        `**Last Update:** ${new Date().toISOString().split('T')[0]} (автоматически обновляется)`
      );
      
      fs.writeFileSync(statePath, content);
      console.log(`\n✅ CURRENT-STATE.md обновлён`);
    }
  }

  // Запуск всех проверок
  run() {
    console.log(`${colors.cyan}🏥 SUPER SYSTEM HEALTH CHECK v1.0${colors.reset}`);
    console.log('==================================\n');
    
    this.checkCriticalFiles();
    console.log('');
    
    this.checkEyesSize();
    console.log('');
    
    this.checkHemispheres();
    console.log('');
    
    this.checkDuplicates();
    
    this.generateReport();
    
    // Возвращаем код выхода
    if (this.results.overall === 'CRITICAL') {
      process.exit(1);
    } else if (this.results.overall === 'WARNING') {
      process.exit(0); // warning не блокирует
    } else {
      process.exit(0);
    }
  }
}

// Запуск
if (require.main === module) {
  const healthCheck = new SystemHealthCheck();
  healthCheck.run();
}

module.exports = SystemHealthCheck;
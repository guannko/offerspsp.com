# 🔄 AUTOSAVE SYSTEM v2.0
**Purpose:** Автоматическое сохранение состояния SUPER SYSTEM
**Created:** 2025-01-14

## 🎯 КОНЦЕПЦИЯ

Вместо хаотичного создания сотен autosave файлов, новая система:
1. **Сохраняет только изменения** (не дублирует всё подряд)
2. **Ротирует старые файлы** (автоочистка через 30 дней)
3. **Синхронизирует полушария** (левое и правое)
4. **Использует Git commits** как основной механизм

## 🏗️ АРХИТЕКТУРА AUTOSAVE

```
AUTOSAVE FLOW
=============

Изменение в системе
        ↓
  Детект изменений
        ↓
  ┌─────┴─────┐
  ↓           ↓
Quick Save   Full Save
(1-5 мин)    (30 мин)
  ↓           ↓
  └─────┬─────┘
        ↓
   Git Commit
        ↓
  Синхронизация
   полушарий
```

## 📁 СТРУКТУРА ФАЙЛОВ

```
/workspace/
├── .autosave/
│   ├── current.json         # Текущее состояние (обновляется каждые 1-5 мин)
│   ├── checkpoint.json      # Контрольная точка (каждые 30 мин)
│   └── history/
│       └── 2025-01-14/      # Дневные архивы
│           ├── 12-00.json
│           ├── 12-30.json
│           └── 13-00.json
├── CURRENT-STATE.md         # Читаемое состояние
└── autosave.js             # Скрипт автосейва
```

## 🔧 РЕЖИМЫ СОХРАНЕНИЯ

### 1. Quick Save (каждые 1-5 минут)
- Сохраняет только изменённые данные
- Обновляет `current.json`
- НЕ создаёт новые файлы
- НЕ делает git commit

### 2. Checkpoint Save (каждые 30 минут)
- Создаёт полный снимок состояния
- Архивирует в `history/`
- Делает git commit
- Синхронизирует полушария

### 3. Emergency Save (при критических изменениях)
- Срабатывает при важных событиях
- Немедленный git commit
- Уведомление в лог

## 💾 ЧТО СОХРАНЯЕТСЯ

### Критические данные (всегда):
```json
{
  "timestamp": "2025-01-14T12:00:00Z",
  "system": {
    "health": "operational",
    "version": "1.0.0"
  },
  "projects": {
    "offerspsp": {
      "status": "production",
      "lastDeploy": "2025-01-14",
      "revenue": "€0"
    },
    "annoris": {
      "status": "development",
      "progress": "30%"
    }
  },
  "hemispheres": {
    "left": "operational",
    "right": "operational"
  },
  "memory": {
    "lastUpdate": "2025-01-14T12:00:00Z",
    "sha": "abc123..."
  }
}
```

### Сессионные данные (при изменении):
- Текущие задачи
- Прогресс выполнения
- Новые инсайты
- Ошибки и предупреждения

## 🚀 IMPLEMENTATION

### Вариант 1: GitHub Actions (рекомендуется)
```yaml
# .github/workflows/autosave.yml
name: SUPER SYSTEM Autosave

on:
  schedule:
    - cron: '*/30 * * * *'  # Каждые 30 минут
  workflow_dispatch:        # Ручной запуск

jobs:
  autosave:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Update System State
        run: |
          node autosave.js checkpoint
          
      - name: Commit Changes
        run: |
          git config user.name "SUPER SYSTEM Bot"
          git config user.email "bot@braindex.com"
          git add .autosave/
          git add CURRENT-STATE.md
          git commit -m "🔄 Autosave: $(date +'%Y-%m-%d %H:%M')" || true
          git push
```

### Вариант 2: Local Cron (для VPS/Railway)
```bash
# Добавить в crontab
*/5 * * * * cd /workspace && node autosave.js quick
*/30 * * * * cd /workspace && node autosave.js checkpoint
0 0 * * * cd /workspace && node autosave.js cleanup
```

### Вариант 3: Node.js Background Process
```javascript
// autosave-daemon.js
const AutosaveSystem = require('./autosave.js');

const autosave = new AutosaveSystem();

// Quick save каждые 5 минут
setInterval(() => {
  autosave.quickSave();
}, 5 * 60 * 1000);

// Checkpoint каждые 30 минут
setInterval(() => {
  autosave.checkpoint();
}, 30 * 60 * 1000);

// Cleanup каждый день в полночь
setInterval(() => {
  autosave.cleanup();
}, 24 * 60 * 60 * 1000);
```

## 🛡️ ЗАЩИТА ОТ ПЕРЕПОЛНЕНИЯ

### Автоматическая очистка:
1. **Quick saves** - хранятся только последние 10
2. **Checkpoints** - хранятся 7 дней
3. **History** - архивируется через 30 дней
4. **Git история** - основное хранилище

### Лимиты размера:
- Max размер `.autosave/`: 10MB
- Max размер одного save: 1MB
- При превышении - автоматическая ротация

## 📊 МОНИТОРИНГ AUTOSAVE

### Dashboard данные:
```json
{
  "autosave_stats": {
    "last_quick": "2025-01-14T12:05:00Z",
    "last_checkpoint": "2025-01-14T12:00:00Z",
    "total_saves_today": 48,
    "storage_used": "2.3MB",
    "oldest_save": "2025-01-07"
  }
}
```

## 🔌 ИНТЕГРАЦИЯ С SUPER SYSTEM

### При загрузке Jean Claude:
1. Читает `BRAIN-INDEX.md` (структура)
2. Читает `.autosave/current.json` (последнее состояние)
3. Проверяет изменения с последнего checkpoint
4. Продолжает работу с актуальным контекстом

### При завершении сессии:
1. Автоматический emergency save
2. Обновление CURRENT-STATE.md
3. Git commit с описанием изменений
4. Синхронизация полушарий

## ⚙️ НАСТРОЙКИ

### Конфигурация (autosave.config.json):
```json
{
  "intervals": {
    "quick": 300,        // 5 минут
    "checkpoint": 1800,  // 30 минут
    "cleanup": 86400    // 24 часа
  },
  "retention": {
    "quick_saves": 10,
    "checkpoints_days": 7,
    "history_days": 30
  },
  "git": {
    "auto_commit": true,
    "auto_push": true,
    "branch": "main"
  },
  "notifications": {
    "on_error": true,
    "on_checkpoint": false
  }
}
```

## 🚨 ВОССТАНОВЛЕНИЕ ИЗ AUTOSAVE

```bash
# Последний quick save
cat .autosave/current.json

# Последний checkpoint
cat .autosave/checkpoint.json

# История за день
ls .autosave/history/$(date +%Y-%m-%d)/

# Восстановить состояние на время
git checkout $(git log --before="2025-01-14 12:00" -1 --format=%H)
```

## 📝 BEST PRACTICES

### ✅ ДЕЛАЙ:
- Используй quick save для частых изменений
- Делай checkpoint перед важными операциями
- Проверяй размер .autosave/ директории
- Синхронизируй с Git регулярно

### ❌ НЕ ДЕЛАЙ:
- Не создавай autosave файлы вручную
- Не храни конфиденциальные данные
- Не отключай автоочистку
- Не игнорируй ошибки сохранения

---

*AUTOSAVE SYSTEM - Ваша память всегда в безопасности!*
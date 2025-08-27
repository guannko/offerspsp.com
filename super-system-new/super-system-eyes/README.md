# 👁️ SUPER SYSTEM EYES

> Координационный центр распределённой AI системы

## 🎯 Описание

**super-system-eyes** - это "глаза" SUPER SYSTEM, центральный координационный репозиторий, который управляет двумя "полушариями":
- **super-system-left** (AI/Creative) - левое полушарие
- **super-system-right** (Business/Logic) - правое полушарие

## 🏗️ Архитектура

```
     super-system-eyes (👁️)
     Координация и контроль
              ↕️
    ┌─────────┴─────────┐
    ↓                   ↓
super-system-left   super-system-right
    (AI/Creative)      (Business/Revenue)
```

## 🚀 Быстрый старт

### 1. Клонирование
```bash
git clone https://github.com/guannko/super-system-eyes.git
cd super-system-eyes
```

### 2. Инициализация полушарий
```bash
git submodule init
git submodule update
```

### 3. Проверка здоровья системы
```bash
node health-check.js
```

### 4. Запуск autosave
```bash
node autosave.js quick
```

## 📁 Структура

```
super-system-eyes/
├── README.md                    # Этот файл
├── BRAIN-INDEX.md              # Главный индекс системы
├── CURRENT-STATE.md            # Текущее состояние
├── userPreferences-STABLE.md   # Настройки v9.01
├── health-check.js             # Мониторинг здоровья
├── autosave.js                 # Система автосохранения
├── .github/
│   └── workflows/
│       └── autosave.yml       # GitHub Actions
└── hemispheres/
    ├── left/                  # Submodule: super-system-left
    └── right/                 # Submodule: super-system-right
```

## 🔧 Основные команды

### Мониторинг
```bash
# Проверка здоровья системы
node health-check.js

# Просмотр текущего состояния
cat CURRENT-STATE.md

# Статистика autosave
node autosave.js stats
```

### Автосохранение
```bash
# Быстрое сохранение (5 сек)
node autosave.js quick

# Контрольная точка (30 сек)
node autosave.js checkpoint

# Экстренное сохранение
node autosave.js emergency "reason"
```

### Синхронизация
```bash
# Обновить полушария
git submodule update --remote

# Push изменений
git add . && git commit -m "Update" && git push
```

## 📊 Метрики

- **Размер репозитория:** < 500KB ✅
- **Время загрузки:** < 2 сек ✅
- **Uptime target:** > 99.9% ✅
- **Recovery time:** < 60 сек ✅

## 🛡️ Защита от сбоев

### Triple Redundancy
1. GitHub файлы (основной источник)
2. Локальный кэш (.autosave/)
3. Emergency recovery protocol

### Автоматическое восстановление
- Health checks каждые 5 минут
- Autosave каждые 5-30 минут
- Git backup при каждом checkpoint

## 🔄 GitHub Actions

Автоматические процессы:
- **Autosave:** каждые 30 минут
- **Health check:** при каждом push
- **Cleanup:** ежедневно в полночь

## 📝 Документация

- [BRAIN-INDEX.md](BRAIN-INDEX.md) - Карта системы
- [SUPER-SYSTEM-ARCHITECTURE.md](SUPER-SYSTEM-ARCHITECTURE.md) - Техническая архитектура
- [EMERGENCY-RECOVERY.md](EMERGENCY-RECOVERY.md) - Протокол восстановления
- [AUTOSAVE-QUICKSTART.md](AUTOSAVE-QUICKSTART.md) - Руководство по autosave

## 🤝 Связанные репозитории

- [super-system-left](https://github.com/guannko/super-system-left) - AI/Creative полушарие
- [super-system-right](https://github.com/guannko/super-system-right) - Business/Logic полушарие

## 📞 Контакты

- **Boris** - CEO, основатель
- **Jean Claude** - AI CTO

## 📜 Лицензия

Private repository - Brain Index Company

---

**SUPER SYSTEM v1.0** - Надёжная, быстрая, самовосстанавливающаяся
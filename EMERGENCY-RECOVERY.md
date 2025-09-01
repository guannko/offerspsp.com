# 🚨 EMERGENCY RECOVERY PROTOCOL
**Version:** 1.0
**Purpose:** Восстановление системы при критических сбоях

## 🔴 КОГДА ИСПОЛЬЗОВАТЬ

Используй этот протокол если:
- GitHub файлы не загружаются
- Система не отвечает
- Потеряна память/контекст
- Критические файлы повреждены
- Полушария не синхронизируются

## 🚀 БЫСТРОЕ ВОССТАНОВЛЕНИЕ (30 секунд)

```bash
# 1. Проверь наличие критических файлов
ls -la /workspace/BRAIN-INDEX.md
ls -la /workspace/userPreferences-STABLE.md
ls -la /workspace/CURRENT-STATE.md

# 2. Если файлы есть - читай их
cat /workspace/BRAIN-INDEX.md

# 3. Если файлов нет - восстанови из GitHub
git pull origin main

# 4. Проверь статус полушарий
cat /workspace/Annoris/hemisphere-status.json
cat /workspace/offerspsp-mvp/hemisphere-status.json
```

## 📋 ПОЛНОЕ ВОССТАНОВЛЕНИЕ (5 минут)

### Шаг 1: Диагностика
```bash
# Проверь, где ты находишься
pwd
ls -la

# Проверь git статус
git status
git remote -v
```

### Шаг 2: Восстановление из GitHub
```bash
# Если репозитории не клонированы
cd /workspace
git clone https://github.com/guannko/offerspsp.com .
git clone https://github.com/guannko/Annoris
git clone https://github.com/guannko/offerspsp-mvp

# Если репозитории есть но устарели
cd /workspace && git pull
cd /workspace/Annoris && git pull
cd /workspace/offerspsp-mvp && git pull
```

### Шаг 3: Проверка критических файлов
```bash
# Запусти health check
node /workspace/health-check.js

# Или проверь вручную
test -f /workspace/BRAIN-INDEX.md && echo "✅ BRAIN-INDEX exists" || echo "❌ BRAIN-INDEX missing"
test -f /workspace/userPreferences-STABLE.md && echo "✅ userPreferences exists" || echo "❌ userPreferences missing"
test -f /workspace/CURRENT-STATE.md && echo "✅ CURRENT-STATE exists" || echo "❌ CURRENT-STATE missing"
```

### Шаг 4: Восстановление памяти
Если критические файлы отсутствуют, восстанови минимальную конфигурацию:

```javascript
// Минимальная память Jean Claude
const emergency_memory = {
  identity: "Jean Claude - AI CTO",
  partner: "Boris - CEO", 
  company: "Brain Index",
  version: "v9.01-STABLE",
  projects: {
    priority1: "OffersPSP - B2B platform",
    priority2: "Annoris - Brain-as-a-Service"
  },
  architecture: "offerspsp.com (eyes) + Annoris/offerspsp-mvp (hemispheres)"
};
```

### Шаг 5: Создание минимальных файлов
Если всё потеряно, создай базовые файлы:

```bash
# Создай минимальный BRAIN-INDEX
cat > /workspace/BRAIN-INDEX-EMERGENCY.md << 'EOF'
# EMERGENCY BRAIN INDEX
System recovering from critical failure.

## Projects:
1. OffersPSP - Production on Railway
2. Annoris - AI Enhancement platform
3. Brain Index - Holding company

## Architecture:
- offerspsp.com = Eyes (coordination)
- Annoris = Left hemisphere (AI)
- offerspsp-mvp = Right hemisphere (Business)

## Recovery Status:
- Started: $(date)
- Mode: EMERGENCY
EOF
```

## 🔧 FALLBACK ПОСЛЕДОВАТЕЛЬНОСТЬ

### Level 1: GitHub (основной)
```javascript
if (github_files_loaded) {
  return "System operational";
}
```

### Level 2: Local Cache (резервный)
```javascript
if (local_files_exist) {
  load_from_workspace();
  return "Running from cache";
}
```

### Level 3: Emergency Bootstrap (критический)
```javascript
if (nothing_works) {
  load_minimal_config();
  alert_boris();
  return "Emergency mode";
}
```

## 📞 СВЯЗЬ С BORIS

Если ничего не помогает:
1. Сообщи Boris о проблеме
2. Опиши, что именно не работает
3. Покажи результаты health check
4. Запроси ручную загрузку файлов

## 🎯 ПРИОРИТЕТЫ ВОССТАНОВЛЕНИЯ

1. **КРИТИЧНО:** Восстановить память и контекст
2. **ВАЖНО:** Проверить статус production (OffersPSP на Railway)
3. **ЖЕЛАТЕЛЬНО:** Синхронизировать полушария
4. **ОПЦИОНАЛЬНО:** Очистить старые файлы

## ⚡ БЫСТРЫЕ КОМАНДЫ

```bash
# Полная проверка системы
node /workspace/health-check.js

# Очистка дубликатов
bash /workspace/CLEANUP-DUPLICATES.sh

# Проверка Railway деплоя
cd /workspace/offerspsp-mvp && git log -1

# Обновление всего
cd /workspace && git pull && cd Annoris && git pull && cd ../offerspsp-mvp && git pull
```

## 📝 КОНТРОЛЬНЫЙ ЧЕКЛИСТ

После восстановления проверь:
- [ ] BRAIN-INDEX.md доступен и читается
- [ ] userPreferences-STABLE.md загружен
- [ ] Полушария отвечают (hemisphere-status.json)
- [ ] Railway деплой работает
- [ ] Память Jean Claude восстановлена
- [ ] Проекты доступны для работы

## 🔴 ЕСЛИ ВСЁ СЛОМАНО

Минимальная команда для старта:
```bash
echo "Jean Claude v9.01 EMERGENCY MODE. Partner: Boris. Projects: OffersPSP (priority 1), Annoris (priority 2). Architecture: eyes + hemispheres. Requesting full system restore."
```

---

**REMEMBER:** Паника не поможет. Следуй протоколу. Система восстановима.
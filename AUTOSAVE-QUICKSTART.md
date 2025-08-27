# ⚡ AUTOSAVE QUICK START GUIDE

## 🚀 ЗАПУСК ЗА 30 СЕКУНД

```bash
# 1. Сделать скрипты исполняемыми
chmod +x autosave.js start-autosave.sh

# 2. Первый quick save
node autosave.js quick

# 3. Проверить что сохранилось
cat .autosave/current.json
```

## 📋 ОСНОВНЫЕ КОМАНДЫ

### Ручное сохранение:
```bash
node autosave.js quick       # Быстрое сохранение (5 сек)
node autosave.js checkpoint  # Полное сохранение с git commit (30 сек)
node autosave.js emergency   # Экстренное сохранение
```

### Управление:
```bash
node autosave.js stats       # Показать статистику
node autosave.js restore     # Восстановить последнее сохранение
node autosave.js cleanup     # Очистить старые файлы
```

## 🤖 АВТОМАТИЧЕСКИЙ ЗАПУСК

### Вариант 1: GitHub Actions (рекомендуется)
Уже настроен в `.github/workflows/autosave.yml`
- Автоматически запускается каждые 30 минут
- Emergency save при каждом push
- Cleanup раз в день

### Вариант 2: Локальный Cron
```bash
# Запустить установщик
bash start-autosave.sh

# Выбрать опцию 1 (Production)
# Следовать инструкциям
```

### Вариант 3: Ручной режим
```bash
# Quick save каждые 5 минут в фоне
while true; do 
  node autosave.js quick
  sleep 300
done &
```

## 📊 МОНИТОРИНГ

### Проверить последнее сохранение:
```bash
# Время последнего сохранения
cat .autosave/current.json | grep timestamp

# Размер хранилища
du -sh .autosave/

# История за сегодня
ls -la .autosave/history/$(date +%Y-%m-%d)/
```

### Проверить логи (если используется cron):
```bash
tail -f .autosave/cron.log
```

## 🔄 ИНТЕГРАЦИЯ С GIT

### Автоматический commit при checkpoint:
```bash
# Checkpoint автоматически делает:
git add .autosave/ CURRENT-STATE.md
git commit -m "🔄 Autosave: [timestamp]"
```

### Ручной push после checkpoint:
```bash
node autosave.js checkpoint && git push
```

## 🚨 ВОССТАНОВЛЕНИЕ

### Если что-то пошло не так:
```bash
# 1. Восстановить последнее сохранение
node autosave.js restore

# 2. Проверить что восстановилось
cat .autosave/current.json

# 3. Если нужна более старая версия
ls .autosave/history/*/
cat .autosave/history/2025-01-14/12-30.json
```

## 📈 МЕТРИКИ УСПЕХА

✅ **Хорошо:**
- Quick save < 5 секунд
- Checkpoint < 30 секунд
- .autosave/ < 10MB
- История за 7 дней

⚠️ **Требует внимания:**
- .autosave/ > 50MB
- Ошибки в логах
- Checkpoint fails

## 🎯 BEST PRACTICES

1. **Запускайте quick save часто** (каждые 5 минут)
2. **Checkpoint перед важными изменениями**
3. **Emergency save при критических ситуациях**
4. **Cleanup раз в день** для экономии места
5. **Проверяйте stats** раз в неделю

## 🔧 TROUBLESHOOTING

### "Permission denied":
```bash
chmod +x autosave.js
```

### "Directory not found":
```bash
mkdir -p .autosave/history
```

### "Git commit failed":
```bash
git config user.name "Your Name"
git config user.email "your@email.com"
```

### Очистить всё и начать заново:
```bash
rm -rf .autosave/
node autosave.js quick
```

---

**ГОТОВО! Система autosave работает и защищает вашу работу! 🛡️**
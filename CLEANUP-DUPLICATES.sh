#!/bin/bash
# SUPER SYSTEM CLEANUP SCRIPT
# Безопасное удаление дубликатов и оптимизация размера

echo "🧹 SUPER SYSTEM CLEANUP v1.0"
echo "=============================="
echo ""

# Проверка, что мы в правильной директории
if [ ! -d "/workspace/.git" ]; then
    echo "❌ Ошибка: запускайте из /workspace"
    exit 1
fi

echo "📊 Анализ текущего состояния..."
echo ""

# Показываем размеры до очистки
echo "Размеры ДО очистки:"
du -sh /workspace/offerspsp-mvp /workspace/Annoris /workspace | tail -1

# Создаём backup директорию
BACKUP_DIR="/workspace/CLEANUP_BACKUP_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"
echo ""
echo "📦 Создана директория для backup: $BACKUP_DIR"
echo ""

# ЭТАП 1: Backup критических файлов
echo "🔒 ЭТАП 1: Backup критических файлов..."
cp /workspace/userPreferences-STABLE.md "$BACKUP_DIR/" 2>/dev/null || true
cp /workspace/BRAIN-INDEX.md "$BACKUP_DIR/" 2>/dev/null || true
cp /workspace/CURRENT-STATE.md "$BACKUP_DIR/" 2>/dev/null || true
cp /workspace/SUPER-SYSTEM-ARCHITECTURE.md "$BACKUP_DIR/" 2>/dev/null || true
echo "✅ Критические файлы сохранены"
echo ""

# ЭТАП 2: Удаление дубликатов userPreferences
echo "🗑️ ЭТАП 2: Удаление старых версий userPreferences..."
echo "Найдено дубликатов:"
find /workspace -name "*userPreferences*" -not -name "userPreferences-STABLE.md" -type f | wc -l

# Перемещаем в backup (не удаляем сразу)
find /workspace -name "*userPreferences*" -not -name "userPreferences-STABLE.md" -type f -exec mv {} "$BACKUP_DIR/" \; 2>/dev/null

echo "✅ Старые версии перемещены в backup"
echo ""

# ЭТАП 3: Очистка старых autosave (старше 30 дней)
echo "🗑️ ЭТАП 3: Очистка старых autosave файлов..."
echo "Найдено старых autosave:"
find /workspace -name "*autosave*" -type f -mtime +30 | wc -l

# Перемещаем старые autosave
find /workspace -name "*autosave*" -type f -mtime +30 -exec mv {} "$BACKUP_DIR/" \; 2>/dev/null

echo "✅ Старые autosave перемещены в backup"
echo ""

# ЭТАП 4: Удаление временных и тестовых файлов
echo "🗑️ ЭТАП 4: Удаление временных файлов..."
find /workspace -name "temp-*" -o -name "test-*" -o -name "*-STUB*" -o -name "*-stub*" | while read file; do
    mv "$file" "$BACKUP_DIR/" 2>/dev/null || true
done
echo "✅ Временные файлы перемещены"
echo ""

# ЭТАП 5: Очистка дубликатов memory файлов
echo "🗑️ ЭТАП 5: Унификация memory файлов..."

# Оставляем только актуальные memory файлы
if [ -f "/workspace/offerspsp-mvp/jean-claude-memory-current.md" ]; then
    mv "/workspace/offerspsp-mvp/jean-claude-memory-current.md" "$BACKUP_DIR/" 2>/dev/null || true
fi

echo "✅ Memory файлы унифицированы"
echo ""

# ЭТАП 6: Создание структуры для полушарий
echo "🏗️ ЭТАП 6: Создание структуры синхронизации..."

# Создаём файлы статуса для полушарий
cat > /workspace/Annoris/hemisphere-status.json << 'EOF'
{
  "hemisphere": "left",
  "type": "AI/Creative",
  "status": "operational",
  "lastUpdate": "2025-01-14",
  "health": {
    "memory": "stable",
    "sync": "ready",
    "errors": 0
  },
  "projects": {
    "annoris": {
      "status": "development",
      "priority": 2
    }
  }
}
EOF

cat > /workspace/offerspsp-mvp/hemisphere-status.json << 'EOF'
{
  "hemisphere": "right", 
  "type": "Business/Logic",
  "status": "operational",
  "lastUpdate": "2025-01-14",
  "health": {
    "memory": "stable",
    "sync": "ready",
    "errors": 0
  },
  "projects": {
    "offerspsp": {
      "status": "production",
      "priority": 1,
      "railway": "deployed"
    }
  }
}
EOF

echo "✅ Структура синхронизации создана"
echo ""

# Показываем результаты
echo "📊 РЕЗУЛЬТАТЫ ОЧИСТКИ:"
echo "======================"
echo ""
echo "Размеры ПОСЛЕ очистки:"
du -sh /workspace/offerspsp-mvp /workspace/Annoris /workspace | tail -1
echo ""

# Подсчёт освобождённого места
BACKUP_SIZE=$(du -sh "$BACKUP_DIR" | cut -f1)
echo "🗄️ Перемещено в backup: $BACKUP_SIZE"
echo "📁 Backup директория: $BACKUP_DIR"
echo ""

echo "✅ ОЧИСТКА ЗАВЕРШЕНА УСПЕШНО!"
echo ""
echo "⚠️ ВАЖНО:"
echo "1. Проверьте, что всё работает корректно"
echo "2. Если всё OK, можете удалить backup: rm -rf $BACKUP_DIR"
echo "3. Сделайте git commit изменений"
echo ""
echo "💡 Рекомендуется:"
echo "git add ."
echo "git commit -m 'SUPER SYSTEM: Cleanup duplicates and optimize structure'"
echo "git push"
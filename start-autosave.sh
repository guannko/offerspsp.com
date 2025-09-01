#!/bin/bash

# SUPER SYSTEM AUTOSAVE STARTER
# Запускает autosave в фоновом режиме

echo "🚀 SUPER SYSTEM AUTOSAVE STARTER"
echo "================================"
echo ""

# Проверка Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не установлен!"
    echo "Установите: apt install nodejs npm"
    exit 1
fi

# Создание необходимых директорий
echo "📁 Создание структуры директорий..."
mkdir -p /workspace/.autosave/history
mkdir -p /workspace/.github/workflows

# Проверка наличия autosave.js
if [ ! -f "/workspace/autosave.js" ]; then
    echo "❌ autosave.js не найден!"
    exit 1
fi

# Выбор режима
echo ""
echo "Выберите режим запуска:"
echo "1) 🚀 Production (фоновый процесс с автозапуском)"
echo "2) 🧪 Test (одноразовый запуск)"
echo "3) 📊 Stats (показать статистику)"
echo "4) 🔄 Restore (восстановить из последнего сохранения)"
echo ""
read -p "Выбор (1-4): " choice

case $choice in
    1)
        echo ""
        echo "🚀 Запуск в Production режиме..."
        
        # Создаём systemd service (для Linux)
        if [ -d "/etc/systemd/system" ]; then
            sudo tee /etc/systemd/system/supersystem-autosave.service > /dev/null << EOF
[Unit]
Description=SUPER SYSTEM Autosave Service
After=network.target

[Service]
Type=simple
User=$USER
WorkingDirectory=/workspace
ExecStart=/usr/bin/node /workspace/autosave-daemon.js
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF
            
            # Создаём daemon скрипт
            cat > /workspace/autosave-daemon.js << 'EOF'
#!/usr/bin/env node

const AutosaveSystem = require('./autosave.js');
const autosave = new AutosaveSystem();

console.log('🚀 SUPER SYSTEM Autosave Daemon started');

// Quick save каждые 5 минут
setInterval(() => {
  console.log('⚡ Running quick save...');
  autosave.quickSave();
}, 5 * 60 * 1000);

// Checkpoint каждые 30 минут
setInterval(() => {
  console.log('📍 Running checkpoint...');
  autosave.checkpoint();
}, 30 * 60 * 1000);

// Cleanup каждый день
setInterval(() => {
  console.log('🧹 Running cleanup...');
  autosave.cleanup();
}, 24 * 60 * 60 * 1000);

// Первый запуск
autosave.quickSave();

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('📴 Shutting down gracefully...');
  autosave.emergencySave('daemon shutdown');
  process.exit(0);
});

// Keep process alive
process.stdin.resume();
EOF
            
            echo "✅ Systemd service создан"
            echo ""
            echo "Для запуска выполните:"
            echo "  sudo systemctl daemon-reload"
            echo "  sudo systemctl enable supersystem-autosave"
            echo "  sudo systemctl start supersystem-autosave"
            echo ""
            echo "Проверить статус:"
            echo "  sudo systemctl status supersystem-autosave"
            
        else
            # Альтернатива через cron
            echo "📝 Добавление в crontab..."
            
            # Backup текущего crontab
            crontab -l > /tmp/crontab.backup 2>/dev/null || true
            
            # Добавляем наши задачи
            {
                cat /tmp/crontab.backup 2>/dev/null || true
                echo "# SUPER SYSTEM Autosave"
                echo "*/5 * * * * cd /workspace && /usr/bin/node autosave.js quick >> /workspace/.autosave/cron.log 2>&1"
                echo "*/30 * * * * cd /workspace && /usr/bin/node autosave.js checkpoint >> /workspace/.autosave/cron.log 2>&1"
                echo "0 0 * * * cd /workspace && /usr/bin/node autosave.js cleanup >> /workspace/.autosave/cron.log 2>&1"
            } | crontab -
            
            echo "✅ Задачи добавлены в crontab"
            echo ""
            echo "Проверить crontab:"
            echo "  crontab -l"
        fi
        ;;
        
    2)
        echo ""
        echo "🧪 Test режим"
        echo "Выберите действие:"
        echo "1) Quick save"
        echo "2) Checkpoint"
        echo "3) Emergency save"
        echo "4) Cleanup"
        read -p "Выбор (1-4): " test_choice
        
        case $test_choice in
            1) node /workspace/autosave.js quick ;;
            2) node /workspace/autosave.js checkpoint ;;
            3) node /workspace/autosave.js emergency "test run" ;;
            4) node /workspace/autosave.js cleanup ;;
            *) echo "❌ Неверный выбор" ;;
        esac
        ;;
        
    3)
        echo ""
        echo "📊 Статистика Autosave:"
        node /workspace/autosave.js stats
        
        echo ""
        echo "📁 Размер .autosave:"
        du -sh /workspace/.autosave 2>/dev/null || echo "Директория не создана"
        
        echo ""
        echo "📅 История сохранений:"
        ls -la /workspace/.autosave/history/ 2>/dev/null || echo "Нет истории"
        ;;
        
    4)
        echo ""
        echo "🔄 Восстановление из autosave..."
        node /workspace/autosave.js restore
        ;;
        
    *)
        echo "❌ Неверный выбор"
        exit 1
        ;;
esac

echo ""
echo "✅ Готово!"
echo ""
echo "📝 Полезные команды:"
echo "  node autosave.js quick       - быстрое сохранение"
echo "  node autosave.js checkpoint  - контрольная точка"
echo "  node autosave.js stats       - статистика"
echo "  node autosave.js restore     - восстановление"
echo "  tail -f .autosave/cron.log  - логи cron (если используется)"
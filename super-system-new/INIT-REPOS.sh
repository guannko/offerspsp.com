#!/bin/bash

# SUPER SYSTEM - QUICK INIT SCRIPT
# Быстрая инициализация трёх новых репозиториев

echo "🚀 SUPER SYSTEM REPOSITORY INITIALIZER"
echo "======================================"
echo ""

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Проверка, что мы в правильной директории
if [ ! -d "super-system-eyes" ] || [ ! -d "super-system-left" ] || [ ! -d "super-system-right" ]; then
    echo -e "${RED}❌ Ошибка: Не найдены директории репозиториев${NC}"
    echo "Убедитесь, что вы находитесь в /workspace/super-system-new/"
    exit 1
fi

echo -e "${YELLOW}⚠️  ВАЖНО: Сначала создайте 3 репозитория на GitHub:${NC}"
echo "1. https://github.com/guannko/super-system-eyes"
echo "2. https://github.com/guannko/super-system-left"  
echo "3. https://github.com/guannko/super-system-right"
echo ""
read -p "Репозитории созданы? (y/n): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED}Отменено. Создайте репозитории и запустите скрипт снова.${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}📦 Инициализация super-system-eyes...${NC}"
echo "======================================"
cd super-system-eyes

# Инициализация git
git init
git add .
git commit -m "🚀 Initial commit: SUPER SYSTEM Eyes v1.0

- Brain Index architecture
- Health check system  
- Autosave system
- Emergency recovery protocols
- Coordination center established"

# Добавление remote и push
git branch -M main
git remote add origin https://github.com/guannko/super-system-eyes.git
git push -u origin main

echo -e "${GREEN}✅ super-system-eyes инициализирован${NC}"

echo ""
echo -e "${BLUE}🧠 Инициализация super-system-left...${NC}"
echo "======================================"
cd ../super-system-left

# Инициализация git
git init
git add .
git commit -m "🧠 Initial commit: Left Hemisphere v1.0

- AI/Creative center
- Annoris project structure
- Hemisphere status monitoring
- Sync protocols established"

# Добавление remote и push
git branch -M main
git remote add origin https://github.com/guannko/super-system-left.git
git push -u origin main

echo -e "${GREEN}✅ super-system-left инициализирован${NC}"

echo ""
echo -e "${BLUE}💼 Инициализация super-system-right...${NC}"
echo "======================================"
cd ../super-system-right

# Инициализация git
git init
git add .
git commit -m "💼 Initial commit: Right Hemisphere v1.0

- Business/Logic center
- OffersPSP project structure
- Production deployment ready
- Revenue tracking established"

# Добавление remote и push
git branch -M main
git remote add origin https://github.com/guannko/super-system-right.git
git push -u origin main

echo -e "${GREEN}✅ super-system-right инициализирован${NC}"

echo ""
echo -e "${BLUE}🔗 Настройка submodules в super-system-eyes...${NC}"
echo "================================================"
cd ../super-system-eyes

# Добавление полушарий как submodules
git submodule add https://github.com/guannko/super-system-left.git hemispheres/left
git submodule add https://github.com/guannko/super-system-right.git hemispheres/right

git add .gitmodules hemispheres/
git commit -m "🔗 Connect hemispheres via submodules

- Left hemisphere (AI/Creative) connected
- Right hemisphere (Business/Logic) connected
- Full brain architecture established"

git push

echo -e "${GREEN}✅ Submodules настроены${NC}"

echo ""
echo "======================================"
echo -e "${GREEN}🎉 SUPER SYSTEM УСПЕШНО ИНИЦИАЛИЗИРОВАН!${NC}"
echo "======================================"
echo ""
echo "📊 Статус репозиториев:"
echo "  ✅ super-system-eyes - Координационный центр"
echo "  ✅ super-system-left - AI/Creative полушарие"
echo "  ✅ super-system-right - Business/Logic полушарие"
echo ""
echo "🔧 Следующие шаги:"
echo "1. Проверьте репозитории на GitHub"
echo "2. Настройте GitHub Actions для автоматизации"
echo "3. Запустите health check:"
echo "   cd super-system-eyes && node health-check.js"
echo "4. Протестируйте autosave:"
echo "   node autosave.js quick"
echo ""
echo -e "${YELLOW}💡 Совет: Сохраните ссылки на репозитории:${NC}"
echo "  https://github.com/guannko/super-system-eyes"
echo "  https://github.com/guannko/super-system-left"
echo "  https://github.com/guannko/super-system-right"
echo ""
echo -e "${GREEN}Готово! SUPER SYSTEM v1.0 запущен! 🚀${NC}"
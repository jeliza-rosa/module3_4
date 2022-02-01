#!/usr/bin/env sh

#остановить публикацию при ошибках
set -env

#сборка приложения
npm run build

#переход в каталог сборки
cd dist

#инициализация репозитория и загрузка кода в GitHub
git init
git add -A
git commit -m 'deploy'

git push https://github.com/jeliza-rosa/vue-app.git master:gh-pages

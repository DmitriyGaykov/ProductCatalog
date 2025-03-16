# Stage 1: Build React (Vite) App
FROM node:18 AS build
WORKDIR /app

# Копируем файлы package.json и package-lock.json и устанавливаем зависимости
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Копируем весь код и собираем проект
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine AS production
WORKDIR /usr/share/nginx/html

# Очищаем стандартные файлы Nginx
RUN rm -rf ./*

# Копируем собранные файлы из предыдущего контейнера
COPY --from=build /app/dist .

# Копируем кастомный конфиг Nginx (опционально)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]

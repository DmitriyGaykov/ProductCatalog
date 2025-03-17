# ProductCatalog

Веб-приложение для управления каталогом товаров.

## Настройка и запуск

Приложение можно запустить в Docker-контейнерах или локально. База данных Microsoft SQL Server может быть запущена в контейнере либо использоваться отдельно.

### Настройка

Для конфигурации используется файл `.env`. Пример доступен в `.env.example`. Скопируйте его в `.env` и измените параметры при необходимости.

> После изменения параметров перезапустите терминал.

### Запуск в Docker-контейнерах

Убедитесь, что файл `.env` настроен.

> Для работы в контейнерах **обязательно** установите `PRODUCT_CATALOG_CONNECTION_STRING` правильно.

#### Запуск всей системы в Docker

```bash
docker compose up --build -d
```

#### Запуск только базы данных (SQL Server) в Docker

```bash
docker compose up sqlserver --build -d
```

#### Запуск только backend-сервиса в Docker

```bash
docker compose up productcatalog.service --build -d
```

#### Запуск только frontend-клиента в Docker

```bash
docker compose up productcatalog.client --build -d
```

### Локальный запуск

#### Установка зависимостей

##### Backend (ASP.NET Core 8)

1. Перейдите в каталог backend-сервиса:

```bash
cd ProductCatalog.Service
```

2. Установите зависимости:

```bash
dotnet restore
```

3. Запустите сервер:

```bash
dotnet run
```

##### Frontend (ReactJS + Vite.js)

1. Перейдите в каталог frontend-клиента:

```bash
cd ProductCatalog.Client
```

2. Установите зависимости:

```bash
npm install
```

3. Запустите сервер разработки:

```bash
npm run dev
```

### Дополнительная информация

- Backend: ASP.NET Core 8
- Frontend: ReactJS (Vite.js)
- База данных: Microsoft SQL Server
- Контейнеризация: Docker

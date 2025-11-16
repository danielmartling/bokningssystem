# Utveckling

## Mkdocs

**För att förhandsvisa docs:** Kör `mkdocs serve` i samma mapp som `mkdocs.yml` (`/src`). Öppna `http://127.0.0.1:8000/`.

**För att bygga docs:** Kör `mkdocs build` i samma mapp som `mkdocs.yml` (`/src`). Nu sparas docs-sidorna i mappen `/docs`.

[Mer info om Mkcocs.](https://www.mkdocs.org/getting-started/)

## Bulma

Bulma används för lite gott och blandat. CSS-element, färger, teman, etc.

**Ändra bulma:** Redigera filen `/src/sass/main.scss`.

**Bygg bulma:** Görs ändringar måste bulma kompileras. Kör `npm run build-bulma` i `/`. Då uppdateras `/public/css/main.css`. Kom ihåg att inkludera den i html-filer (till exempel `<link rel="stylesheet" href="css/main.css">`).

[Mer info om bulma.](https://bulma.io/documentation/customize/with-sass/)

## Dotenv (`.env`)

Hemligheter såsom användarnamn, lösenord och adresser lagras i en fil som heter `.env`. Den måste skapas separat och ska absolut inte skickas upp till github (den ligger med i `.gitignore`). Här är en mall:

```
# .env
DB_USER="username"
DB_HOST="localhost"
DB_NAME="booking_dev"
DB_PASSWORD="password"
DB_PORT="5432"
COOKIE_SECRET="password"
PORT="3000"
```

## Databas: Postgres + Sequelize

- Databastabeller ("models") definieras i `src/db/models/`.
- Controllers bestämmer hur backenden interagerar med databasobjekten (`src/db/controllers/`).
- Routes låter användaren begära tillgång till databasobjekt (`src/db/routes/`). 
- Till sist kallar användaren på databasobjekten från någon av metoderna i `public/js/api/`. 

## NPM och node.js

Filen `package.json` innehåller dependencies som installeras med `npm install`. (Kräver `sudo apt install nodejs npm`). Starta webappen med `node server.js`.

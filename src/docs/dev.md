# Utveckling

## Mkdocs

Används för att skapa dokumentationssidor (de här!).

**För att förhandsvisa docs:** Kör `mkdocs serve` i samma mapp som `mkdocs.yml` (`/src`). Öppna `http://127.0.0.1:8000/`.

**För att bygga docs:** Kör `mkdocs build` i samma mapp som `mkdocs.yml` (`/src`). Nu sparas docs-sidorna i mappen `/docs`.

[Mer info om Mkcocs.](https://www.mkdocs.org/getting-started/)

## Bulma

Bulma används för lite gott och blandat. CSS-element, egna färger, teman, etc. 

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
DB_PORT="NNNN"
COOKIE_SECRET="password"
PORT="NNNN"
WEBAPP_ADMIN="username"
WEBAPP_ADMIN_PASSWORD="password"
```

## Databas: Postgres + Sequelize

När `node server.js` körs så skapas alla databastabeller automatiskt om de inte finns. Det skapas även en administratörsanvändare vars användarnamn och lösenord definieras i `.env`.

- Databastabeller ("models") definieras i `src/db/models/`.
- Controllers definierar funktioner som kan skapa, läsa, redigera och radera databasobjekt (`src/db/controllers/`).
- Routes ger användaren tillgång till controllers (`src/db/routes/`). 
- Till sist kallar användaren på databasobjekten från någon av funktionerna i `public/js/api/`.

## NPM och node.js

Filen `package.json` innehåller dependencies som installeras med `npm install`. (Kräver `sudo apt install nodejs npm`). Starta webappen med `node server.js`.

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

## Postgres

## NPM
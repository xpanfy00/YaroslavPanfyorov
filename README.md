# Личный сайт-портфолио (HTML + SCSS + Vanilla JS)

Минималистичный одностраничный сайт с якорной навигацией, адаптивом, тёмной темой, фильтрацией карточек.

## Структура
/
├─ index.html
├─ .nojekyll
├─ assets/
│ ├─ img/ # favicon.png, og-preview.png, icons/, projects/
│ ├─ css/
│ │ └─ main.css # скомпилированный из styles/main.scss
│ └─ js/
│ └─ main.js
└─ styles/
├─ main.scss
├─ _variables.scss
├─ _mixins.scss
├─ _reset.scss
├─ _typography.scss
├─ _layout.scss
├─ _header.scss
├─ _hero.scss
├─ _skills.scss
├─ _portfolio.scss
├─ _experience.scss
└─ _footer.scss

## Как развернуть
1. Создай публичный репозиторий, скопируй файлы.
2. Добавь пустой файл `.nojekyll` в корне (уже добавлен).
3. Убедись, что все пути относительные (`./assets/...`).
4. **GitHub Pages**: перейди в `Settings → Pages → Build and deployment → Source: Deploy from a branch`.  
   Выбери ветку `main` и папку `/ (root)`. Сохрани.
5. Через 1–2 минуты сайт будет доступен по `https://<username>.github.io/<repo>/`.

## Редактирование контента
- Замени заглушки изображений в `assets/img/projects/` и иконки в `assets/img/icons/`.
- Обнови ссылки Live/GitHub в карточках.
- Обнови контакты в футере, `title`, `meta description`, Open Graph.

## SCSS
Вариант без Jekyll: SCSS компилируется локально. Пример команды (если установлен Dart Sass):
```bash
sass styles/main.scss assets/css/main.css --style=compressed --no-source-map --watch

---

# 3) Пояснение по SCSS-пути
Выбран **вариант с `.nojekyll` и ручной компиляцией SCSS**. Все стили лежат в `styles/`, итог — `assets/css/main.css`. Для GitHub Pages этого достаточно, сборщики не требуются.

---

# Пояснения по требованиям

- **HTML5 + доступность**: семантические `header/main/section/footer`, корректные `alt`, `aria`, `label` не требуются, так как форм нет; есть skip-link.
- **BEM**: классы по блокам (`header`, `skills`, `portfolio`, `experience`, `footer`), элементы `__`, модификаторы `--`.
- **Сетка/адаптив**: Grid/Flex, брейкпоинты ≈ `≥1200 / 768–1199 / ≤767` учтены.
- **Тёмная тема**: переключатель + `prefers-color-scheme` через localStorage (инициализация от системной).
- **Анимации**: hover/фокус, лёгкие подъёмы карточек.
- **JS-функционал**: бургер с закрытием по клику вне, плавный скролл, подсветка активного пункта через IntersectionObserver, фильтрация по тегам, переключатель темы, текущий год.
- **SEO/мета**: `title`, `meta description`, Open Graph, фавикон.
- **Производительность**: один CSS и один JS; картинки с `loading="lazy"`.
- **Проверка валидности**: верстка ориентирована на успешное прохождение валидаторов HTML/CSS.

Хочешь, добавлю простые заглушки изображений (svg-плашки) и базовые иконки, чтобы сразу залить и получить «зелёный» деплой?

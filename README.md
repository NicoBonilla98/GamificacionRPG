# Hero's Ledger

App móvil tipo RPG donde completas hábitos reales para desarrollar tu personaje.
Las mecánicas están definidas en [`heros_ledger_especificaciones_extraido.txt`](heros_ledger_especificaciones_extraido.txt).

## Estructura del repositorio

| Ruta | Qué es |
|------|--------|
| `index.html`, `app.js`, `styles.css` | **App funcional (motor).** Implementación en HTML/CSS/JS vanilla con la lógica real: quests, rachas, combate, expediciones, pasivas, persistencia en `localStorage`. Abre `index.html` directamente. |
| `design-system/` | **Design system + prototipo de UI** exportado desde Claude Designer. Tokens de marca, componentes y una recreación high-fidelity click-through de la app. |
| `assets/` | Sprites y marcas SVG compartidos. |

## Correr la app funcional
Abre [`index.html`](index.html) en el navegador (o sirve la carpeta con `python -m http.server 4178`).

## Ver el prototipo de diseño
Abre [`design-system/ui_kits/heros-ledger/index.html`](design-system/ui_kits/heros-ledger/index.html).
Es una recreación cosmética sobre los componentes del design system (React + Babel) —
la matemática de combate, decaimiento de racha y persistencia están simplificadas;
el contenido sale de `design-system/ui_kits/heros-ledger/data.js`.

> El prototipo usa rutas relativas a la raíz del design system (`../../styles.css`,
> `../../_ds_bundle.js`), por eso se conserva la estructura de carpetas original.

## Repo
https://github.com/NicoBonilla98/GamificacionRPG

# Valentine Site (Regency Love Letter Edition)

Cinematic, Jane-Austen-inspired static Valentine site with separate HTML/CSS/JS files and placeholder assets.

## Run

Open `/Users/idanizhaki/Numerai/kiki/valentine-site/index.html` directly in a browser, or serve the folder:

```bash
cd /Users/idanizhaki/Numerai/kiki/valentine-site
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Personalization placeholders

Replace any of the image placeholders in `/Users/idanizhaki/Numerai/kiki/valentine-site/assets/images/`:

- `rizzo-placeholder.svg`
- `kristina-photo-placeholder.svg`
- `library-nook-placeholder.svg`
- `meteor-night-placeholder.svg`
- `paper-texture.svg` (optional)

## Optional music

1. Add an MP3 at `/Users/idanizhaki/Numerai/kiki/valentine-site/assets/audio/valentine-instrumental.mp3`
2. The HTML already points to that path in the `<audio><source .../></audio>` tag.

## Interaction controls

- Click buttons to turn pages.
- Keyboard support: `Right Arrow` and `Left Arrow`.
- Click the tiny book icon for the easter egg note.

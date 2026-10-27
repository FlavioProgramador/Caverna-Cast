from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public" / "images" / "studio"
VARIANTS = {
    "mesa-estudio.webp": [480, 800],
    "hero-microfone-caverna.webp": [480, 800],
    "sala-equipamentos.webp": [480, 800, 1200],
    "microfones-mesa.webp": [480, 800, 1200],
    "camera-estudio.webp": [360, 540],
    "guitarras-estudio.webp": [640, 1200, 1800],
    "caneca-caverna.webp": [360, 640],
}

for filename, widths in VARIANTS.items():
    source = PUBLIC / filename
    with Image.open(source) as original:
        image = original.convert("RGB") if original.mode not in ("RGB", "RGBA") else original.copy()
        width, height = image.size
        for target_width in widths:
            if target_width >= width:
                continue
            target_height = round(height * target_width / width)
            resized = image.resize((target_width, target_height), Image.Resampling.LANCZOS)
            target = PUBLIC / f"{source.stem}-{target_width}.webp"
            resized.save(target, "WEBP", quality=80, method=6)
            print(f"{target.relative_to(ROOT)}: {target.stat().st_size:,} bytes")
        image.close()

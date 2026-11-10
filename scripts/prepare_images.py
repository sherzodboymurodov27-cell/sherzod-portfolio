"""Make 640px variants of every project/hero image and write data/image-sizes.json.

Run after adding or replacing images:  python3 scripts/prepare_images.py
"""
import json
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
sizes = {}
for path in sorted((PUBLIC / "images").rglob("*.webp")):
    if path.stem.endswith("-640"):
        continue
    with Image.open(path) as im:
        w, h = im.size
        sizes["/" + path.relative_to(PUBLIC).as_posix()] = [w, h]
        if w > 900:
            small = path.with_name(f"{path.stem}-640.webp")
            im.convert("RGB").resize((640, round(h * 640 / w)), Image.LANCZOS).save(small, "WEBP", quality=80, method=6)
(ROOT / "data" / "image-sizes.json").write_text(json.dumps(sizes, indent=1) + "\n")
print(f"{len(sizes)} images indexed")

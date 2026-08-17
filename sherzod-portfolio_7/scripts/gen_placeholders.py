import os
from PIL import Image, ImageDraw, ImageFont

BASE = os.path.join(os.path.dirname(__file__), "..", "public", "images", "projects")

# slug -> (category, [(filename, width, height), ...])
PROJECTS = {
    "project-01": ("Brand Identity", [("cover", 1200, 1500), ("01", 1920, 1080), ("02", 1200, 1500), ("03", 1200, 1500), ("04", 1600, 1200)]),
    "project-02": ("Art Direction", [("cover", 1200, 1500), ("01", 1920, 1080), ("02", 1600, 1200)]),
    "project-03": ("Advertising", [("cover", 1200, 1500), ("01", 1920, 1080), ("02", 1200, 1500), ("03", 1200, 1500)]),
    "project-04": ("Digital Design", [("cover", 1200, 1500), ("01", 1920, 1080), ("02", 1600, 1200)]),
    "project-05": ("Brand Identity", [("cover", 1200, 1500), ("01", 1920, 1080), ("02", 1200, 1500), ("03", 1200, 1500)]),
    "project-06": ("Art Direction", [("cover", 1200, 1500), ("01", 1920, 1080), ("02", 1600, 1200)]),
}

SURFACE = (241, 239, 233)   # #F1EFE9
INK = (22, 21, 15)          # #16150F
GRID_LINE = (222, 218, 204) # slightly stronger than the site's hairline, for visibility at small sizes


def blend(fg, bg, alpha):
    return tuple(int(bg[i] * (1 - alpha) + fg[i] * alpha) for i in range(3))


try:
    FONT_PATH = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
    ImageFont.truetype(FONT_PATH, 10)
except Exception:
    FONT_PATH = None


def get_font(size):
    if FONT_PATH:
        return ImageFont.truetype(FONT_PATH, size)
    return ImageFont.load_default()


for slug, (category, images) in PROJECTS.items():
    out_dir = os.path.join(BASE, slug)
    os.makedirs(out_dir, exist_ok=True)

    for name, w, h in images:
        img = Image.new("RGB", (w, h), SURFACE)
        draw = ImageDraw.Draw(img)

        # subtle graph-paper guide grid — evokes a working layout sheet
        # rather than a flat placeholder block
        step = min(w, h) // 8
        for x in range(step, w, step):
            draw.line([(x, 0), (x, h)], fill=GRID_LINE, width=1)
        for y in range(step, h, step):
            draw.line([(0, y), (w, y)], fill=GRID_LINE, width=1)

        # registration-mark corner ticks, matching the site's signature motif
        tick = int(min(w, h) * 0.018)
        pad = int(min(w, h) * 0.045)
        tick_color = blend(INK, SURFACE, 0.35)
        for cx, cy in [(pad, pad), (w - pad, pad), (pad, h - pad), (w - pad, h - pad)]:
            draw.line([(cx - tick, cy), (cx + tick, cy)], fill=tick_color, width=2)
            draw.line([(cx, cy - tick), (cx, cy + tick)], fill=tick_color, width=2)

        # large, quiet index number — a typographic anchor, not a label shouting "placeholder"
        index_font = get_font(int(min(w, h) * 0.34))
        index_text = slug.split("-")[-1]
        index_color = blend(INK, SURFACE, 0.09)
        tb = draw.textbbox((0, 0), index_text, font=index_font)
        tw, th = tb[2] - tb[0], tb[3] - tb[1]
        draw.text((w / 2 - tw / 2 - tb[0], h / 2 - th / 2 - tb[1]), index_text, fill=index_color, font=index_font)

        # small caption row — category (left) and file reference (right),
        # like a spec sheet annotation rather than a UI placeholder label
        cap_font = get_font(int(min(w, h) * 0.028))
        cap_y = h - pad - int(min(w, h) * 0.03)
        draw.text((pad, cap_y), category.upper(), fill=blend(INK, SURFACE, 0.55), font=cap_font)
        ref = f"{slug.upper()} / {name.upper()}"
        rw = draw.textlength(ref, font=cap_font)
        draw.text((w - pad - rw, cap_y), ref, fill=blend(INK, SURFACE, 0.4), font=cap_font)

        img.save(os.path.join(out_dir, f"{name}.webp"), "WEBP", quality=84, method=6)

print("done")

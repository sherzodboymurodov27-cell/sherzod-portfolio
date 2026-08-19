"use client";

import { useEffect, useRef } from "react";

const GRID_W = 96;
const GRID_H = 40;
const SPRING_K = 0.08;
const DAMPING = 0.9;
const DT = 0.1;
const CHROMA = 0.0035;

const VERT_SRC = `#version 300 es
in vec2 aPos;
in vec2 aUv;
in vec2 aDisp;
out vec2 vUv;
out float vMag;
void main() {
  gl_Position = vec4(aPos + aDisp, 0.0, 1.0);
  vUv = aUv;
  vMag = length(aDisp);
}`;

const FRAG_SRC = `#version 300 es
precision highp float;
in vec2 vUv;
in float vMag;
out vec4 outColor;
uniform sampler2D uTex;
uniform float uChroma;
uniform vec3 uColorA;
uniform vec3 uColorB;
void main() {
  vec4 base = texture(uTex, vUv);
  if (uChroma > 0.0) {
    float o = uChroma * ${CHROMA.toFixed(5)} * clamp(vMag * 8.0, 0.0, 1.0);
    float aOff = texture(uTex, vUv + vec2(o, 0.0)).a;
    float bOff = texture(uTex, vUv - vec2(o, 0.0)).a;
    vec3 col = base.rgb * base.a;
    col += uColorA * max(0.0, aOff - base.a);
    col += uColorB * max(0.0, bOff - base.a);
    float aMax = max(base.a, max(aOff, bOff));
    outColor = vec4(col, aMax);
  } else {
    outColor = base;
  }
}`;

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("MeshTextHover shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function linkProgram(gl: WebGL2RenderingContext, vertex: WebGLShader, fragment: WebGLShader) {
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("MeshTextHover program link error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

function renderText(
  text: string,
  color: string,
  fontFamily: string,
  fontSize: number,
  width: number,
  height: number,
) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = color;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.font = `300 ${fontSize}px ${fontFamily}, sans-serif`;

  // Keep the complete word inside the actual canvas without changing the
  // intended hero type scale unless the word genuinely exceeds the box.
  const measured = ctx.measureText(text).width;
  if (measured > width * 0.96) {
    const fittedSize = fontSize * ((width * 0.96) / measured);
    ctx.font = `300 ${fittedSize}px ${fontFamily}, sans-serif`;
  }

  ctx.fillText(text, 0, height / 2);
  return canvas;
}

export function MeshTextHover({ text }: { text: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: true,
    });
    if (!gl) return;

    const vertex = compile(gl, gl.VERTEX_SHADER, VERT_SRC);
    const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAG_SRC);
    if (!vertex || !fragment) return;

    const program = linkProgram(gl, vertex, fragment);
    if (!program) return;

    const vertCount = (GRID_W + 1) * (GRID_H + 1);
    const positions = new Float32Array(vertCount * 2);
    const uvs = new Float32Array(vertCount * 2);

    for (let y = 0; y <= GRID_H; y++) {
      for (let x = 0; x <= GRID_W; x++) {
        const i = y * (GRID_W + 1) + x;
        const u = x / GRID_W;
        const v = y / GRID_H;
        positions[i * 2] = u * 2 - 1;
        positions[i * 2 + 1] = 1 - v * 2;
        uvs[i * 2] = u;
        uvs[i * 2 + 1] = v;
      }
    }

    const indexCount = GRID_W * GRID_H * 6;
    const indices = new Uint32Array(indexCount);
    let index = 0;

    for (let y = 0; y < GRID_H; y++) {
      for (let x = 0; x < GRID_W; x++) {
        const a = y * (GRID_W + 1) + x;
        const b = a + 1;
        const c = a + GRID_W + 1;
        const d = c + 1;
        indices[index++] = a;
        indices[index++] = c;
        indices[index++] = b;
        indices[index++] = b;
        indices[index++] = c;
        indices[index++] = d;
      }
    }

    const displacement = new Float32Array(vertCount * 2);
    const velocity = new Float32Array(vertCount * 2);

    const aPos = gl.getAttribLocation(program, "aPos");
    const aUv = gl.getAttribLocation(program, "aUv");
    const aDisp = gl.getAttribLocation(program, "aDisp");
    const uTex = gl.getUniformLocation(program, "uTex");
    const uChroma = gl.getUniformLocation(program, "uChroma");
    const uColorA = gl.getUniformLocation(program, "uColorA");
    const uColorB = gl.getUniformLocation(program, "uColorB");

    const vao = gl.createVertexArray();
    const posBuf = gl.createBuffer();
    const uvBuf = gl.createBuffer();
    const dispBuf = gl.createBuffer();
    const idxBuf = gl.createBuffer();
    const tex = gl.createTexture();

    if (!vao || !posBuf || !uvBuf || !dispBuf || !idxBuf || !tex) return;

    gl.bindVertexArray(vao);

    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf);
    gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(aUv);
    gl.vertexAttribPointer(aUv, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, dispBuf);
    gl.bufferData(gl.ARRAY_BUFFER, displacement, gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(aDisp);
    gl.vertexAttribPointer(aDisp, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxBuf);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    let cancelled = false;

    const rebuildTexture = async () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = wrapper.getBoundingClientRect();
      const width = Math.max(2, Math.round(rect.width * dpr));
      const height = Math.max(2, Math.round(rect.height * dpr));

      // Preserve the original hero typography scale. The wrapper's height
      // comes from the hero's clamp() size, so this reproduces the previous
      // large display text while the canvas itself remains correctly sized.
      const fontSize = Math.max(42, Math.min(160, rect.height * 1.04 * dpr));
      const fontFamily = getComputedStyle(wrapper).fontFamily || "Manrope";

      try {
        if (document.fonts?.load) {
          await document.fonts.load(`300 ${fontSize}px ${fontFamily}`);
          await document.fonts.ready;
        }
      } catch {}

      if (cancelled) return;

      const textCanvas = renderText(
        text,
        "#F7F2FF",
        fontFamily,
        fontSize,
        width,
        height,
      );

      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        textCanvas,
      );
      gl.viewport(0, 0, width, height);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = wrapper.getBoundingClientRect();
      const width = Math.max(2, Math.round(rect.width * dpr));
      const height = Math.max(2, Math.round(rect.height * dpr));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        rebuildTexture();
      }
    };

    const observer = new ResizeObserver(resize);
    observer.observe(wrapper);
    resize();
    rebuildTexture();

    const cursor = {
      x: 99,
      y: 99,
      px: 99,
      py: 99,
      vx: 0,
      vy: 0,
      inside: false,
    };

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width;
      const ny = (event.clientY - rect.top) / rect.height;
      const x = nx * 2 - 1;
      const y = 1 - ny * 2;

      if (!cursor.inside) {
        cursor.px = x;
        cursor.py = y;
        cursor.inside = true;
      }

      cursor.x = x;
      cursor.y = y;
    };

    const onLeave = () => {
      cursor.inside = false;
      cursor.x = 99;
      cursor.y = 99;
      cursor.vx = 0;
      cursor.vy = 0;
    };

    wrapper.addEventListener("pointermove", onMove);
    wrapper.addEventListener("pointerleave", onLeave);

    let raf = 0;

    const tick = () => {
      cursor.vx = cursor.x - cursor.px;
      cursor.vy = cursor.y - cursor.py;

      if (Math.hypot(cursor.vx, cursor.vy) > 0.3) {
        cursor.vx = 0;
        cursor.vy = 0;
      }

      cursor.px = cursor.x;
      cursor.py = cursor.y;

      for (let i = 0; i < vertCount; i++) {
        const i2 = i * 2;
        const px = positions[i2];
        const py = positions[i2 + 1];
        const dx = displacement[i2];
        const dy = displacement[i2 + 1];
        const cx = cursor.x - (px + dx);
        const cy = cursor.y - (py + dy);
        const distance = Math.hypot(cx, cy);
        const proximity = Math.max(0, 1 / (1 + distance / 0.055) - 0.1);

        let vx = velocity[i2];
        let vy = velocity[i2 + 1];
        const force = 2.0;

        vx += cursor.vx * force * proximity;
        vy += cursor.vy * force * proximity;
        vx -= dx * SPRING_K;
        vy -= dy * SPRING_K;
        vx *= DAMPING;
        vy *= DAMPING;

        velocity[i2] = vx;
        velocity[i2 + 1] = vy;
        displacement[i2] = Math.max(-1, Math.min(1, dx + vx * DT));
        displacement[i2 + 1] = Math.max(-1, Math.min(1, dy + vy * DT));
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, dispBuf);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, displacement);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.uniform1i(uTex, 0);
      gl.uniform1f(uChroma, 1);
      gl.uniform3f(uColorA, 0.77, 0.60, 1.0);
      gl.uniform3f(uColorB, 0.66, 0.33, 0.97);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.bindVertexArray(vao);
      gl.drawElements(gl.TRIANGLES, indexCount, gl.UNSIGNED_INT, 0);

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      observer.disconnect();
      wrapper.removeEventListener("pointermove", onMove);
      wrapper.removeEventListener("pointerleave", onLeave);
      gl.deleteBuffer(posBuf);
      gl.deleteBuffer(uvBuf);
      gl.deleteBuffer(dispBuf);
      gl.deleteBuffer(idxBuf);
      gl.deleteTexture(tex);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, [text]);

  return (
    <div
      ref={wrapperRef}
      className="mesh-text-hover"
      aria-hidden="true"
      style={{
        position: "relative",
        display: "block",
        width: "100%",
        height: "1em",
        overflow: "visible",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          overflow: "visible",
        }}
      />
    </div>
  );
}

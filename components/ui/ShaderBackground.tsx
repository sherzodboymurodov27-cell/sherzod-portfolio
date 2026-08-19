"use client"

import * as React from "react"

const VERT = `attribute vec2 aPosition; void main(){gl_Position=vec4(aPosition,0.0,1.0);}`
const FRAG = `
precision highp float;
#define MAXTRAIL 32
uniform vec2 uResolution; uniform float uTime; uniform float uWidth; uniform float uScale; uniform float uIntensity;
uniform vec3 uTint; uniform vec2 uTrail[MAXTRAIL]; uniform float uAge[MAXTRAIL]; uniform int uTrailCount;
void main(){
 vec2 p=(gl_FragCoord.xy*2.0-uResolution)/min(uResolution.x,uResolution.y); p*=uScale;
 float glow=0.0;
 for(int i=0;i<MAXTRAIL;i++) if(i<uTrailCount){
   float age=uAge[i]; vec2 d=p-uTrail[i];
   float radius=0.035+age*0.11;
   float a=smoothstep(radius,0.0,length(d));
   a*=pow(1.0-age,2.4);
   glow+=a;
 }
 vec3 c=uTint*glow*uIntensity;
 gl_FragColor=vec4(c,clamp(glow,0.0,1.0));
}`

const MAX_DPR=2, MAXTRAIL=32, TRAIL_LIFE=0.62, SAMPLE_DISTANCE=0.045

interface ShaderBackgroundProps {
 background?:string; tint?:string; speed?:number; brightness?:number; zoom?:number;
 thickness?:number; chromatic?:number; bandGap?:number; hover?:number; style?:React.CSSProperties
}
function parseColor(input:string|undefined):[number,number,number]{
 if(!input)return[1,1,1]; const s=input.trim(); if(s[0]==="#"){const n=parseInt(s.slice(1),16);return[((n>>16)&255)/255,((n>>8)&255)/255,(n&255)/255]} return[1,1,1]
}

export function ShaderBackground({background="#020202",tint="#ffffff",speed=42,brightness=42,zoom=250,thickness,chromatic,bandGap,hover,style}:ShaderBackgroundProps){
 const canvasRef=React.useRef<HTMLCanvasElement|null>(null)
 const live=React.useRef({tint,brightness,zoom})
 live.current={tint,brightness,zoom}
 const pointer=React.useRef({x:0,y:0,active:false})
 const trail=React.useRef<Array<{x:number,y:number,age:number}>>([])

 const toUv=(e:React.PointerEvent)=>{const el=e.currentTarget as HTMLElement,w=el.clientWidth||1,h=el.clientHeight||1,m=Math.min(w,h),n=e.nativeEvent as PointerEvent;return{x:(n.offsetX*2-w)/m,y:(h-n.offsetY*2)/m}}

 React.useEffect(()=>{
  const canvas=canvasRef.current;if(!canvas)return
  const gl=canvas.getContext("webgl",{antialias:false,alpha:true,premultipliedAlpha:true});if(!gl)return
  const compile=(type:number,src:string)=>{const sh=gl.createShader(type)!;gl.shaderSource(sh,src);gl.compileShader(sh);return sh}
  const program=gl.createProgram()!;gl.attachShader(program,compile(gl.VERTEX_SHADER,VERT));gl.attachShader(program,compile(gl.FRAGMENT_SHADER,FRAG));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))return;gl.useProgram(program)
  const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW)
  const pos=gl.getAttribLocation(program,"aPosition");gl.enableVertexAttribArray(pos);gl.vertexAttribPointer(pos,2,gl.FLOAT,false,0,0)
  const u={resolution:gl.getUniformLocation(program,"uResolution"),time:gl.getUniformLocation(program,"uTime"),width:gl.getUniformLocation(program,"uWidth"),scale:gl.getUniformLocation(program,"uScale"),intensity:gl.getUniformLocation(program,"uIntensity"),tint:gl.getUniformLocation(program,"uTint"),trail:Array.from({length:MAXTRAIL},(_,i)=>gl.getUniformLocation(program,`uTrail[${i}]`)),age:Array.from({length:MAXTRAIL},(_,i)=>gl.getUniformLocation(program,`uAge[${i}]`)),count:gl.getUniformLocation(program,"uTrailCount")}
  const resize=()=>{const dpr=Math.min(window.devicePixelRatio||1,MAX_DPR),w=Math.max(1,Math.round((canvas.clientWidth||1)*dpr)),h=Math.max(1,Math.round((canvas.clientHeight||1)*dpr));canvas.width=w;canvas.height=h;gl.viewport(0,0,w,h);gl.uniform2f(u.resolution,w,h)}
  resize();const ro=new ResizeObserver(resize);ro.observe(canvas);let raf=0,last=performance.now()
  const frame=(now:number)=>{raf=requestAnimationFrame(frame);const dt=Math.min((now-last)/1000,1/15);last=now;const l=live.current,p=pointer.current,t=trail.current
   if(p.active){const lastPoint=t[0];if(!lastPoint||Math.hypot(p.x-lastPoint.x,p.y-lastPoint.y)>SAMPLE_DISTANCE){t.unshift({x:p.x,y:p.y,age:0})}}
   for(const item of t)item.age+=dt/TRAIL_LIFE
   while(t.length&&t[t.length-1].age>=1)t.pop();if(t.length>MAXTRAIL)t.length=MAXTRAIL
   gl.uniform1f(u.time,now*0.001);gl.uniform1f(u.width,1);gl.uniform1f(u.scale,l.zoom/100);gl.uniform1f(u.intensity,l.brightness/100)
   const [r,g,b]=parseColor(l.tint);gl.uniform3f(u.tint,r,g,b);gl.uniform1i(u.count,t.length)
   for(let i=0;i<MAXTRAIL;i++){const item=t[i]||{x:0,y:0,age:1};gl.uniform2f(u.trail[i],item.x,item.y);gl.uniform1f(u.age[i],item.age)}
   gl.drawArrays(gl.TRIANGLES,0,3)
  };raf=requestAnimationFrame(frame)
  return()=>{cancelAnimationFrame(raf);ro.disconnect()}
 },[])

 return <div onPointerMove={e=>{const p=pointer.current;const v=toUv(e);p.x=v.x;p.y=v.y;p.active=true}} onPointerLeave={()=>{pointer.current.active=false}} style={{width:"100%",height:"100%",minWidth:1200,minHeight:800,position:"absolute",inset:0,overflow:"hidden",background,zIndex:0,pointerEvents:"auto",...style}} aria-hidden="true"><canvas ref={canvasRef} style={{position:"absolute",inset:0,width:"100%",height:"100%",display:"block",pointerEvents:"none"}}/></div>
}
ShaderBackground.displayName="Shader Background"

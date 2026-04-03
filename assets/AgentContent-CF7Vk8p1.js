import{n as e,s as t,t as n}from"./jsx-runtime-C7M7YA1l.js";import{f as r,h as i,i as a,m as o,n as s,p as c,r as l,t as u}from"./proxy-D2-jiENk.js";import{a as d,i as f,o as p,t as m}from"./Mesh-B_2-blrE.js";var h=t(e(),1);function g(e,t){if(typeof e==`function`)return e(t);e!=null&&(e.current=t)}function _(...e){return t=>{let n=!1,r=e.map(e=>{let r=g(e,t);return!n&&typeof r==`function`&&(n=!0),r});if(n)return()=>{for(let t=0;t<r.length;t++){let n=r[t];typeof n==`function`?n():g(e[t],null)}}}}function v(...e){return h.useCallback(_(...e),e)}var y=n(),b=class extends h.Component{getSnapshotBeforeUpdate(e){let t=this.props.childRef.current;if(a(t)&&e.isPresent&&!this.props.isPresent&&this.props.pop!==!1){let e=t.offsetParent,n=a(e)&&e.offsetWidth||0,r=a(e)&&e.offsetHeight||0,i=getComputedStyle(t),o=this.props.sizeRef.current;o.height=parseFloat(i.height),o.width=parseFloat(i.width),o.top=t.offsetTop,o.left=t.offsetLeft,o.right=n-o.width-o.left,o.bottom=r-o.height-o.top}return null}componentDidUpdate(){}render(){return this.props.children}};function x({children:e,isPresent:t,anchorX:n,anchorY:r,root:i,pop:a}){let o=(0,h.useId)(),s=(0,h.useRef)(null),c=(0,h.useRef)({width:0,height:0,top:0,left:0,right:0,bottom:0}),{nonce:u}=(0,h.useContext)(l),d=v(s,e.props?.ref??e?.ref);return(0,h.useInsertionEffect)(()=>{let{width:e,height:l,top:d,left:f,right:p,bottom:m}=c.current;if(t||a===!1||!s.current||!e||!l)return;let h=n===`left`?`left: ${f}`:`right: ${p}`,g=r===`bottom`?`bottom: ${m}`:`top: ${d}`;s.current.dataset.motionPopId=o;let _=document.createElement(`style`);u&&(_.nonce=u);let v=i??document.head;return v.appendChild(_),_.sheet&&_.sheet.insertRule(`
          [data-motion-pop-id="${o}"] {
            position: absolute !important;
            width: ${e}px !important;
            height: ${l}px !important;
            ${h}px !important;
            ${g}px !important;
          }
        `),()=>{s.current?.removeAttribute(`data-motion-pop-id`),v.contains(_)&&v.removeChild(_)}},[t]),(0,y.jsx)(b,{isPresent:t,childRef:s,sizeRef:c,pop:a,children:a===!1?e:h.cloneElement(e,{ref:d})})}var S=({children:e,initial:t,isPresent:n,onExitComplete:i,custom:a,presenceAffectsLayout:s,mode:c,anchorX:l,anchorY:u,root:d})=>{let f=o(C),p=(0,h.useId)(),m=!0,g=(0,h.useMemo)(()=>(m=!1,{id:p,initial:t,isPresent:n,custom:a,onExitComplete:e=>{f.set(e,!0);for(let e of f.values())if(!e)return;i&&i()},register:e=>(f.set(e,!1),()=>f.delete(e))}),[n,f,i]);return s&&m&&(g={...g}),(0,h.useMemo)(()=>{f.forEach((e,t)=>f.set(t,!1))},[n]),h.useEffect(()=>{!n&&!f.size&&i&&i()},[n]),e=(0,y.jsx)(x,{pop:c===`popLayout`,isPresent:n,anchorX:l,anchorY:u,root:d,children:e}),(0,y.jsx)(r.Provider,{value:g,children:e})};function C(){return new Map}var w=e=>e.key||``;function T(e){let t=[];return h.Children.forEach(e,e=>{(0,h.isValidElement)(e)&&t.push(e)}),t}var E=({children:e,custom:t,initial:n=!0,onExitComplete:r,presenceAffectsLayout:a=!0,mode:l=`sync`,propagate:u=!1,anchorX:d=`left`,anchorY:f=`top`,root:p})=>{let[m,g]=s(u),_=(0,h.useMemo)(()=>T(e),[e]),v=u&&!m?[]:_.map(w),b=(0,h.useRef)(!0),x=(0,h.useRef)(_),C=o(()=>new Map),E=(0,h.useRef)(new Set),[D,O]=(0,h.useState)(_),[k,A]=(0,h.useState)(_);c(()=>{b.current=!1,x.current=_;for(let e=0;e<k.length;e++){let t=w(k[e]);v.includes(t)?(C.delete(t),E.current.delete(t)):C.get(t)!==!0&&C.set(t,!1)}},[k,v.length,v.join(`-`)]);let j=[];if(_!==D){let e=[..._];for(let t=0;t<k.length;t++){let n=k[t],r=w(n);v.includes(r)||(e.splice(t,0,n),j.push(n))}return l===`wait`&&j.length&&(e=j),A(T(e)),O(_),null}let{forceRender:M}=(0,h.useContext)(i);return(0,y.jsx)(y.Fragment,{children:k.map(e=>{let i=w(e),o=u&&!m?!1:_===k||v.includes(i);return(0,y.jsx)(S,{isPresent:o,initial:!b.current||n?void 0:!1,custom:t,presenceAffectsLayout:a,mode:l,root:p,onExitComplete:o?void 0:()=>{if(E.current.has(i))return;if(C.has(i))E.current.add(i),C.set(i,!0);else return;let e=!0;C.forEach(t=>{t||(e=!1)}),e&&(M?.(),A(x.current),u&&g?.(),r&&r())},anchorX:d,anchorY:f,children:e},i)})})},D={black:`#000000`,white:`#ffffff`,red:`#ff0000`,green:`#00ff00`,blue:`#0000ff`,fuchsia:`#ff00ff`,cyan:`#00ffff`,yellow:`#ffff00`,orange:`#ff8000`};function O(e){e.length===4&&(e=e[0]+e[1]+e[1]+e[2]+e[2]+e[3]+e[3]);let t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t||console.warn(`Unable to convert hex string ${e} to rgb values`),[parseInt(t[1],16)/255,parseInt(t[2],16)/255,parseInt(t[3],16)/255]}function k(e){return e=parseInt(e),[(e>>16&255)/255,(e>>8&255)/255,(e&255)/255]}function A(e){return e===void 0?[0,0,0]:arguments.length===3?arguments:isNaN(e)?e[0]===`#`?O(e):D[e.toLowerCase()]?O(D[e.toLowerCase()]):(console.warn(`Color format not recognised`),[0,0,0]):k(e)}var j=class extends Array{constructor(e){return super(...Array.isArray(e)?e:A(...arguments))}get r(){return this[0]}get g(){return this[1]}get b(){return this[2]}set r(e){this[0]=e}set g(e){this[1]=e}set b(e){this[2]=e}set(e){return Array.isArray(e)?this.copy(e):this.copy(A(...arguments))}copy(e){return this[0]=e[0],this[1]=e[1],this[2]=e[2],this}},M=class extends p{constructor(e,{attributes:t={}}={}){Object.assign(t,{position:{size:2,data:new Float32Array([-1,-1,3,-1,-1,3])},uv:{size:2,data:new Float32Array([0,0,2,0,0,2])}}),super(e,t)}},N=`
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`,P=`
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform vec2 uFocal;
uniform vec2 uRotation;
uniform float uStarSpeed;
uniform float uDensity;
uniform float uHueShift;
uniform float uSpeed;
uniform vec2 uMouse;
uniform float uGlowIntensity;
uniform float uSaturation;
uniform bool uMouseRepulsion;
uniform float uTwinkleIntensity;
uniform float uRotationSpeed;
uniform float uRepulsionStrength;
uniform float uMouseActiveFactor;
uniform float uAutoCenterRepulsion;
uniform bool uTransparent;

varying vec2 vUv;

#define NUM_LAYER 4.0
#define STAR_COLOR_CUTOFF 0.2
#define MAT45 mat2(0.7071, -0.7071, 0.7071, 0.7071)
#define PERIOD 3.0

float Hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float tri(float x) {
  return abs(fract(x) * 2.0 - 1.0);
}

float tris(float x) {
  float t = fract(x);
  return 1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0));
}

float trisn(float x) {
  float t = fract(x);
  return 2.0 * (1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0))) - 1.0;
}

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float Star(vec2 uv, float flare) {
  float d = length(uv);
  float m = (0.05 * uGlowIntensity) / d;
  float rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * flare * uGlowIntensity;
  uv *= MAT45;
  rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * 0.3 * flare * uGlowIntensity;
  m *= smoothstep(1.0, 0.2, d);
  return m;
}

vec3 StarLayer(vec2 uv) {
  vec3 col = vec3(0.0);

  vec2 gv = fract(uv) - 0.5; 
  vec2 id = floor(uv);

  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 offset = vec2(float(x), float(y));
      vec2 si = id + vec2(float(x), float(y));
      float seed = Hash21(si);
      float size = fract(seed * 345.32);
      float glossLocal = tri(uStarSpeed / (PERIOD * seed + 1.0));
      float flareSize = smoothstep(0.9, 1.0, size) * glossLocal;

      float red = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 1.0)) + STAR_COLOR_CUTOFF;
      float blu = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 3.0)) + STAR_COLOR_CUTOFF;
      float grn = min(red, blu) * seed;
      vec3 base = vec3(red, grn, blu);
      
      float hue = atan(base.g - base.r, base.b - base.r) / (2.0 * 3.14159) + 0.5;
      hue = fract(hue + uHueShift / 360.0);
      float sat = length(base - vec3(dot(base, vec3(0.299, 0.587, 0.114)))) * uSaturation;
      float val = max(max(base.r, base.g), base.b);
      base = hsv2rgb(vec3(hue, sat, val));

      vec2 pad = vec2(tris(seed * 34.0 + uTime * uSpeed / 10.0), tris(seed * 38.0 + uTime * uSpeed / 30.0)) - 0.5;

      float star = Star(gv - offset - pad, flareSize);
      vec3 color = base;

      float twinkle = trisn(uTime * uSpeed + seed * 6.2831) * 0.5 + 1.0;
      twinkle = mix(1.0, twinkle, uTwinkleIntensity);
      star *= twinkle;
      
      col += star * size * color;
    }
  }

  return col;
}

void main() {
  vec2 focalPx = uFocal * uResolution.xy;
  vec2 uv = (vUv * uResolution.xy - focalPx) / uResolution.y;

  vec2 mouseNorm = uMouse - vec2(0.5);
  
  if (uAutoCenterRepulsion > 0.0) {
    vec2 centerUV = vec2(0.0, 0.0);
    float centerDist = length(uv - centerUV);
    vec2 repulsion = normalize(uv - centerUV) * (uAutoCenterRepulsion / (centerDist + 0.1));
    uv += repulsion * 0.05;
  } else if (uMouseRepulsion) {
    vec2 mousePosUV = (uMouse * uResolution.xy - focalPx) / uResolution.y;
    float mouseDist = length(uv - mousePosUV);
    vec2 repulsion = normalize(uv - mousePosUV) * (uRepulsionStrength / (mouseDist + 0.1));
    uv += repulsion * 0.05 * uMouseActiveFactor;
  } else {
    vec2 mouseOffset = mouseNorm * 0.1 * uMouseActiveFactor;
    uv += mouseOffset;
  }

  float autoRotAngle = uTime * uRotationSpeed;
  mat2 autoRot = mat2(cos(autoRotAngle), -sin(autoRotAngle), sin(autoRotAngle), cos(autoRotAngle));
  uv = autoRot * uv;

  uv = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * uv;

  vec3 col = vec3(0.0);

  for (float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYER) {
    float depth = fract(i + uStarSpeed * uSpeed);
    float scale = mix(20.0 * uDensity, 0.5 * uDensity, depth);
    float fade = depth * smoothstep(1.0, 0.9, depth);
    col += StarLayer(uv * scale + i * 453.32) * fade;
  }

  if (uTransparent) {
    float alpha = length(col);
    alpha = smoothstep(0.0, 0.3, alpha);
    alpha = min(alpha, 1.0);
    gl_FragColor = vec4(col, alpha);
  } else {
    gl_FragColor = vec4(col, 1.0);
  }
}
`;function F({focal:e=[.5,.5],rotation:t=[1,0],starSpeed:n=.5,density:r=1,hueShift:i=140,disableAnimation:a=!1,speed:o=1,mouseInteraction:s=!0,glowIntensity:c=.3,saturation:l=0,mouseRepulsion:u=!0,repulsionStrength:p=2,twinkleIntensity:g=.3,rotationSpeed:_=.1,autoCenterRepulsion:v=0,transparent:b=!0,...x}){let S=(0,h.useRef)(null),C=(0,h.useRef)({x:.5,y:.5}),w=(0,h.useRef)({x:.5,y:.5}),T=(0,h.useRef)(0),E=(0,h.useRef)(0);return(0,h.useEffect)(()=>{if(!S.current)return;let h=S.current,y=new f({alpha:b,premultipliedAlpha:!1}),x=y.gl;b?(x.enable(x.BLEND),x.blendFunc(x.SRC_ALPHA,x.ONE_MINUS_SRC_ALPHA),x.clearColor(0,0,0,0)):x.clearColor(0,0,0,1);let D;function O(){y.setSize(h.offsetWidth*1,h.offsetHeight*1),D&&(D.uniforms.uResolution.value=new j(x.canvas.width,x.canvas.height,x.canvas.width/x.canvas.height))}window.addEventListener(`resize`,O,!1),O();let k=new M(x);D=new d(x,{vertex:N,fragment:P,uniforms:{uTime:{value:0},uResolution:{value:new j(x.canvas.width,x.canvas.height,x.canvas.width/x.canvas.height)},uFocal:{value:new Float32Array(e)},uRotation:{value:new Float32Array(t)},uStarSpeed:{value:n},uDensity:{value:r},uHueShift:{value:i},uSpeed:{value:o},uMouse:{value:new Float32Array([w.current.x,w.current.y])},uGlowIntensity:{value:c},uSaturation:{value:l},uMouseRepulsion:{value:u},uTwinkleIntensity:{value:g},uRotationSpeed:{value:_},uRepulsionStrength:{value:p},uMouseActiveFactor:{value:0},uAutoCenterRepulsion:{value:v},uTransparent:{value:b}}});let A=new m(x,{geometry:k,program:D}),F;function I(e){F=requestAnimationFrame(I),a||(D.uniforms.uTime.value=e*.001,D.uniforms.uStarSpeed.value=e*.001*n/10);let t=.05;w.current.x+=(C.current.x-w.current.x)*t,w.current.y+=(C.current.y-w.current.y)*t,E.current+=(T.current-E.current)*t,D.uniforms.uMouse.value[0]=w.current.x,D.uniforms.uMouse.value[1]=w.current.y,D.uniforms.uMouseActiveFactor.value=E.current,y.render({scene:A})}F=requestAnimationFrame(I),h.appendChild(x.canvas);function L(e){let t=h.getBoundingClientRect();C.current={x:(e.clientX-t.left)/t.width,y:1-(e.clientY-t.top)/t.height},T.current=1}function R(){T.current=0}return s&&(h.addEventListener(`mousemove`,L),h.addEventListener(`mouseleave`,R)),()=>{cancelAnimationFrame(F),window.removeEventListener(`resize`,O),s&&(h.removeEventListener(`mousemove`,L),h.removeEventListener(`mouseleave`,R)),h.removeChild(x.canvas),x.getExtension(`WEBGL_lose_context`)?.loseContext()}},[e,t,n,r,i,a,o,s,c,l,u,g,_,p,v,b]),(0,y.jsx)(`div`,{ref:S,className:`galaxy-container`,...x})}function I({size:e=28}){return(0,y.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 32 32`,fill:`none`,"aria-hidden":!0,children:[(0,y.jsx)(`rect`,{x:`7`,y:`10`,width:`18`,height:`14`,rx:`4`,fill:`currentColor`,opacity:`0.95`}),(0,y.jsx)(`rect`,{x:`11`,y:`14`,width:`3`,height:`3`,rx:`1.5`,fill:`#0ea5e9`}),(0,y.jsx)(`rect`,{x:`18`,y:`14`,width:`3`,height:`3`,rx:`1.5`,fill:`#0ea5e9`}),(0,y.jsx)(`rect`,{x:`13`,y:`19`,width:`6`,height:`1.5`,rx:`0.75`,fill:`white`,opacity:`0.5`}),(0,y.jsx)(`rect`,{x:`14`,y:`5`,width:`4`,height:`5`,rx:`2`,fill:`currentColor`,opacity:`0.95`}),(0,y.jsx)(`rect`,{x:`15.5`,y:`3`,width:`1`,height:`3`,rx:`0.5`,fill:`currentColor`}),(0,y.jsx)(`rect`,{x:`3`,y:`13`,width:`4`,height:`6`,rx:`2`,fill:`currentColor`,opacity:`0.7`}),(0,y.jsx)(`rect`,{x:`25`,y:`13`,width:`4`,height:`6`,rx:`2`,fill:`currentColor`,opacity:`0.7`})]})}function L({active:e,size:t=26}){return(0,y.jsxs)(`svg`,{width:t,height:t,viewBox:`0 0 24 24`,fill:`none`,"aria-hidden":!0,children:[(0,y.jsx)(`rect`,{x:`9`,y:`2`,width:`6`,height:`11`,rx:`3`,fill:e?`#fff`:`currentColor`}),(0,y.jsx)(`path`,{d:`M5 10a7 7 0 0 0 14 0`,stroke:e?`#fff`:`currentColor`,strokeWidth:`1.8`,strokeLinecap:`round`}),(0,y.jsx)(`line`,{x1:`12`,y1:`17`,x2:`12`,y2:`21`,stroke:e?`#fff`:`currentColor`,strokeWidth:`1.8`,strokeLinecap:`round`}),(0,y.jsx)(`line`,{x1:`9`,y1:`21`,x2:`15`,y2:`21`,stroke:e?`#fff`:`currentColor`,strokeWidth:`1.8`,strokeLinecap:`round`})]})}var R=[{id:`one-time`,label:`One Time`,sub:`Question`,emoji:`⚡`},{id:`auto`,label:`Auto`,sub:`Mode`,emoji:`🔄`},{id:`test`,label:`Test`,sub:`Voice`,emoji:`🎙️`},{id:`flat`,label:`Flat`,sub:`Mode`,emoji:`▤`}];function z(){let[e,t]=(0,h.useState)(!1),[n,r]=(0,h.useState)(!1),[i,a]=(0,h.useState)(null),[o,s]=(0,h.useState)(!1),[c,l]=(0,h.useState)(!1),[d,f]=(0,h.useState)(!0),p=(0,h.useRef)(null);(0,h.useEffect)(()=>{let e=()=>l(window.innerWidth<640);return e(),window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]),(0,h.useEffect)(()=>{if(!e)return;let n=e=>{p.current&&!p.current.contains(e.target)&&(t(!1),r(!1))};return document.addEventListener(`mousedown`,n),document.addEventListener(`touchstart`,n),()=>{document.removeEventListener(`mousedown`,n),document.removeEventListener(`touchstart`,n)}},[e]),(0,h.useEffect)(()=>{let e=e=>{e.key===`Escape`&&(t(!1),r(!1))};return document.addEventListener(`keydown`,e),()=>document.removeEventListener(`keydown`,e)},[]),(0,h.useEffect)(()=>(c&&e?document.body.style.overflow=`hidden`:document.body.style.overflow=``,()=>{document.body.style.overflow=``}),[c,e]);let m=()=>r(e=>!e),g=e=>a(t=>t===e?null:e);return(0,y.jsxs)(`div`,{className:`min-h-screen bg-[#faf9f6] dark:bg-neutral-950 text-[#1a1a1a] dark:text-white relative`,children:[d&&(0,y.jsx)(`div`,{className:`fixed inset-0 z-0`,children:(0,y.jsx)(F,{mouseRepulsion:!0,mouseInteraction:!0,density:.8,glowIntensity:.15,saturation:.2,hueShift:280,twinkleIntensity:.2,rotationSpeed:.05,repulsionStrength:1.5,autoCenterRepulsion:0,starSpeed:.3,speed:.8})}),(0,y.jsx)(E,{children:e&&c&&(0,y.jsx)(u.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},className:`fixed inset-0 z-[98] bg-black/40 backdrop-blur-sm`,onTouchStart:()=>{t(!1),r(!1)}})}),(0,y.jsxs)(`div`,{className:`fixed bottom-6 left-4 sm:left-6 z-[100] flex flex-col items-start gap-2`,children:[(0,y.jsx)(E,{children:o&&!e&&!c&&(0,y.jsx)(u.div,{initial:{opacity:0,y:4,scale:.92},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:4,scale:.92},transition:{duration:.15},className:`mb-1 px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide
                bg-white/80 dark:bg-neutral-800/80 backdrop-blur-xl
                border border-white/40 dark:border-white/10
                shadow-lg text-[#1a1a1a] dark:text-white
                pointer-events-none select-none`,children:`Chitti`})}),(0,y.jsxs)(u.button,{whileHover:{scale:1.08},whileTap:{scale:.93},onClick:()=>{t(e=>!e),s(!1)},onMouseEnter:()=>s(!0),onMouseLeave:()=>s(!1),"aria-label":`Open Chitti`,className:`relative flex items-center justify-center
            w-12 h-12 sm:w-14 sm:h-14
            rounded-2xl
            bg-gradient-to-br from-[#A366FF] to-[#7c3aed]
            shadow-[0_4px_24px_rgba(163,102,255,0.55)]
            text-white border border-white/20
            transition-shadow hover:shadow-[0_4px_32px_rgba(163,102,255,0.75)]
            touch-manipulation`,children:[(0,y.jsx)(I,{size:c?26:30}),n&&(0,y.jsx)(`span`,{className:`absolute inset-0 rounded-2xl animate-ping
              bg-[#A366FF]/40 pointer-events-none`})]})]}),(0,y.jsx)(E,{children:e&&(0,y.jsxs)(u.div,{ref:p,initial:{opacity:0,y:20,scale:.94},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:16,scale:.94},transition:{type:`spring`,stiffness:380,damping:30},className:`
              fixed z-[99]
              rounded-3xl overflow-hidden
              bg-white/30 dark:bg-neutral-900/50
              backdrop-blur-2xl
              border border-white/50 dark:border-white/10
              shadow-[0_8px_48px_rgba(0,0,0,0.22),0_1.5px_0_rgba(255,255,255,0.25)_inset]
              ${c?`bottom-[4.5rem] left-3 right-3 w-auto`:`bottom-24 left-6 w-[17rem]`}
            `,children:[(0,y.jsx)(`div`,{className:`h-1 w-full bg-gradient-to-r from-[#A366FF] via-[#7c3aed] to-[#0ea5e9]`}),(0,y.jsxs)(`div`,{className:`px-4 sm:px-5 pt-4 sm:pt-5 pb-5 sm:pb-6 space-y-4 sm:space-y-5`,children:[(0,y.jsxs)(`div`,{className:`flex items-center justify-between`,children:[(0,y.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,y.jsx)(`span`,{className:`text-[#A366FF]`,children:(0,y.jsx)(I,{size:18})}),(0,y.jsx)(`span`,{className:`text-sm font-bold tracking-wide text-[#1a1a1a] dark:text-white`,children:`Chitti`})]}),(0,y.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,y.jsx)(`span`,{className:`text-[10px] font-semibold px-2 py-0.5 rounded-full
                    ${n?`bg-red-500/15 text-red-500 border border-red-400/30`:`bg-emerald-500/15 text-emerald-500 border border-emerald-400/30`}`,children:n?`● Listening`:`○ Ready`}),c&&(0,y.jsx)(`button`,{onClick:()=>{t(!1),r(!1)},className:`flex items-center justify-center w-6 h-6 rounded-full
                        bg-white/20 dark:bg-white/10 text-[#555] dark:text-white/60
                        hover:bg-white/40 transition-colors touch-manipulation`,"aria-label":`Close`,children:(0,y.jsx)(`svg`,{width:`12`,height:`12`,viewBox:`0 0 12 12`,fill:`none`,children:(0,y.jsx)(`path`,{d:`M2 2l8 8M10 2l-8 8`,stroke:`currentColor`,strokeWidth:`1.8`,strokeLinecap:`round`})})})]})]}),(0,y.jsxs)(`div`,{className:`flex flex-col items-center gap-2`,children:[(0,y.jsxs)(u.button,{whileHover:{scale:1.06},whileTap:{scale:.93},onClick:m,className:`relative flex items-center justify-center
                    w-16 h-16 sm:w-20 sm:h-20
                    rounded-full transition-all duration-300
                    ${n?`bg-gradient-to-br from-red-500 to-rose-600 shadow-[0_0_32px_rgba(239,68,68,0.6)]`:`bg-gradient-to-br from-[#A366FF] to-[#7c3aed] shadow-[0_0_24px_rgba(163,102,255,0.45)]`}
                    border border-white/25 text-white touch-manipulation`,"aria-label":n?`Stop listening`:`Start listening`,children:[(0,y.jsx)(L,{active:n,size:c?24:28}),n&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(u.span,{animate:{scale:[1,1.35,1],opacity:[.5,0,.5]},transition:{duration:1.6,repeat:1/0},className:`absolute inset-0 rounded-full bg-red-400/40 pointer-events-none`}),(0,y.jsx)(u.span,{animate:{scale:[1,1.6,1],opacity:[.3,0,.3]},transition:{duration:1.6,repeat:1/0,delay:.3},className:`absolute inset-0 rounded-full bg-red-400/20 pointer-events-none`})]})]}),(0,y.jsx)(`p`,{className:`text-[11px] text-[#555] dark:text-white/50 font-medium`,children:n?`Tap to stop`:`Tap to speak`})]}),(0,y.jsx)(`div`,{className:`grid grid-cols-2 gap-2`,children:R.map((e,t)=>(0,y.jsxs)(u.button,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{delay:.06*t,duration:.22},whileHover:{scale:1.04},whileTap:{scale:.95},onClick:()=>g(e.id),className:`flex flex-col items-center justify-center gap-0.5
                      px-2 py-3 sm:py-3 rounded-2xl text-center
                      border transition-all duration-200 touch-manipulation
                      ${i===e.id?`bg-[#A366FF]/20 border-[#A366FF]/50 shadow-[0_0_12px_rgba(163,102,255,0.25)]`:`bg-white/20 dark:bg-white/5 border-white/30 dark:border-white/10 hover:bg-white/35 dark:hover:bg-white/10 active:bg-white/40`}`,children:[(0,y.jsx)(`span`,{className:`text-base leading-none`,children:e.emoji}),(0,y.jsx)(`span`,{className:`text-[11px] sm:text-[11px] font-semibold text-[#1a1a1a] dark:text-white leading-tight`,children:e.label}),(0,y.jsx)(`span`,{className:`text-[9px] text-[#777] dark:text-white/40 leading-tight`,children:e.sub})]},e.id))})]})]})}),(0,y.jsx)(u.button,{whileHover:{scale:1.08},whileTap:{scale:.93},onClick:()=>f(!d),className:`fixed bottom-6 right-4 sm:right-6 z-[100] flex items-center gap-2 px-3 py-2 rounded-full
          backdrop-blur-xl border transition-all duration-200 touch-manipulation
          ${d?`bg-white/80 dark:bg-neutral-800/80 border-[#A366FF]/50 shadow-[0_0_20px_rgba(163,102,255,0.4),0_0_40px_rgba(163,102,255,0.2)] hover:shadow-[0_0_25px_rgba(163,102,255,0.6),0_0_50px_rgba(163,102,255,0.3)]`:`bg-white/80 dark:bg-neutral-800/80 border-white/40 dark:border-white/10 shadow-lg hover:shadow-xl`}
          text-[#1a1a1a] dark:text-white`,"aria-label":d?`Disable galaxy`:`Enable galaxy`,children:d?(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(`svg`,{width:`16`,height:`16`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,children:(0,y.jsx)(`path`,{d:`M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07`})}),(0,y.jsx)(`span`,{className:`text-xs font-medium hidden sm:inline`,children:`Hide Galaxy`})]}):(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(`svg`,{width:`16`,height:`16`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,children:[(0,y.jsx)(`circle`,{cx:`12`,cy:`12`,r:`5`}),(0,y.jsx)(`line`,{x1:`12`,y1:`1`,x2:`12`,y2:`3`}),(0,y.jsx)(`line`,{x1:`12`,y1:`21`,x2:`12`,y2:`23`}),(0,y.jsx)(`line`,{x1:`4.22`,y1:`4.22`,x2:`5.64`,y2:`5.64`}),(0,y.jsx)(`line`,{x1:`18.36`,y1:`18.36`,x2:`19.78`,y2:`19.78`}),(0,y.jsx)(`line`,{x1:`1`,y1:`12`,x2:`3`,y2:`12`}),(0,y.jsx)(`line`,{x1:`21`,y1:`12`,x2:`23`,y2:`12`}),(0,y.jsx)(`line`,{x1:`4.22`,y1:`19.78`,x2:`5.64`,y2:`18.36`}),(0,y.jsx)(`line`,{x1:`18.36`,y1:`5.64`,x2:`19.78`,y2:`4.22`})]}),(0,y.jsx)(`span`,{className:`text-xs font-medium hidden sm:inline`,children:`Show Galaxy`})]})})]})}export{z as default};
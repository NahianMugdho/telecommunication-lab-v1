/* ===== Shared script: language toggle, Q&A renderer, animation, calculators ===== */
// --- Language toggle (bn -> en -> both), remembered across pages.
function setLang(l){document.body.dataset.lang=l;try{localStorage.lang=l}catch(e){}}
function cycleLang(){const o=['bn','en','both'];setLang(o[(o.indexOf(document.body.dataset.lang)+1)%3])}
setLang((function(){try{return localStorage.lang}catch(e){}})()||'both');

// --- Q&A renderer: reads data/questions.js (window.QDATA[chapterId]).
// A page with <div id="qa" data-ch="ch1"></div> gets its questions drawn automatically.
function renderQA(){
  const box=document.getElementById('qa'); if(!box||!window.QDATA)return;
  (QDATA[box.dataset.ch]||[]).forEach(q=>{
    const d=document.createElement('div'); d.className='card';
    d.innerHTML=`<div class="src">${q.n} • ${q.src}</div>
      <p><span class="bn">${q.bn}</span><span class="en">${q.en}</span></p>${q.img||''}
      <button>উত্তর দেখো / Show answer</button>
      <div class="ans"><span class="bn">${q.abn}</span><span class="en">${q.aen}</span></div>`;
    d.querySelector('button').onclick=()=>d.querySelector('.ans').classList.toggle('open');
    box.appendChild(d);
  });
}

// --- Animation: moving sine wave, sample dots (orange) and quantized levels. Sliders: f, fs, n.
function samplingDemo(id){
  const c=document.getElementById(id); if(!c)return; const g=c.getContext('2d');
  const $=k=>+document.getElementById(k).value; let t=0;
  (function draw(){
    const f=$('f'),fs=$('fs'),n=$('n'),L=2**n,W=c.width,H=c.height; g.clearRect(0,0,W,H);
    const sig=x=>Math.sin(2*Math.PI*4*x/W+t);            // 4 cycles across the canvas
    const Y=v=>H/2-v*(H/2-24); g.strokeStyle='#0b7285';g.lineWidth=2;g.beginPath();
    for(let x=0;x<W;x++){g[x?'lineTo':'moveTo'](x,Y(sig(x)))}g.stroke();
    const ns=Math.max(2,Math.round(4*fs/f)); g.fillStyle=g.strokeStyle='#e8590c';g.lineWidth=1;
    for(let i=0;i<ns;i++){const x=i*W/ns,v=sig(x),q=Math.round((v+1)/2*(L-1))/(L-1)*2-1; // quantized level
      g.beginPath();g.arc(x,Y(q),4,0,7);g.fill();g.beginPath();g.moveTo(x,Y(v));g.lineTo(x,Y(q));g.stroke();}
    g.fillStyle='#10243b';g.font='14px sans-serif';
    g.fillText(`f=${f}  fs=${fs}  L=${L} (n=${n} bit)  ⇒ bit rate = fs·n = ${fs*n}`,8,16);
    g.fillText(fs>=2*f?'Nyquist OK ✔':'Aliasing ✘ (fs < 2f)',8,H-8);
    t+=0.03; requestAnimationFrame(draw);})();
}

// --- Calculators (inputs found by id; result written to <b id="out">)
function calcPCM(){const f=+fmax.value,p=+pct.value,n=+bits.value,ch=+chn.value;
  const fs=2*f*(1+p/100);out.textContent=`fs=${fs} Hz → bit rate = ${(fs*n*ch/1000).toFixed(3)} kbps, min BW (NRZ) = ${(fs*n*ch/2000).toFixed(3)} kHz`}
function calcShannon(){const B=+bw.value,s=10**(+snr.value/10);
  out.textContent=`SNR=${s.toFixed(1)} (linear) → C = B·log2(1+SNR) = ${(B*Math.log2(1+s)/1000).toFixed(2)} kbps`}
function calcFiber(){const km=+len.value,a=+att.value,gap=+gapkm.value,sp=+spl.value,rx=+prx.value;
  const loss=km*a+(Math.ceil(km/gap)-1)*sp;out.textContent=`Total loss = ${loss.toFixed(1)} dB → launch power = ${(rx*10**(loss/10)/1000).toFixed(3)} mW`}

// --- Dark / light mode: first visit follows the phone/PC setting; the button saves your choice.
function setTheme(t){document.body.dataset.theme=t;try{localStorage.theme=t}catch(e){}
  const b=document.getElementById('themeBtn');if(b)b.textContent=t==='dark'?'☀️ Light':'🌙 Dark'}
function initTheme(){const h=document.querySelector('header');const b=document.createElement('button');b.id='themeBtn';
  b.onclick=()=>setTheme(document.body.dataset.theme==='dark'?'light':'dark');h.appendChild(b);
  let t;try{t=localStorage.theme}catch(e){}
  setTheme(t||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'))}

// --- Animation 2: Delta modulation. Staircase (orange) chases the sine (blue) by +/- step each tick.
// Small step => 'slope overload' (staircase lags). Slider id: dstep, tick-rate slider id: dfs.
function deltaDemo(id){
  const c=document.getElementById(id); if(!c)return; const g=c.getContext('2d'); let t=0;
  (function draw(){
    const D=+document.getElementById('dstep').value/100,N=+document.getElementById('dfs').value,W=c.width,H=c.height;
    g.clearRect(0,0,W,H);const Y=v=>H/2-v*(H/2-24),sig=x=>Math.sin(2*Math.PI*2*x/W+t);
    g.strokeStyle='#0b7285';g.lineWidth=2;g.beginPath();for(let x=0;x<W;x++){g[x?'lineTo':'moveTo'](x,Y(sig(x)))}g.stroke();
    g.strokeStyle='#e8590c';g.beginPath();let r=0,bits='';
    for(let i=0;i<=N;i++){const x=i*W/N,up=sig(x)>r;r+=up?D:-D;if(i<40)bits+=up?'1':'0';g.lineTo(x,Y(r));g.lineTo((i+1)*W/N,Y(r));}
    g.stroke();g.fillStyle='#10243b';g.font='14px sans-serif';g.fillText('bits: '+bits.slice(0,36)+'  (1 bit per sample)',8,16);
    t+=0.025;requestAnimationFrame(draw);})();
}
function calcErlang(){const c=+calls.value,m=+mins.value,h=+hrs.value;
  const e=c*m/(h*60);out.textContent=`Offered load = ${c}×${m} ÷ ${h*60} min = ${e.toFixed(2)} Erlang`}

// --- Animation 3: AM wave. Slider id 'ami' = modulation index m (x100). m>1 => over-modulation warning.
function amDemo(id){
  const c=document.getElementById(id); if(!c)return; const g=c.getContext('2d'); let t=0;
  (function draw(){
    const m=+document.getElementById('ami').value/100,W=c.width,H=c.height;g.clearRect(0,0,W,H);
    const env=x=>1+m*Math.sin(2*Math.PI*2*x/W-t);               // envelope  A(1 + m·cos wm t)
    g.strokeStyle='#0b7285';g.lineWidth=1;g.beginPath();
    for(let x=0;x<W;x++){g[x?'lineTo':'moveTo'](x,H/2-env(x)*Math.sin(x*0.6)*(H/2-30)/2.2)}g.stroke();
    g.strokeStyle='#e8590c';g.lineWidth=2;g.beginPath();                // envelope (message shape)
    for(let x=0;x<W;x++){g[x?'lineTo':'moveTo'](x,H/2-env(x)*(H/2-30)/2.2)}g.stroke();
    g.fillStyle='#10243b';g.font='14px sans-serif';
    g.fillText('m = '+m.toFixed(2)+(m>1?'  ⚠ over-modulation (distortion!)':m==1?'  (100% modulation)':''),8,16);
    t+=0.04;requestAnimationFrame(draw);})();
}
// --- Animation 4: FM wave. Slider id 'fmb' = beta. Higher beta => carrier frequency swings more.
function fmDemo(id){
  const c=document.getElementById(id); if(!c)return; const g=c.getContext('2d'); let t=0;
  (function draw(){
    const b=+document.getElementById('fmb').value/10,W=c.width,H=c.height;g.clearRect(0,0,W,H);
    g.strokeStyle='#0b7285';g.lineWidth=1.5;g.beginPath();
    for(let x=0;x<W;x++){const ph=0.5*x+b*Math.sin(2*Math.PI*2*x/W-t);g[x?'lineTo':'moveTo'](x,H/2-Math.sin(ph)*(H/2-30))}g.stroke();
    g.fillStyle='#10243b';g.font='14px sans-serif';g.fillText('β = '+b.toFixed(1)+'  → Carson BW = 2(Δf+fm) = 2fm(β+1)',8,16);
    t+=0.04;requestAnimationFrame(draw);})();
}
function calcAM(){const Pc=+pc.value,m=+mi.value,Pt=Pc*(1+m*m/2);
  out.textContent=`Pt = ${Pt.toFixed(1)} W, sideband power = ${(Pt-Pc).toFixed(1)} W, efficiency = ${((Pt-Pc)/Pt*100).toFixed(1)} %`}
function calcFM(){const d=+df.value,f=+fm.value;out2.textContent=`β = ${(d/f).toFixed(2)}, Carson BW = ${2*(d+f)} (same unit)`}

// --- MCQ quiz renderer: reads data/mcq.js (window.MCQ). Needs <div id="mcq"></div> on the page.
function renderMCQ(){
  const box=document.getElementById('mcq'); const data=box&&window[box.dataset.src||'MCQ']; if(!box||!data)return; let ok=0,done=0,lastG='';
  const sc=document.createElement('div');sc.className='score';box.before(sc);
  const upd=()=>sc.textContent=`Score: ${ok} / ${done}  (মোট ${data.length}টি প্রশ্ন)`;upd();
  data.forEach(q=>{
    if(q.src&&box.dataset.src&&q.src!==lastG){lastG=q.src;const h=document.createElement('h2');h.textContent=q.src;box.appendChild(h)}   // group headings (cellular quiz)
    const d=document.createElement('div');d.className='card';
    const qt=q.mix!==undefined?q.mix:`<span class="bn">${q.bn}</span><span class="en">${q.en}</span>`,et=q.emix!==undefined?q.emix:`<span class="bn">${q.ebn}</span><span class="en">${q.een}</span>`;
    d.innerHTML=`<div class="src">${q.n} • ${q.src}</div><p>${qt}</p>
      <div class="opts">${q.opts.map((o,i)=>`<button class="opt" data-i="${i}">(${'abcd'[i]}) ${o}</button>`).join('')}</div>
      <div class="ans">${et}</div>`;
    d.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{
      if(d.dataset.done)return;d.dataset.done=1;done++;
      const i=+b.dataset.i;if(i===q.ans)ok++;else b.classList.add('bad');
      d.querySelectorAll('.opt')[q.ans].classList.add('good');d.querySelector('.ans').classList.add('open');upd();});
    box.appendChild(d);});
}
// --- Cellular Q&A renderer: reads data/cell_qa.js (window.CELLQA). Mixed Bangla/English, so no language toggle needed.
function renderCellQA(){
  const box=document.getElementById('cellqa'); if(!box||!window.CELLQA)return; let g='';
  CELLQA.forEach(q=>{ if(q.g!==g){g=q.g;const h=document.createElement('h2');h.textContent=g;box.appendChild(h)}
    const d=document.createElement('div');d.className='card';
    d.innerHTML=`<div class="src">${q.n==='V'?'ভাইভা':'Q'+q.n}</div><p><b>${q.q}</b></p><button>উত্তর দেখো</button><div class="ans">${q.a}</div>`;
    d.querySelector('button').onclick=()=>d.querySelector('.ans').classList.toggle('open');box.appendChild(d)});
}
// --- Cellular calculators
function calcErlangB(){const E=+eE.value,G=+eG.value/100;let B=1,m=0;while(m<500){m++;B=E*B/(m+E*B);if(B<=G)break}
  out.textContent=`Traffic ${E} Erlang, blocking ≤ ${(G*100)}% ⇒ লাগবে ${m}টি channel (Erlang-B = ${B.toFixed(4)})`}
function calcFSPL(){const d=+fd.value,f=+ff.value;out.textContent=`FSPL = 32.44 + 20log(${d}) + 20log(${f}) = ${(32.44+20*Math.log10(d)+20*Math.log10(f)).toFixed(2)} dB`}
function calcBattery(){const A=+bAh.value,D=+bD.value/100,I=+bI.value;out.textContent=`Backup = (${A} × ${D}) ÷ ${I} = ${(A*D/I).toFixed(2)} ঘণ্টা`}
// --- Animation 11: frequency reuse. Colour of cell (q,r) = (a*q + b*r) mod N for each valid cluster size N.
// Cells with the same colour as the centre cell are co-channel cells. D/R = sqrt(3N); SIR = (D/R)^4 / 6.
function hexDemo(id){
  const c=document.getElementById(id); if(!c)return; const g=c.getContext('2d'); let t=0;
  const AB={1:[0,0],3:[1,2],4:[1,2],7:[1,5],9:[1,3],13:[1,10]};          // coset formulas; N=4 and 9 handled separately below
  const col=(q,r,N)=>N==1?0:N==4?((q%2+2)%2)+2*((r%2+2)%2):N==9?((q%3+3)%3)+3*((r%3+3)%3):(((AB[N][0]*q+AB[N][1]*r)%N)+N)%N;
  (function draw(){
    const N=+document.getElementById('hxN').value,W=c.width,H=c.height,s=26;g.clearRect(0,0,W,H);
    const cx=W/2,cy=H/2,c0=col(0,0,N);
    for(let r=-6;r<=6;r++)for(let q=-12;q<=12;q++){const x=cx+s*Math.sqrt(3)*(q+r/2),y=cy+s*1.5*r;if(x<-s||x>W+s||y<-s||y>H+s)continue;
      const k=col(q,r,N),same=k===c0;g.beginPath();for(let i=0;i<6;i++){const a=Math.PI/6+i*Math.PI/3;g.lineTo(x+s*Math.cos(a)*0.95,y+s*Math.sin(a)*0.95)}g.closePath();
      g.fillStyle=`hsl(${k*360/N},65%,${same?60+8*Math.sin(t):72}%)`;g.fill();g.lineWidth=same?3:1;g.strokeStyle=same?'#10243b':'#fff';g.stroke()}
    const dr=Math.sqrt(3*N),sir=10*Math.log10(dr**4/6);
    document.getElementById('hxinfo').textContent=`N=${N}  ⇒  D/R = √(3N) = ${dr.toFixed(2)},  SIR ≈ ${sir.toFixed(2)} dB (6 interferer, γ=4)`;
    t+=0.08;requestAnimationFrame(draw);})();
}

// ============================================================================
// Chapters 9-13 demos & calculators (restored / added). Each demo draws on a <canvas id=...> and reads slider ids.
// ============================================================================
const _$=k=>document.getElementById(k), _gcd=(a,b)=>b?_gcd(b,a%b):Math.abs(a), _lcm=(a,b)=>a/_gcd(a,b)*b;
const _txt=(g,s,x,y,col,font)=>{g.fillStyle=col||'#10243b';g.font=font||'14px sans-serif';g.fillText(s,x,y)};

// --- Ch9 FIBER: restored from the previous version (light ray in a fiber core; slider 'fang')
// --- Animation 5: light ray inside a fiber core. Slider 'fang' = ray angle from the fiber axis (deg).
// Wall hit angle = 90 - axis angle. Total internal reflection (green) only if that angle >= critical angle (asin(n2/n1)).
function fiberDemo(id){
  const c=document.getElementById(id); if(!c)return; const g=c.getContext('2d'); let off=0;
  (function draw(){
    const a=+document.getElementById('fang').value*Math.PI/180,W=c.width,H=c.height,h=45,cy=H/2;
    const n1=1.48,n2=1.46,crit=Math.asin(n2/n1),tir=(Math.PI/2-a)>=crit;g.clearRect(0,0,W,H);
    g.fillStyle='#cfe3e6';g.fillRect(0,cy-h-30,W,30);g.fillRect(0,cy+h,W,30);          // cladding
    g.fillStyle='#ffe8cc';g.fillRect(0,cy-h,W,2*h);                                      // core
    g.fillStyle='#10243b';g.font='13px sans-serif';g.fillText('cladding n2='+n2,8,cy-h-10);g.fillText('core n1='+n1,8,cy-h+16);
    let x=0,y=cy,dir=-1;g.strokeStyle=tir?'#2f9e44':'#e03131';g.lineWidth=3;g.setLineDash([10,6]);g.lineDashOffset=-off;
    g.beginPath();g.moveTo(x,y);const dx=Math.tan(Math.PI/2-a)*0+1/Math.max(Math.tan(a),0.02);
    while(x<W){const run=(dir<0?(y-(cy-h)):((cy+h)-y))*dx;if(x+run>W){g.lineTo(W,y+dir*(W-x)/dx);break}
      x+=run;y=dir<0?cy-h:cy+h;g.lineTo(x,y);if(!tir){g.lineTo(x+40,y+dir*40);break}dir=-dir}
    g.stroke();g.setLineDash([]);g.fillStyle=tir?'#2f9e44':'#e03131';g.font='15px sans-serif';
    g.fillText(tir?'Total Internal Reflection ✔ (light stays in core)':'Light leaks into cladding ✘ (angle too steep)',8,H-8);
    off+=2;requestAnimationFrame(draw);})();
}

// --- Ch13 Animation: discrete-time cosine x[n]=cos(2π(f/fs)n). Sliders: df (f), dfs (fs). A cursor walks over the samples.
function discreteDemo(id){
  const c=_$(id); if(!c)return; const g=c.getContext('2d'); let t=0;
  (function draw(){
    const f=+_$('df').value,fs=+_$('dfs').value,W=c.width,H=c.height,mid=H/2+8,A=H/2-48,X=s=>10+s*(W-20);
    g.clearRect(0,0,W,H);
    const d=_gcd(f,fs),p=f/d,q=fs/d,ns=fs;                         // 1 second window => fs samples
    g.strokeStyle='#c9d8d6';g.lineWidth=1;g.beginPath();g.moveTo(10,mid);g.lineTo(W-10,mid);g.stroke();
    if(q<=ns){g.fillStyle='rgba(11,114,133,.12)';g.fillRect(X(0),mid-A-6,X(q/fs)-X(0),2*A+12)}    // first period (N samples) shaded
    g.strokeStyle='#0b7285';g.lineWidth=1.5;g.beginPath();
    for(let x=0;x<=W-20;x++){const s=x/(W-20),y=mid-Math.cos(2*Math.PI*f*s)*A;g[x?'lineTo':'moveTo'](10+x,y)}g.stroke();
    const cur=Math.floor(t)%ns;
    for(let n=0;n<ns;n++){const x=X(n/fs),y=mid-Math.cos(2*Math.PI*f*n/fs)*A,on=n===cur;
      g.strokeStyle=g.fillStyle=on?'#e03131':'#e8590c';g.lineWidth=on?3:1.5;g.beginPath();g.moveTo(x,mid);g.lineTo(x,y);g.stroke();
      g.beginPath();g.arc(x,y,on?6:3.5,0,7);g.fill();}
    _txt(g,`f/fs = ${f}/${fs} = ${p}/${q}  ⇒  periodic, N = ${q} sample${fs<2*f?'   |   fs < 2f ⇒ aliasing ✘':'   |   Nyquist OK ✔'}`,10,18);
    _txt(g,`ω₀ = 2πf/fs = ${(2*Math.PI*f/fs).toFixed(3)} rad/sample   (n = ${cur}, x[n] = ${Math.cos(2*Math.PI*f*cur/fs).toFixed(3)})`,10,H-8);
    t+=0.12;requestAnimationFrame(draw);})();
}

// --- Ch12 Animation: signal transformation y(t)=A·x(a·t+b). Sliders tA, ta, tb (each ×10). Dot walks along y(t).
function transformDemo(id){
  const c=_$(id); if(!c)return; const g=c.getContext('2d'); let t=0;
  const x0=u=>u>=-1&&u<0?u+1:u>=0&&u<=2?1-u/2:0;                   // asymmetric base signal so mirroring is visible
  (function draw(){
    const A=+_$('tA').value/10,a=+_$('ta').value/10,b=+_$('tb').value/10,W=c.width,H=c.height,mid=H/2+10,S=H/2-58;
    const X=u=>W/2+u*(W/2-30)/5,Y=v=>mid-v*S/1.5,y0=u=>A*x0(a*u+b);
    g.clearRect(0,0,W,H);
    g.strokeStyle='#c9d8d6';g.lineWidth=1;g.beginPath();g.moveTo(10,mid);g.lineTo(W-10,mid);g.moveTo(X(0),24);g.lineTo(X(0),H-8);g.stroke();
    g.fillStyle='#2b4a63';g.font='12px sans-serif';for(let k=-5;k<=5;k++){if(k)g.fillText(k,X(k)-3,mid+14)}
    const line=(fn,col,w,dash)=>{g.strokeStyle=col;g.lineWidth=w;g.setLineDash(dash||[]);g.beginPath();
      for(let px=10;px<=W-10;px++){const u=(px-W/2)*5/(W/2-30);g[px>10?'lineTo':'moveTo'](px,Y(fn(u)))}g.stroke();g.setLineDash([])};
    line(x0,'#0b7285',2,[6,5]);                                    // original x(t)
    line(y0,'#e8590c',3);                                          // transformed y(t)
    const u=-5+(t%1)*10;g.fillStyle='#e03131';g.beginPath();g.arc(X(u),Y(y0(u)),6,0,7);g.fill();
    _txt(g,`y(t) = ${A}·x(${a}·t ${b<0?'−':'+'} ${Math.abs(b)})`,10,18,'#e8590c');_txt(g,'x(t) (dashed)',W-110,18,'#0b7285');
    _txt(g,(a<0?'Mirror ✔ (a<0)  ':'')+(Math.abs(a)>1?'Compressed  ':Math.abs(a)<1&&a!==0?'Stretched  ':'')+(b?`Shift: t₀ = ${(-b/(a||1)).toFixed(2)}  `:'')+(A<0?'Flipped (A<0)':''),10,H-6);
    t+=0.004;requestAnimationFrame(draw);})();
}

// --- Ch11 Animation: AM spectrum (carrier fc = 50 kHz). Sliders sfm (message kHz), sm (m ×100). Lines pulse gently.
function spectrumDemo(id){
  const c=_$(id); if(!c)return; const g=c.getContext('2d'); let t=0;
  (function draw(){
    const fm=+_$('sfm').value,m=+_$('sm').value/100,fc=50,W=c.width,H=c.height,base=H-40,Hh=H-90,X=f=>W/2+f*(W/2-30)/100;
    g.clearRect(0,0,W,H);g.strokeStyle='#10243b';g.lineWidth=2;g.beginPath();g.moveTo(10,base);g.lineTo(W-10,base);g.stroke();
    g.fillStyle='#2b4a63';g.font='12px sans-serif';for(let f=-100;f<=100;f+=25)g.fillText(f,X(f)-8,base+16);g.fillText('kHz',W-34,base+16);
    const k=0.92+0.08*Math.sin(t),stem=(f,h,col)=>{g.strokeStyle=col;g.lineWidth=5;g.beginPath();g.moveTo(X(f),base);g.lineTo(X(f),base-h*Hh*k);g.stroke()};
    [-1,1].forEach(s=>{stem(s*fc,1,'#0b7285');stem(s*(fc-fm),m/2,'#e8590c');stem(s*(fc+fm),m/2,'#e8590c')});
    _txt(g,'carrier',X(fc)-22,base-Hh-6,'#0b7285','12px sans-serif');_txt(g,'LSB',X(fc-fm)-12,base-m/2*Hh-8,'#e8590c','12px sans-serif');_txt(g,'USB',X(fc+fm)-12,base-m/2*Hh-8,'#e8590c','12px sans-serif');
    _txt(g,`fc = ${fc} kHz,  fm = ${fm} kHz,  m = ${m.toFixed(2)}  ⇒  BW = 2fm = ${2*fm} kHz,  sideband height = m/2 of carrier`,10,18);
    t+=0.08;requestAnimationFrame(draw);})();
}

// --- Ch11 Animation: sampling = spectrum copies at k·fs. Sliders rfm, rfs. Copies overlap (red) when fs < 2fm => aliasing.
function replicaDemo(id){
  const c=_$(id); if(!c)return; const g=c.getContext('2d'); let t=0;
  (function draw(){
    const fm=+_$('rfm').value,fs=+_$('rfs').value,W=c.width,H=c.height,base=H-40,Hh=H-95,X=f=>W/2+f*(W/2-30)/60,alias=fs<2*fm;
    g.clearRect(0,0,W,H);g.strokeStyle='#10243b';g.lineWidth=2;g.beginPath();g.moveTo(10,base);g.lineTo(W-10,base);g.stroke();
    g.fillStyle='#2b4a63';g.font='12px sans-serif';for(let f=-60;f<=60;f+=20)g.fillText(f,X(f)-8,base+16);g.fillText('kHz',W-34,base+16);
    for(let k=-4;k<=4;k++){const cx=k*fs;g.fillStyle=k===0?'rgba(11,114,133,.55)':alias?'rgba(224,49,49,.35)':'rgba(232,89,12,.35)';
      g.strokeStyle=k===0?'#0b7285':alias?'#e03131':'#e8590c';g.lineWidth=2;g.beginPath();g.moveTo(X(cx-fm),base);g.lineTo(X(cx),base-Hh);g.lineTo(X(cx+fm),base);g.closePath();g.fill();g.stroke()}
    g.strokeStyle='#2f9e44';g.lineWidth=2;g.setLineDash([8,5]);g.lineDashOffset=-t*10;g.strokeRect(X(-fs/2),base-Hh-12,X(fs/2)-X(-fs/2),Hh+12);g.setLineDash([]);   // ideal LPF
    _txt(g,`fm = ${fm} kHz,  fs = ${fs} kHz  (copies at k·fs)   `+(alias?'Aliasing ✘  (fs < 2fm = '+2*fm+')':'No aliasing ✔  (fs ≥ 2fm)'),10,18,alias?'#e03131':'#10243b');
    _txt(g,'green box = low-pass filter (−fs/2 … +fs/2)',10,H-6,'#2f9e44','12px sans-serif');
    t+=0.1;requestAnimationFrame(draw);})();
}

// --- Ch10 Animation: line coding. Input id 'bitsIn' (0/1 string, max 16). A cursor sweeps and draws each waveform.
function codingDemo(id){
  const c=_$(id); if(!c)return; const g=c.getContext('2d'); let t=0;
  const SCH=[['Unipolar NRZ',(b)=>[[0,1,b]]],['Polar NRZ-L',(b)=>[[0,1,b?1:-1]]],['Unipolar RZ',(b)=>[[0,.5,b],[.5,1,0]]],
    ['Manchester',(b)=>b?[[0,.5,-1],[.5,1,1]]:[[0,.5,1],[.5,1,-1]]],null];   // 5th (AMI) needs state, built below
  (function draw(){
    let bits=(_$('bitsIn').value||'').replace(/[^01]/g,'').slice(0,16);if(!bits)bits='0';
    const n=bits.length,W=c.width,H=c.height,L=130,cw=(W-L-10)/n,rh=(H-34)/5,prog=(t%(n+3));
    g.clearRect(0,0,W,H);
    g.strokeStyle='#c9d8d6';g.lineWidth=1;g.setLineDash([3,4]);for(let i=0;i<=n;i++){g.beginPath();g.moveTo(L+i*cw,28);g.lineTo(L+i*cw,H);g.stroke()}g.setLineDash([]);
    g.textAlign='center';for(let i=0;i<n;i++)_txt(g,bits[i],L+(i+.5)*cw,20,'#e8590c','bold 16px sans-serif');g.textAlign='left';
    let last=-1;const ami=[...bits].map(b=>b==='1'?(last=-last,last):0);       // AMI: 1 alternates +/−, 0 = zero
    const rows=SCH.map((s,i)=>i<4?[s[0],[...bits].flatMap((b,k)=>s[1](+b).map(([a,z,l])=>[k+a,k+z,l]))]:['AMI (bipolar)',ami.map((l,k)=>[k,k+1,l])]);
    g.save();g.beginPath();g.rect(L-2,24,Math.min(prog,n)*cw+2,H);g.clip();
    rows.forEach(([name,seg],r)=>{const mid=28+r*rh+rh/2+6,A=rh*0.3;g.strokeStyle='#0b7285';g.lineWidth=2.5;g.beginPath();
      seg.forEach(([a,z,l],i)=>{const y=mid-l*A;if(!i)g.moveTo(L+a*cw,y);else g.lineTo(L+a*cw,y);g.lineTo(L+z*cw,y)});g.stroke()});
    g.restore();
    rows.forEach(([name],r)=>{const mid=28+r*rh+rh/2+6;_txt(g,name,8,mid+4,'#10243b','13px sans-serif');
      g.strokeStyle='rgba(120,140,150,.35)';g.lineWidth=1;g.beginPath();g.moveTo(L,mid);g.lineTo(W-10,mid);g.stroke()});
    if(prog<=n){g.strokeStyle='#e03131';g.lineWidth=2;g.beginPath();g.moveTo(L+prog*cw,24);g.lineTo(L+prog*cw,H);g.stroke()}
    t+=0.04;requestAnimationFrame(draw);})();
}

// --- Ch13 Subnet calculator: IP + prefix => mask, network, broadcast, hosts; bits are drawn with a pop-in animation.
function subnetCalc(){
  const box=_$('subout'); if(!box)return;
  const parts=_$('ipin').value.trim().split('.').map(s=>s===''?NaN:+s),p=+_$('pfx').value;
  if(parts.length!==4||parts.some(v=>!Number.isInteger(v)||v<0||v>255)||!Number.isInteger(p)||p<0||p>32){
    box.innerHTML='<b style="color:#e03131">⚠ IP (যেমন 192.168.10.0) আর prefix (0–32) ঠিকভাবে দাও।</b>';return}
  const ip=((parts[0]<<24)|(parts[1]<<16)|(parts[2]<<8)|parts[3])>>>0,mask=p===0?0:(0xFFFFFFFF<<(32-p))>>>0;
  const net=(ip&mask)>>>0,bc=(net|(~mask>>>0))>>>0,dot=v=>[v>>>24,(v>>>16)&255,(v>>>8)&255,v&255].join('.');
  const hosts=p>=31?(p===31?2:1):2**(32-p)-2,first=p>=31?net:net+1,last=p>=31?bc:bc-1;
  const bin=v=>v.toString(2).padStart(32,'0'),row=(label,v)=>`<div class="bitrow"><span class="bl">${label}</span>`+
    [...bin(v)].map((b,i)=>`<span class="bit ${i<p?'net':'host'}" style="animation-delay:${i*25}ms">${b}</span>${i%8===7&&i<31?'<span class="dotsep">.</span>':''}`).join('')+`</div>`;
  box.innerHTML=`<table><tr><th>Item</th><th>Value</th></tr>
    <tr><td>Subnet mask</td><td>${dot(mask)} (/${p})</td></tr><tr><td>Network address</td><td>${dot(net)}</td></tr>
    <tr><td>Broadcast address</td><td>${dot(bc)}</td></tr><tr><td>First / Last host</td><td>${dot(first)} — ${dot(last)}</td></tr>
    <tr><td>Valid hosts</td><td>2<sup>${32-p}</sup> − 2 = <b>${hosts}</b></td></tr></table>
    <div class="bits">${row('IP',ip)}${row('Mask',mask)}${row('Network',net)}</div>
    <p class="en" style="display:block"><span style="color:var(--acc)">■</span> network bits &nbsp; <span style="color:var(--hot)">■</span> host bits</p>`;
}

// --- Ch13 / Ch11 / Ch10 calculators
function calcPeriod(){const f1=+p1.value,f2=+p2.value,fs=+pfs.value;
  if(!(f1>0&&f2>0&&fs>0)){out.textContent='f1, f2, fs — সব ধনাত্মক সংখ্যা দাও';return}
  const N=(f)=>fs/_gcd(Math.round(f),Math.round(fs)),n1=N(f1),n2=N(f2);
  out.textContent=`f1/fs = ${f1}/${fs} ⇒ N1 = ${n1}   |   f2/fs = ${f2}/${fs} ⇒ N2 = ${n2}   ⇒   Period = LCM(${n1}, ${n2}) = ${_lcm(n1,n2)} samples`}
function calcAlias(){const f=+af.value,fs=+afs.value,lp=+alp.value;
  if(!(fs>0)){out.textContent='fs ধনাত্মক হতে হবে';return}
  const comp=[...new Set([-3,-2,-1,0,1,2,3].map(k=>Math.abs(f-k*fs)))].sort((a,b)=>a-b),pass=comp.filter(x=>x<=lp);
  out.textContent=`Sampled spectrum-এ frequency: ${comp.map(x=>+x.toFixed(2)).join(', ')} Hz   ⇒   LPF (${lp} Hz) পার হয়: ${pass.length?pass.map(x=>+x.toFixed(2)).join(', ')+' Hz':'কিছু না'}`+(fs<2*f?'   (⚠ fs < 2f ⇒ aliasing)':'')}
function calcAtt(){const P1=+pin.value,r=+dbkm.value,km_=+km.value,dB=r*km_;
  out.textContent=`Total = ${dB.toFixed(2)} dB ⇒ P2 = P1·10^(dB/10) = ${(P1*10**(dB/10)).toPrecision(4)}  (P1-এর একক-এ)`}
function calcAnt(){const f=+mhz.value,lam=300/f;
  out2.textContent=`λ = 300/${f} = ${lam.toFixed(3)} m  ⇒  antenna length L = λ/4 = ${(lam/4).toFixed(3)} m`}
function calcOptic(){const a=+n1.value,b=+n2.value,na=Math.sqrt(a*a-b*b);
  out.textContent=`Critical angle = ${(Math.asin(b/a)*180/Math.PI).toFixed(2)}°, NA = ${na.toFixed(3)}, acceptance angle = ${(Math.asin(Math.min(na,1))*180/Math.PI).toFixed(2)}°`}

// Run every initialiser separately: if one fails, the rest (theme, Q&A, MCQ, other animations) still work.
window.addEventListener('DOMContentLoaded',()=>{
  [()=>initTheme(),()=>renderCellQA(),()=>renderMCQ(),()=>renderQA(),
   ()=>hexDemo('hx'),()=>samplingDemo('cv'),()=>deltaDemo('dm'),()=>amDemo('amc'),()=>fmDemo('fmc'),()=>fiberDemo('fo'),
   ()=>codingDemo('lc'),()=>spectrumDemo('sp'),()=>replicaDemo('rp'),()=>transformDemo('tr'),()=>discreteDemo('dc'),
   ()=>{if(_$('ipin'))subnetCalc()}
  ].forEach(fn=>{try{fn()}catch(e){console.error('init failed:',e)}});
});

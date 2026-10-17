/* ===== learn.js — study helpers for the cellular topic pages =====
   1) Toggle bar: switch the short note (সংক্ষেপ) and the detailed note (বিস্তারিত) on/off; fold all sections.
   2) Animated figures: <div class="fig" data-fig="ID"></div> is drawn from window.FIGS[ID] (data/cell_figs.js).
      Types: flow (nodes + moving packets), seq (message ladder), handoff (moving phone between two towers). */
(function(){
const store=(k,v)=>{try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}};
const T=(bn,en)=>`<span class="bn">${bn}</span><span class="en">${en}</span>`;
const NS='http://www.w3.org/2000/svg';
const el=(n,a,p)=>{const e=document.createElementNS(NS,n);for(const k in (a||{}))e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e};

/* ---------- 1) toggle bar ---------- */
function initBar(){
  const main=document.querySelector('main'),doc=main&&main.querySelector('.doc');
  if(!doc||document.querySelector('.learnbar'))return;
  let sum=doc.querySelector('#sumBox'),det=doc.querySelector('#detBox');
  if(!sum||!det){                       // older pages: split the page at the "বিস্তারিত নোট" heading
    const hd=[...doc.children].find(h=>/^H[23]$/.test(h.tagName)&&h.textContent.trim().startsWith('বিস্তারিত নোট'));
    if(!hd)return;
    const kids=[...doc.childNodes],i=kids.indexOf(hd);
    sum=document.createElement('div');sum.id='sumBox';det=document.createElement('div');det.id='detBox';
    kids.slice(0,i).forEach(n=>sum.appendChild(n));kids.slice(i).forEach(n=>det.appendChild(n));
    doc.append(sum,det);
  }
  const bar=document.createElement('div');bar.className='learnbar';
  const btn=(k,ic,bn,en)=>`<button type="button" data-k="${k}" aria-pressed="true">${ic} ${T(bn,en)} <i class="sw"></i></button>`;
  bar.innerHTML=btn('sum','🧠','সংক্ষেপ নোট','Short note')+btn('det','📖','বিস্তারিত নোট','Detailed note')+
    `<button type="button" data-k="fold" class="plain">↕ ${T('সেকশন ভাঁজ/খোলো','Fold / unfold')}</button>`+
    `<a class="btn plain" href="cell-glossary.html">🔤 ${T('শর্টফর্ম','Full forms')}</a><a class="btn plain" href="cell-formulas.html">📐 ${T('সূত্র','Formulas')}</a>`;
  const src=main.querySelector('p.src');(src?src.after.bind(src):main.prepend.bind(main))(bar);
  const hint=document.createElement('p');hint.className='learnhint';hint.hidden=true;
  hint.innerHTML=T('দুটো নোটই বন্ধ আছে। ওপরের সুইচ চালু করো।','Both notes are off. Turn a switch on above.');bar.after(hint);
  const st={sum:store('learn.sum')!=='0',det:store('learn.det')!=='0'};
  const apply=()=>{sum.hidden=!st.sum;det.hidden=!st.det;hint.hidden=st.sum||st.det;
    ['sum','det'].forEach(k=>bar.querySelector(`[data-k=${k}]`).setAttribute('aria-pressed',st[k]))};
  let folded=false;
  bar.onclick=e=>{const b=e.target.closest('button');if(!b)return;const k=b.dataset.k;
    if(k==='fold'){folded=!folded;doc.querySelectorAll('details.sec').forEach(d=>d.open=!folded);return}
    st[k]=!st[k];store('learn.'+k,st[k]?'1':'0');apply()};
  apply();
}

/* ---------- 2) figures ---------- */
const COL={b:'#2563eb',g:'#16a34a',o:'#ea580c',r:'#dc2626',p:'#7c3aed'};
function shell(c,spec){
  c.classList.add('figbox');
  c.innerHTML=`<div class="figtitle">🎬 ${T(spec.title[0],spec.title[1])}</div><div class="figscroll"></div>
  <div class="figcap"></div><div class="figctl"><button type="button" class="fp" title="prev">⏮</button><button type="button" class="fy" title="play/pause">⏸</button><button type="button" class="fn" title="next">⏭</button><span class="fs"></span></div>`;
  return {scroll:c.querySelector('.figscroll'),cap:c.querySelector('.figcap'),prev:c.querySelector('.fp'),play:c.querySelector('.fy'),next:c.querySelector('.fn'),cnt:c.querySelector('.fs')};
}
/* generic step player: spec.steps[i] = {path|paths|hl|msg, t:[bn,en], c, d}; hooks.show(i,s) draws a step, hooks.tick(i,s,u) animates u=0..1 */
function runner(c,ui,steps,hooks){
  let i=0,playing=!matchMedia('(prefers-reduced-motion:reduce)').matches,t0=performance.now(),visible=true,done=false;
  const dur=s=>s.d||(s.path||s.paths||s.msg?1500:1800),hold=1100;
  function go(n){i=(n+steps.length)%steps.length;done=false;t0=performance.now();const s=steps[i];hooks.show(i,s);
    ui.cap.innerHTML=T(s.t[0],s.t[1]);ui.cnt.textContent=`${i+1} / ${steps.length}`;hooks.tick(i,s,0)}
  ui.prev.onclick=()=>go(i-1);ui.next.onclick=()=>go(i+1);
  ui.play.onclick=()=>{playing=!playing;ui.play.textContent=playing?'⏸':'▶';if(playing&&done)go(i+1)};
  ui.play.textContent=playing?'⏸':'▶';
  function frame(now){
    if(visible){const s=steps[i],D=dur(s),el_=now-t0,u=Math.min(1,el_/D);hooks.tick(i,s,u);
      if(u>=1)done=true;if(playing&&el_>D+hold)go(i+1)}
    requestAnimationFrame(frame)}
  if('IntersectionObserver' in window)new IntersectionObserver(es=>{visible=es[0].isIntersecting}).observe(c);
  go(0);requestAnimationFrame(frame);
}
function pointAt(pts,u){ // position along a polyline at fraction u
  let L=0;const seg=[];for(let k=1;k<pts.length;k++){const d=Math.hypot(pts[k][0]-pts[k-1][0],pts[k][1]-pts[k-1][1]);seg.push(d);L+=d}
  let r=u*L;for(let k=0;k<seg.length;k++){if(r<=seg[k]||k===seg.length-1){const f=seg[k]?Math.min(1,r/seg[k]):1;return [pts[k][0]+(pts[k+1][0]-pts[k][0])*f,pts[k][1]+(pts[k+1][1]-pts[k][1])*f]}r-=seg[k]}
  return pts[pts.length-1];
}
function flowFig(c,spec){
  const ui=shell(c,spec),W=spec.w||720,H=spec.h||260,svg=el('svg',{viewBox:`0 0 ${W} ${H}`,role:'img'});ui.scroll.appendChild(svg);
  const N={};spec.nodes.forEach(n=>N[n.id]=n);
  (spec.zones||[]).forEach(z=>{el('rect',{x:z.x,y:z.y,width:z.w,height:z.h,rx:10,class:'zone'},svg);const t=el('text',{x:z.x+z.w/2,y:z.y+z.h-6,class:'zt'},svg);t.textContent=z.t});
  (spec.links||[]).forEach(([a,b])=>el('line',{x1:N[a].x,y1:N[a].y,x2:N[b].x,y2:N[b].y,class:'ln'},svg));
  const G={};
  spec.nodes.forEach(n=>{const g=el('g',{class:'nd'},svg),w=n.w||76,h=n.h||(String(n.t).includes('\n')?44:34);
    if(n.s==='ell')el('ellipse',{cx:n.x,cy:n.y,rx:w/2,ry:h/2},g);else el('rect',{x:n.x-w/2,y:n.y-h/2,width:w,height:h,rx:8},g);
    const L=String(n.t).split('\n'),t=el('text',{x:n.x,y:n.y-(L.length-1)*7+4.5},g);
    L.forEach((s,k)=>{const sp=el('tspan',{x:n.x,dy:k?14:0},t);sp.textContent=s});G[n.id]=g});
  const dots=[];
  runner(c,ui,spec.steps,{
    show(i,s){Object.values(G).forEach(g=>g.classList.remove('on'));
      [...(s.hl||[]),...(s.paths||(s.path?[s.path]:[])).flat()].forEach(id=>G[id]&&G[id].classList.add('on'));
      dots.splice(0).forEach(d=>d.remove());
      (s.paths||(s.path?[s.path]:[])).forEach((p,k)=>dots.push(el('circle',{r:7,class:'dot',fill:COL[(s.cs&&s.cs[k])||s.c||'b']},svg)))},
    tick(i,s,u){(s.paths||(s.path?[s.path]:[])).forEach((p,k)=>{const q=pointAt(p.map(id=>[N[id].x,N[id].y]),u);dots[k].setAttribute('cx',q[0]);dots[k].setAttribute('cy',q[1])})}});
}
function seqFig(c,spec){
  const ui=shell(c,spec),A=spec.actors,n=spec.msgs.length,W=spec.w||720,S=spec.gap||36,H=86+n*S,svg=el('svg',{viewBox:`0 0 ${W} ${H}`,role:'img'});ui.scroll.appendChild(svg);
  const X={};A.forEach((a,k)=>X[a.id]=A.length>1?56+k*(W-112)/(A.length-1):W/2);
  A.forEach(a=>{el('line',{x1:X[a.id],y1:44,x2:X[a.id],y2:H-8,class:'life'},svg);const g=el('g',{class:'nd act'},svg),w=Math.max(60,a.t.length*8+18);
    el('rect',{x:X[a.id]-w/2,y:10,width:w,height:30,rx:7},g);const t=el('text',{x:X[a.id],y:30},g);t.textContent=a.t});
  const M=spec.msgs.map((m,k)=>{const y=70+k*S,g=el('g',{class:'msg'},svg);let pts;
    if(m.f===m.t){pts=[[X[m.f],y-8],[X[m.f]+34,y-8],[X[m.f]+34,y+8],[X[m.f]+2,y+8]];el('path',{d:`M${pts[0]}L${pts[1]}L${pts[2]}L${pts[3]}`,class:'ar'+(m.d?' dash':'')},g);el('polygon',{points:`${pts[3][0]},${pts[3][1]} ${pts[3][0]+10},${pts[3][1]-5} ${pts[3][0]+10},${pts[3][1]+5}`},g)}
    else{pts=[[X[m.f],y],[X[m.t],y]];const dir=X[m.t]>X[m.f]?1:-1;el('line',{x1:pts[0][0],y1:y,x2:pts[1][0]-dir*8,y2:y,class:'ar'+(m.d?' dash':'')},g);el('polygon',{points:`${pts[1][0]},${y} ${pts[1][0]-dir*10},${y-5} ${pts[1][0]-dir*10},${y+5}`},g)}
    const tx=m.f===m.t?X[m.f]+40:(X[m.f]+X[m.t])/2,tt=el('text',{x:tx,y:y-7,class:'ml','text-anchor':m.f===m.t?'start':'middle'},g);tt.textContent=m.l;return {g,pts,m}});
  let dot=null;
  runner(c,ui,spec.msgs.map((m,k)=>({msg:k,t:m.t_||m.n,c:m.c||'b',d:1200})),{
    show(i){M.forEach((o,k)=>{o.g.classList.toggle('shown',k<=i);o.g.classList.toggle('cur',k===i);o.g.style.color=COL[o.m.c||'b']});
      if(dot)dot.remove();dot=el('circle',{r:6,class:'dot',fill:COL[spec.msgs[i].c||'b']},svg)},
    tick(i,s,u){const q=pointAt(M[i].pts,u);dot.setAttribute('cx',q[0]);dot.setAttribute('cy',q[1])}});
}
function handoffFig(c,spec){
  const ui=shell(c,spec),W=720,H=250,svg=el('svg',{viewBox:`0 0 ${W} ${H}`,role:'img'});ui.scroll.appendChild(svg);
  const xa=110,xb=610,y0=70,hyst=12;
  [[xa,'A'],[xb,'B']].forEach(([x,l])=>{el('path',{d:`M${x-16} ${y0+34}L${x} ${y0-26}L${x+16} ${y0+34}Z`,class:'tw'},svg);const t=el('text',{x,y:y0+56,class:'tl'},svg);t.textContent='Tower '+l});
  const bars={};[['A',xa],['B',xb]].forEach(([k,x])=>{el('rect',{x:x-45,y:140,width:90,height:12,rx:5,class:'barbg'},svg);bars[k]=el('rect',{x:x-45,y:140,width:0,height:12,rx:5,class:'bar'},svg)});
  const ph=el('text',{y:y0+56,class:'ph','text-anchor':'middle'},svg);ph.textContent='📱';
  const lk=el('line',{class:'lnk'},svg);
  const info=el('text',{x:W/2,y:190,class:'inf','text-anchor':'middle'},svg),thr=el('text',{x:W/2,y:218,class:'inf2','text-anchor':'middle'},svg);
  thr.textContent=`Handoff margin (hysteresis) = ${hyst} dB`;
  let conn='A',T0=performance.now(),flash=0;ui.cnt.textContent='';ui.prev.hidden=ui.next.hidden=true;
  let playing=true;ui.play.onclick=()=>{playing=!playing;ui.play.textContent=playing?'⏸':'▶'};
  const cap=(k)=>{ui.cap.innerHTML=k};
  function frame(now){
    if(playing){const u=((now-T0)/9000)%2,f=u<1?u:2-u,x=xa+30+f*(xb-xa-60),dA=Math.abs(x-xa),dB=Math.abs(x-xb);
      const sA=Math.max(0,100-dA*.18),sB=Math.max(0,100-dB*.18);
      bars.A.setAttribute('width',sA*.9);bars.B.setAttribute('width',sB*.9);
      if(conn==='A'&&sB>sA+hyst){conn='B';flash=now}else if(conn==='B'&&sA>sB+hyst){conn='A';flash=now}
      const cx=conn==='A'?xa:xb;ph.setAttribute('x',x);lk.setAttribute('x1',x);lk.setAttribute('y1',y0+40);lk.setAttribute('x2',cx);lk.setAttribute('y2',y0-26);
      const hot=now-flash<1200;info.textContent=hot?`🔁 HANDOFF → Tower ${conn}`:`Connected to Tower ${conn}`;info.classList.toggle('hot',hot);
      const other=conn==='A'?sB:sA,mine=conn==='A'?sA:sB;
      cap(mine>=other?T('ফোন যে টাওয়ারে আছে তার সিগন্যাল এখনো বেশি, তাই সংযোগ বদলায় না।','The connected tower is still stronger, so the phone stays.'):
        other<mine+hyst?T('পাশের টাওয়ার শক্তিশালী হচ্ছে, কিন্তু margin-এর কম। তাই এখনই বদলায় না (ping-pong ঠেকাতে)।','The other tower is stronger but not by the margin yet, so no switch (avoids ping-pong).'):T('পাশের টাওয়ার margin-এর চেয়ে বেশি শক্তিশালী, handoff হবে।','The other tower is stronger by more than the margin, so handoff happens.'));
    }
    requestAnimationFrame(frame)}
  requestAnimationFrame(frame);
}

function renderFigs(){
  document.querySelectorAll('.fig[data-fig]').forEach(c=>{
    const spec=window.FIGS&&window.FIGS[c.dataset.fig];if(!spec){c.textContent='figure missing: '+c.dataset.fig;return}
    try{({flow:flowFig,seq:seqFig,handoff:handoffFig})[spec.type](c,spec)}catch(e){console.error('figure failed',c.dataset.fig,e)}});
}
window.addEventListener('DOMContentLoaded',()=>{[initBar,renderFigs].forEach(f=>{try{f()}catch(e){console.error(e)}})});
})();

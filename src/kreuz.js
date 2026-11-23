/* ================= Selbsttest: je Aufgabe ein Satzanfang und drei Aussagen, jede wahr oder falsch =================
   Kein Prüfungsformat (die Vorlesung wird mit einem Essay geprüft), sondern ein Werkzeug, um Begriffe sicher zu unterscheiden.
   Punkte wie in der BiWi-II-App: je richtiges Kreuz 1 Punkt, alle drei richtig +1 (max. 4). */
const kreuzOf=n=>n? KREUZ.filter(x=>x.ch===n) : KREUZ.filter(x=>isReady(x.ch)&&chOf(x.ch).c===state.course);
const kzStat=id=>(state.kreuz||{})[id];
function kzPoints(item,ans,gs){ const right=item.s.filter((st,j)=>ans[j]===st[1]&&!(gs&&gs[j])).length; return right+(right===3?1:0); }
function pickKreuz(n,k){
  const pool=kreuzOf(n).slice(), out=[];
  while(out.length<Math.min(k,pool.length)){
    const w=pool.map(x=>{ const s=kzStat(x.id); return !s?5:(s.p<4?4:(Date.now()-s.t>3*864e5?2:1)); });
    let r=Math.random()*w.reduce((a,b)=>a+b,0), i=0; for(;i<pool.length;i++){ r-=w[i]; if(r<=0) break; }
    out.push(pool.splice(Math.min(i,pool.length-1),1)[0]);
  }
  return out;
}
function openKreuz(n,k,ids){ cur.mx=null; cur.kr={n, items:ids||pickKreuz(n,k||5).map(x=>x.id), i:0, j:0, ans:{}, prev:null, pts:[], sure:[]}; if(QC) QC.enter=false; go("kreuz"); }
function kzBlock(item,ans,shown,key,gs){
  return item.s.map((st,j)=>{ const a=ans[j], g=gs&&gs[j];
    const cls=v=>shown?(st[1]===v?"r":(a===v?"w":"")):"";
    return `<div class="kz"><p class="st"><i class="no">${"abc"[j]})</i>${st[0]}</p>
      <div class="wf" role="group" aria-label="Aussage ${"abc"[j]}"><button data-kz="${key}:${j}" data-v="1" aria-pressed="${a===true}" class="${cls(true)}" ${shown?"disabled":""}>wahr</button><button data-kz="${key}:${j}" data-v="0" aria-pressed="${a===false}" class="${cls(false)}" ${shown?"disabled":""}>falsch</button></div>${gs?`<button data-kg="${j}" class="kg" aria-pressed="${!!g}" ${shown?"disabled":""}>${g?"✓ ":""}geraten</button>`:""}
      ${shown?`<p class="why">${a===st[1]?(g?'<b class="gsd">Richtig geraten, zählt noch nicht als gewusst. </b>':""):a===undefined?'<b>Nicht angekreuzt. </b>':'<b>Nicht richtig. </b>'}${st[2]}</p>`:""}</div>`; }).join("");
}
/* ================= Auswahlkarte: Fragen wie Lernkarten (aus BiWi II übernommen) =================
   Gilt für Kreuzaufgaben, Verständnisfragen und Zuordnen. Gleiche Gesten wie bei den Karten:
   Tippen (auf die Karte oder daneben) deckt auf bzw. geht weiter, Wischen wie gewohnt:
   - Kreuzaufgabe: rechts wahr, links falsch (Tönung grün/rot wie bei „sicher“/„nicht sicher“).
   - Verständnisfrage: erst selbst überlegen, Tippen zeigt die Auswahl; links wischen = „Weiß ich nicht“.
   - Nach der Antwort: Tippen oder Wischen in eine Richtung, die Karte fliegt hinaus, die nächste kommt.
   Wischen, wenn noch nichts geht, lässt die Karte rot den Kopf schütteln. Auf Touch keine „Weiter“-Knöpfe. */
let QC=null;
function qcRender(o){
  const ph=o.phase, done=ph==="done";
  const vcls=!done?"":o.ok===true?" ok":o.ok===null?" idk":" no";
  const v=o.verdict, compact=!o.binary&&ph!=="front";
  const plain=o.opts?o.opts.map(x=>String(x.l).replace(/<[^>]+>/g,"")):[], maxL=plain.length?Math.max(...plain.map(t=>t.length)):99,
    maxW=plain.length?Math.max(...plain.map(t=>Math.max(...t.split(/[\s\/]+/).map(w=>w.length)))):99;
  /* Zwei Spalten nur, wenn kein Wort umbrochen werden muss: Handy bis 24 Zeichen und Wörter bis 11 Zeichen, iPad bis 64 und 22 */
  const grid=maxL<=24&&maxW<=11?" g2":maxL<=64&&maxW<=22?" g2w":"";
  $("#app").innerHTML=`
    <div class="row between ctop"><p class="eyebrow" style="margin:0">${o.eye}</p>${o.right||""}</div>
    ${o.stem?`<p class="kzstem">${o.stem}</p>`:""}
    <div class="swipewrap"><div class="block card qc${vcls}${compact?" cmp":""}${QC&&QC.enter?" enter":""}" id="theCard" role="button" tabindex="0" aria-label="${ph==="front"?"Auswahl zeigen":done?"Weiter":"Karte"}"><i class="tint" aria-hidden="true"></i>
      ${o.hint&&!done?`<button class="qhint${o.idk?" two":""}" aria-label="Tipp zeigen" aria-expanded="false" title="Tipp"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.3 1.1 2.2h5c0-.9.4-1.6 1.1-2.2A6 6 0 0 0 12 3z"/></svg></button>`:""}
      ${o.idk&&!done?`<button class="qidk" data-qk="__idk" aria-label="Weiß ich nicht" title="Weiß ich nicht"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2.6-3 4.5"/><circle cx="12" cy="17.6" r=".6" fill="currentColor"/></svg></button>`:""}
      ${o.ctx?`<p class="cctx">${o.ctx}</p>`:""}
      <div class="front">${o.front}${o.erg?` <span class="erg">Ergänzung</span>`:""}</div>
      ${o.hint&&!done?`<p class="qhtxt" hidden>${o.hint}</p>`:""}
      ${done?`<div class="kzv${vcls}"><span class="ic" aria-hidden="true">${o.ok===true?"✓":o.ok===null?"?":"✕"}</span><div><b>${v.t}</b>${v.s.map(x=>`<span>${x}</span>`).join("")}</div></div>${o.why?`<div class="kzwhy">${o.why}</div>`:""}${o.more||""}`:""}
    </div></div>
    ${ph==="front"?`<div class="row fliprow"><button class="btn" id="qcShow" style="flex:1">Auswahl zeigen</button></div>`
      :ph==="open"?`${o.binary?`<div class="kzans" role="group" aria-label="Ist die Aussage wahr oder falsch?">${o.opts.map(x=>`<button class="btn ghost" data-qk="${x.k}">${x.l}</button>`).join("")}</div>`
          :`<div class="qcopts${grid}">${o.opts.map((x,i)=>`<button data-qk="${x.k}"><span class="ql" aria-hidden="true">${"ABCDEFGH"[i]}</span><span class="qt">${inl(String(x.l).replace(/ → /g,"\u00a0→\u00a0"))}</span></button>`).join("")}</div>`}
`
      :`<div class="qnext"><button class="btn" id="qcNext">${o.next||"Weiter"}</button></div>${o.below||""}`}`;
  const cd=$("#theCard");
  QC={cd, enter:false,
    tap:()=>{ if(ph==="front") o.reveal(); else if(ph==="open"&&o.reveal&&o.hide) o.hide(); else if(done) o.go(); },
    can:d=>done?"fly":ph==="open"&&o.binary?"snap":ph==="open"&&o.idk&&d<0?"snap":false,
    tint:d=>ph==="open"&&o.binary?(d>0?"ok":"no"):"",
    swipe:d=>{ if(done){ QC.enter=true; o.go(); } else if(o.binary) o.pick(o.opts[d>0?1:0].k); else if(d<0&&o.idk) o.pick("__idk"); } };
  document.querySelectorAll("[data-qk]").forEach(b=>b.onclick=()=>o.pick(b.dataset.qk));
  if($("#qcShow")) $("#qcShow").onclick=o.reveal;
  const hb=$(".qhint"); if(hb) hb.onclick=()=>{ const t=$(".qhtxt"), on=t.hidden; t.hidden=!on; hb.setAttribute("aria-expanded",on); hb.classList.toggle("on",on); };
  if($("#qcNext")) $("#qcNext").onclick=()=>{ QC.enter=true; o.go(); };
  cd.onkeydown=e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); QC.tap(); } };
  if(o.after) o.after();
}
/* Gesten für alle Auswahlkarten: auf der Karte und daneben, wie bei den Lernkarten */
(function(){ let x0=null,y0=0,t0=0,id=null,on=false,shook=false,dx=0,hist=[],mouseOut=false;
  const views=["kreuz","recall","who"];
  const ok=e=>views.includes(view)&&QC&&QC.cd&&document.body.contains(QC.cd)&&!e.target.closest("button,a,textarea,input,select,label,#sessbar,#focusbar,nav,details");
  const speed=()=>{ if(hist.length<2) return 0; const [t1,a]=hist[0],[t2,b]=hist[hist.length-1]; return t2>t1?(b-a)/(t2-t1):0; };
  document.addEventListener("pointerdown",e=>{ if(!ok(e)) return; mouseOut=e.pointerType==="mouse"&&!e.target.closest("#theCard"); x0=e.clientX; y0=e.clientY; t0=performance.now(); id=e.pointerId; on=false; shook=false; dx=0; hist=[]; },{passive:true});
  document.addEventListener("pointermove",e=>{ if(x0===null||e.pointerId!==id||mouseOut) return; const d=e.clientX-x0, cd=QC.cd;
    if(!on){ if(Math.abs(d)>12&&Math.abs(d)>1.4*Math.abs(e.clientY-y0)){ if(!QC.can(d>0?1:-1)){ if(!shook){ shook=true; buzz(); } return; } on=true; x0+=d>0?12:-12; cd.style.transition="none"; cd.classList.add("drag"); } else return; }
    dx=e.clientX-x0; const t=performance.now(); hist.push([t,e.clientX]); while(hist.length>2&&t-hist[0][0]>90) hist.shift();
    const tc=QC.tint(dx>0?1:-1), tint=cd.querySelector(".tint"); if(tint){ tint.className="tint "+tc; tint.style.opacity=tc?Math.min(1,Math.abs(dx)/(cd.offsetWidth*.2)):0; }
    cd.style.transform=`translate3d(${dx}px,0,0) rotate(${dx/40}deg)`; },{passive:true});
  const up=e=>{ if(x0===null||e.pointerId!==id) return; const cd=QC.cd, was=on, far=Math.hypot(e.clientX-x0,e.clientY-y0), quick=performance.now()-t0<500; x0=null; on=false;
    if(shook){ window.__noClick=Date.now(); return; }
    if(!was){ if(!mouseOut&&far<10&&quick&&e.type==="pointerup") QC.tap(); return; }
    window.__noClick=Date.now(); const v=speed(), lim=Math.min(90,cd.offsetWidth*.22), d=Math.sign(dx)||Math.sign(v);
    const go=Math.abs(dx)>lim||(Math.abs(v)>.45&&Math.abs(dx)>24&&Math.sign(v)===Math.sign(dx)), act=go&&QC.can(d);
    const tint=cd.querySelector(".tint");
    if(act==="fly"){ const out=d*(window.innerWidth*.6+cd.offsetWidth); cd.style.transition="transform .24s cubic-bezier(.25,.8,.35,1), opacity .24s linear"; cd.style.transform=`translate3d(${out}px,0,0) rotate(${d*16}deg)`; cd.style.opacity="0";
      let f=false; const fin=()=>{ if(f) return; f=true; QC.swipe(d); }; cd.addEventListener("transitionend",fin,{once:true}); setTimeout(fin,300); return; }
    cd.classList.remove("drag"); cd.style.transition="transform .42s cubic-bezier(.2,1.5,.4,1)"; cd.style.transform=""; if(tint){ tint.style.transition="opacity .2s"; tint.style.opacity=0; }
    if(act==="snap") setTimeout(()=>QC.swipe(d),120); };
  document.addEventListener("pointerup",up,{passive:true}); document.addEventListener("pointercancel",up,{passive:true});
  /* Tastatur: Leertaste/Enter aufdecken bzw. weiter; → wahr, ← falsch bzw. „Weiß ich nicht“; 1–8 oder A–H wählt eine Antwort, ? heißt „Weiß ich nicht“ */
  document.addEventListener("keydown",e=>{
    if(!views.includes(view)||!QC||e.metaKey||e.ctrlKey||e.altKey||(e.target.closest&&e.target.closest("textarea,input,select"))||document.activeElement===QC.cd) return;
    const k=e.key;
    if(k===" "||k==="Enter"){ if(document.activeElement&&document.activeElement.tagName==="BUTTON") return; e.preventDefault(); QC.tap(); }
    else if(k==="ArrowRight"||k==="ArrowLeft"){ const d=k==="ArrowRight"?1:-1, a=QC.can(d); if(a){ e.preventDefault(); if(a==="fly"){ QC.enter=true; } QC.swipe(d); } }
    else if(/^[1-8a-hA-H]$/.test(k)){ const ix=/\d/.test(k)?+k-1:"abcdefgh".indexOf(k.toLowerCase()), b=document.querySelectorAll(".qcopts [data-qk]")[ix]; if(b){ e.preventDefault(); b.click(); } }
    else if(k==="?"){ const b=document.querySelector(".qidk"); if(b){ e.preventDefault(); b.click(); } }
  });
})();

/* Kreuzaufgaben als Auswahlkarte: eine Aussage nach der anderen, Punkte nach der dritten Aussage.
   „Weiß ich nicht“ zählt keinen Punkt. */
const KZ_DOT="abc";
function kzFinish(K,item){
  const p=kzPoints(item,K.ans); K.pts[K.i]=p; K.sure[K.i]=p;
  const s=kzStat(item.id)||{n:0,best:0}, b=p===4?Math.min(5,(s.b||1)+1):1;
  state.kreuz[item.id]={n:s.n+1,p,best:Math.max(s.best||0,p),t:Date.now(),b,due:dayStart()+(p===4?spaceDays(s.b===5?35:INTERVAL[b]):1)*864e5}; logDay(); save();
}
function kzNext(){ const K=cur.kr; if(!(K.j in K.ans)) return;
  if(K.j<2){ K.j++; } else { K.i++; K.j=0; K.ans={}; K.prev=null; }
  renderKreuz(); window.scrollTo(0,0); }
function renderKreuz(){
  const K=cur.kr, back=K.n?chLabel(K.n):"Üben", backFn=()=>{ if(K.n){ cur.ch=K.n; go("chapter"); } else go("practice"); };
  if(K.j===undefined) K.j=0;
  if(!K.items.length){ $("#app").innerHTML=`${backTo(back)}<h1>Noch kein Selbsttest</h1><p class="muted">Für diesen Bereich gibt es noch keine Aufgaben.</p>`; bindCrumb(backFn); return; }
  if(K.i>=K.items.length&&cur.mx) return mixNext(null,K.pts.reduce((a,b)=>a+b,0));
  if(K.i>=K.items.length){
    const sum=K.pts.reduce((a,b)=>a+b,0), max=K.items.length*4;
    $("#app").innerHTML=`${backTo(back)}<h1>Runde geschafft</h1>
      <div class="block"><p class="pbadge">${sum} von ${max} Punkten</p>
      <p class="small muted">Je richtiges Kreuz ein Punkt, alle drei Aussagen einer Aufgabe richtig ein Zusatzpunkt. Aufgaben mit Fehlern kommen bevorzugt wieder.</p>
      <div class="row">${sess?sessBtn():`<button class="btn" id="again">Neue Runde</button><button class="btn ghost" id="out">Fertig</button>`}</div></div>`;
    bindCrumb(backFn); if($("#again")) $("#again").onclick=()=>openKreuz(K.n); if($("#out")) $("#out").onclick=backFn; return;
  }
  const item=KREUZ.find(x=>x.id===K.items[K.i]), ch=chOf(item.ch), j=K.j, st=item.s[j];
  if(j===0&&!(0 in K.ans)&&K.prev===null) K.prev=kzStat(item.id)||false;
  const done=j in K.ans, a=K.ans[j], ok=done&&a===st[1], last=j===2, word=v=>v?"wahr":"falsch";
  const dots=[0,1,2].map(k=>{ const d=k in K.ans, r=d&&K.ans[k]===item.s[k][1], q=d&&K.ans[k]===null;
    return `<i class="${q?"idk":d?(r?"ok":"no"):k===j?"now":""}" aria-label="Aussage ${KZ_DOT[k]}${q?" nicht gewusst":d?(r?" richtig":" falsch"):""}">${q?"?":d?(r?"✓":"✕"):KZ_DOT[k]}</i>`; }).join("");
  qcRender({
    eye:`${cur.mx?"Selbsttest":`Aufgabe ${K.i+1} von ${K.items.length}`} · Sitzung ${ch.no}`,
    right:`<span class="kzdots">${dots}</span>`, stem:item.stem, erg:item.erg,
    ctx:`Aussage ${KZ_DOT[j]})${K.prev&&j===0&&!done?` · zuletzt ${K.prev.p} von 4 Punkten`:""}`,
    front:inl(st[0]), phase:done?"done":"open", binary:true, idk:true,
    opts:[{k:"0",l:"falsch"},{k:"1",l:"wahr"}],
    ok:!done?undefined:a===null?null:ok,
    verdict:!done?null:ok?{t:"Richtig.",s:[`Die Aussage ist ${word(st[1])}.`]}
      :a===null?{t:"Nicht gewusst.",s:[`Die Aussage ist ${word(st[1])}.`]}
      :{t:"Falsch.",s:[`Du hast „${word(a)}“ gewählt, die Aussage ist aber ${word(st[1])}.`]},
    why:done?st[2]:"",
    next:!last||cur.mx||K.i<K.items.length-1?"Weiter":"Auswertung",
    below:done&&last?`<p class="kzsum">Diese Aufgabe: ${K.pts[K.i]} von 4 Punkten</p>`:"",
    pick:k=>{ if(j in K.ans) return; K.ans[j]=k==="__idk"?null:k==="1"; if(j===2) kzFinish(K,item); renderKreuz(); if(K.ans[j]!==null&&K.ans[j]!==st[1]) buzz(); },
    go:kzNext
  });
}

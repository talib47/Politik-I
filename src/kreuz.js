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
function openKreuz(n){ cur.kr={n, items:pickKreuz(n,5).map(x=>x.id), i:0, ans:{}, gs:{}, shown:false, pts:[], sure:[]}; go("kreuz"); }
function kzBlock(item,ans,shown,key,gs){
  return item.s.map((st,j)=>{ const a=ans[j], g=gs&&gs[j];
    const cls=v=>shown?(st[1]===v?"r":(a===v?"w":"")):"";
    return `<div class="kz"><p class="st"><i class="no">${"abc"[j]})</i>${st[0]}</p>
      <div class="wf" role="group" aria-label="Aussage ${"abc"[j]}"><button data-kz="${key}:${j}" data-v="1" aria-pressed="${a===true}" class="${cls(true)}" ${shown?"disabled":""}>wahr</button><button data-kz="${key}:${j}" data-v="0" aria-pressed="${a===false}" class="${cls(false)}" ${shown?"disabled":""}>falsch</button></div>${gs?`<button data-kg="${j}" class="kg" aria-pressed="${!!g}" ${shown?"disabled":""}>${g?"✓ ":""}geraten</button>`:""}
      ${shown?`<p class="why">${a===st[1]?(g?'<b class="gsd">Richtig geraten, zählt noch nicht als gewusst. </b>':""):a===undefined?'<b>Nicht angekreuzt. </b>':'<b>Nicht richtig. </b>'}${st[2]}</p>`:""}</div>`; }).join("");
}
function renderKreuz(){
  const K=cur.kr, back=K.n?chLabel(K.n):"Üben", backFn=()=>{ if(K.n){ cur.ch=K.n; go("chapter"); } else go("practice"); };
  if(!K.items.length){ $("#app").innerHTML=`${backTo(back)}<h1>Noch kein Selbsttest</h1><p class="muted">Für diesen Bereich gibt es noch keine Aufgaben.</p>`; bindCrumb(backFn); return; }
  if(K.i>=K.items.length){
    const sum=K.pts.reduce((a,b)=>a+b,0), max=K.items.length*4;
    $("#app").innerHTML=`${backTo(back)}<h1>Runde geschafft</h1>
      <div class="block"><p class="pbadge">${sum} von ${max} Punkten</p>${K.sure.reduce((a,b)=>a+b,0)<sum?`<p class="small" style="margin:6px 0 0">Ohne Geratenes: ${K.sure.reduce((a,b)=>a+b,0)} von ${max}. Mit diesem Wert rechnet der Lernstand.</p>`:""}
      <p class="small muted">Je richtiges Kreuz ein Punkt, alle drei Aussagen einer Aufgabe richtig ein Zusatzpunkt. Aufgaben mit Fehlern kommen bevorzugt wieder.</p>
      <div class="row">${sess?sessBtn():`<button class="btn" id="again">Neue Runde</button><button class="btn ghost" id="out">Fertig</button>`}</div></div>`;
    bindCrumb(backFn); if($("#again")) $("#again").onclick=()=>openKreuz(K.n); if($("#out")) $("#out").onclick=backFn; return;
  }
  const item=KREUZ.find(x=>x.id===K.items[K.i]), all=[0,1,2].every(j=>K.ans[j]!==undefined), ch=chOf(item.ch);
  if(!K.shown) K.prev=kzStat(item.id);
  $("#app").innerHTML=`${backTo(back)}
    <div class="row between"><p class="eyebrow" style="margin:0">Aufgabe ${K.i+1} von ${K.items.length} · Sitzung ${ch.no}</p>${K.prev?`<span class="chip">zuletzt ${K.prev.p}/4</span>`:""}</div>
    <div class="block" style="margin-top:8px"><h3 style="margin:0 0 4px">${item.stem}</h3>${kzBlock(item,K.ans,K.shown,"s",K.gs)}</div>
    ${K.shown?`<div class="row between"><span class="pbadge">${K.pts[K.i]} von 4 Punkten${K.sure[K.i]<K.pts[K.i]?` · ohne Geratenes ${K.sure[K.i]}`:""}</span><button class="btn" id="nx">${K.i<K.items.length-1?"Nächste Aufgabe":"Auswertung"}</button></div>`
      :`<button class="btn" id="ev" style="width:100%" ${all?"":"disabled"}>Auswerten</button><p class="hint">„geraten“ markieren, wenn du nicht sicher bist. Zählt dann nicht als gewusst.</p>`}`;
  bindCrumb(backFn);
  document.querySelectorAll("[data-kz]").forEach(b=>b.onclick=()=>{ K.ans[+b.dataset.kz.split(":").pop()]=b.dataset.v==="1"; const y=window.scrollY; renderKreuz(); window.scrollTo(0,y); });
  document.querySelectorAll("[data-kg]").forEach(b=>b.onclick=()=>{ const j=+b.dataset.kg; K.gs[j]=!K.gs[j]; const y=window.scrollY; renderKreuz(); window.scrollTo(0,y); });
  if($("#ev")) $("#ev").onclick=()=>{ K.pts[K.i]=kzPoints(item,K.ans); const p=kzPoints(item,K.ans,K.gs); K.sure[K.i]=p; K.shown=true;
    const s=kzStat(item.id)||{n:0,best:0}; state.kreuz[item.id]={n:s.n+1,p,best:Math.max(s.best||0,p),t:Date.now()}; logDay(); save(); renderKreuz(); };
  if($("#nx")) $("#nx").onclick=()=>{ K.i++; K.ans={}; K.gs={}; K.shown=false; renderKreuz(); window.scrollTo(0,0); };
}

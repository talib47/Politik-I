/* ================= Verständnisfragen: erst selbst abrufen, dann Auswahl; Wiederholung mit Abstand (aus Wirtschaft II) =================
   Jede Frage aus den Lektionen bekommt ein eigenes Fach wie eine Karteikarte (state.qbox), ID = Lektions-ID#Nummer.
   Ältere Antworten (vor dieser Funktion) werden aus state.lessons abgeleitet, ohne etwas zu speichern.
   c.w[k] erklärt, warum genau Antwort k falsch ist. */
const qid=(lid,j)=>lid+"#"+j;
function allQuestions(c=state.course){ const out=[]; for(const ch of CHAPTERS.filter(x=>x.c===c)) for(const L of (LESSONS[ch.n]||[])) L.check.forEach((q,j)=>out.push({id:qid(L.id,j), lid:L.id, n:ch.n, c:q, lt:L.t, li:(LESSONS[ch.n]||[]).indexOf(L)})); return out; }
function qInfo(id){
  const s=(state.qbox||{})[id]; if(s) return s;
  const ls=(state.lessons||{})[id.split("#")[0]]; if(!ls) return null;
  return ls.ok? {b:2, due:dayStart(ls.t)+3*864e5} : {b:1, due:dayStart(ls.t)+864e5};
}
function qDue(){ const now=Date.now(); return allQuestions().filter(q=>{ const s=qInfo(q.id); return s&&s.due<=now; }).sort((a,b)=>qInfo(a.id).due-qInfo(b.id).due); }
/* richtig: nächstes Fach; falsch oder „Weiß ich nicht“: Fach 1, morgen wieder (ohne Strafe in der Statistik bei „Weiß ich nicht“) */
function qGrade(id,ok,idk){
  const s=qInfo(id)||{b:0};
  const b1= ok? Math.min(5,Math.max(s.b,1)+1) : 1;
  state.qbox[id]={b:b1, due:dayStart()+(ok?(s.b===5?35:INTERVAL[b1]):1)*864e5};
  if(!ok&&!idk) state.qlapses[id]=(state.qlapses[id]||0)+1;
}
/* Reihenfolge der Antworten je Frage und Tag gemischt (damit man sich nicht die Position merkt), beim Neuzeichnen stabil */
function optOrder(c){ let h=dayStart()/864e5|0; for(const ch of c.q) h=(h*31+ch.charCodeAt(0))>>>0;
  const idx=c.o.map((_,k)=>k); for(let i=idx.length-1;i>0;i--){ h=(h*1103515245+12345)>>>0; const j=h%(i+1); [idx[i],idx[j]]=[idx[j],idx[i]]; } return idx; }
/* Eine Frage: erst nur die Frage, dann auf Wunsch die Auswahl */
function qBlock(c,key,a,shown,first){
  const opts= a!==undefined || shown;
  return `<div class="qb" style="margin-top:${first?4:18}px"><p style="margin:0"><b>${inl(c.q)}</b></p>
    ${opts?`<div class="mc">${optOrder(c).map(k=>{ const o=c.o[k], cls=a===undefined?"":(k===c.a?"r":(k===a?"w":""));
        return `<button data-q="${key}" data-k="${k}" class="${cls}" ${a!==undefined?"disabled":""}>${inl(o)}</button>`; }).join("")}
        ${a===undefined?`<button data-q="${key}" data-k="-1" class="idk">Weiß ich nicht</button>`:""}</div>`
      :`<p class="hint" style="margin:4px 0 8px">Erst selbst überlegen, dann Auswahl zeigen.</p>
        <div class="row"><button class="btn small" data-show="${key}">Auswahl zeigen</button><button class="btn ghost small" data-q="${key}" data-k="-1">Weiß ich nicht</button></div>`}
    ${a!==undefined?feedback(c,a):""}</div>`;
}
/* Übungsmodus: fällige Verständnisfragen */
function openRecall(list,n){ const L=list||qDue().slice(0,8); cur.rq={list:L, i:0, ans:undefined, shown:false, right:0, n:n||0}; go("recall"); }
function renderRecall(){
  const R=cur.rq, L=R.list, back=R.n?chLabel(R.n):"Üben", backFn=()=>{ if(R.n){ cur.ch=R.n; go("chapter"); } else go("practice"); };
  if(R.i>=L.length){
    const left=qDue().length;
    $("#app").innerHTML=`${backTo(back)}<h1>${L.length?"Runde geschafft":"Nichts fällig"}</h1><div class="block">
      ${L.length?`<p>${R.right} von ${L.length} richtig.</p>`:`<p>Gerade ist keine Verständnisfrage fällig. Neue Fragen kommen mit jeder Lektion dazu.</p>`}
      <p class="small muted">Richtige Fragen kommen nach 1, 3, 7, 16 und 35 Tagen wieder, falsche und „Weiß ich nicht“ schon morgen. ${left?`Noch ${left} fällig.`:""}</p>
      <div class="row">${sess?sessBtn():`${left?`<button class="btn" id="rAgain">Weiter</button>`:""}<button class="btn ghost" id="rOut">Fertig</button>`}</div></div>`;
    bindCrumb(backFn); if($("#rAgain")) $("#rAgain").onclick=()=>openRecall(null,R.n); if($("#rOut")) $("#rOut").onclick=backFn; return;
  }
  const q=L[R.i], ch=chOf(q.n);
  $("#app").innerHTML=`${backTo(back)}
    <p class="eyebrow">Verständnisfrage ${R.i+1} von ${L.length}</p>
    <div class="block"><p class="small muted" style="margin:0 0 2px">Sitzung ${ch.no} · ${q.lt}</p>${qBlock(q.c,"r",R.ans,R.shown,true)}</div>
    ${R.ans!==undefined?`<div class="row"><button class="btn" id="rNext">Weiter</button><button class="btn ghost" id="rLes">Zur Lektion</button></div>`:""}`;
  bindCrumb(backFn);
  document.querySelectorAll("[data-show]").forEach(b=>b.onclick=()=>{ R.shown=true; renderRecall(); });
  document.querySelectorAll("[data-q]").forEach(b=>b.onclick=()=>{ if(R.ans!==undefined) return; const k=+b.dataset.k; R.ans=k; const ok=k===q.c.a; if(ok) R.right++; qGrade(q.id,ok,k===-1); logDay(); save(); renderRecall(); });
  if($("#rNext")) $("#rNext").onclick=()=>{ R.i++; R.ans=undefined; R.shown=false; renderRecall(); window.scrollTo(0,0); };
  if($("#rLes")) $("#rLes").onclick=()=>openLesson(q.n,q.li);
}

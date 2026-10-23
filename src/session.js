/* ================= Tägliche Einheit „Heute“ (aus Wirtschaft II) =================
   Mischt, was in der gewählten Veranstaltung heute dran ist: fällige Karten (oder neue), fällige Verständnisfragen,
   eine Übung im Prüfungsformat (Vorlesung: Gliederung in 10 Minuten), abwechselnd Zuordnen, Selbsttest oder Begriffe,
   dazu die nächste neue Lektion. Gemischtes Üben (Interleaving) und Abstände (Spacing) ohne eigene Planung. */
let sess=null;
const dayIndex=()=>Math.floor(dayStart()/864e5);
function freshChapter(){ for(const ch of courseChs()){ const L=LESSONS[ch.n]||[]; if(L.some(x=>lessonState(x.id)) && (CARDS[ch.n]||[]).some(x=>!isSeen(x.id))) return ch.n; } return 0; }
function planToday(){
  /* geübt wird nur, was schon gelesen wurde: begonnene Sitzungen (mindestens eine Lektion bearbeitet) */
  const started=courseChs().filter(ch=>(LESSONS[ch.n]||[]).some(x=>lessonState(x.id)));
  const half=started.some(ch=>{ const L=LESSONS[ch.n]; return L.filter(x=>lessonState(x.id)).length>=L.length/2 && essaysOf(ch.n).length; });
  const S=[], dc=dueCards(0).length, dq=qDue().length, nx=nextStep();
  const lesson=nx&&nx.lesson?{k:"lesson", t:"Neu lernen", d:nx.title, min:5, go:nx.go}:null;
  if(!dc&&!dq&&lesson) S.push(lesson);
  if(dc) S.push({k:"cards", t:"Karten wiederholen", d:`${Math.min(dc,20)} fällige Karten`, min:Math.max(2,Math.round(Math.min(dc,20)*.4))});
  else { const n=freshChapter(); if(n) S.push({k:"newcards", n, t:"Neue Karten", d:`5 neue Karten aus Sitzung ${chOf(n).no}`, min:3}); }
  if(dq) S.push({k:"recall", t:"Verständnisfragen", d:`${Math.min(dq,6)} fällige Fragen aus den Lektionen`, min:3});
  if(half) S.push({k:"outline", t:"Gliederung in 10 Minuten", d:"eine Prüfungsfrage gliedern, wie am Anfang des Essays", min:10});
  if(started.length){ const rot=["who","kreuz","terms"][dayIndex()%3];
    if(rot==="who"&&whoOf(0).length) S.push({k:"who", t:"Was gehört wohin?", d:"6 Aussagen zuordnen", min:3});
    else if(rot==="terms"&&allCards("b").length) S.push({k:"terms", t:"Begriffe", d:"8 Begriffe, gemischt in beide Richtungen", min:3});
    else if(kreuzOf(0).length) S.push({k:"kreuz", t:"Selbsttest", d:"Aussagen als wahr oder falsch erkennen", min:4}); }
  if(lesson&&!S.includes(lesson)) S.push(lesson);
  return S;
}
/* Begriffe für heute: erst fällige, dann neue, beide Richtungen gemischt */
function termsForToday(){ const A=allCards("b").concat(allCards("br")); const due=A.filter(x=>isDue(x.id)), fresh=A.filter(x=>!isSeen(x.id)); return shuffle(due).concat(shuffle(fresh)).slice(0,8); }
function startSession(){ sess={steps:planToday(), i:0, t0:Date.now()}; runStep(); }
function runStep(){
  if(!sess) return; const s=sess.steps[sess.i];
  if(!s){ return finishSession(); }
  ({cards:()=>openCards(0,false,dueCards(0).slice(0,20)),
    newcards:()=>openCards(s.n,false,allCards(s.n).filter(x=>!isSeen(x.id)).slice(0,5)),
    recall:()=>openRecall(qDue().slice(0,6)),
    outline:()=>openOutline(0),
    who:()=>openWho(6),
    terms:()=>openCards("b",false,termsForToday()),
    kreuz:()=>openKreuz(0),
    lesson:()=>s.go()})[s.k]();
  window.scrollTo(0,0);
}
function sessNext(){ if(!sess) return; sess.i++; runStep(); }
function endSession(){ sess=null; updateSessBar(); go("home"); }
function finishSession(){
  const min=Math.max(1,Math.round((Date.now()-sess.t0)/60000)); state.sessions[today()]=min; save();
  sess=null; updateSessBar(); view="sessdone"; renderNav();
  $("#app").innerHTML=`<p class="eyebrow">Heute</p><h1>Geschafft</h1><div class="block"><p>Deine Einheit ist fertig, etwa ${min} Minuten.</p>
    <p class="small muted">Morgen stellt die App eine neue Einheit zusammen. Was du heute nicht sicher wusstest, ist dann wieder dabei.</p>
    <div class="row"><button class="btn" id="sdHome">Zum Lernpfad</button></div></div>`;
  $("#sdHome").onclick=()=>go("home"); window.scrollTo(0,0);
}
function updateSessBar(){
  const b=$("#sessbar"); if(!b) return;
  if(!sess||!sess.steps[sess.i]){ b.hidden=true; b.innerHTML=""; return; }
  const s=sess.steps[sess.i];
  b.hidden=false;
  b.innerHTML=`<div class="sbin"><span class="sbt"><b>Heute ${sess.i+1}/${sess.steps.length}</b> · ${s.t}</span><button class="btn small" id="sbNext">${sess.i<sess.steps.length-1?"Nächster Schritt":"Abschließen"}</button><button class="btn ghost small" id="sbEnd" aria-label="Einheit beenden">✕</button></div>`;
  $("#sbNext").onclick=sessNext; $("#sbEnd").onclick=endSession;
}
const sessBtn=()=>`<button class="btn" id="sessGo">${sess&&sess.i<sess.steps.length-1?"Weiter zum nächsten Schritt":"Einheit abschließen"}</button>`;
document.addEventListener("click",e=>{ if(e.target.closest("#sessGo")) sessNext(); });
/* Block auf der Startseite */
function todayBlock(){
  const done=(state.sessions||{})[today()], S=planToday(), min=S.reduce((a,s)=>a+s.min,0);
  const plan=examPlanToday();
  if(sess) return `<div class="block today"><p class="eyebrow">Heute</p><h2>Einheit läuft</h2><p class="small muted" style="margin-top:0">Schritt ${sess.i+1} von ${sess.steps.length}: ${sess.steps[sess.i]?sess.steps[sess.i].t:""}</p><button class="btn" id="goSess">Fortsetzen</button></div>`;
  if(!S.length) return "";
  return `<div class="block today"><p class="eyebrow">Heute · etwa ${min} Minuten</p><h2>${done?"Für heute erledigt":"Deine Lerneinheit"}</h2>
    ${done?`<p class="small muted" style="margin-top:0">Du hast heute schon gelernt. Eine zweite Runde schadet nicht, morgen geht es mit neuen Abständen weiter.</p>`:""}
    <ol class="plan">${S.map(s=>`<li><b>${s.t}</b><span>${inl(s.d)}</span></li>`).join("")}</ol>
    ${plan?`<p class="small" style="margin:0 0 10px"><b>Probe-Essay:</b> ${plan}</p>`:""}
    <button class="btn" id="goSess">${done?"Noch eine Runde":"Starten"}</button></div>`;
}

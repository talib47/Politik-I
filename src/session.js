/* ================= Tägliche Einheit „Heute“ =================
   Mischt, was in der gewählten Veranstaltung heute dran ist: Karten, gemischte Fragen, eine Übung im Essay-Format,
   dazu die nächste neue Lektion. Gemischtes Üben (Interleaving) und Abstände (Spacing) ohne eigene Planung. */
let sess=null;
const dayIndex=()=>Math.floor(dayStart()/864e5);
/* Tageseinheit ohne die Gegenrichtung der Begriffe (Bedeutung → Begriff): Die gibt es unter Üben → Begriffe auf Wunsch.
   Spart etwa ein Viertel der Zeit (Prüfauftrag 04.11.2026: Stoffmenge größer als 20–40 Minuten am Abend). */
const dueToday=()=>dueCards(0).filter(x=>!x.id.startsWith("br-"));
/* Probe-Essay laut Plan (21, 14 und 7 Tage vor dem Termin, Seminar je einen Tag später): ab dem Plantag ein eigener Schritt der Einheit */
function probeDue(){ if(!essaysOf(0).length) return null; const now=Date.now(), P=examPlan().filter(p=>!p.done&&p.when!=null&&p.when-now<=864e5); return P.length?P[P.length-1]:null; }
function freshChapter(){ for(const ch of courseChs()){ const L=LESSONS[ch.n]||[]; if(L.some(x=>lessonState(x.id)) && (CARDS[ch.n]||[]).some(x=>!isSeen(x.id))) return ch.n; } return 0; }
/* Höchstens vier Schritte (aus BiWi II, 23.11.): 1 Karten (fällige, neue und ein paar neue Begriffe in einem Stapel),
   2 Fragen (Verständnisfragen, Selbsttest und Zuordnen gemischt, alle als Auswahlkarten),
   3 abwechselnd Gliederung in 10 Minuten oder Alles aufschreiben (das offene Format der Essay-Prüfung), 4 Neu lernen.
   Am Plantag: Probe-Essay und nur die fälligen Karten. */
function planToday(){
  /* geübt wird nur, was schon gelesen wurde: begonnene Sitzungen (mindestens eine Lektion bearbeitet) */
  const started=courseChs().filter(ch=>(LESSONS[ch.n]||[]).some(x=>lessonState(x.id)));
  const half=started.some(ch=>{ const L=LESSONS[ch.n]; return L.filter(x=>lessonState(x.id)).length>=L.length/2 && essaysOf(ch.n).length; });
  const S=[], due=dueToday().slice(0,20), nx=nextStep(), pr=probeDue();
  if(pr){ S.push({k:"exam", t:"Probe-Essay", d:`laut Plan (${pr.lab}): eine Frage, 60 Minuten wie in der Prüfung`, min:60});
    if(due.length) S.push({k:"cards", deck:due, t:"Karten", d:`${due.length} fällig`, min:Math.max(2,Math.round(due.length*.4))});
    return S; }
  const n=due.length<25?freshChapter():0, fresh=n?allCards(n).filter(x=>!isSeen(x.id)).slice(0,5):[];
  const terms=due.length<25&&started.length?allCards("b").filter(x=>!isSeen(x.id)).slice(0,3):[];
  const deck=due.concat(fresh,terms);
  if(deck.length) S.push({k:"cards", deck, t:"Karten", d:[due.length?`${due.length} fällig`:"",fresh.length+terms.length?`${fresh.length+terms.length} neu`:""].filter(Boolean).join(", "), min:Math.max(2,Math.round(deck.length*.4))});
  const mx=started.length?mixPlan():[]; if(mx.length) S.push({k:"mix", list:mx, t:"Fragen", d:`${mx.length} Fragen gemischt`, min:Math.max(3,Math.round(mx.length*.6))});
  if(started.length){ const rot=dayIndex()%2, dp=pickDump();
    if((rot===0||!dp)&&half) S.push({k:"outline", t:"Gliederung in 10 Minuten", d:"eine Prüfungsfrage gliedern, wie am Anfang des Essays", min:10});
    else if(dp) S.push({k:"dump", t:"Alles aufschreiben", d:`5 Minuten aus dem Gedächtnis: ${chLabel(dp.n)}`, min:7}); }
  if(nx&&nx.lesson) S.push({k:"lesson", t:"Neu lernen", d:nx.title, min:5, go:nx.go});
  return S;
}
/* Fragenmix: fällige Verständnisfragen, Selbsttest-Aufgaben und Zuordnen, verzahnt (Interleaving) */
function mixPlan(){
  const q=qDue().slice(0,5).map(x=>({t:"q",q:x})), k=kreuzOf(0).length?pickKreuz(0,2).map(x=>({t:"k",id:x.id})):[], w=whoPick(3).map(x=>({t:"w",x,o:whoOptions(x)}));
  const out=[], parts=[q,k,w]; while(parts.some(p=>p.length)) for(const p of parts) if(p.length) out.push(p.shift());
  return out;
}
function openMix(list){ cur.mx={list, i:0, right:0, n:0}; mixShow(); }
function mixShow(){ const M=cur.mx, e=M.list[M.i];
  if(!e) return mixDone();
  if(e.t==="q"){ cur.rq={list:[e.q], i:0, ans:undefined, shown:false, right:0, n:0}; go("recall"); }
  else if(e.t==="k"){ cur.kr={n:0, items:[e.id], i:0, j:0, ans:{}, prev:null, pts:[], sure:[]}; go("kreuz"); }
  else { cur.wh={list:[{x:e.x,o:e.o}], i:0, a:null, right:0, ch:0}; go("who"); }
  window.scrollTo(0,0);
}
/* Wird von den Fragenansichten aufgerufen, wenn ihr einziges Element fertig ist: ok = richtig (Selbsttest: Punkte) */
function mixNext(ok,pts){ const M=cur.mx; if(pts!==undefined){ M.kp=(M.kp||0)+pts; M.km=(M.km||0)+4; } else { M.n++; if(ok) M.right++; } M.i++; mixShow(); }
function mixDone(){ const M=cur.mx; cur.mx=null; view="mixdone"; renderNav();
  $("#app").innerHTML=`<h1>Fragen geschafft</h1><div class="block">
    ${M.n?`<p>${M.right} von ${M.n} Fragen richtig.</p>`:""}${M.km?`<p>Selbsttest: ${M.kp} von ${M.km} Punkten.</p>`:""}
    <p class="small muted">Was nicht saß, kommt morgen wieder.</p><div class="row">${sess?sessBtn():`<button class="btn" id="mxOut">Fertig</button>`}</div></div>`;
  if($("#mxOut")) $("#mxOut").onclick=()=>go("practice"); updateSessBar(); window.scrollTo(0,0);
}
/* Begriffe für heute: erst fällige, dann neue, nur Begriff → Erklärung */
function termsForToday(){ const A=allCards("b"); const due=A.filter(x=>isDue(x.id)), fresh=A.filter(x=>!isSeen(x.id)); return shuffle(due).concat(shuffle(fresh)).slice(0,8); }
function startSession(){ sess={steps:planToday(), i:0, t0:Date.now(), done:[]}; runStep(); }
function runStep(){
  if(!sess) return; const s=sess.steps[sess.i]; updateSessBar();
  if(!s){ return finishSession(); }
  ({cards:()=>openCards(0,false,s.deck),
    mix:()=>openMix(s.list),
    exam:()=>go("exam"),
    outline:()=>openOutline(0),
    dump:()=>openDump(0),
    who:()=>openWho(6),
    terms:()=>openCards("b",false,termsForToday()),
    kreuz:()=>openKreuz(0),
    lesson:()=>s.go()})[s.k]();
  window.scrollTo(0,0);
}
/* done = Schritt wirklich bis zum Ende bearbeitet (Abschlussseite oder Speichern); „Nächster Schritt“ oben zählt als übersprungen (aus BiWi II) */
function sessNext(done){ if(!sess) return; (sess.done=sess.done||[])[sess.i]=done===true; sess.i++; runStep(); }
function endSession(){ cur.mx=null; sess=null; updateSessBar(); go("home"); }
function finishSession(){
  const min=Math.max(1,Math.round((Date.now()-sess.t0)/60000)), n=sess.steps.length, d=(sess.done||[]).filter(Boolean).length, all=d===n;
  if(all){ state.sessions[today()]=min; save(); }
  sess=null; updateSessBar(); view="sessdone"; renderNav();
  $("#app").innerHTML=all?`<p class="eyebrow">Heute</p><h1>Geschafft</h1><div class="block"><p>Deine Einheit ist fertig, etwa ${min} Minuten.</p>
    <p class="small muted">Morgen stellt die App eine neue Einheit zusammen. Was du heute nicht sicher wusstest, ist dann wieder dabei.${new Date().getHours()>=18?" Abends gelernt? Dann mach morgen früh kurz die fälligen Karten: Mit Schlaf zwischen zwei Runden sitzt der Stoff schneller und länger.":""}</p>
    <div class="row"><button class="btn" id="sdHome">Zum Lernpfad</button></div></div>`
   :`<p class="eyebrow">Heute</p><h1>${d?"Noch nicht ganz":"Nichts bearbeitet"}</h1><div class="block"><p>${d} von ${n} Schritten bearbeitet.</p>
    <p class="small muted">Übersprungenes zählt nicht als gelernt und steht weiter unter „Heute“.</p>
    <div class="row"><button class="btn" id="sdHome">Zum Lernpfad</button></div></div>`;
  $("#sdHome").onclick=()=>go("home"); window.scrollTo(0,0);
}
function updateSessBar(){
  const b=$("#sessbar"); if(!b) return;
  if(!sess||!sess.steps[sess.i]){ b.hidden=true; b.innerHTML=""; return; }
  const s=sess.steps[sess.i];
  b.hidden=false;
  b.innerHTML=`<div class="sbin"><span class="sbt"><b>Heute ${sess.i+1}/${sess.steps.length}</b> · ${s.t}</span><button class="btn ghost small" id="sbNext">${sess.i<sess.steps.length-1?"Nächster Schritt":"Abschließen"}</button><button class="btn ghost small" id="sbEnd" aria-label="Einheit beenden">✕</button></div><div class="sbs" aria-hidden="true">${sess.steps.map((_,j)=>`<i class="${j<sess.i?"on":j===sess.i?"now":""}"></i>`).join("")}</div>`;
  $("#sbNext").onclick=()=>sessNext(false); $("#sbEnd").onclick=endSession;
}
const sessBtn=()=>`<button class="btn" id="sessGo">${sess&&sess.i<sess.steps.length-1?"Weiter zum nächsten Schritt":"Einheit abschließen"}</button>`;
document.addEventListener("click",e=>{ if(e.target.closest("#sessGo")) sessNext(true); });
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

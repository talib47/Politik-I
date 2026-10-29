/* ================= Zeichenfläche für den Stift (Schreibfeld auf Karten) ================= */
function drawSurface(c,strokes){
  const ctx=c.getContext("2d"); let penSeen=false, curS=null;
  const color=()=>getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()||"#8A2E3B";
  function size(){ const r=c.getBoundingClientRect(), dpr=window.devicePixelRatio||1; c.width=r.width*dpr; c.height=r.height*dpr; ctx.setTransform(dpr,0,0,dpr,0,0); draw(); }
  function draw(){ const r=c.getBoundingClientRect(); ctx.clearRect(0,0,r.width,r.height); ctx.lineCap="round"; ctx.lineJoin="round"; ctx.strokeStyle=color();
    for(const s of strokes){ for(let i=1;i<s.length;i++){ ctx.lineWidth=s[i][2]; ctx.beginPath(); ctx.moveTo(s[i-1][0]*r.width,s[i-1][1]*r.height); ctx.lineTo(s[i][0]*r.width,s[i][1]*r.height); ctx.stroke(); } } }
  const pt=e=>{ const r=c.getBoundingClientRect(); const p=e.pressure&&e.pointerType==="pen"?e.pressure:.5; return [(e.clientX-r.left)/r.width,(e.clientY-r.top)/r.height,1.2+p*2.6]; };
  c.onpointerdown=e=>{ if(e.pointerType==="pen") penSeen=true; if(penSeen&&e.pointerType==="touch") return; curS=[pt(e)]; strokes.push(curS); try{c.setPointerCapture(e.pointerId);}catch(x){} };
  c.onpointermove=e=>{ if(!curS) return; const evs=e.getCoalescedEvents?e.getCoalescedEvents():[e]; for(const ev of evs) curS.push(pt(ev)); draw(); };
  c.onpointerup=c.onpointercancel=()=>{ curS=null; };
  size(); window.addEventListener("resize",size);
  return {undo(){ strokes.pop(); draw(); }, clear(){ strokes.length=0; draw(); }};
}

/* ================= Fortschritt ================= */
function lessonState(id){ return (state.lessons||{})[id]; }
function cardBox(id){ return (state.box||{})[id]||0; }
function chapterProgress(n){
  const L=LESSONS[n]||[], K=CARDS[n]||[], X=kreuzOf(n), W=essaysOf(n);
  if(!L.length) return null;
  const l=L.filter(x=>lessonState(x.id)).length/L.length;
  const k=K.length? K.filter(x=>cardBox(x.id)>=3).length/K.length : 1;
  const x=X.length? X.filter(i=>(kzStat(i.id)||{}).best===4).length/X.length : 1;
  const w=W.length? W.filter(i=>essayScore(i.id)).length/W.length : 1;
  const parts=[[l,.3,1],[k,.3,K.length],[x,.2,X.length],[w,.2,W.length]].filter(p=>p[2]);
  const wsum=parts.reduce((s,p)=>s+p[1],0);
  return {l,k,x,w,total:Math.round(parts.reduce((s,p)=>s+p[0]*p[1],0)/wsum*100)};
}
/* Was ist als Nächstes dran? Theorie zuerst, dann Karten, Selbsttest, Schreiben */
function nextStep(){
  for(const ch of courseChs()){ const n=ch.n; if(!isReady(n)) continue;
    const L=LESSONS[n], li=L.findIndex(x=>!lessonState(x.id));
    if(li>=0) return {label:`Sitzung ${ch.no} · Theorie`, title:L[li].t, go:()=>openLesson(n,li), lesson:true};
    if((CARDS[n]||[]).some(x=>!isSeen(x.id))) return {label:`Sitzung ${ch.no} · Karten`, title:"Begriffe festigen", go:()=>openCards(n)};
    if(kreuzOf(n).some(x=>!kzStat(x.id))) return {label:`Sitzung ${ch.no} · Selbsttest`, title:"Wahr oder falsch?", go:()=>openKreuz(n)};
    if(essaysOf(n).some(x=>!essayScore(x.id))) return {label:`Sitzung ${ch.no} · Schreiben`, title:"Essay-Fragen üben", go:()=>openEssay(n)};
  }
  if(!readyNs().length) return null;
  return {label:"Wiederholen", title:"Gemischt üben hält alles frisch", go:()=>openCards(0)};
}

/* ================= Navigation ================= */
let view="home", cur={};
const TABS=[["home","Lernpfad"],["practice","Üben"],["stats","Statistik"]];
const TAB_OF={home:"home",chapter:"home",lesson:"home",sessdone:"home",kreuz:"practice",cards:"practice",practice:"practice",stats:"stats",exam:"practice",essay:"practice",recall:"practice",who:"practice",terms:"practice",outline:"practice"};
function renderNav(){
  $("#nav").innerHTML=TABS.map(([k,l])=>`<button data-v="${k}"${TAB_OF[view]===k?' aria-current="page"':""}>${l}</button>`).join("");
  $("#nav").querySelectorAll("button").forEach(b=>b.onclick=()=>go(b.dataset.v));
}
function go(v){ view=v; render(); window.scrollTo(0,0); }
function render(){ renderNav(); ({home:renderHome,chapter:renderChapter,lesson:renderLesson,cards:renderCards,practice:renderPractice,stats:renderStats,exam:renderExam,essay:renderEssay,kreuz:renderKreuz,recall:renderRecall,who:renderWho,terms:renderTerms,outline:renderOutline,sessdone:renderHome})[view](); addSwitch(); updateSessBar(); }
const backTo=label=>`<button class="crumb" id="crumb">← ${label}</button>`;
function bindCrumb(fn){ const b=$("#crumb"); if(b) b.onclick=fn; }
const chLabel=n=>{ const c=chOf(n); return c?"Sitzung "+c.no:""; };
function logDay(){ const k=today(); state.days[k]=(state.days[k]||0)+1; }
const copyForClaude=(text,holder)=>copyText(text,holder);

/* Umschalter Vorlesung / Seminar oben auf den Übersichtsseiten (wie in der W&G-I-App) */
function addSwitch(){
  if(!["home","practice","stats"].includes(view)||sess) return;
  $("#app").insertAdjacentHTML("afterbegin",`<div class="switch" role="group" aria-label="Veranstaltung wählen">
    ${["vl","se"].map(c=>`<button data-c="${c}" aria-pressed="${state.course===c}">${COURSES[c].short}<small>${COURSES[c].who}</small></button>`).join("")}</div>`);
  document.querySelectorAll(".switch button").forEach(b=>b.onclick=()=>{ if(state.course===b.dataset.c) return; state.course=b.dataset.c; save(); render(); window.scrollTo(0,0); });
}

/* ================= Lernpfad ================= */
function renderHome(){
  const C=COURSES[state.course], nx=nextStep(), ready=readyNs().length;
  const chapRow=ch=>{ const p=chapterProgress(ch.n);
    return `<button class="chap${p?"":" off"}" data-n="${ch.n}" ${p?"":"disabled"}>
      <span class="no">${ch.no}</span><span class="t">${ch.title}</span>${p?`<span class="chip ${p.total>=80?"l3":p.total>0?"l2":""}">${p.total} %</span>`:`<span class="chip soon">${ch.date||"folgt"}</span>`}
      <span class="d">${ch.teaser}</span>${p?`<span class="bar"><i style="width:${p.total}%"></i></span>`:""}
    </button>`; };
  const chs=courseChs();
  $("#app").innerHTML=`
    <p class="eyebrow">${C.eyebrow}</p>
    <h1>${C.title}</h1>
    ${ready?todayBlock():""}
    ${homeReview()}
    ${nx&&ready?`<div class="block"><p class="eyebrow">Als Nächstes · ${nx.label}</p><h2>${nx.title}</h2><button class="btn ghost" id="goNext">Weiter lernen</button></div>`:""}
    ${chs.length?`<p class="sect"><span>Sitzungen</span><span>${state.course==="vl"?"Folien nach jeder Sitzung":"Texte auf Moodle, asynchron"}</span></p><div class="block"><div class="tlist">${chs.map(chapRow).join("")}</div></div>`:""}
    ${examInfoBlock()}
    ${state.course==="vl"?essayHowTo():seHowTo()}`;
  if($("#goNext")) $("#goNext").onclick=nx.go;
  if($("#goSess")) $("#goSess").onclick=()=>{ if(sess) runStep(); else startSession(); };
  bindReview();
  document.querySelectorAll(".chap").forEach(b=>b.onclick=()=>{ if(b.disabled) return; cur.ch=+b.dataset.n; go("chapter"); });
}
/* So wird geprüft: aus den Unterlagen (Folie Sitzung 1; Seminar laut Modulbeschreibung) */
function examInfoBlock(){
  const T=examDateTs(), days=T?Math.ceil((T-dayStart())/864e5):null;
  const when=T?`${fmtDate(T)} ${new Date(T).getFullYear()}${days>0?`, noch <b>${days} Tage</b>`:days===0?", <b>heute</b>":""}`:"steht noch nicht fest";
  if(state.course==="vl") return `<div class="block"><h2>So wird geprüft</h2>
    <div class="klist">
      <b>Form</b><span><b>Essay, 60 Minuten</b>, schriftlich am PC in der PC-Hall</span>
      <b>Bewertung</b><span>unbenotet, also nur bestehen</span>
      <b>Termin</b><span>${when}. Zweittermin 04.03.2027, jeweils 14–15 Uhr</span>
      <b>Anmeldung</b><span>über HIS in One</span>
      <b>Hilfen</b><span>Fragen und kurze Essay-Aufgabe auf Acemate (Moodle), Q&amp;A am 21.01.</span>
    </div>
    <p class="small muted" style="margin:0">Quelle: Folie „Modulprüfung“ vom 15.10. Dort steht beim Termin „2026“, gemeint ist Februar 2027. In der Projektbeschreibung steht „Klausur“, die Folie gilt.</p></div>`;
  return `<div class="block"><h2>So wird geprüft</h2>
    <div class="klist">
      <b>Form</b><span><b>Essayklausur, 60 Minuten</b>, in Präsenz in der PC-Hall Essen (A-009), keine Hilfsmittel</span>
      <b>Aufgabe</b><span>ein Essay von <b>etwa 500 Wörtern</b> zu <b>einer von drei Fragen</b>. Die Fragen kommen aus den Themen der wöchentlichen Präsentationen.</span>
      <b>Bewertung</b><span>bestanden oder nicht bestanden. Vier Kriterien: Aufbau und Struktur, Argumentation, Fachwissen, Anwendung des fachspezifischen Wissens. Je Kriterium „gut“, „hinreichend“ oder „unzureichend“. Bestanden, wenn kein Kriterium unzureichend ist.</span>
      <b>Termin</b><span>${when}, 8–10 Uhr. Wiederholung: Termin folgt</span>
      <b>Themen</b><span>werden am Ende der Vorlesungszeit abgestimmt und in der Abschlusssitzung am 28.01. (Zoom) bekannt gegeben, die konkreten Fragen nicht</span>
    </div>
    <p class="small muted" style="margin:0">Quelle: Verlaufsplan und Moodle-Kurs von Dr. Oliver Schwarz. Die Projektbeschreibung nennt noch Bieber und „Klausur“, es gilt der Verlaufsplan.</p></div>
  <div class="block"><h2>Weitere Anforderungen</h2>
    <div class="klist">
      <b>Lektüre</b><span>Textgrundlage jeder Sitzung vorbereitend lesen</span>
      <b>Presseschau</b><span>etwa 10 Minuten, vertonte PPT als MP4 (siehe unten)</span>
      <b>Bibliotheksschein</b><span>dreiteilig, empfohlen ist „Fachrecherche Politikwissenschaft“. Bestätigung als PDF bis <b>Fr 05.02.2027</b> in Moodle hochladen</span>
    </div></div>`;
}
function essayHowTo(){
  return `<div class="block">
    <h2>Wie schreibe ich das Essay? <span class="erg">Ergänzung</span></h2>
    <p class="small muted">Allgemeine Regeln für Essay-Prüfungen in der Politikwissenschaft, nicht von Schwanholz. Was sie genau erwartet, klärt das Q&amp;A am 21.01.</p>
    <ol class="gl">
      <li><b>Frage zerlegen</b> (3 Min.): Was ist der Operator? „Erläutern“ heißt erklären mit Beispiel, „diskutieren“ heißt Für und Wider abwägen, „beurteilen“ heißt am Ende Stellung beziehen.</li>
      <li><b>Gliederung skizzieren</b> (7 Min.): Einleitung, zwei bis vier Argumentationsschritte, Fazit. Zu jedem Schritt die Autoren notieren.</li>
      <li><b>Einleitung:</b> Thema, zentraler Begriff mit Definition (mit Autor), Fragestellung, kurzer Fahrplan.</li>
      <li><b>Hauptteil:</b> je Absatz ein Gedanke. Begriff erklären, mit Autor belegen, an einem Land oder Beispiel zeigen.</li>
      <li><b>Fazit:</b> Frage direkt beantworten, eigene begründete Einschätzung, Grenzen nennen.</li>
      <li><b>Schluss</b> (5 Min.): Durchlesen, Fachbegriffe prüfen.</li>
    </ol></div>`;
}
/* Seminar: Presseschau (Studienleistung) und Essay-Hinweise, nach dem Verlaufsplan von Dr. Schwarz */
function seHowTo(){
  const open=Date.now()<new Date(2026,10,5).getTime();
  return `<div class="block"><h2>Presseschau (Studienleistung)</h2>
    ${open?`<p class="small" style="margin:0 0 8px"><b>Thema wählen bis Mi 04.11., 23:59</b> in Moodle unter „Vergabe Presseschauen und Referate“.</p>`:""}
    <div class="klist">
      <b>Länge</b><span>etwa 10 Minuten (ein Referat wären 20–25 Minuten)</span>
      <b>Inhalt</b><span>Presseberichte der <b>vergangenen Woche</b> zu seminarrelevanten Themen</span>
      <b>Zeitungen</b><span>FAZ, Handelsblatt, Süddeutsche, Welt; dazu FAS, Welt am Sonntag, Die Zeit</span>
      <b>Folien</b><span>PPT mit Schlagzeilen und ggf. Bildern, Grafiken, Tabellen oder Textstellen. Vorbild: Presseschau des Deutschlandfunks</span>
      <b>Abgabe</b><span>Folien selbst vertonen, <b>nur als MP4</b> auf Sciebo hochladen, Link und PDF der Folien per Mail an Dr. Schwarz, <b>am Vortag der Sitzung bis 12 Uhr</b></span>
    </div>
    <p class="small muted" style="margin:0">Anleitungen zum Vertonen (Windows und Mac) sind im Verlaufsplan verlinkt. Für Gliederung, Folien und Sprechtext kannst du mich im Projekt-Chat fragen.</p></div>
  <div class="block">
    <h2>Wie schreibe ich das Essay bei Schwarz? <span class="erg">Ergänzung</span></h2>
    <p class="small muted">Vorgaben aus dem Verlaufsplan: etwa 500 Wörter, 60 Minuten, eine von drei Fragen, vier Kriterien. Die Schritte darunter sind allgemeine Regeln, keine Vorgaben von Schwarz. Er verweist auf die Göttinger Handreichung „Einen wissenschaftlichen Essay schreiben“.</p>
    <ol class="gl">
      <li><b>Frage wählen</b> (5 Min.): alle drei lesen, die nehmen, zu der dir Autoren und ein Beispiel einfallen.</li>
      <li><b>Gliedern</b> (10 Min.): These, zwei bis drei Argumente mit Autor, ein Gegenargument, Fazit. 500 Wörter sind nur fünf bis sechs Absätze.</li>
      <li><b>Einleitung</b> (ca. 80 Wörter): Thema, zentraler Begriff, Fragestellung, deine These.</li>
      <li><b>Hauptteil</b> (ca. 330 Wörter): je Absatz ein Argument. Begriff klären (Fachwissen), auf die Frage beziehen (Anwendung), begründen (Argumentation).</li>
      <li><b>Fazit</b> (ca. 80 Wörter): Frage direkt beantworten, Position begründen, Grenze nennen.</li>
      <li><b>Durchlesen</b> (5 Min.): Roter Faden? Jedes der vier Kriterien sichtbar?</li>
    </ol></div>`;
}
/* Unklar markierte Lektionen auf der Startseite */
function lessonRef(id){ for(const ch of courseChs()){ const i=(LESSONS[ch.n]||[]).findIndex(x=>x.id===id); if(i>=0) return {n:ch.n,i,t:LESSONS[ch.n][i].t,ch:"Sitzung "+ch.no}; } return null; }
function homeReview(){
  const unc=Object.keys(state.unclear||{}).map(lessonRef).filter(Boolean);
  if(!unc.length) return "";
  return `<div class="block"><h3>Nochmal anschauen</h3><p class="small muted" style="margin:0 0 4px">Als unklar markiert. Tippe in der Lektion auf „Jetzt verstanden“, wenn es sitzt.</p><div class="tlist">${unc.map(r=>`<button class="titem rv" data-n="${r.n}" data-i="${r.i}"><span class="t">${r.t}</span><span class="chip unk">unklar</span><span class="d">${r.ch}</span></button>`).join("")}</div></div>`;
}
function bindReview(){ document.querySelectorAll(".rv").forEach(b=>b.onclick=()=>openLesson(+b.dataset.n,+b.dataset.i)); }

/* ================= Sitzung ================= */
function renderChapter(){
  const n=cur.ch, ch=chOf(n), p=chapterProgress(n);
  const L=LESSONS[n]||[], K=CARDS[n]||[], X=kreuzOf(n), W=essaysOf(n), WH=whoOf(n), Q=allQuestions().filter(q=>q.n===n);
  const nl=L.filter(x=>lessonState(x.id)).length, qd=Q.filter(q=>{ const s=qInfo(q.id); return s&&s.due<=Date.now(); }).length;
  const nx=X.filter(x=>(kzStat(x.id)||{}).best===4).length, nw=W.filter(x=>essayScore(x.id)).length;
  $("#app").innerHTML=`${backTo("Lernpfad")}
    <p class="eyebrow">${COURSES[ch.c].short} · Sitzung ${ch.no} · ${ch.date} · ${p.total} % geschafft</p>
    <h1>${ch.title}</h1>
    ${ch.lit?`<p class="small muted">${ch.lit}</p>`:""}
    <div class="block"><div class="modes">
      <button class="mode" id="mL"><span class="t">Theorie</span><span class="n">${nl}/${L.length}</span><span class="d">${L.length} kurze Lektionen. Zu jeder erst selbst überlegen, dann die Auswahl.</span></button>
      ${K.length?`<button class="mode" id="mK"><span class="t">Karten</span><span class="n">${dueCards(n).length} fällig · ${K.filter(x=>!isSeen(x.id)).length} neu</span><span class="d">Begriffe, Autoren, Aufzählungen. Drei Stufen: nicht gewusst, unsicher, sicher.</span></button>`:""}
      ${Q.length?`<button class="mode" id="mQ"><span class="t">Verständnisfragen</span><span class="n">${qd} fällig</span><span class="d">Die Fragen aus den Lektionen, mit wachsendem Abstand wiederholt.</span></button>`:""}
      ${WH.length?`<button class="mode" id="mW2"><span class="t">Was gehört wohin?</span><span class="n">${WH.filter(x=>(state.who||{})[x.id]&&state.who[x.id].last).length}/${WH.length}</span><span class="d">Aussagen dem richtigen Autor, Regimetyp oder Teilregime zuordnen.</span></button>`:""}
      ${X.length?`<button class="mode" id="mX"><span class="t">Selbsttest</span><span class="n">${nx}/${X.length} fehlerfrei</span><span class="d">Je drei Aussagen, wahr oder falsch. Prüft, ob du die Begriffe sauber auseinanderhältst.</span></button>`:""}
      ${W.length?`<button class="mode" id="mO"><span class="t">Gliederung in 10 Minuten</span><span class="n">${W.filter(x=>(state.outl||{})[x.id]).length}/${W.length}</span><span class="d">Prüfungsfrage lesen, nur die Gliederung schreiben, mit dem Vorschlag abgleichen.</span></button>
      <button class="mode" id="mW"><span class="t">Essay schreiben</span><span class="n">${nw}/${W.length}</span><span class="d">Ganze Antwort schreiben, am Erwartungshorizont abhaken, Musteressay lesen.</span></button>`:""}
    </div></div>
    <div class="block"><h3>Lektionen</h3><div class="tlist">${L.map((x,i)=>{ const s=lessonState(x.id);
      return `<button class="titem" data-i="${i}"><span class="t">${i+1}. ${x.t}</span>${isUnclear(x.id)?`<span class="chip unk">unklar</span>`:`<span class="chip ${s?(s.ok?"l3":"l2"):""}">${s?(s.ok?"sicher":"gelesen"):"offen"}</span>`}</button>`;}).join("")}</div></div>`;
  bindCrumb(()=>go("home"));
  $("#mL").onclick=()=>openLesson(n,Math.max(0,L.findIndex(x=>!lessonState(x.id))));
  if($("#mK")) $("#mK").onclick=()=>openCards(n);
  if($("#mQ")) $("#mQ").onclick=()=>{ const due=Q.filter(q=>{ const s=qInfo(q.id); return s&&s.due<=Date.now(); }); openRecall(due.length?due.slice(0,8):shuffle(Q).slice(0,8),n); };
  if($("#mW2")) $("#mW2").onclick=()=>openWho(8,n);
  if($("#mX")) $("#mX").onclick=()=>openKreuz(n);
  if($("#mO")) $("#mO").onclick=()=>openOutline(n);
  if($("#mW")) $("#mW").onclick=()=>openEssay(n);
  document.querySelectorAll(".titem").forEach(b=>b.onclick=()=>openLesson(n,+b.dataset.i));
}

/* ================= Lektion ================= */
function openLesson(n,i){ cur.ch=n; cur.li=i; cur.ans={}; cur.shown={}; go("lesson"); }
/* Tabellen in Lektionen aufbereiten: Begriffspaare ohne Kopfzeile werden Liste (Begriff fett),
   Tabellen mit Kopfzeile werden Gegenüberstellung, die auf dem Handy gestapelt wird */
function enhanceLesson(root){
  root.querySelectorAll("table.kvq").forEach(t=>{
    const rows=[...t.rows]; if(!rows.length) return;
    const head=rows[0].querySelectorAll("th").length===rows[0].cells.length && rows[0].cells.length>1;
    if(!head && rows.every(r=>r.cells.length===2)){
      const d=document.createElement("div"); d.className="dlist";
      rows.forEach(r=>{ const b=document.createElement("b"), s=document.createElement("span"); b.innerHTML=r.cells[0].innerHTML; s.innerHTML=r.cells[1].innerHTML; d.append(b,s); });
      t.replaceWith(d); return;
    }
    if(head){
      const H=[...rows[0].cells].map(c=>c.textContent.trim());
      const body=rows.slice(1); if(!body.length) return;
      const tight=rows.every(r=>[...r.cells].every(c=>c.textContent.trim().length<=18));
      const tb=document.createElement("table"); tb.className="cmp"+(tight?" tight":"");
      tb.innerHTML=`<thead><tr>${H.map(h=>`<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${body.map(r=>{
        if(r.cells.length===1||r.cells[0].colSpan>1) return `<tr><th scope="row" colspan="${H.length}">${r.cells[0].innerHTML}</th></tr>`;
        const c=[...r.cells]; return `<tr><th scope="row">${c[0].innerHTML}</th>${c.slice(1).map((x,j)=>`<td data-l="${esc(H[j+1]||"")}"><span>${x.innerHTML}</span></td>`).join("")}</tr>`; }).join("")}</tbody>`;
      t.replaceWith(tb);
    }
  });
}
function renderLesson(){
  const n=cur.ch, L=LESSONS[n], x=L[cur.li];
  const allAns=x.check.every((_,j)=>cur.ans[j]!==undefined), inSess=sess&&sess.steps[sess.i]&&sess.steps[sess.i].k==="lesson";
  $("#app").innerHTML=`${backTo(chLabel(n))}
    <p class="eyebrow">${chLabel(n)} · Lektion ${cur.li+1} von ${L.length}</p>
    <article class="block lesson"><h1>${x.t}</h1>${x.html}</article>
    <div class="block unc">${isUnclear(x.id)
      ?`<span class="small" style="flex:1;min-width:12rem"><b>Als unklar markiert.</b> Den Prompt kannst du in Claude einfügen.</span><button class="btn ghost small" id="uncCopy">Prompt nochmal kopieren</button><button class="btn small" id="uncOk">Jetzt verstanden</button>`
      :`<span class="small muted" style="flex:1;min-width:12rem">Etwas unklar? Markiert die Lektion und kopiert einen fertigen Prompt für Claude.</span><button class="btn ghost small" id="uncSet">Verstehe ich nicht</button>`}<div id="uncBox" style="width:100%"></div></div>
    <div class="block"><h3>Kurz prüfen</h3>${x.check.map((c,j)=>qBlock(c,j,cur.ans[j],(cur.shown||{})[j],j===0)).join("")}</div>
    <div class="lnav">
      ${cur.li>0?`<button class="btn ghost" id="prev">← Vorherige</button>`:"<span></span>"}
      ${allAns&&inSess?sessBtn():allAns?(cur.li<L.length-1?`<button class="btn" id="next">Nächste Lektion →</button>`:`<button class="btn" id="fin">Zur Übersicht</button>`):`<span class="small muted">Beantworte die Fragen, dann geht es weiter.</span>`}
    </div>`;
  enhanceLesson($("article.lesson"));
  bindCrumb(()=>go("chapter"));
  const keep=f=>{ const y=window.scrollY; f(); renderLesson(); window.scrollTo(0,y); };
  document.querySelectorAll("[data-show]").forEach(b=>b.onclick=()=>keep(()=>{ cur.shown[+b.dataset.show]=true; }));
  document.querySelectorAll("[data-q]").forEach(b=>b.onclick=()=>{
    const j=+b.dataset.q, k=+b.dataset.k; if(cur.ans[j]!==undefined) return; cur.ans[j]=k; qGrade(qid(x.id,j),k===x.check[j].a,k===-1);
    if(x.check.every((_,q)=>cur.ans[q]!==undefined)){ const ok=x.check.every((c,q)=>cur.ans[q]===c.a); state.lessons[x.id]={ok, t:Date.now()}; }
    logDay(); save(); keep(()=>{});
  });
  const unc=()=>copyText(unclearPrompt(n,x),"#uncBox");
  if($("#uncSet")) $("#uncSet").onclick=()=>{ state.unclear[x.id]=Date.now(); save(); keep(()=>{}); unc(); };
  if($("#uncCopy")) $("#uncCopy").onclick=unc;
  if($("#uncOk")) $("#uncOk").onclick=()=>{ delete state.unclear[x.id]; save(); toast("Markierung entfernt"); keep(()=>{}); };
  if($("#prev")) $("#prev").onclick=()=>openLesson(n,cur.li-1);
  if($("#next")) $("#next").onclick=()=>openLesson(n,cur.li+1);
  if($("#fin")) $("#fin").onclick=()=>go("chapter");
}
/* Rückmeldung zu Verständnisfragen: warum diese Wahl falsch ist, was richtig ist */
function feedback(c,a){
  const right=`<b>Richtig</b><span>${inl(c.o[c.a])}</span>`;
  if(a===c.a) return `<div class="fb good"><p class="fh">Richtig.</p><p style="margin:0">${inl(c.ex)}</p></div>`;
  if(a===-1) return `<div class="fb idk"><p class="fh">Kein Problem, die Frage kommt morgen noch einmal.</p><div class="dlist">${right}<b>Warum</b><span>${inl(c.ex)}</span></div></div>`;
  const why=c.w&&c.w[a];
  return `<div class="fb bad"><p class="fh">Nicht ganz.</p><div class="dlist">${why?`<b>Warum nicht</b><span>${inl(why)}</span>`:""}${right}<b>${why?"Der Unterschied":"Warum"}</b><span>${inl(c.ex)}</span></div></div>`;
}
/* „Verstehe ich nicht“: Markierung und fertiger Prompt für Claude */
const isUnclear=id=>!!(state.unclear||{})[id];
function unclearPrompt(n,x){
  const d=document.createElement("div"); d.innerHTML=x.html;
  d.querySelectorAll("li").forEach(li=>li.prepend("- ")); d.querySelectorAll("p,div,li,tr,h3").forEach(el=>el.append("\n"));
  d.querySelectorAll("td,th").forEach(el=>el.append(" | "));
  const txt=d.textContent.replace(/[ \t]+\n/g,"\n").replace(/\n{3,}/g,"\n\n").trim();
  const ch=chOf(n), C=COURSES[ch.c];
  return `Ich lerne für das Modul Grundlagen Politik I (UDE, Lehramt GyGe), ${C.short} „${C.title}“ bei ${C.who}. Die Prüfung ist ${ch.c==="vl"?"ein Essay von 60 Minuten":"eine Essayklausur: etwa 500 Wörter in 60 Minuten zu einer von drei Fragen, bestanden oder nicht"}. Diese Lektion verstehe ich noch nicht.

Sitzung ${ch.no}: ${ch.title}
Lektion: ${x.t}

Lektionstext:
${txt}

Bitte erkläre mir das einfacher: kurze Sätze, Fachbegriffe kurz erklärt, mit einem Beispiel aus Deutschland oder aus der Schule. Bleib bei den Begriffen und Autoren der Vorlesung und erfinde nichts dazu. Stell mir danach zwei Kontrollfragen. Die Lösungen bitte erst, wenn ich geantwortet habe.`;
}

/* ================= Karten (Karteikasten, Fächer 0–5) ================= */
/* Alte Schreibweise der Rückseiten in das gemeinsame Textformat (format.js) übersetzen:
   „A vs. B“ mit Zeilen „Merkmal: a / b“ wird Gegenüberstellung, einfache Zeilen werden Aufzählung */
function toRich(c){
  const lines=String(c.b).split("\n").map(s=>s.trim()).filter(Boolean);
  if(lines.length===1) return lines[0];
  const vs=c.f.split(/\s+vs\.\s+/), kv=/^([^:]{1,38}):\s+(.+)$/;
  if(vs.length===2 && lines.every(l=>kv.test(l)&&l.match(kv)[2].includes(" / ")))
    return ["| | "+vs.map(x=>x.replace(/[?:]$/,"")).join(" | ")].concat(lines.map(l=>{ const m=l.match(kv), p=m[2].split(" / "); return `| ${m[1]} | ${p[0]} | ${p.slice(1).join(" / ")}`; })).join("\n");
  return lines.map(l=>/^\d+[.)] /.test(l)||/^[-•] /.test(l)||/^([^:=⇒]{1,42}): (.+)$/.test(l)&&!/[.!?]$/.test(l.split(":")[0])&&!/,\s/.test(l.split(":")[0])?l:"- "+l).join("\n");
}
const DECK_NAME={b:"Begriffe", br:"Begriffe umgekehrt"};
const deckLabel=n=>DECK_NAME[n]?"Begriffe":n?chLabel(n):"Üben";
const deckBack=n=>DECK_NAME[n]?go("terms"):n?go("chapter"):go("practice");
function allCards(n){
  if(DECK_NAME[n]) return (CARDS[n]||[]).filter(x=>termCourse(x.id)===state.course);
  if(n) return CARDS[n]||[];
  return courseChs().flatMap(c=>CARDS[c.n]||[]).concat(allCards("b"),allCards("br"));
}
function chapterOfCard(id){ for(const ch of CHAPTERS) if((CARDS[ch.n]||[]).some(x=>x.id===id)) return "Sitzung "+ch.no+" · "+ch.title; return ""; }
const INTERVAL=[0,0,1,3,7,16];   // Tage bis zur nächsten Abfrage je Fach; Fach 5 erneut gewusst: 35 Tage
const dayStart=(t=Date.now())=>{ const d=new Date(t); d.setHours(0,0,0,0); return d.getTime(); };
const isSeen=id=>!!(state.box||{})[id];
const isDue=id=>isSeen(id) && ((state.due||{})[id]||0)<=Date.now();
function dueCards(n){ return allCards(n).filter(x=>isDue(x.id)).sort((a,b)=>((state.due||{})[a.id]||0)-((state.due||{})[b.id]||0)); }
function openCards(n,free,deck){ cur.cardCh=n; cur.free=!!free; cur.deck=deck?deck.slice():(free?buildDeck(n):buildDueDeck(n)); cur.ci=0; cur.flip=false; cur.right=0; cur.unsure=0; cur.typed=""; cur.tyOpen=false; cur.hist=[]; cur.requeued={}; go("cards"); }
function buildDueDeck(n){
  const due=dueCards(n), fresh=n? allCards(n).filter(x=>!isSeen(x.id)) : [];
  return due.concat(fresh).slice(0,Math.max(10,Math.min(due.length,30)));
}
function buildDeck(n){
  const pool=allCards(n).slice(), deck=[];
  while(deck.length<Math.min(10,pool.length)){
    const w=pool.map(x=>[6,5,4,3,2,1][cardBox(x.id)]); let r=Math.random()*w.reduce((a,b)=>a+b,0), i=0;
    for(;i<pool.length;i++){ r-=w[i]; if(r<=0) break; } deck.push(pool.splice(Math.min(i,pool.length-1),1)[0]);
  }
  return deck;
}
function renderCards(){
  const D=cur.deck, n=cur.cardCh;
  if(cur.ci>=D.length){
    const left=dueCards(n).length+(n?allCards(n).filter(x=>!isSeen(x.id)).length:0);
    const nextDue=allCards(n).filter(x=>isSeen(x.id)&&!isDue(x.id)).map(x=>(state.due||{})[x.id]).sort((a,b)=>a-b)[0];
    const when=nextDue? Math.round((dayStart(nextDue)-dayStart())/864e5) : null;
    $("#app").innerHTML=`${backTo(deckLabel(n))}<h1>${D.length?(left?"Runde geschafft":"Für heute erledigt"):"Nichts fällig"}</h1>
      <div class="block">${D.length?`<p>${cur.right} sicher, ${cur.unsure||0} nicht sicher.</p>`:""}
      <p class="small muted">${left?`Noch ${left} Karten fällig oder neu.`:`Alle Karten${n?" dieses Stapels":""} sind auf dem Stand. ${when!=null?`Die nächsten werden ${when<=0?"heute":when===1?"morgen":"in "+when+" Tagen"} fällig.`:""}`} Sichere Karten kommen nach 1, 3, 7, 16 und 35 Tagen wieder, nicht sichere gleich in dieser Runde und morgen noch einmal.</p>
      <div class="row">${sess?sessBtn():`${left?`<button class="btn" id="again">Weiter</button>`:""}${allCards(n).length?`<button class="btn ghost" id="free">Freiwillig weiterüben</button>`:""}<button class="btn ghost" id="out">Fertig</button>`}</div></div>`;
    bindCrumb(()=>deckBack(n)); if($("#again")) $("#again").onclick=()=>openCards(n); if($("#free")) $("#free").onclick=()=>openCards(n,true); if($("#out")) $("#out").onclick=()=>deckBack(n); return;
  }
  const c=D[cur.ci], b=cardBox(c.id);
  const esc=t=>t.replace(/&/g,"&amp;").replace(/</g,"&lt;");
  $("#app").innerHTML=`${backTo(deckLabel(n))}
    <div class="row between"><p class="eyebrow" style="margin:0">Karte ${cur.ci+1} von ${D.length}${cur.free?" · freiwillig":isSeen(c.id)?" · fällig":" · neu"}</p><span class="crt">${cur.hist.length?`<button class="cundo" id="cprev" aria-label="Eine Karte zurück" title="Eine Karte zurück"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 14 4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-3"/></svg></button>`:""}<span class="dots" aria-label="Fach ${b} von 5">${[1,2,3,4,5].map(i=>`<i class="${i<=b?"on":""}"></i>`).join("")}</span></span></div>
    <div class="swipewrap">
    <div class="block card${cur.enter?" enter":""}" id="theCard" style="margin-top:8px" role="button" tabindex="0" aria-label="Karte umdrehen"><i class="tint" aria-hidden="true"></i><p class="cctx">${inl(CARD_CTX[c.id]||chapterOfCard(c.id))}</p><div class="front">${inl(c.f)}</div>${cur.flip?`${cur.typed.trim()?`<div class="typed"><span class="small muted">Deine Antwort</span><p>${esc(cur.typed)}</p></div>`:""}<div class="back">${richText(c.rich||toRich(c))}</div>${cardInfoHTML(c.id)}`:`<p class="tap">Tippen zum Umdrehen</p>`}</div></div>
    ${cur.flip?`<div class="grade"><button class="btn ghost" id="mid">← Nicht sicher</button><button class="btn" id="yes">Sicher →</button></div>`
      :`${cur.tyOpen||cur.typed?`<textarea id="cty" class="cty" rows="1" placeholder="Deine Antwort …" aria-label="Antwort tippen">${esc(cur.typed)}</textarea>`:""}
      <div class="row"><button class="btn" id="flip" style="flex:1">Antwort zeigen</button>${cur.tyOpen||cur.typed?"":`<button class="tylink" id="tyO">Tippen</button>`}</div><p class="hint">Erst antworten, dann aufdecken.</p>`}`;
  bindCrumb(()=>deckBack(n));
  if($("#tyO")) $("#tyO").onclick=()=>{ cur.tyOpen=true; renderCards(); $("#cty").focus(); };
  const ta=$("#cty"); if(ta){ const fit=()=>{ ta.style.height="auto"; ta.style.height=ta.scrollHeight+"px"; }; fit(); ta.oninput=()=>{ cur.typed=ta.value; fit(); }; }
  if($("#flip")) $("#flip").onclick=()=>{ cur.flip=true; renderCards(); };
  const cd=$("#theCard"); let moved=false;
  cd.onclick=e=>{ if(e.target.closest("a")||moved) return; cur.flip=!cur.flip; renderCards(); };
  cd.onkeydown=e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); cd.click(); } else if(cur.flip&&e.key==="ArrowRight") grade(2); else if(cur.flip&&e.key==="ArrowLeft") grade(1); };
  /* Wischen wie bei Dating-Apps, erst nach dem Aufdecken: rechts sicher, links nicht sicher.
     Die Karte folgt dem Finger, eine leichte Tönung zeigt die Richtung an. */
  if(cur.flip){ const tint=cd.querySelector(".tint"); let x0=null, y0=0, dx=0, raf=0, w=360, dir=0;
    /* Pro Bild nur transform und opacity ändern: beides läuft auf dem Grafikchip, nichts wird neu gezeichnet */
    const paint=()=>{ raf=0; const k=Math.min(1,Math.abs(dx)/(w*.35)), d=dx>0?1:-1;
      if(d!==dir){ dir=d; tint.className="tint "+(d>0?"ok":"no"); }
      cd.style.transform=`translate3d(${dx}px,0,0) rotate(${dx/45}deg)`; tint.style.opacity=k; };
    cd.onpointerdown=e=>{ if(e.target.closest("a")) return; x0=e.clientX; y0=e.clientY; dx=0; moved=false; w=cd.offsetWidth||360; };
    cd.onpointermove=e=>{ if(x0===null) return; const d=e.clientX-x0;
      if(!moved){ if(Math.abs(d)>6&&Math.abs(d)>Math.abs(e.clientY-y0)){ moved=true; x0+=d>0?6:-6; try{cd.setPointerCapture(e.pointerId);}catch(x){} cd.style.transition="none"; tint.style.transition="none"; } else return; }
      e.preventDefault(); dx=e.clientX-x0; if(!raf) raf=requestAnimationFrame(paint); };
    cd.onpointerup=cd.onpointercancel=()=>{ if(x0===null) return; x0=null; if(!moved) return; if(raf){ cancelAnimationFrame(raf); raf=0; }
      const lim=Math.min(100,w*.25);
      if(Math.abs(dx)>lim){ const out=(dx>0?1:-1)*(window.innerWidth+100);
        cd.style.transition="transform .3s cubic-bezier(.2,.7,.3,1), opacity .3s ease-out"; cd.style.transform=`translate3d(${out}px,0,0) rotate(${dx>0?12:-12}deg)`; cd.style.opacity="0";
        setTimeout(()=>{ cur.enter=true; grade(dx>0?2:1); },220); }
      else { cd.style.transition="transform .35s cubic-bezier(.3,1.4,.5,1)"; tint.style.transition="opacity .25s"; cd.style.transform=""; tint.style.opacity="0"; setTimeout(()=>{ moved=false; },0); } };
  }
  /* Bewertung: 2 sicher (nächstes Fach), 1 nicht sicher (ein Fach zurück, morgen wieder, in dieser Runde noch einmal) */
  function grade(lv){ state.box=state.box||{}; state.due=state.due||{}; state.lapses=state.lapses||{};
    const b0=cardBox(c.id), old=state.due[c.id]||0;
    cur.hist.push({ci:cur.ci, id:c.id, box:state.box[c.id], due:state.due[c.id], lapse:state.lapses[c.id], right:cur.right, unsure:cur.unsure, len:D.length, rq:Object.assign({},cur.requeued), typed:cur.typed});
    const b1= lv===2? Math.min(5,Math.max(b0,1)+1) : Math.max(1,b0-1);
    const nd= lv===2? dayStart()+(b0===5?35:INTERVAL[b1])*864e5 : dayStart()+864e5;
    if(!cur.free){ state.box[c.id]=b1; state.due[c.id]=nd; }
    else if(lv<2){ state.box[c.id]=Math.min(b0||1,b1); state.due[c.id]=Math.min(old||nd,nd); }
    if(lv===2) cur.right++;
    else { cur.unsure=(cur.unsure||0)+1; state.lapses[c.id]=(state.lapses[c.id]||0)+1; if(!cur.requeued[c.id]){ cur.requeued[c.id]=1; D.push(c); } }
    logDay(); save(); cur.ci++; cur.flip=false; cur.typed=""; renderCards(); window.scrollTo(0,0); }
  if($("#yes")) $("#yes").onclick=()=>{ cur.enter=true; grade(2); };
  if($("#mid")) $("#mid").onclick=()=>{ cur.enter=true; grade(1); };
  /* Eine Karte zurück: letzte Bewertung rückgängig machen */
  if($("#cprev")) $("#cprev").onclick=()=>{ const h=cur.hist.pop(); if(!h) return;
    const put=(o,k,v)=>{ if(v===undefined) delete o[k]; else o[k]=v; };
    put(state.box,h.id,h.box); put(state.due,h.id,h.due); put(state.lapses,h.id,h.lapse);
    cur.right=h.right; cur.unsure=h.unsure; D.length=h.len; cur.requeued=h.rq; cur.ci=h.ci; cur.flip=true; cur.typed=h.typed; save(); renderCards(); };
}

/* ================= Üben (sitzungsübergreifend, je Veranstaltung) ================= */
function renderPractice(){
  const ready=readyNs(), C=COURSES[state.course];
  if(!ready.length){
    $("#app").innerHTML=`<p class="eyebrow">${C.eyebrow}</p><h1>Üben</h1><div class="block"><p class="muted" style="margin:0">Für das ${C.short} gibt es noch keine Inhalte. Sobald die ersten Folien im Projekt liegen, kannst du hier gemischt üben.</p></div>`;
    return;
  }
  const W=essaysOf(0), WH=whoOf(0), T=allCards("b");
  $("#app").innerHTML=`<p class="eyebrow">${C.eyebrow}</p><h1>Üben</h1>
    <p class="muted">Gemischt aus allen fertigen Sitzungen (${ready.map(n=>chOf(n).no).join(", ")}). Gemischtes Üben ist anstrengender als blockweises, bleibt aber deutlich besser hängen.</p>
    <p class="sect"><span>Wiederholen</span><span></span></p>
    <div class="block"><div class="modes">
      <button class="mode" id="pK"><span class="t">Fällige Karten</span><span class="n">${dueCards(0).length} fällig</span><span class="d">Alle Karten und Begriffe, die heute dran sind. Neue Karten lernst du in der jeweiligen Sitzung.</span></button>
      <button class="mode" id="pQ"><span class="t">Verständnisfragen</span><span class="n">${qDue().length} fällig</span><span class="d">Erst selbst überlegen, dann die Auswahl. Falsche Fragen kommen morgen wieder.</span></button>
      ${WH.length?`<button class="mode" id="pW"><span class="t">Was gehört wohin?</span><span class="n">${WH.length} Aussagen</span><span class="d">${state.course==="se"?"Autoren, Zugänge der Regierungsforschung, Regierungssysteme, Policy-Phasen. Verwechseltes kommt öfter.":"Autoren, Regimetypen, Teilregime, Polity/Politics/Policy. Verwechseltes kommt öfter."}</span></button>`:""}
      ${T.length?`<button class="mode" id="pB"><span class="t">Begriffe und Abkürzungen</span><span class="n">${T.length} Begriffe</span><span class="d">In beide Richtungen, dazu das Lexikon mit Beispiel und typischer Verwechslung.</span></button>`:""}
      <button class="mode" id="pKr"><span class="t">Selbsttest gemischt</span><span class="n">${kreuzOf(0).filter(x=>(kzStat(x.id)||{}).best===4).length}/${kreuzOf(0).length} fehlerfrei</span><span class="d">Fünf Aufgaben mit je drei Aussagen, bevorzugt neue und solche mit Fehlern.</span></button>
    </div></div>
    ${W.length?`<p class="sect"><span>Im Prüfungsformat</span><span>${state.course==="se"?"Essay, ca. 500 Wörter, 60 Min.":"Essay, 60 Min."}</span></p>
    <div class="block"><div class="modes">
      <button class="mode" id="pO"><span class="t">Gliederung in 10 Minuten</span><span class="n">${W.filter(x=>(state.outl||{})[x.id]).length}/${W.length}</span><span class="d">Die wichtigste Essay-Fähigkeit: Frage zerlegen und eine tragfähige Gliederung bauen.</span></button>
      <button class="mode" id="pW2"><span class="t">Essay-Fragen schreiben</span><span class="n">${W.filter(x=>essayScore(x.id)).length}/${W.length}</span><span class="d">Eine Frage, mit oder ohne Gliederungshilfe. Danach Erwartungshorizont und Musteressay.</span></button>
      <button class="mode" id="pX"><span class="t">Probe-Essay, 60 Minuten</span><span class="n">${state.examRun?"läuft":(state.exams||[]).filter(e=>(e.c||"vl")===state.course).length+"×"}</span><span class="d">${state.course==="se"?"Wie am 04.02.: drei Fragen, eine wählen, 60 Minuten, keine Hilfen. Danach nach den vier Kriterien bewerten.":"Wie am Prüfungstag: eine Frage, Timer, keine Hilfen. Danach selbst oder von Claude bewerten lassen."}</span></button>
    </div></div>`:""}`;
  $("#pK").onclick=()=>openCards(0);
  $("#pQ").onclick=()=>{ const d=qDue(); openRecall(d.length?d.slice(0,8):shuffle(allQuestions()).slice(0,8)); };
  if($("#pW")) $("#pW").onclick=()=>openWho(8);
  if($("#pB")) $("#pB").onclick=()=>go("terms");
  $("#pKr").onclick=()=>openKreuz(0);
  if($("#pO")) $("#pO").onclick=()=>openOutline(0);
  if($("#pW2")) $("#pW2").onclick=()=>openEssay(0);
  if($("#pX")) $("#pX").onclick=()=>go("exam");
}

/* ================= Statistik ================= */
let statsArmed=false;
function renderStats(){
  const days=[...Array(7)].map((_,i)=>{ const d=new Date(); d.setDate(d.getDate()-6+i); const k=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); return [d,state.days[k]||0]; });
  const mx=Math.max(1,...days.map(x=>x[1])), wd=["So","Mo","Di","Mi","Do","Fr","Sa"];
  const ready=courseChs().filter(c=>isReady(c.n));
  $("#app").innerHTML=`<h1>Statistik</h1>
    <div class="block"><h2>Letzte 7 Tage</h2>
      <p class="small muted" style="margin:0">Aktionen pro Tag, Vorlesung und Seminar zusammen: jede beantwortete Karte, Frage oder Zuordnung zählt.</p>
      <div class="week7">${days.map(([d,n],i)=>`<div class="d${i===6?" today":""}" title="${n===1?"1 Aktion":n+" Aktionen"}">
        <div class="bw"><i style="height:${n?Math.max(4,Math.round(n/mx*100)):0}%"></i></div>
        <span class="wd">${wd[d.getDay()]}</span><span class="dt">${d.getDate()}.${d.getMonth()+1}.</span>
        <span class="n">${n||"–"}</span><span class="u">${n?(n===1?"Aktion":"Aktionen"):""}</span></div>`).join("")}</div></div>
    ${examPlanBlock()}
    ${weakBlock()}
    <div class="block"><h2>${COURSES[state.course].short}: nach Sitzung</h2>${ready.length?ready.map(c=>{ const p=chapterProgress(c.n);
      return `<div class="srow ch"><span>Sitzung ${c.no}: ${c.title}</span><span class="small muted">${[["Theorie",p.l,1],["Karten",p.k,(CARDS[c.n]||[]).length],["Selbsttest",p.x,kreuzOf(c.n).length],["Schreiben",p.w,essaysOf(c.n).length]].filter(x=>x[2]).map(x=>x[0]+" "+Math.round(x[1]*100)+" %").join(" · ")}</span><span class="pts">${p.total} %</span></div>`;}).join(""):`<p class="small muted" style="margin:0">Noch keine Sitzungen mit Inhalten.</p>`}</div>
    ${syncBox()}
    <div class="block"><h3>Fortschritt zurücksetzen</h3><p class="small muted">Löscht deinen gesamten Lernstand (Vorlesung und Seminar), auch auf den verbundenen Geräten.</p>
      <button class="btn warn" id="rst">${statsArmed?"Wirklich zurücksetzen":"Zurücksetzen"}</button></div>`;
  bindSync(); bindExamPlan(); bindWeak();
  $("#rst").onclick=()=>{ if(!statsArmed){ statsArmed=true; render(); return; } const c=state.course; state={}; norm(); state.course=c; save(); flushPush(); statsArmed=false; toast("Zurückgesetzt"); render(); };
}

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
    if(li>=0) return {label:`Sitzung ${ch.no} · Theorie`, title:L[li].t, go:()=>openLesson(n,li)};
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
const TAB_OF={home:"home",chapter:"home",lesson:"home",kreuz:"practice",cards:"practice",practice:"practice",stats:"stats",exam:"practice",essay:"practice"};
function renderNav(){
  $("#nav").innerHTML=TABS.map(([k,l])=>`<button data-v="${k}"${TAB_OF[view]===k?' aria-current="page"':""}>${l}</button>`).join("");
  $("#nav").querySelectorAll("button").forEach(b=>b.onclick=()=>go(b.dataset.v));
}
function go(v){ view=v; render(); window.scrollTo(0,0); }
function render(){ renderNav(); ({home:renderHome,chapter:renderChapter,lesson:renderLesson,cards:renderCards,practice:renderPractice,stats:renderStats,exam:renderExam,essay:renderEssay,kreuz:renderKreuz})[view](); addSwitch(); }
const backTo=label=>`<button class="crumb" id="crumb">← ${label}</button>`;
function bindCrumb(fn){ const b=$("#crumb"); if(b) b.onclick=fn; }
const chLabel=n=>{ const c=chOf(n); return c?"Sitzung "+c.no:""; };

/* Umschalter Vorlesung / Seminar oben auf den Übersichtsseiten (wie in der W&G-I-App) */
function addSwitch(){
  if(!["home","practice","stats"].includes(view)) return;
  $("#app").insertAdjacentHTML("afterbegin",`<div class="switch" role="group" aria-label="Veranstaltung wählen">
    ${["vl","se"].map(c=>`<button data-c="${c}" aria-pressed="${state.course===c}">${COURSES[c].short}<small>${COURSES[c].who}</small></button>`).join("")}</div>`);
  document.querySelectorAll(".switch button").forEach(b=>b.onclick=()=>{ if(state.course===b.dataset.c) return; state.course=b.dataset.c; save(); render(); window.scrollTo(0,0); });
}

/* ================= Lernpfad ================= */
function renderHome(){
  const C=COURSES[state.course], nx=nextStep(), due=dueCards(0).length;
  const chapRow=ch=>{ const p=chapterProgress(ch.n);
    return `<button class="chap${p?"":" off"}" data-n="${ch.n}" ${p?"":"disabled"}>
      <span class="no">${ch.no}</span><span class="t">${ch.title}</span>${p?`<span class="chip ${p.total>=80?"l3":p.total>0?"l2":""}">${p.total} %</span>`:`<span class="chip soon">${ch.date||"folgt"}</span>`}
      <span class="d">${ch.teaser}</span>${p?`<span class="bar"><i style="width:${p.total}%"></i></span>`:""}
    </button>`; };
  const chs=courseChs();
  $("#app").innerHTML=`
    <p class="eyebrow">${C.eyebrow}</p>
    <h1>${C.title}</h1>
    ${due?`<div class="block row between"><span><b>Heute fällig: ${due} Karten</b><br><span class="small muted">Zuerst wiederholen, dann Neues lernen.</span></span><button class="btn" id="goDue">Wiederholen</button></div>`:""}
    ${nx?`<div class="block today">
      <p class="eyebrow">Als Nächstes · ${nx.label}</p>
      <h2>${nx.title}</h2>
      <button class="btn" id="goNext">Weiter lernen</button>
    </div>`:""}
    ${state.course==="vl"?homeVL(chs,chapRow):homeSE(chs,chapRow)}`;
  if(nx) $("#goNext").onclick=nx.go;
  if($("#goDue")) $("#goDue").onclick=()=>openCards(0);
  document.querySelectorAll(".chap").forEach(b=>b.onclick=()=>{ if(b.disabled) return; cur.ch=+b.dataset.n; go("chapter"); });
}
function homeVL(chs,chapRow){
  return `<p class="sect"><span>Sitzungen</span><span>Folien nach jeder Sitzung</span></p>
    <div class="block"><div class="tlist">${chs.map(chapRow).join("")}</div></div>
    <div class="block info">
      <h2>So wird geprüft</h2>
      <dl>
        <div><dt>Form</dt><dd><b>Essay, 60 Minuten</b>, schriftlich am PC in der PC-Hall</dd></div>
        <div><dt>Bewertung</dt><dd>unbenotet, also nur bestehen</dd></div>
        <div><dt>Termine</dt><dd>04.02.2027, 14–15 Uhr · Zweittermin 04.03.2027, 14–15 Uhr</dd></div>
        <div><dt>Anmeldung</dt><dd>über HIS in One</dd></div>
        <div><dt>Hilfen</dt><dd>Fragen und kurze Essay-Aufgabe auf Acemate (Moodle), Q&amp;A am 21.01.</dd></div>
      </dl>
      <p class="small muted" style="margin:10px 0 0">Auf der Folie steht beim Termin „2026“, gemeint ist der Februar 2027.</p>
    </div>
    <div class="block">
      <h2>Wie schreibe ich das Essay? <span class="erg">Ergänzung</span></h2>
      <p class="small muted">Allgemeine Regeln für Essay-Prüfungen in der Politikwissenschaft, nicht von Schwanholz. Was sie genau erwartet, klärt das Q&amp;A am 21.01.</p>
      <ol class="gl">
        <li><b>Frage zerlegen</b> (3 Min.): Was ist der Operator? „Erläutern“ heißt erklären mit Beispiel, „diskutieren“ heißt Für und Wider abwägen, „beurteilen“ heißt am Ende Stellung beziehen.</li>
        <li><b>Gliederung skizzieren</b> (7 Min.): Einleitung, zwei bis vier Argumentationsschritte, Fazit. Zu jedem Schritt die Autoren notieren.</li>
        <li><b>Einleitung:</b> Thema, zentraler Begriff mit Definition (mit Autor), Fragestellung, kurzer Fahrplan.</li>
        <li><b>Hauptteil:</b> je Absatz ein Gedanke. Begriff erklären, mit Autor belegen, an einem Land oder Beispiel zeigen.</li>
        <li><b>Fazit:</b> Frage direkt beantworten, eigene begründete Einschätzung, Grenzen nennen.</li>
        <li><b>Schluss</b> (5 Min.): Durchlesen, Fachbegriffe prüfen.</li>
      </ol>
    </div>`;
}
function homeSE(chs,chapRow){
  return `${chs.length?`<p class="sect"><span>Sitzungen</span><span></span></p><div class="block"><div class="tlist">${chs.map(chapRow).join("")}</div></div>`:""}
    <div class="block info">
      <h2>Seminar bei Schwarz</h2>
      <dl>
        <div><dt>Start</dt><dd>Do 29.10., 8:15 Uhr, online über Zoom</dd></div>
        <div><dt>Prüfung</dt><dd>Klausur, dazu ein Vortrag als Studienleistung</dd></div>
        <div><dt>Themen</dt><dd>Politisches System Deutschlands und politische Architektur der EU</dd></div>
      </dl>
      <p class="small muted" style="margin:10px 0 0">Sobald die erste Sitzung gelaufen ist und die Folien im Projekt liegen, kommen hier die Sitzungen dazu, mit Lektionen, Karten und Probeklausur. Für den Vortrag gibt es dann einen eigenen Bereich.</p>
    </div>`;
}

/* ================= Kapitel ================= */
function renderChapter(){
  const n=cur.ch, ch=chOf(n), p=chapterProgress(n);
  const L=LESSONS[n]||[], K=CARDS[n]||[], X=kreuzOf(n), W=essaysOf(n);
  const nl=L.filter(x=>lessonState(x.id)).length;
  const nx=X.filter(x=>(kzStat(x.id)||{}).best===4).length, nw=W.filter(x=>essayScore(x.id)).length;
  $("#app").innerHTML=`${backTo("Lernpfad")}
    <p class="eyebrow">${COURSES[ch.c].short} · Sitzung ${ch.no} · ${ch.date} · ${p.total} % geschafft</p>
    <h1>${ch.title}</h1>
    ${ch.lit?`<p class="small muted">${ch.lit}</p>`:""}
    <div class="block"><div class="modes">
      <button class="mode" id="mL"><span class="t">Theorie</span><span class="n">${nl}/${L.length}</span><span class="d">${L.length} kurze Lektionen mit Verständnisfragen. Hier fängst du an.</span></button>
      ${K.length?`<button class="mode" id="mK"><span class="t">Karten</span><span class="n">${dueCards(n).length} fällig · ${K.filter(x=>!isSeen(x.id)).length} neu</span><span class="d">Begriffe, Autoren, Aufzählungen. Gewusste Karten kommen nach 1, 3, 7, 16 und 35 Tagen wieder.</span></button>`:""}
      ${X.length?`<button class="mode" id="mX"><span class="t">Selbsttest</span><span class="n">${nx}/${X.length} fehlerfrei</span><span class="d">Je drei Aussagen, wahr oder falsch. Prüft, ob du die Begriffe sauber auseinanderhältst.</span></button>`:""}
      ${W.length?`<button class="mode" id="mW"><span class="t">Schreiben</span><span class="n">${nw}/${W.length}</span><span class="d">Essay-Fragen wie in der Prüfung: gliedern, schreiben, am Erwartungshorizont abhaken, Musteressay lesen.</span></button>`:""}
    </div></div>
    <div class="block"><h3>Lektionen</h3><div class="tlist">${L.map((x,i)=>{ const s=lessonState(x.id);
      return `<button class="titem" data-i="${i}"><span class="t">${i+1}. ${x.t}</span>${state.unclear[x.id]?`<span class="chip flag">unklar</span>`:`<span class="chip ${s?(s.ok?"l3":"l2"):""}">${s?(s.ok?"sicher":"gelesen"):"offen"}</span>`}</button>`;}).join("")}</div></div>`;
  bindCrumb(()=>go("home"));
  $("#mL").onclick=()=>openLesson(n,Math.max(0,L.findIndex(x=>!lessonState(x.id))));
  if($("#mK")) $("#mK").onclick=()=>openCards(n);
  if($("#mX")) $("#mX").onclick=()=>openKreuz(n);
  if($("#mW")) $("#mW").onclick=()=>openEssay(n);
  document.querySelectorAll(".titem").forEach(b=>b.onclick=()=>openLesson(n,+b.dataset.i));
}

/* ================= Lektion ================= */
function openLesson(n,i){ cur.ch=n; cur.li=i; cur.ans={}; go("lesson"); }
function renderLesson(){
  const n=cur.ch, L=LESSONS[n], x=L[cur.li];
  const allAns=x.check.every((_,j)=>cur.ans[j]!==undefined);
  $("#app").innerHTML=`${backTo(chLabel(n))}
    <p class="eyebrow">${chLabel(n)} · Lektion ${cur.li+1} von ${L.length}</p>
    <article class="block lesson"><h1>${x.t}</h1>${x.html}</article>
    ${unclearBox(x)}
    <div class="block"><h3>Kurz prüfen</h3>${x.check.map((c,j)=>{ const a=cur.ans[j];
      return `<div style="margin-top:${j?16:4}px"><p style="margin:0"><b>${c.q}</b></p><div class="mc">${c.o.map((o,k)=>{
        const cls=a===undefined?"":(k===c.a?"r":(k===a?"w":""));
        return `<button data-j="${j}" data-k="${k}" class="${cls}" ${a!==undefined?"disabled":""}>${o}</button>`;}).join("")}
        ${a===undefined?`<button data-j="${j}" data-k="-1" class="idk">Weiß ich nicht</button>`:""}</div>
        ${a!==undefined?`<p class="ex ${a===c.a?"res good":"res bad"}">${a===c.a?"Richtig. ":a===-1?"Gut, dass du ehrlich bist. Die Lektion kommt später wieder. ":"Nicht ganz. "}<span style="color:var(--ink)">${c.ex}</span></p>`:""}</div>`;}).join("")}
    </div>
    <div class="lnav">
      ${cur.li>0?`<button class="btn ghost" id="prev">← Vorherige</button>`:"<span></span>"}
      ${allAns?(cur.li<L.length-1?`<button class="btn" id="next">Nächste Lektion →</button>`:`<button class="btn" id="fin">Zur Übersicht</button>`):`<span class="small muted">Beantworte die Fragen, dann geht es weiter.</span>`}
    </div>`;
  bindCrumb(()=>go("chapter"));
  document.querySelectorAll(".mc button").forEach(b=>b.onclick=()=>{
    const j=+b.dataset.j, k=+b.dataset.k; if(cur.ans[j]!==undefined) return; cur.ans[j]=k;
    if(x.check.every((_,q)=>cur.ans[q]!==undefined)){ const ok=x.check.every((c,q)=>cur.ans[q]===c.a);
      state.lessons[x.id]={ok, t:Date.now()}; logDay(); save(); }
    const y=window.scrollY; renderLesson(); window.scrollTo(0,y);
  });
  bindUnclear(x);
  if($("#prev")) $("#prev").onclick=()=>openLesson(n,cur.li-1);
  if($("#next")) $("#next").onclick=()=>openLesson(n,cur.li+1);
  if($("#fin")) $("#fin").onclick=()=>go("chapter");
}
/* „Verstehe ich nicht“: Lektion vormerken und eine Bitte um einfachere Erklärung für Claude kopieren */
function unclearBox(x){
  const on=!!state.unclear[x.id];
  return `<div class="block unclear"><div style="flex:1"><p class="small muted">${on?"Als unklar vorgemerkt. Die Lektion bleibt in der Übersicht markiert, bis du sie wieder freigibst.":"Hängt es irgendwo? Merk dir die Lektion vor und lass sie dir von Claude anders erklären."}</p>
    <div class="row" style="margin-top:8px"><button class="btn ghost small" id="ucOn">${on?"Jetzt verstanden":"Verstehe ich nicht"}</button>${on?`<button class="btn ghost small" id="ucCl">Erklärung bei Claude holen</button>`:""}</div><div id="ucCopy"></div></div></div>`;
}
const plainOf=html=>html.replace(/<br>/g,"\n").replace(/<\/(p|li|tr|div|h3)>/g,"\n").replace(/<[^>]+>/g," ").replace(/[ \t]+/g," ").replace(/\n\s+/g,"\n").trim();
function bindUnclear(x){
  const C=COURSES[chOf(cur.ch).c];
  const ask=()=>copyForClaude(`Ich lerne für das Modul Grundlagen Politik I (UDE, Lehramt), ${C.short} „${C.title}“ bei ${C.who}. Diese Lektion verstehe ich noch nicht richtig. Erkläre sie mir bitte einfacher, mit einem Beispiel aus Deutschland oder aus der Schule, und stell mir danach zwei Kontrollfragen. Die Lösungen bitte erst, wenn ich geantwortet habe.\n\nLektion „${x.t}“:\n${plainOf(x.html)}`,"#ucCopy");
  $("#ucOn").onclick=()=>{ if(state.unclear[x.id]) delete state.unclear[x.id]; else { state.unclear[x.id]=Date.now(); ask(); } save(); const y=window.scrollY; renderLesson(); window.scrollTo(0,y); };
  if($("#ucCl")) $("#ucCl").onclick=ask;
}
function logDay(){ const k=today(); state.days[k]=(state.days[k]||0)+1; }
async function copyForClaude(prompt,box){
  try{ await navigator.clipboard.writeText(prompt); toast("Kopiert. In den Claude-Chat einfügen."); }
  catch(x){ $(box).innerHTML=`<textarea style="width:100%;min-height:8rem;margin-top:8px" readonly>${esc(prompt)}</textarea>`; const t=$(box+" textarea"); t.focus(); t.select(); toast("Text markiert, jetzt kopieren"); }
}

/* ================= Karten (Karteikasten, Fächer 0–5) ================= */
/* Rückseite aus Zeilen aufbauen: „Begriff: Text“ wird zum Begriffspaar, „1. …“ zur nummerierten Liste,
   mehrere einfache Zeilen zur Aufzählung, „A vs. B“ mit „Merkmal: a / b“ zur Vergleichstabelle */
function cardBackHTML(c){
  const lines=c.b.split("\n").map(s=>s.trim()).filter(Boolean);
  const kvRe=/^([^:]{1,38}):\s+(.+)$/, numRe=/^\d+\.\s+(.+)$/;
  const kind=l=>{ if(numRe.test(l)) return "num"; const m=l.match(kvRe); if(m&&!/,\s|\sheißt/.test(m[1])&&!/[.!?]$/.test(m[1])) return "kv"; if(/ = /.test(l)&&l.length<44) return "eq"; return "plain"; };
  if(lines.length===1) return `<p>${lines[0]}</p>`;
  const vs=c.f.split(/\s+vs\.\s+/);
  if(vs.length===2 && lines.every(l=>kind(l)==="kv"&&l.match(kvRe)[2].includes(" / "))){
    const h=vs.map(x=>x.replace(/[?:]$/,""));
    return `<table class="cb-tbl"><tr><th>${h[0]}</th><th>${h[1]}</th></tr>${lines.map(l=>{ const m=l.match(kvRe), p=m[2].split(" / "); return `<tr class="lab"><td colspan="2">${m[1]}</td></tr><tr><td>${p[0]}</td><td>${p.slice(1).join(" / ")}</td></tr>`; }).join("")}</table>`;
  }
  const nm=l=>{ const m=l.match(/^([^()]{2,40}?) \((.+)\)$/); return m?`<b>${m[1]}</b> <span class="pd">(${m[2]})</span>`:l; };
  const groups=[]; for(const l of lines){ const k=kind(l), g=groups[groups.length-1]; if(g&&g.k===k&&k!=="eq") g.l.push(l); else groups.push({k,l:[l]}); }
  return groups.map(g=>{
    if(g.k==="num") return `<ol class="cb-ol">${g.l.map(l=>`<li><span>${nm(l.match(numRe)[1])}</span></li>`).join("")}</ol>`;
    if(g.k==="kv") return `<dl class="cb-dl">${g.l.map(l=>{ const m=l.match(kvRe); return `<div><dt>${m[1]}</dt><dd>${m[2]}</dd></div>`; }).join("")}</dl>`;
    if(g.k==="eq") return `<div class="eq">${g.l[0]}</div>`;
    if(g.l.length===1) return `<p>${g.l[0]}</p>`;
    return `<ul class="cb-ul">${g.l.map(l=>`<li>${nm(l)}</li>`).join("")}</ul>`;
  }).join("");
}
function allCards(n){ return n? (CARDS[n]||[]) : courseChs().flatMap(c=>CARDS[c.n]||[]); }
/* Wiederholung mit Fälligkeitsdatum (wie Anki): sicherer gewusst = längerer Abstand */
const INTERVAL=[0,0,1,3,7,16];   // Tage bis zur nächsten Abfrage je Fach; Fach 5 erneut gewusst: 35 Tage
const dayStart=(t=Date.now())=>{ const d=new Date(t); d.setHours(0,0,0,0); return d.getTime(); };
const isSeen=id=>!!(state.box||{})[id];
const isDue=id=>isSeen(id) && ((state.due||{})[id]||0)<=Date.now();
function dueCards(n){ return allCards(n).filter(x=>isDue(x.id)).sort((a,b)=>((state.due||{})[a.id]||0)-((state.due||{})[b.id]||0)); }
function openCards(n,free){ cur.cardCh=n; cur.free=!!free; cur.deck=free?buildDeck(n):buildDueDeck(n); cur.ci=0; cur.flip=false; cur.right=0; cur.requeued={}; go("cards"); }
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
  const D=cur.deck, n=cur.cardCh, back=n?chLabel(n):"Üben", backFn=()=>go(n?"chapter":"practice");
  if(cur.ci>=D.length){
    const left=dueCards(n).length+(n?allCards(n).filter(x=>!isSeen(x.id)).length:0);
    const nextDue=allCards(n).filter(x=>isSeen(x.id)&&!isDue(x.id)).map(x=>(state.due||{})[x.id]).sort((a,b)=>a-b)[0];
    const when=nextDue? Math.round((dayStart(nextDue)-dayStart())/864e5) : null;
    $("#app").innerHTML=`${backTo(back)}<h1>${D.length?(left?"Runde geschafft":"Für heute erledigt"):"Nichts fällig"}</h1>
      <div class="block">${D.length?`<p>${cur.right} von ${D.length} Antworten gewusst.</p>`:""}
      <p class="small muted">${left?`Noch ${left} Karten fällig oder neu.`:`Alle Karten${n?" dieser Sitzung":""} sind auf dem Stand. ${when!=null?`Die nächsten werden ${when<=0?"heute":when===1?"morgen":"in "+when+" Tagen"} fällig.`:""}`} Gewusste Karten kommen nach 1, 3, 7, 16 und 35 Tagen wieder, nicht gewusste sofort noch einmal.</p>
      <div class="row">${left?`<button class="btn" id="again">Weiter</button>`:""}${allCards(n).length?`<button class="btn ghost" id="free">Freiwillig weiterüben</button>`:""}<button class="btn ghost" id="out">Fertig</button></div></div>`;
    bindCrumb(backFn); if($("#again")) $("#again").onclick=()=>openCards(n); if($("#free")) $("#free").onclick=()=>openCards(n,true); $("#out").onclick=backFn; return;
  }
  const c=D[cur.ci], b=cardBox(c.id);
  $("#app").innerHTML=`${backTo(back)}
    <div class="row between"><p class="eyebrow" style="margin:0">Karte ${cur.ci+1} von ${D.length}${cur.free?" · freiwillig":isSeen(c.id)?" · fällig":" · neu"}</p><span class="dots" aria-label="Fach ${b} von 5">${[1,2,3,4,5].map(i=>`<i class="${i<=b?"on":""}"></i>`).join("")}</span></div>
    <div class="block card${cur.flip?"":" tap"}" id="theCard" style="margin-top:8px"><div class="front">${c.f}</div>${CARD_CTX[c.id]?`<p class="cctx">${CARD_CTX[c.id]}</p>`:""}${cur.flip?`<div class="back cb">${cardBackHTML(c)}</div>${cardInfoHTML(c.id)}`:`<span class="tapnote">Tippen zum Umdrehen</span>`}</div>
    ${cur.flip?`<div class="row"><button class="btn" id="yes" style="flex:1">Gewusst</button><button class="btn warn" id="no" style="flex:1">Nicht gewusst</button></div>`
      :`<button class="btn" id="flip" style="width:100%">Antwort zeigen</button><p class="small muted" style="margin-top:8px">Erst im Kopf antworten, dann aufdecken.</p>`}`;
  bindCrumb(backFn);
  if($("#flip")) $("#flip").onclick=()=>{ cur.flip=true; renderCards(); };
  if(!cur.flip) $("#theCard").onclick=()=>{ cur.flip=true; renderCards(); };
  const grade=ok=>{ state.box=state.box||{}; state.due=state.due||{}; const b0=cardBox(c.id), b1=ok?Math.min(5,Math.max(b0,1)+1):1;
    state.box[c.id]=b1;
    if(!cur.free||!ok||b1<b0){ const days=ok?(b0===5?35:INTERVAL[b1]):0; state.due[c.id]= ok? dayStart()+days*864e5 : Date.now(); }
    if(ok) cur.right++; else if((cur.requeued[c.id]||0)<2){ cur.requeued[c.id]=(cur.requeued[c.id]||0)+1; D.push(c); }
    logDay(); save(); cur.ci++; cur.flip=false; renderCards(); };
  if($("#yes")) $("#yes").onclick=()=>grade(true);
  if($("#no")) $("#no").onclick=()=>grade(false);
}

/* ================= Üben (sitzungsübergreifend, je Veranstaltung) ================= */
function renderPractice(){
  const ready=readyNs(), C=COURSES[state.course];
  if(!ready.length){
    $("#app").innerHTML=`<p class="eyebrow">${C.eyebrow}</p><h1>Üben</h1><div class="block"><p class="muted" style="margin:0">Für das ${C.short} gibt es noch keine Inhalte. Sobald die ersten Folien im Projekt liegen, kannst du hier gemischt üben.</p></div>`;
    return;
  }
  const W=essaysOf(0);
  $("#app").innerHTML=`<p class="eyebrow">${C.eyebrow}</p><h1>Üben</h1>
    <p class="muted">Gemischt aus allen fertigen Sitzungen (${ready.map(n=>chOf(n).no).join(", ")}). Gemischtes Üben ist anstrengender als blockweises, bleibt aber deutlich besser hängen.</p>
    <div class="block"><div class="modes">
      <button class="mode" id="pK"><span class="t">Fällige Karten</span><span class="n">${dueCards(0).length} fällig</span><span class="d">Alle Karten, die heute dran sind. Neue Karten lernst du in der jeweiligen Sitzung.</span></button>
      <button class="mode" id="pKr"><span class="t">Selbsttest gemischt</span><span class="n">${kreuzOf(0).filter(x=>(kzStat(x.id)||{}).best===4).length}/${kreuzOf(0).length} fehlerfrei</span><span class="d">Fünf Aufgaben mit je drei Aussagen, bevorzugt neue und solche mit Fehlern.</span></button>
      ${W.length?`<button class="mode" id="pW"><span class="t">Essay-Fragen schreiben</span><span class="n">${W.filter(x=>essayScore(x.id)).length}/${W.length}</span><span class="d">Eine Frage, mit oder ohne Gliederungshilfe. Danach Erwartungshorizont und Musteressay.</span></button>
      <button class="mode" id="pX"><span class="t">Probe-Essay, 60 Minuten</span><span class="n">${state.examRun?"läuft":(state.exams||[]).length+"×"}</span><span class="d">Wie am 04.02.: eine Frage, Timer, keine Hilfen. Danach selbst bewerten oder von Claude bewerten lassen.</span></button>`:""}
    </div></div>`;
  $("#pK").onclick=()=>openCards(0);
  $("#pKr").onclick=()=>openKreuz(0);
  if($("#pW")) $("#pW").onclick=()=>openEssay(0);
  if($("#pX")) $("#pX").onclick=()=>go("exam");
}

/* ================= Statistik ================= */
let statsArmed=false;
function renderStats(){
  const days=[...Array(7)].map((_,i)=>{ const d=new Date(); d.setDate(d.getDate()-6+i); const k=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); return [d,state.days[k]||0]; });
  const mx=Math.max(1,...days.map(x=>x[1])), wd=["So","Mo","Di","Mi","Do","Fr","Sa"];
  const ready=courseChs().filter(c=>isReady(c.n)), ex=(state.exams||[]).filter(e=>(e.c||"vl")===state.course).slice(-5).reverse();
  $("#app").innerHTML=`<h1>Statistik</h1>
    <div class="block"><h2>Letzte 7 Tage</h2>
      <p class="small muted" style="margin:0">Zahl unter dem Datum: wie viele Aktionen (Karten, Aufgaben, Lektionen) du an dem Tag gemacht hast, Vorlesung und Seminar zusammen.</p>
      <div class="week">${days.map(([d,n],i)=>`<div class="${i===6?"today":""}" style="height:${Math.round(n/mx*100)}%" title="${n} Aktionen"></div>`).join("")}</div>
      <div class="weekl">${days.map(([d,n],i)=>`<span class="${i===6?"today":""}"><b>${i===6?"Heute":wd[d.getDay()]}</b>${d.getDate()}.${d.getMonth()+1}.<span class="n">${n?n+" Akt.":"–"}</span></span>`).join("")}</div></div>
    <div class="block"><h2>${COURSES[state.course].short}: nach Sitzung</h2>${ready.length?ready.map(c=>{ const p=chapterProgress(c.n);
      return `<div class="srow"><span>Sitzung ${c.no}</span><span class="small muted">${[["Theorie",p.l,1],["Karten",p.k,(CARDS[c.n]||[]).length],["Selbsttest",p.x,kreuzOf(c.n).length],["Schreiben",p.w,essaysOf(c.n).length]].filter(x=>x[2]).map(x=>x[0]+" "+Math.round(x[1]*100)).join(" · ")}</span><span class="pts">${p.total} %</span></div>`;}).join(""):`<p class="small muted" style="margin:0">Noch keine Sitzungen mit Inhalten.</p>`}</div>
    ${ex.length?`<div class="block"><h2>Probe-Essays</h2>${ex.map(e=>`<div class="srow"><span>${new Date(e.t).toLocaleDateString("de-DE",{day:"numeric",month:"numeric"})}</span><span class="small muted">${esc(e.title||"")}</span><span class="pts">${e.p}/${e.max}</span></div>`).join("")}</div>`:""}
    ${syncBox()}
    <div class="block"><h3>Fortschritt zurücksetzen</h3><p class="small muted">Löscht deinen gesamten Lernstand (Vorlesung und Seminar), auch auf den verbundenen Geräten.</p>
      <button class="btn warn" id="rst">${statsArmed?"Wirklich zurücksetzen":"Zurücksetzen"}</button></div>`;
  bindSync();
  $("#rst").onclick=()=>{ if(!statsArmed){ statsArmed=true; renderStats(); addSwitch(); return; } const c=state.course; state={}; norm(); state.course=c; save(); flushPush(); statsArmed=false; toast("Zurückgesetzt"); render(); };
}

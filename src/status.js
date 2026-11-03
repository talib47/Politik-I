/* ================= Stand der Unterlagen, Erledigt-Liste, Motivation =================
   UPLOADS: nur was wirklich im claude.ai-Projekt liegt und eingebaut ist. Jede neue Sitzung trägt sich in ihrer
   Inhaltsdatei selbst ein: UPLOADS.push({c, ch, what}). Nichts Zukünftiges eintragen, die Liste endet beim letzten Upload.
   TODOS: Aufgaben neben dem Lernen je Veranstaltung (aus Folien und Verlaufsplan). Abgehakt in state.todo[id] = Zeitstempel. */
const UPLOADS=[];
/* Eintrag je Sitzung oder Block:
   {c, ch, items:[{t:"Kurzname", k:"Folien|Textgrundlage|Empfehlung|Lektüre", ok:true|false}], known:true|false, src:"woher der Umfang bekannt ist"}
   known:true  = der vollständige Umfang ist bekannt (Moodle-Screenshot, Verlaufsplan, Folie). Fehlendes steht dann mit ok:false drin.
   known:false = nur bekannt, dass das Hochgeladene dazugehört; der Umfang fehlt noch. */
const UNIT={vl:"Sitzung", se:"Block"};
const ROM=["","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"];
const unitNo=c=>state.course==="se"?ROM[c.no]||c.no:c.no;
function upState(u){ if(!u.known) return {cls:"unk", txt:"Umfang unbekannt"}; const m=u.items.filter(x=>!x.ok).length; return m?{cls:"part", txt:`${u.items.length-m} von ${u.items.length}`}:{cls:"full", txt:"vollständig"}; }
function uploadsBlock(){
  const L=UPLOADS.filter(u=>u.c===state.course).sort((a,b)=>a.ch-b.ch);
  if(!L.length) return "";
  const last=L[L.length-1], lc=chOf(last.ch), U=UNIT[state.course]||"Sitzung", ls=upState(last);
  return `<details class="block upl"><summary><span class="eyebrow" style="margin:0">Hochgeladen</span><span class="upl-last">bis ${U} ${unitNo(lc)} · <span class="upst ${ls.cls}">${ls.txt}</span></span></summary>
    ${L.map(u=>{ const c=chOf(u.ch), st=upState(u);
      return `<div class="upl-u"><p class="upl-h"><b>${U} ${unitNo(c)}</b><span class="muted">${c.date}</span><span class="upst ${st.cls}">${st.txt}</span></p>
        <ul class="upl-i">${u.items.map(x=>`<li class="${x.ok?"":"miss"}"><span aria-hidden="true">${x.ok?"✓":"○"}</span>${x.k?`<span class="muted">${x.k}:</span> `:""}${x.t}${x.ok?"":` <span class="muted">fehlt</span>`}</li>`).join("")}</ul>
        <p class="upl-src small muted">${u.known?`Umfang laut ${u.src}.`:`Den Überblick, was alles zu ${U} ${unitNo(c)} gehört, habe ich noch nicht gesehen. Schick mir dazu den Moodle-Screenshot.`}</p></div>`; }).join("")}
    <p class="small muted" style="margin:8px 0 0">Alles nach ${U} ${unitNo(lc)} fehlt noch im Projekt.</p></details>`;
}

const TODOS={
 vl:[
  {id:"vl-acemate", t:"Selbstlernphase: Fragen und Essay-Aufgabe auf Acemate", d:"22. und 29.10."},
  {id:"vl-his", t:"Zur Prüfung in HIS in One angemeldet", d:"Frist im HIS prüfen"},
  {id:"vl-qa", t:"Q&A zur Prüfung", d:"21.01."}
 ],
 se:[
  {id:"se-wahl", t:"Presseschau-Wahl in Moodle abgegeben", d:"bis Mi 04.11., 23:59"},
  {id:"se-termin", t:"Presseschau-Termin zugeteilt und notiert", d:"ab Do 05.11., 10 Uhr"},
  {id:"se-presse", t:"Presseschau aufgenommen, MP4 auf Sciebo, Link und PDF per Mail", d:"Vortag der Sitzung, 12 Uhr"},
  {id:"se-bib1", t:"Bibliotheksschein Teil 1"},
  {id:"se-bib2", t:"Bibliotheksschein Teil 2"},
  {id:"se-bib3", t:"Bibliotheksschein Teil 3: Fachrecherche Politikwissenschaft"},
  {id:"se-bibup", t:"Bestätigung als PDF in Moodle hochgeladen", d:"bis Fr 05.02."},
  {id:"se-his", t:"Zur Prüfung in HIS in One angemeldet", d:"Frist im HIS prüfen"}
 ]};
function todoBlock(){
  const L=TODOS[state.course]||[]; if(!L.length) return "";
  const done=L.filter(x=>state.todo[x.id]).length;
  return `<div class="block"><h2>Erledigt? <span class="small muted" style="font-weight:400">${done} von ${L.length}</span></h2>
    ${L.map(x=>`<label class="check todo${state.todo[x.id]?" on":""}"><input type="checkbox" data-todo="${x.id}" ${state.todo[x.id]?"checked":""}><span>${x.t}${x.d?`<span class="small muted"> · ${x.d}</span>`:""}</span></label>`).join("")}</div>`;
}
function bindTodo(){
  document.querySelectorAll("[data-todo]").forEach(c=>c.onchange=()=>{ const k=c.dataset.todo; if(c.checked) state.todo[k]=Date.now(); else delete state.todo[k]; save(); render(); });
}

/* Ein kurzer Satz unter der Wochenübersicht, je nach Lernverhalten. Variante wechselt täglich, nicht bei jedem Öffnen. */
function motivLine(){
  const key=d=>d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
  const at=i=>{ const d=new Date(); d.setDate(d.getDate()-i); return state.days[key(d)]||0; };
  const pick=a=>a[new Date().getDate()%a.length];
  const t=at(0); let streak=0; for(let i=t?0:1;i<60&&at(i);i++) streak++;
  let gap=null; for(let i=0;i<60;i++) if(at(i)){ gap=i; break; }
  let m;
  if(gap===null) m=pick(["Noch nichts geübt. Fünf Minuten reichen für den Anfang.","Der erste Schritt ist der kleinste: eine Lektion, dann ist das Eis gebrochen."]);
  else if(t&&streak>=3) m=pick([`${streak} Tage am Stück. Genau so bleibt es hängen.`,`Seit ${streak} Tagen dabei. Die Klausur merkt das.`,`${streak} Tage in Folge, stark. Morgen kurz weitermachen reicht.`]);
  else if(t) m=pick(["Heute schon geübt. Jede Runde zählt.","Für heute ist was geschafft. Gut gemacht.","Heute erledigt. Kurz und regelmäßig schlägt lang und selten."]);
  else if(gap===1) m=pick(["Gestern geübt. Eine kurze Einheit heute hält dich im Fluss.","Gestern warst du dran. Heute fünf Minuten, und die Serie läuft weiter."]);
  else if(gap<=3) m=pick([`Seit ${gap} Tagen Pause. Eine kleine Runde heute, mehr braucht es nicht.`,`${gap} Tage ohne Üben. Starte heute mit den fälligen Karten.`]);
  else m=pick([`Seit ${gap} Tagen nichts gemacht. Kein Drama, fang heute mit fünf Minuten an.`,`${gap} Tage Pause. Das Wiederholen holt schnell wieder auf, fang einfach an.`,`Lange nichts geübt. Eine Lektion heute, und du bist wieder drin.`]);
  return `<p class="motiv">${m}</p>`;
}

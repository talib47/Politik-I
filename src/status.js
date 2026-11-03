/* ================= Gemeinsame Bausteine aller modularen Lern-Apps (wortgleich in BiWi II, Politik I, Wirtschaft II) =================
   Was je App verschieden ist, steht in appcfg.js (Objekt APP). Diese Datei nur so ändern, dass sie in allen Apps gleich bleibt.

   1. Hochgeladen-Übersicht (UPLOADS): nur, was wirklich im claude.ai-Projekt liegt und eingebaut ist.
      Eintrag je Sitzung, Kapitel oder Block, eingetragen in der Inhaltsdatei:
      {c (nur bei zwei Hälften), ch (Kapitelnummer) oder no (angezeigte Nummer), o (Reihenfolge, sonst ch/no), date,
       base:true (Grundlagen wie Lehrbuch oder Altklausuren, stehen oben und zählen nicht als „bis“),
       items:[{k:"Folien|Textgrundlage|Empfehlung|Lektüre", t:"Kurzname", ok:true|false}],
       known:true|false, src:"woher der Umfang bekannt ist"}
      known:true  = der vollständige Umfang ist bekannt (Moodle-Screenshot, Verlaufsplan, Folie). Fehlendes steht mit ok:false drin.
      known:false = nur bekannt, dass das Hochgeladene dazugehört.
   2. Erledigt-Liste (APP.todos je Hälfte), abgehakt in state.todo[id] = Zeitstempel.
   3. Motivationssatz unter der Wochenübersicht.
   4. Claude-Brücke: letzte Logbuch-Einträge dieser App aus CLAUDE.md (build.py ersetzt __BRUECKE__).
   5. Abstände vor der Prüfung (spaceDays), siehe unten.
   6. Symbole der Tableiste (NAV_ICONS), Gestaltung in design.css.
   Prüfungstermin unbekannt: Die App rechnet mit dem Stichtag 31.01. und meldet das über APP.examAssumed() (dann „bis zum Stichtag“). */
const UPLOADS=[];
const CK=()=>APP.halves?state.course:"main";
const upOrder=u=>u.base?-1:(u.o!=null?u.o:u.ch!=null?u.ch:u.no||0);
function upName(u){ if(u.base) return "Grundlagen"; const c=u.ch!=null?APP.chap(u.ch):null; return APP.unit(u)+" "+(u.no!=null?u.no:c?APP.unitNo(c):""); }
function upDate(u){ if(u.date!=null) return u.date; const c=u.ch!=null?APP.chap(u.ch):null; return (c&&c.date)||""; }
function upState(u){ if(!u.known) return {cls:"unk", txt:"Umfang unbekannt"}; const m=u.items.filter(x=>!x.ok).length; return m?{cls:"part", txt:`${u.items.length-m} von ${u.items.length}`}:{cls:"full", txt:"vollständig"}; }
function uploadsBlock(){
  const L=UPLOADS.filter(u=>!APP.halves||u.c===state.course).sort((a,b)=>upOrder(a)-upOrder(b));
  const U=L.filter(u=>!u.base); if(!L.length) return "";
  const last=U[U.length-1], ls=last?upState(last):null;
  return `<details class="block upl"><summary><span class="eyebrow" style="margin:0">Hochgeladen</span><span class="upl-last">${last?`bis ${upName(last)} · <span class="upst ${ls.cls}">${ls.txt}</span>`:"nur Grundlagen"}</span></summary>
    ${L.map(u=>{ const st=upState(u);
      return `<div class="upl-u"><p class="upl-h"><b>${upName(u)}</b><span class="muted">${upDate(u)}</span><span class="upst ${st.cls}">${st.txt}</span></p>
        <ul class="upl-i">${u.items.map(x=>`<li class="${x.ok?"":"miss"}"><span aria-hidden="true">${x.ok?"✓":"○"}</span><span>${x.k?`<span class="muted">${x.k}:</span> `:""}${x.t}${x.ok?"":` <span class="muted">fehlt</span>`}</span></li>`).join("")}</ul>
        <p class="upl-src small muted">${u.known?`Umfang laut ${u.src}.`:`Den Überblick, was alles zu ${u.base?"den Grundlagen":upName(u)} gehört, habe ich noch nicht gesehen. Schick mir dazu den Moodle-Screenshot.`}</p></div>`; }).join("")}
    ${last?`<p class="small muted" style="margin:8px 0 0">Alles nach ${upName(last)} fehlt noch im Projekt.</p>`:""}</details>`;
}

function todoBlock(){
  const L=(APP.todos||{})[CK()]||[]; if(!L.length) return "";
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
  const T=APP.examTs&&APP.examTs(), left=T?Math.ceil((T-dayStart())/864e5):null;
  let m;
  if(gap===null) m=pick(["Noch nichts geübt. Fünf Minuten reichen für den Anfang.","Der erste Schritt ist der kleinste: eine Lektion, dann ist das Eis gebrochen."]);
  else if(t&&streak>=3) m=pick([`${streak} Tage am Stück. Genau so bleibt es hängen.`,`Seit ${streak} Tagen dabei. Die Prüfung merkt das.`,`${streak} Tage in Folge, stark. Morgen kurz weitermachen reicht.`]);
  else if(t) m=pick(["Heute schon geübt. Jede Runde zählt.","Für heute ist was geschafft. Gut gemacht.","Heute erledigt. Kurz und regelmäßig schlägt lang und selten."]);
  else if(gap===1) m=pick(["Gestern geübt. Eine kurze Einheit heute hält dich im Fluss.","Gestern warst du dran. Heute fünf Minuten, und die Serie läuft weiter."]);
  else if(gap<=3) m=pick([`Seit ${gap} Tagen Pause. Eine kleine Runde heute, mehr braucht es nicht.`,`${gap} Tage ohne Üben. Starte heute mit den fälligen Karten.`]);
  else m=pick([`Seit ${gap} Tagen nichts gemacht. Kein Drama, fang heute mit fünf Minuten an.`,`${gap} Tage Pause. Das Wiederholen holt schnell wieder auf, fang einfach an.`,`Lange nichts geübt. Eine Lektion heute, und du bist wieder drin.`]);
  if(left!=null&&left>0&&left<=21) m+=` Noch ${left} ${left===1?"Tag":"Tage"} ${APP.examAssumed&&APP.examAssumed()?"bis zum Stichtag":"bis zur Prüfung"}.`;
  return `<p class="motiv">${m}</p>`;
}

/* Symbole der Tableiste: gleiche Bildsprache in allen Apps. Lernpfad = Buch, Üben = Zielscheibe, Statistik = Balken,
   Karten = Kartenstapel, Quiz = Liste mit Häkchen. Flächen mit class="f" füllen sich beim aktiven Reiter leicht. */
const NAV_ICONS=(()=>{ const s=b=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${b}</svg>`;
  const book=s('<path class="f" d="M12 6.6C10.1 5.3 7.5 4.7 3.8 4.9v13.5c3.7-.2 6.3.4 8.2 1.7 1.9-1.3 4.5-1.9 8.2-1.7V4.9c-3.7-.2-6.3.4-8.2 1.7Z"/><path d="M12 6.6v13.5"/>');
  const target=s('<circle cx="12" cy="12" r="8.6"/><circle class="f" cx="12" cy="12" r="4.8"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/>');
  const bars=s('<rect class="f" x="4" y="12.5" width="4" height="7.5" rx="1.4"/><rect class="f" x="10" y="8" width="4" height="12" rx="1.4"/><rect class="f" x="16" y="4" width="4" height="16" rx="1.4"/>');
  const cards=s('<rect class="f" x="7" y="3.6" width="13" height="15.4" rx="2.6"/><path d="M4.4 7.6v9.8a3 3 0 0 0 3 3h8.2"/>');
  const quiz=s('<rect class="f" x="4" y="3.6" width="16" height="16.8" rx="3"/><path d="m7.8 9.2 1.6 1.6 2.8-3M7.8 15.4l1.6 1.6 2.8-3M15 9.6h1.6M15 15.8h1.6"/>');
  return {home:book, overview:book, practice:target, stats:bars, cards, quiz, exam:quiz}; })();

/* Claude-Brücke: was zuletzt an dieser App geändert wurde und warum (aus CLAUDE.md, beim Bauen übernommen) */
const BRUECKE=__BRUECKE__;
function bridgeBlock(){
  if(!BRUECKE.length) return "";
  const f=s=>{ const [y,m,d]=s.split("-"); return +d+"."+(+m)+"."; };
  return `<details class="block upl brk"><summary><span class="eyebrow" style="margin:0">Claude-Brücke</span><span class="upl-last">zuletzt ${f(BRUECKE[0].d)}</span></summary>
    <ul class="brk-l">${BRUECKE.map(x=>`<li><span class="muted">${f(x.d)}${x.a!==APP.name?" · "+x.a:""}</span><b>${x.w}</b><span class="small muted">${x.y}</span></li>`).join("")}</ul>
    <p class="small muted" style="margin:8px 0 0">Jeder Claude-Chat liest vor der Arbeit die gemeinsame Bauanleitung (CLAUDE.md) und trägt seine Änderungen dort ein. So wissen alle Apps voneinander.</p></details>`;
}

/* Abstände vor der Prüfung.
   Forschung (Cepeda et al. 2008): Der beste Abstand zwischen zwei Wiederholungen wächst mit der Zeit bis zur Prüfung,
   ist aber nur ein Bruchteil davon (bei 5 Wochen etwa ein Viertel, bei 10 Wochen etwa ein Sechstel). Zu kurz schadet mehr als zu lang.
   Darum: der feste Plan (1, 3, 7, 16, 35 Tage) bleibt, aber höchstens ein Drittel der Resttage bis zur Prüfung, damit jede Karte
   vor der Prüfung noch mehrmals drankommt und nie erst danach. Dazu ±10 % Streuung ab 3 Tagen, damit nicht alle Karten
   eines Lerntags am selben Tag wieder fällig werden. Ohne Prüfungstermin bleibt der Plan, wie er ist. */
function spaceDays(d,T){
  if(d<=1) return d;
  let x=d>=3?Math.max(2,Math.round(d*(0.9+Math.random()*0.2))):d;
  if(T==null&&APP.examTs) T=APP.examTs();
  if(T){ const left=Math.round((T-dayStart())/864e5); if(left>2) x=Math.min(x,Math.max(1,Math.floor(left/3))); }
  return x;
}

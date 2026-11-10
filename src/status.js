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
   7. Lernmodus ohne Ablenkung (focusBar): Ansichten aus APP.focus.views und die ganze Tageseinheit blenden Tableiste und „Aa“ aus.
   Prüfungstermin unbekannt: Die App rechnet mit dem Stichtag 31.01. und meldet das über APP.examAssumed() (dann „bis zum Stichtag“). */
const UPLOADS=[];
const CK=()=>APP.halves?state.course:"main";
const upOrder=u=>u.base?-1:(u.o!=null?u.o:u.ch!=null?u.ch:u.no||0);
function upName(u){ if(u.base) return "Grundlagen"; const c=u.ch!=null?APP.chap(u.ch):null; return APP.unit(u)+" "+(u.no!=null?u.no:c?APP.unitNo(c):""); }
function upDate(u){ if(u.date!=null) return u.date; const c=u.ch!=null?APP.chap(u.ch):null; return (c&&c.date)||""; }
function upState(u){ if(!u.known) return {cls:"unk", txt:"Umfang unbekannt"}; const m=u.items.filter(x=>!x.ok).length; return m?{cls:"part", txt:`${u.items.length-m} von ${u.items.length}`}:{cls:"full", txt:"vollständig"}; }
function uploadsBlock(){
  const L=UPLOADS.filter(u=>!APP.halves||u.c===state.course).sort((a,b)=>upOrder(a)-upOrder(b));
  if(APP.expect) return uploadsTodo(L);
  const U=L.filter(u=>!u.base); if(!L.length) return "";
  const last=U[U.length-1], ls=last?upState(last):null;
  return `<details class="block upl"><summary><span class="eyebrow" style="margin:0">Hochgeladen</span><span class="upl-last">${last?`bis ${upName(last)} · <span class="upst ${ls.cls}">${ls.txt}</span>`:"nur Grundlagen"}</span></summary>
    ${L.map(u=>{ const st=upState(u);
      return `<div class="upl-u"><p class="upl-h"><b>${upName(u)}</b><span class="muted">${upDate(u)}</span><span class="upst ${st.cls}">${st.txt}</span></p>
        <ul class="upl-i">${u.items.map(x=>`<li class="${x.ok?"":"miss"}"><span aria-hidden="true">${x.ok?"✓":"○"}</span><span>${x.k?`<span class="muted">${x.k}:</span> `:""}${x.t}${x.ok?"":` <span class="muted">fehlt</span>`}</span></li>`).join("")}</ul>
        <p class="upl-src small muted">${u.known?`Umfang laut ${u.src}.`:`Den Überblick, was alles zu ${u.base?"den Grundlagen":upName(u)} gehört, habe ich noch nicht gesehen. Schick mir dazu den Moodle-Screenshot.`}</p></div>`; }).join("")}
    ${last?`<p class="small muted" style="margin:8px 0 0">Alles nach ${upName(last)} fehlt noch im Projekt.</p>`:""}</details>`;
}


/* Unterlagen (Muster Politik I, 10.11.2026): oben, was noch fehlt (vergangene Sitzungen ohne Dateien, Texte schon
   7 Tage vorher), dann in zwei Schritten, wie hochladen, darunter, was schon drin ist. Braucht APP.expect(hälfte) mit
   [{ch, label, date, ts, items:[…], pre}] (pre: Unterlagen gibt es schon vor dem Termin, etwa Texte in Moodle). */
function uploadsTodo(L){
  const now=Date.now(), key=u=>u.ch!=null?u.ch:u.no, have=new Set(L.filter(u=>!u.base).map(key)), U=L.filter(u=>!u.base);
  const X=APP.expect(APP.halves?state.course:null,L)||[], E=Array.isArray(X)?X:(X.list||[]), unsure=!Array.isArray(X)&&X.unsure;
  const miss=E.filter(e=>!have.has(e.ch)&&(e.ts<=now||(e.pre&&e.ts-7*864e5<=now))), late=miss.filter(e=>e.ts<=now);
  const head=miss.length?`<span class="upst ${late.length?"part":"unk"}">${unsure?"vermutlich ":""}${late.length?(late.length===1?"1 fehlt":late.length+" fehlen"):"bald"}</span> ${miss.map(e=>e.label).join(", ")}`
    :`<span class="upst full">alles da</span>${U.length?" bis "+upName(U[U.length-1]):""}`;
  return `<details class="block upl"${late.length?" open":""}><summary><span class="eyebrow" style="margin:0">Unterlagen</span><span class="upl-last">${head}</span></summary>
    ${miss.length?`<p class="upl-sub">Noch hochladen</p><ul class="upl-i">${miss.map(e=>`<li class="miss"><span aria-hidden="true">○</span><span><b>${e.label}</b> <span class="muted">${e.date}${e.ts>now?", bald":""}</span><br>${e.items.join(" · ")}</span></li>`).join("")}</ul>`:""}
    ${unsure&&miss.length?`<p class="small muted upl-how">Hergeleitet aus deinen bisherigen Uploads. Stimmt das nicht, leg einen Screenshot der Moodle-Kursseite dazu, dann passe ich es an.</p>`:""}
    <p class="small upl-how"><b>So geht’s:</b> In der Claude-App das Projekt zu ${APP.project||APP.name} öffnen, neuer Chat, Dateien anhängen, senden. Text ist nicht nötig, den Rest mache ich gründlich.</p>
    ${U.length?`<p class="upl-sub">Schon drin</p>`+L.map(u=>{ const st=upState(u);
      return `<div class="upl-u"><p class="upl-h"><b>${upName(u)}</b><span class="muted">${upDate(u)}</span><span class="upst ${st.cls}">${st.txt}</span></p>
        <ul class="upl-i">${u.items.map(x=>`<li class="${x.ok?"":"miss"}"><span aria-hidden="true">${x.ok?"✓":"○"}</span><span>${x.k?`<span class="muted">${x.k}:</span> `:""}${x.t}${x.ok?"":` <span class="muted">fehlt</span>`}</span></li>`).join("")}</ul></div>`; }).join(""):""}</details>`;
}

/* Knopf „Unterlagen aktualisieren“: öffnet das claude.ai-Projekt des Fachs (APP.projectUrl, sonst die Projektliste)
   und kopiert „Update“. Eine App kann nicht selbst sehen, was im Projekt liegt; das Signal gibt dieser Knopf. */
function uplGo(){
  try{ if(navigator.clipboard) navigator.clipboard.writeText("Update"); }catch(e){}
  toast("Neuen Chat öffnen, Dateien anhängen, senden. Liegen sie schon im Projekt: „Update“ ist kopiert.");
  window.open(APP.projectUrl||"https://claude.ai/projects","_blank","noopener");
}
/* Erwartung aus dem bisherigen Rhythmus herleiten, für Fächer ohne bekannten Sitzungsplan: Nach dem letzten Upload
   (Feld `added` in UPLOADS) kommt etwa alle 7 Tage etwas Neues, nicht in der Weihnachtspause und nicht nach cfg.end.
   items: was kommt (Standard: dieselbe Art wie beim letzten Upload). grow: eine Datei wächst jede Woche, dann eine
   Zeile für den neuesten Stand. Das Ergebnis gilt als „vermutlich“. */
function weeklyAfter(L,cfg){
  cfg=cfg||{}; const U=L.filter(u=>!u.base&&u.added), last=U[U.length-1]; if(!last) return {list:[],unsure:true};
  const key=u=>u.ch!=null?u.ch:u.no, unit=cfg.unit||"Sitzung", day=864e5, end=cfg.end?new Date(cfg.end).getTime():Infinity;
  const pause=(cfg.pause||[["2026-12-21","2027-01-06"]]).map(p=>[new Date(p[0]).getTime(),new Date(p[1]).getTime()+day]);
  const dm=t=>{ const d=new Date(t); return String(d.getDate()).padStart(2,"0")+"."+String(d.getMonth()+1).padStart(2,"0")+"."; };
  const items=cfg.items||[...new Set(last.items.map(x=>x.k).filter(Boolean))].map(k=>k+" (wie bisher)");
  const out=[]; let t=new Date(last.added).getTime(), n=key(last);
  for(let i=0;i<30;i++){ t+=(cfg.every||7)*day; if(t>end) break; if(pause.some(([a,b])=>t>=a&&t<b)) continue; n++;
    out.push({ch:n, label:unit+" "+n, date:"etwa "+dm(t), ts:t, items}); }
  if(cfg.grow){ const due=out.filter(e=>e.ts<=Date.now()); if(due.length>1){ const z=due[due.length-1];
    return {list:[{...z, label:`${unit} ${due[0].ch}–${z.ch}`}].concat(out.filter(e=>e.ts>Date.now())), unsure:true}; } }
  return {list:out, unsure:true};
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

/* Lernmodus ohne Ablenkung: Beim Lernen (Karten, Fragen, Zuordnen, Selbsttest, Essays, Alles aufschreiben) und während der
   ganzen Tageseinheit verschwinden Tableiste und „Aa“. Oben steht eine schmale Leiste mit Schließen, Fortschritt und n/m
   (in der Tageseinheit übernimmt das die Leiste der Einheit). Schließen tut dasselbe wie der Zurück-Link der Ansicht.
   Esc schließt, außer beim Tippen in ein Textfeld. Je App in appcfg.js: APP.focus = {views oder on(), prog(), title(), exit()}. */
function focusBar(){
  const F=APP.focus; if(!F) return;
  const on=!!sess||(F.on?F.on():F.views.includes(view)), bar=on&&!sess;
  document.body.classList.toggle("focus",on); document.body.classList.toggle("fbon",bar);
  let el=document.getElementById("focusbar");
  if(!el){ el=document.createElement("div"); el.id="focusbar"; el.hidden=true; document.body.insertBefore(el,document.getElementById("app")); }
  if(!bar){ el.hidden=true; el.innerHTML=""; return; }
  const p=F.prog?F.prog():null, t=F.title?F.title():"";
  el.hidden=false;
  el.innerHTML=`<div class="fbin"><button class="fx" id="fx" aria-label="Schließen"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>`+
    (p?`<div class="fprog" role="progressbar" aria-valuemin="0" aria-valuemax="${p.n}" aria-valuenow="${Math.min(p.i,p.n)}" aria-label="${t}"><i style="width:${Math.max(4,Math.min(100,p.i/p.n*100))}%"></i></div><span class="fn">${Math.min(p.i+1,p.n)}/${p.n}</span>`:`<span class="ft">${t}</span>`)+`</div>`;
  document.getElementById("fx").onclick=()=>{ const c=document.getElementById("crumb"); if(c) c.click(); else F.exit(); };
}
new MutationObserver(()=>focusBar()).observe(document.getElementById("app"),{childList:true});
document.addEventListener("keydown",e=>{ if(e.key!=="Escape"||!document.body.classList.contains("fbon")) return;
  const a=document.activeElement; if(a&&/^(TEXTAREA|INPUT|SELECT)$/.test(a.tagName)) return; const x=document.getElementById("fx"); if(x){ e.preventDefault(); x.click(); } });

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
   vor der Prüfung noch mehrmals drankommt und nie erst danach. Nie kürzer als 3 Tage, wenn der Plan 3 Tage oder mehr
   vorsieht (sonst wäre in der letzten Woche jede Karte täglich fällig und alles staute sich). Die ±10 % Streuung kommt
   nach dem Deckel, damit nicht alle Karten am selben Tag fällig werden. Ohne Prüfungstermin bleibt der Plan, wie er ist. */
function spaceDays(d,T){
  if(d<=1) return d;
  let x=d;
  if(T==null&&APP.examTs) T=APP.examTs();
  if(T){ const left=Math.round((T-dayStart())/864e5); if(left>2) x=Math.min(x,Math.max(Math.min(d,3),Math.floor(left/3))); }
  return x>=3?Math.max(2,Math.round(x*(0.9+Math.random()*0.2))):x;
}

/* ================= Einstellungen nur dieser App für die gemeinsamen Bausteine (status.js) ================= */
const ROM=["","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"];
const APP={
 name:"Politik I",
 halves:true,                                   /* zwei Hälften mit Umschalter: vl und se */
 chap:n=>chOf(n),
 unit:u=>u.c==="se"?"Block":"Sitzung",
 unitNo:c=>c.c==="se"?(ROM[c.no]||c.no):c.no,
 examTs:()=>examDateTs(),                       /* Prüfungstermin der gewählten Hälfte */
 focus:{                                        /* Lernmodus ohne Ablenkung (status.js) */
  views:["cards","recall","who","kreuz","essay","exam","outline","dump"],
  prog:()=>{ const P={cards:()=>cur.deck&&{i:cur.ci,n:cur.deck.length}, recall:()=>cur.rq&&{i:cur.rq.i,n:cur.rq.list.length},
    who:()=>cur.wh&&{i:cur.wh.i,n:cur.wh.list.length}, kreuz:()=>cur.kr&&{i:cur.kr.i,n:cur.kr.items.length}}[view];
    const r=P&&P(); return r&&r.n?r:null; },
  title:()=>({cards:"Karten",recall:"Verständnisfragen",who:"Was gehört wohin?",kreuz:"Selbsttest",essay:"Essay",exam:"Probe-Essay",outline:"Gliederung",dump:"Alles aufschreiben"})[view]||"",
  exit:()=>go(TAB_OF[view]||"home")
 },
 todos:{
  vl:[
   {id:"vl-acemate", t:"Selbstlernphase: Fragen und Essay-Aufgabe auf Acemate", d:"22. und 29.10."},
   {id:"vl-his", t:"Zur Prüfung in HIS in One angemeldet", d:"Frist im HIS prüfen"},
   {id:"vl-qa", t:"Q&A zur Prüfung", d:"21.01."}
  ],
  se:[
   {id:"se-wahl", t:"Presseschau-Wahl in Moodle abgegeben", d:"bis Mi 04.11., 23:59"},
   {id:"se-termin", t:"Presseschau-Termin zugeteilt und notiert: 09.1, Block IX (Do 21.01.)", d:"zugeteilt"},
   {id:"se-psam", t:"Presseschau: Artikel gesammelt und Folien gebaut", d:"13.–18.01."},
   {id:"se-presse", t:"Presseschau aufgenommen, MP4 auf Sciebo, Link und PDF per Mail", d:"Mi 20.01., 12 Uhr"},
   {id:"se-bib1", t:"Bibliotheksschein Teil 1"},
   {id:"se-bib2", t:"Bibliotheksschein Teil 2"},
   {id:"se-bib3", t:"Bibliotheksschein Teil 3: Fachrecherche Politikwissenschaft"},
   {id:"se-bibup", t:"Bestätigung als PDF in Moodle hochgeladen", d:"bis Fr 05.02."},
   {id:"se-his", t:"Zur Prüfung in HIS in One angemeldet", d:"Frist im HIS prüfen"}
  ]}
};

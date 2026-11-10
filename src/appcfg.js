/* ================= Einstellungen nur dieser App für die gemeinsamen Bausteine (status.js) ================= */
const ROM=["","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"];
const APP={
 name:"Politik I",
 halves:true,                                   /* zwei Hälften mit Umschalter: vl und se */
 chap:n=>chOf(n),
 unit:u=>u.c==="se"?"Block":"Sitzung",
 unitNo:c=>c.c==="se"?(ROM[c.no]||c.no):c.no,
 examTs:()=>examDateTs(),                       /* Prüfungstermin der gewählten Hälfte */
 project:"Politik I",                           /* Name des claude.ai-Projekts für „Update“ */
 projectUrl:"https://claude.ai/project/01a140f2-0f81-7602-94ae-b8e2f64fd69c",
 /* Erwartete Unterlagen je Sitzung bzw. Block (Vorlesungsplan, Verlaufsplan online_03): Folien nach der Vorlesung,
    Seminartexte liegen schon vorher in Moodle */
 expect:c=>{ const SE={2:"Mielke 2013",3:"Schuett-Wetschky 2005",4:"von Beyme/Busch 2023",5:"Schimmelfennig 2024",6:"Weidenfeld 2021",7:"Lippert 2020",8:"Niemann/Junne 2011",9:"Abels 2020"};
   const ts=d=>{ const [t,m]=d.split(".").map(Number); return new Date(m>=8?2026:2027,m-1,t,c==="vl"?16:8).getTime(); };
   return CHAPTERS.filter(x=>x.c===c&&x.date).map(x=>({ch:x.n, label:(c==="se"?"Block "+(ROM[x.no]||x.no):"Sitzung "+x.no), date:x.date, ts:ts(x.date), pre:c==="se",
     items:c==="se"?["Textgrundlage "+(SE[x.no]||""),"Literaturempfehlungen","Moodle-Screenshot des Blocks"]:["Folien","Lektüre laut Folie"]})); },
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

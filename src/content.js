/* ================= Inhalte: Gliederung =================
   Zwei Veranstaltungen im Modul Grundlagen Politik I, getrennt geprüft:
   vl = Vorlesung „Politische Systeme im Vergleich“ (PD Dr. Julia Schwanholz), Prüfung: Essay 60 Min., unbenotet
   se = Seminar „Politisches System Deutschlands und der EU“ (Schwarz, online), Prüfung: Klausur + Vortrag
   n ist die interne Kapitelnummer (Vorlesung 1–10, Seminar ab 101), no die angezeigte Nummer.
   Lektions-, Karten- und Aufgaben-IDs bleiben stabil, auch wenn Kapitel umgestellt werden.
   Grundlage Vorlesung: Folien Schwanholz WiSe 26/27 und Vorlesungsplan (Folien 3–6, Moodle). */
const COURSES={
  vl:{short:"Vorlesung", who:"Schwanholz", title:"Politische Systeme im Vergleich", eyebrow:"Politik I · Vorlesung · Schwanholz"},
  se:{short:"Seminar", who:"Schwarz", title:"Politisches System Deutschlands und der EU", eyebrow:"Politik I · Seminar · Schwarz"}
};
const CHAPTERS=[
  {n:1,  c:"vl", no:1,  date:"15.10.", title:"Politik, Politikwissenschaft, Demokratie und Autokratie", teaser:"Politikbegriff (Polity, Politics, Policy), politisches System nach Easton und Almond/Powell, Herrschaftsformen nach Lauth, Dahl und Merkel, Embedded Democracy. Dazu die Selbstlernphase (22. und 29.10.)."},
  {n:2,  c:"vl", no:2,  date:"05.11.", title:"Demokratien bestimmen, Regierungssysteme, Grundgesetz", teaser:"Landkarte der Demokratien, Präsidentialismus und Parlamentarismus (Steffani, Lijphart), konstitutionelle Grundlagen und Grundprinzipien des Grundgesetzes, die EU im GG."},
  {n:3,  c:"vl", no:3,  date:"12.11.", title:"Mehrebenensystem Europäische Union", teaser:"Das politische System der EU. Gastvortrag Dr. Alexander Hoppe."},
  {n:4,  c:"vl", no:4,  date:"19.11.", title:"Strukturmerkmale des Regierens, Verfassungsorgane I", teaser:"Gewaltenteilung, Föderalismus und Unitarismus, Bund, Länder und Kommunen. Bundespräsident, Bundesrat, Staatsoberhäupter anderer Länder (online)."},
  {n:5,  c:"vl", no:5,  date:"26.11.", title:"Verfassungsorgane II", teaser:"Bundesregierung, Bundestag, Bundesverfassungsgericht. Regierungen, Parlamente und Supreme Courts anderer Länder."},
  {n:6,  c:"vl", no:6,  date:"03.12.", title:"Demokratische Legitimation", teaser:"Repräsentation, Responsivität, politische Kommunikation. Gastvortrag Dr. Janis Hülder (Schulministerium NRW)."},
  {n:7,  c:"vl", no:7,  date:"10.12.", title:"Parteien und Parteiensysteme", teaser:"Parteientheorie, Entstehung politischer Parteien, Parteiensysteme."},
  {n:8,  c:"vl", no:8,  date:"17.12.", title:"Wahlrecht, Wahlen und Wahlverhalten", teaser:"Wahlsysteme und Wahlreformen, Wahlverhalten, Nichtwahl."},
  {n:9,  c:"vl", no:9,  date:"07.01.", title:"Herausforderungen für die Demokratie", teaser:"Populismus und Extremismus, extreme Rechte im Vergleich (Heinze 2022, Lewandowsky 2025; online)."},
  {n:10, c:"vl", no:10, date:"14.01.", title:"Polarisierung, Fallstudien und Vergleiche", teaser:"Typen von Polarisierung und lokale Ebene (Schwanholz 2026), Fallstudien, MSS- und MDS-Designs (online)."}
];
const LESSONS={}, CARDS={}, ESSAYS=[], KREUZ=[];
/* Kapitel einer Veranstaltung, und ob ein Kapitel schon Inhalte hat */
const courseChs=(c=state.course)=>CHAPTERS.filter(x=>x.c===c);
const chOf=n=>CHAPTERS.find(c=>c.n===n);
const isReady=n=>!!LESSONS[n];
const readyNs=(c=state.course)=>courseChs(c).filter(x=>isReady(x.n)).map(x=>x.n);

/* ================= Vorlesung, Sitzung 1: Trainingsinhalte =================
   1. Begründungen für falsche Antworten der Verständnisfragen (w je Option), Schlüssel: Lektions-ID#Fragennummer
   2. Zuordnungstraining „Was gehört wohin?“ (WHO_SETS, WHO)
   3. Begriffe und Abkürzungen mit Lexikon (TERM_GROUPS)
   Grundlage: Folien 15.10., Patzelt (2023) Kap. 1 und 3, Lauth (2015), Merkel (2013). */

/* ---------- 1. Warum genau diese Wahl falsch ist ---------- */
const W1={
 "v1-1#0":{0:"Wer entscheidet, macht eine Entscheidung nicht politisch. Auch ein Politiker trifft private Entscheidungen.",2:"Der Ort ist nicht entscheidend. Auch ein Gemeinderat oder die EU entscheiden politisch.",3:"Politik kann jedes Thema betreffen, etwa Schule oder Umwelt, nicht nur die Wirtschaft."},
 "v1-1#1":{0:"Akteure sind Personen oder Gruppen, etwa der Bundeskanzler oder Parteien.",1:"Ebenen sind lokal, regional, national, Europa, international.",3:"Institutionen sind etwa Regierung, Parlament oder Verfassungsgericht. Das Normenkontrollverfahren ist ein Ablauf, den ein Gericht durchführt."},
 "v1-2#0":{0:"Polity ist der feste Rahmen, etwa die Geschäftsordnung des Landtags, nicht der Streit selbst.",2:"Policy wäre der Inhalt, also das Gesetz, das am Ende beschlossen wird."},
 "v1-2#1":{1:"Politics ist der Prozess, etwa der Streit um eine Verfassungsänderung, nicht die Verfassung selbst.",2:"Policy sind Programme zu einzelnen Problemen. Das Grundgesetz ist das Regelwerk, in dem sie entstehen."},
 "v1-2#2":{0:"Verfassung, Staat und politisches System stehen auf der Folie bei Polity.",1:"Interesse, Akteur und Macht stehen auf der Folie bei Politics."},
 "v1-3#0":{1:"Bewertungen und Empfehlungen sind möglich, aber Schmidts Definition nennt Beschreibung, Erklärung und Prognose.",2:"Das sind die drei Staatsgewalten, kein Auftrag der Wissenschaft."},
 "v1-3#1":{0:"Werturteile dürfen sehr wohl Gegenstand der Forschung sein. Die Forschung selbst soll aber keine eigene Wertung als Ergebnis ausgeben.",2:"Handlungsanweisungen sind nur eine Art wissenschaftlicher Aussagen, nicht der Kern."},
 "v1-3#2":{0:"Politische Theorie und Methoden sind Felder 1 und 5, auf der Folie nicht eingekreist.",2:"Internationale Beziehungen und EU sind Feld 2. Die EU kommt zwar in Sitzung 3 vor, aber als Teil des politischen Systems."},
 "v1-9#0":{0:"Eine Wenn-dann-Aussage ist eine empirische Zusammenhangsaussage, prüfbar an den Tatsachen.",2:"Eine Weil-Aussage ist eine Erklärung, also empirisch."},
 "v1-9#1":{0:"Wahr oder falsch sind nur empirische Aussagen. Einen Wertmaßstab kann man nicht beweisen.",2:"Patzelt hält normative Aussagen für wissenschaftsfähig, wenn sie gut begründet sind."},
 "v1-9#2":{0:"Vergessen gehört zur Selektivität: Niemand nimmt alles wahr und behält alles.",2:"Logische Widersprüche sind ein Problem der logischen Wahrheit, nicht der Perspektivität."},
 "v1-4#0":{1:"Gesetze und Urteile sind Outputs, also das, was aus dem System herauskommt.",2:"Wahlen sind eine Form der Unterstützung, aber Easton fasst Inputs allgemeiner als Forderungen und Unterstützung."},
 "v1-4#1":{0:"Input-Legitimation entsteht durch demokratische Verfahren, egal wie gut das Ergebnis ist.",2:"Soziale Legitimation ist die allgemeine Zustimmung der Bürger, nicht an eine bestimmte Leistung gebunden."},
 "v1-4#2":{0:"Nur Regierung und Parlament wäre noch enger als das ZPES, das ist das enge Verständnis.",2:"Die Verfassung ist Polity, kein Verständnis des politischen Systems."},
 "v1-5#0":{0:"Die Verwaltung setzt Entscheidungen um (Implementierung).",2:"Die Justiz überprüft die Umsetzung."},
 "v1-5#1":{1:"Prozessfunktionen sind Interessenartikulation, -aggregation, Policy-making und Implementierung.",2:"Policy-Funktionen sind Steuern, Regulierung und Verteilung, also Outputs."},
 "v1-10#0":{0:"Genau das ändert sich: Das Regime definiert die Zugänge zur Macht neu.",2:"Auch die Legitimation ändert sich, etwa von Weltanschauung zu Volkssouveränität."},
 "v1-10#1":{0:"Beide erfüllen alle Merkmale der Demokratie. Sie sind Varianten im Institutionendesign, kein eigener Regimetyp.",2:"Defekt heißt, dass Merkmale beschädigt sind. Das hat mit parlamentarisch oder präsidentiell nichts zu tun."},
 "v1-6#0":{0:"Auch viele Autokratien halten Wahlen ab, etwa der elektorale Autoritarismus.",2:"Auch Autokratien haben oft Verfassungen. Entscheidend ist, ob der Gesetzgeber selbst daran gebunden ist."},
 "v1-6#1":{0:"Unter Demokratie stehen repräsentativ, direkt, parlamentarisch und präsidentiell.",2:"Schwach autoritär sind kontrollierte Mehrparteienregime und Einparteiensysteme. Die delegative Demokratie ist noch eine Demokratie."},
 "v1-6#2":{0:"Nicht gegeben gilt für totalitäre Regime.",2:"Voll gegeben gilt nur für Demokratien."},
 "v1-11#0":{0:"Das wäre einfach eine Autokratie. Das Problem liegt bei Staaten mit Wahlen, aber Mängeln.",2:"Über Tempo sagt Merkel hier nichts. Es geht um die Grenze zwischen den Regimetypen."},
 "v1-11#1":{0:"Hybride Regime mischen Merkmale verschiedener Regimetypen. Die defekte Demokratie hat alle Merkmale der Demokratie, nur eingeschränkt.",2:"Die defekte Demokratie steht auf der Demokratie-Seite, nicht beim Autoritarismus."},
 "v1-11#2":{0:"Diese Dreiteilung stammt von Polity IV.",2:"Das sind Begriffe von Merkel, kein Messindex."},
 "v1-12#0":{0:"Gewaltenteilend hieße: mehrere Organe kontrollieren sich gegenseitig.",2:"Offen oder geschlossen ist die vierte Leitvariable, nicht die Herrschaftsstruktur."},
 "v1-12#1":{0:"Horizontal meint die Gewalten nebeneinander: Regierung, Parlament, Gerichte.",2:"Temporal meint Ämter auf Zeit."},
 "v1-12#2":{0:"Das ist die totalitäre Diktatur, das Gegenteil.",2:"Monistisch und konkurrierend passt nicht zusammen. Der Verfassungsstaat ist gewaltenteilend."},
 "v1-7#0":{0:"Die materielle Vorstellung schaut auf Ergebnisse wie gerechte Verteilung. Sie hat sich weniger durchgesetzt.",2:"Die Folie entscheidet sich klar: Die prozedurale war weitaus wirkungsmächtiger."},
 "v1-7#1":{0:"Einkommensverteilung wäre ein materielles Kriterium. Dahls Garantien sind Verfahren.",2:"Eine Verfassung steht nicht in Dahls Liste. Er nennt Freiheiten, Wahlrecht, Wettbewerb und Institutionen."},
 "v1-7#2":{0:"Das Herrschaftsmonopol fragt, wer die bindenden Entscheidungen trifft.",2:"Die Herrschaftsweise fragt, wie Herrschaft ausgeübt wird, etwa rechtsstaatlich oder repressiv."},
 "v1-13#1":{0:"Ergebnisse sind Merkel wichtig: Liefert eine Demokratie nicht, sinkt ihre Output-Legitimität.",2:"Messbarkeit ist nicht das Argument. Es geht darum, dass solche Leistungen nicht demokratiespezifisch sind."},
 "v1-13#0":{1:"Prozedurale Modelle gehen über Wahlen hinaus: Rechtsstaat und Gewaltenkontrolle gehören dazu.",2:"Maximalisten nehmen sogar den Output dazu, also weit mehr als Wahlen."},
 "v1-13#2":{0:"Minimalistisch wäre nur das Wahlregime. Embedded Democracy hat fünf Teilregime.",2:"Merkel nimmt Politikergebnisse wie soziale Gerechtigkeit ausdrücklich nicht in die Definition auf."},
 "v1-8#0":{0:"Die Marktwirtschaft ist nicht Teil des Modells. Ökonomische Voraussetzungen gehören nur zum äußeren Ring.",2:"Mehrebenen geht es hier nicht. Gemeint sind Teilregime innen und Umfeld außen."},
 "v1-8#1":{0:"Die effektive Regierungsgewalt ist Teilregime E, eines der vier um das Zentrum.",2:"Bürgerliche Rechte sind Teilregime C, auch ein äußeres Teilregime."},
 "v1-8#2":{0:"Das Wahlregime betrifft das Wahlrecht und faire Wahlen. Hier wird aber nicht gewählt, sondern kontrolliert.",2:"Politische Freiheiten sind Meinungs-, Versammlungs- und Pressefreiheit."},
 "v1-14#0":{0:"Militärregime halten am kürzesten, im Schnitt 8,8 Jahre.",1:"Personalistische Regime liegen in der Mitte, 15,1 Jahre. Ihr Problem ist die Nachfolge."},
 "v1-14#1":{1:"Wahlen, Medien und Militär sind Mittel, aber nicht die drei Säulen des Modells.",2:"Ideologie, Partei, Führer erinnert an totalitäre Herrschaft, ist aber nicht das WZB-Modell."},
 "v1-14#2":{0:"Bei freien Wahlen wäre es keine Autokratie. Elektoral autoritäre Wahlen sind manipuliert.",2:"Beim 99-Prozent-Ergebnis steht der Sieger vorher fest. Im elektoralen Autoritarismus bleibt ein Rest Unsicherheit."}
};
(function(){
  for(const L of LESSONS[1]) L.check.forEach((c,j)=>{ const w=W1[qid(L.id,j)]; if(w) c.w=w; }); })();

/* Kleine Korrekturen nach Abgleich mit den Texten */
(function(){
  const c25=CARDS[1].find(c=>c.id==="v1-c25"); if(c25) CARD_INFO["v1-c25"]="Stand der Folie. Im Text (Merkel 2013) nennt er als Ringe sozioökonomischen Kontext, Zivilgesellschaft und internationale Einbindung. In der Prüfung gilt die Folie.";
  const e1=ESSAYS.find(e=>e.id==="v1-e1"); if(e1) e1.m=e1.m.map(p=>p.replace("Ungarn wird in der Forschung häufig als Beispiel für eine illiberale Entwicklung genannt.","Merkel nennt die illiberale Demokratie den häufigsten Typ und führt etwa die Türkei, die Ukraine und Peru als Beispiele an."));
})();

/* ---------- 2. Was gehört wohin? ---------- */
Object.assign(WHO_SETS,{
 autor:{q:"Von wem stammt das?", quote:true, tip:"Achte auf Schlüsselwörter: Inputs, Funktionen, Polyarchie, Teilregime, Mentalitäten, Normen.",
   opts:{easton:"Easton", almond:"Almond/Powell", parsons:"Parsons", dahl:"Dahl", lauth:"Lauth", merkel:"Merkel", linz:"Linz", kelsen:"Kelsen", schumpeter:"Schumpeter", przeworski:"Przeworski", patzelt:"Patzelt", geddes:"Geddes", jellinek:"Jellinek", arendt:"Arendt", jg:"Jaggers/Gurr"}},
 regime:{q:"Welcher Regimetyp ist das?", tip:"Erst fragen: Gibt es faire Wahlen? Dann: Was ist beschädigt? Ohne faire Wahlen: Wie weit reicht der Anspruch?",
   opts:{dem:"Rechtsstaatliche Demokratie", def:"Defekte Demokratie", aut:"Autoritäres Regime", tot:"Totalitäres Regime"},
   why:{dem:"In einer rechtsstaatlichen Demokratie sind alle fünf Teilregime intakt.", def:"Eine defekte Demokratie hat faire Wahlen, aber ein anderes Teilregime ist beschädigt.", aut:"Autoritär heißt: begrenzter Pluralismus, keine fairen Wahlen, Mentalitäten statt Weltanschauung.", tot:"Totalitär heißt: Monismus, umfassende Weltanschauung, Dauermobilisierung, unbegrenzter Anspruch."}},
 tr:{q:"Welches Teilregime der Embedded Democracy ist betroffen?", tip:"A Wahlen, B Teilhabe und Öffentlichkeit, C Schutz des Einzelnen, D Kontrolle der Gewalten, E wer tatsächlich regiert.",
   opts:{A:"A Wahlregime", B:"B Politische Partizipationsrechte", C:"C Bürgerliche Freiheitsrechte", D:"D Horizontale Verantwortlichkeit", E:"E Effektive Regierungsgewalt"}},
 ppp:{q:"Polity, Politics oder Policy?", tip:"Rahmen, Streit oder Programm?",
   opts:{polity:"Polity (Form)", politics:"Politics (Prozess)", policy:"Policy (Inhalt)"}}
});
WHO.push(
 {id:"v1-w01", set:"autor", ch:1, t:"Politik ist die Herstellung und Durchsetzung allgemein verbindlicher Regelungen. Dabei wirken Macht, Ideologie, Normen und Kommunikation zusammen.", s:"patzelt", ex:"Patzelts Politikbegriff mit dem MINK-Schema (Kap. 1)."},
 {id:"v1-w02", set:"autor", ch:1, t:"Forderungen und Unterstützung aus der Umwelt werden im politischen System zu verbindlichen Entscheidungen verarbeitet.", s:"easton", alt:["almond"], ex:"Eastons Input-Output-Modell mit Rückkopplung."},
 {id:"v1-w03", set:"autor", ch:1, t:"Parteien bündeln Interessen, Verbände artikulieren sie, Verwaltung und Justiz setzen um und überprüfen.", s:"almond", alt:["easton"], ex:"Almond/Powell ordnen Prozessfunktionen konkreten Strukturen zu und leuchten so Eastons „Blackbox“ aus."},
 {id:"v1-w04", set:"autor", ch:1, t:"Jedes System muss sich anpassen, Ziele erreichen, seinen Zusammenhalt sichern und Wertmuster erhalten.", s:"parsons", ex:"Das AGIL-Schema. Zielerreichung (G) ist die Aufgabe des politischen Systems."},
 {id:"v1-w05", set:"autor", ch:1, t:"Real existierende Demokratien sind Polyarchien: öffentlicher Wettbewerb und das Recht auf Teilhabe.", s:"dahl", ex:"Dahl (1971) mit seinen acht Garantien. Den Begriff Polyarchie wählte er, um reale Demokratien vom Ideal abzugrenzen."},
 {id:"v1-w06", set:"autor", ch:1, t:"Demokratie zeigt sich in drei Dimensionen: politische Freiheit, politische Gleichheit, politische und rechtliche Kontrolle.", s:"lauth", alt:["merkel"], ex:"Lauths Demokratiedefinition (Folie: Lauth 2006, S. 100)."},
 {id:"v1-w07", set:"autor", ch:1, t:"Stabile rechtsstaatliche Demokratien sind doppelt eingebettet: intern durch Teilregime, extern durch ihr Umfeld.", s:"merkel", ex:"Embedded Democracy (Merkel 2010)."},
 {id:"v1-w08", set:"autor", ch:1, t:"Autoritäre Regime haben einen begrenzten Pluralismus, Mentalitäten statt einer ausgearbeiteten Ideologie und keine Dauermobilisierung.", s:"linz", alt:["arendt"], ex:"Linz unterscheidet so autoritäre von totalitären Regimen."},
 {id:"v1-w09", set:"autor", ch:1, t:"In der Demokratie sind die, die Gesetze machen, und die, für die sie gelten, dieselben.", s:"kelsen", ex:"Kelsen: autonome Normen in der Demokratie, heteronome in der Autokratie."},
 {id:"v1-w10", set:"autor", ch:1, t:"Freie Wahlen sind nicht nur der Kern der Demokratie, sondern die Demokratie selbst.", s:"schumpeter", alt:["przeworski"], ex:"Schumpeters minimalistisches, „elitistisches“ Modell."},
 {id:"v1-w11", set:"autor", ch:1, t:"Demokratie ist organisierte Unsicherheit: Die Regeln stehen vorher fest, das Ergebnis nicht.", s:"przeworski", alt:["schumpeter"], ex:"Przeworski (1991), zitiert bei Merkel."},
 {id:"v1-w12", set:"autor", ch:1, t:"Einparteienregime überleben im Schnitt länger als personalistische Regime und Militärregime.", s:"geddes", ex:"Geddes' Typologie nach dem Herrschaftsträger."},
 {id:"v1-w13", set:"autor", ch:1, t:"Ein Staat besteht aus Staatsgebiet, Staatsvolk und Staatsgewalt.", s:"jellinek", ex:"Jellineks Drei-Elemente-Lehre (1900)."},
 {id:"v1-w14", set:"autor", ch:1, t:"Autoritäre Herrschaft schränkt die Freiheit ein, totalitäre Herrschaft schafft sie ab.", s:"arendt", alt:["linz"], ex:"Hannah Arendt, zitiert bei Merkel zu Linz' Unterscheidung."},
 {id:"v1-w15", set:"autor", ch:1, t:"Democracy is the opposite of autocracy.", s:"jg", alt:["kelsen"], ex:"Jaggers/Gurr (1995) auf der Folie: dichotome Typenlehre."},
 {id:"v1-w16", set:"autor", ch:1, t:"Wissenschaft soll Aussagen liefern, die dem gesunden Menschenverstand an empirischem und logischem Wahrheitsgehalt überlegen sind.", s:"patzelt", ex:"Patzelts Wissenschaftsbegriff (Folie und Kap. 1)."},
 {id:"v1-w17", set:"autor", ch:1, t:"Jede Herrschaft lässt sich an Legitimation, Zugang, Monopol, Struktur, Anspruch und Weise bestimmen.", s:"merkel", alt:["lauth"], ex:"Merkels sechs Kriterien (2010, S. 22–24)."},
 {id:"v1-w18", set:"regime", ch:1, t:"Die Wahlen sind frei und fair, aber der Präsident regiert per Dekret am Parlament vorbei und setzt Richter unter Druck.", s:"def", ex:"Delegative Demokratie: Wahlregime intakt, horizontale Verantwortlichkeit (D) beschädigt."},
 {id:"v1-w19", set:"regime", ch:1, t:"Eine Partei bündelt alle Macht. Eine umfassende Weltanschauung soll das öffentliche und private Leben prägen, die Massen werden dauerhaft mobilisiert.", s:"tot", ex:"Monismus, Weltanschauung, Dauermobilisierung: alle drei Merkmale nach Linz für totalitär."},
 {id:"v1-w20", set:"regime", ch:1, t:"Es gibt einen begrenzten Pluralismus. Die Führung beruft sich auf Nationalismus und Sicherheit und will vor allem Ruhe in der Bevölkerung.", s:"aut", ex:"Begrenzter Pluralismus, Mentalitäten, Demobilisierung: autoritär nach Linz."},
 {id:"v1-w21", set:"regime", ch:1, t:"Freie und faire Wahlen, unabhängige Gerichte, garantierte Grundrechte, eine lebendige Zivilgesellschaft.", s:"dem", ex:"Alle Teilregime intakt und extern eingebettet."},
 {id:"v1-w22", set:"regime", ch:1, t:"Ein Militärrat regiert, Wahlen finden nicht statt, Kritiker werden willkürlich verhaftet.", s:"aut", alt:["tot"], ex:"Militärregime stehen bei Lauth et al. unter stark autoritär. Für totalitär fehlt die umfassende Weltanschauung."},
 {id:"v1-w23", set:"regime", ch:1, t:"Eine große Minderheit darf wegen ihrer Herkunft nicht wählen, sonst laufen Wahlen und Gerichte korrekt.", s:"def", ex:"Exklusive Demokratie: Das Wahlregime (A) ist für einen Teil beschädigt, die Logik fairer Wahlen gestört, aber nicht beseitigt."},
 {id:"v1-w24", set:"regime", ch:1, t:"Es gibt regelmäßig Wahlen mit mehreren Parteien, aber sie sind manipuliert, und fast immer gewinnt der Amtsinhaber.", s:"aut", alt:["def"], ex:"Elektoraler Autoritarismus (Schedler): Wahlen als demokratisches „Mäntelchen“. Manipulierte Wahlen sind nicht fair, also keine Demokratie mehr."},
 {id:"v1-w25", set:"regime", ch:1, t:"Herrschaft ist unbegrenzt, die Herrschaftsweise systematisch repressiv und terroristisch, die Struktur monistisch.", s:"tot", alt:["aut"], ex:"Merkels Tabelle, Spalte totalitäres Regime."},
 {id:"v1-w26", set:"tr", ch:1, t:"Eine ethnische Minderheit ist vom Wahlrecht ausgeschlossen.", s:"A", ex:"Das Wahlregime verlangt ein universelles aktives und passives Wahlrecht."},
 {id:"v1-w27", set:"tr", ch:1, t:"Demonstrationen werden verboten, es gibt kaum private Medien.", s:"B", ex:"Politische Partizipationsrechte: Meinungs-, Versammlungs-, Demonstrationsfreiheit und Gewicht privater Medien."},
 {id:"v1-w28", set:"tr", ch:1, t:"Menschen werden ohne Gerichtsverfahren festgehalten, die Polizei durchsucht Wohnungen nach Belieben.", s:"C", ex:"Bürgerliche Freiheitsrechte schützen Leben, Freiheit und Eigentum vor dem Staat."},
 {id:"v1-w29", set:"tr", ch:1, t:"Die Regierung setzt Verfassungsrichter ab, die ihr widersprechen.", s:"D", alt:["C"], ex:"Horizontale Verantwortlichkeit: Die Gewalten kontrollieren sich gegenseitig, die Justiz muss unabhängig sein."},
 {id:"v1-w30", set:"tr", ch:1, t:"Das Militär bestimmt die Sicherheitspolitik und seinen Haushalt ohne Parlament und Regierung.", s:"E", ex:"Effektive Regierungsgewalt: Nur gewählte Vertreter dürfen verbindlich entscheiden. Sonst Enklavendemokratie."},
 {id:"v1-w31", set:"tr", ch:1, t:"Wahlen finden statt, aber Stimmen werden gefälscht.", s:"A", ex:"Freie und faire Wahlen gehören zum Wahlregime."},
 {id:"v1-w32", set:"ppp", ch:1, t:"Das Grundgesetz regelt, wie ein Gesetz entsteht.", s:"polity", ex:"Regelwerk für Politik: Verfassung, Staat, System."},
 {id:"v1-w33", set:"ppp", ch:1, t:"Zwei Parteien streiten im Wahlkampf über die Rente.", s:"politics", ex:"Prozess: Interessen, Akteure, Macht, Kommunikation."},
 {id:"v1-w34", set:"ppp", ch:1, t:"Der Landtag beschließt ein Programm mit konkreten Zielen gegen Lehrermangel.", s:"policy", ex:"Inhalt: Problem, Programm, Erfolg."},
 {id:"v1-w35", set:"ppp", ch:1, t:"Ein Lehrerverband macht Druck gegen eine Schulreform.", s:"politics", ex:"Interessenartikulation im politischen Prozess."},
 {id:"v1-w36", set:"ppp", ch:1, t:"Bildung ist in Deutschland Sache der Länder.", s:"polity", ex:"Zuständigkeitsverteilung im Bundesstaat: Teil des Regelwerks."},
 {id:"v1-w37", set:"ppp", ch:1, t:"Es wird ausgewertet, ob ein Gesetz die Armut wirklich verringert hat.", s:"policy", ex:"Der Erfolg eines Programms gehört zur Policy-Dimension."}
);

/* ---------- 3. Begriffe und Abkürzungen ---------- */
TERM_GROUPS.push(
 {id:"v1-sys", c:"vl", ch:1, t:"Politik und politisches System", items:[
  {id:"zpes", s:"ZPES", lang:"Zentrales Politisches Entscheidungssystem", n:"die Institutionen, die verbindlich entscheiden", bed:"das **enge** Verständnis des politischen Systems: nur Regierung, Parlament und Parteiführungen, also formal-institutionell", bsp:"Bundesregierung und Bundestag gehören dazu, der Bauernverband nicht.", falle:"Das weite Verständnis nimmt Parteien, Verbände und Wirtschaftsakteure dazu.", q:"Folie 21, Patzelt Kap. 3"},
  {id:"agil", s:"AGIL", lang:"Adaptation, Goal Attainment, Integration, Latent Pattern Maintenance", n:"die vier Funktionen, die jedes System erfüllen muss", bed:"Parsons' Schema: **Anpassung**, **Zielerreichung**, **Zusammenhalt**, **Erhalt von Wertmustern**", bsp:"Zielerreichung (G) ist die Aufgabe des politischen Systems, etwa ein Gesetz gegen Wohnungsnot.", merk:"A-G-I-L wie ein Name: „Agil“ bleibt ein System nur, wenn es alle vier schafft.", q:"Merkel 2013, Patzelt Kap. 1"},
  {id:"mink", s:"MINK", lang:"Macht, Ideologie, Normen, Kommunikation", n:"vier Dinge, die in jeder Politik zusammenwirken", bed:"Patzelts Analyseschema für politisches Handeln", bsp:"Bei einer Schulreform: wer sich durchsetzt (Macht), welches Weltbild dahinter steht (Ideologie), welche Regeln gelten (Normen), wie darüber berichtet wird (Kommunikation).", q:"Patzelt Kap. 1"},
  {id:"polity", s:"Polity", n:"die Form der Politik: Regelwerk und Rahmen", bed:"Grundlagen des Gemeinwesens: **Verfassung, Staat, politisches System**", bsp:"Bildung ist laut Grundgesetz Ländersache.", falle:"Nicht der Streit (Politics) und nicht das Programm (Policy).", merk:"Polity = Rahmen", q:"Folie 16"},
  {id:"politics", s:"Politics", n:"der Prozess der Politik: Ringen um Entscheidungen", bed:"**Interesse, Akteur, Kommunikation, Legitimation, Macht**", bsp:"Parteien streiten im Landtag über G8 oder G9.", falle:"Nicht der Rahmen (Polity) und nicht das Ergebnis (Policy).", merk:"Politics = Streit", q:"Folie 16"},
  {id:"policy", s:"Policy", n:"der Inhalt der Politik: Handlungsprogramme", bed:"**Problem, Programm, Erfolg**", bsp:"Das beschlossene Programm: Rückkehr zu G9.", falle:"Nicht die Verfassung (Polity) und nicht der Streit (Politics).", merk:"Policy wie Versicherungspolice: das Programm auf Papier", q:"Folie 16"},
  {id:"withinput", s:"Withinputs", n:"Forderungen, die im System selbst entstehen", bed:"Easton: Input, der nicht aus der Umwelt kommt, sondern von den Entscheidungsträgern selbst", bsp:"Ein Ministerium schlägt von sich aus ein neues Gesetz vor.", q:"Merkel 2013"},
  {id:"outcome", s:"Outcome", n:"die tatsächliche Wirkung einer Entscheidung in der Gesellschaft", bed:"Output ist die Entscheidung, Outcome ihre Wirkung", bsp:"Output: Gesetz für mehr Kitaplätze. Outcome: Mehr Eltern können arbeiten.", falle:"Output und Outcome werden oft verwechselt.", q:"Folie 23, Patzelt Kap. 3"},
  {id:"respons", s:"Responsivität", n:"die Fähigkeit eines Systems, auf Input zu reagieren", bed:"ein System nimmt Forderungen auf und antwortet darauf", bsp:"Eine Regierung greift Proteste auf und sucht einen Kompromiss.", merk:"lateinisch respondere: antworten", q:"Patzelt Kap. 3"},
  {id:"legitim", s:"Legitimität", n:"Herrschaft gilt als rechtens", bed:"die aufrichtige Überzeugung der Bürger, dass das System zu Recht besteht", bsp:"Bürger akzeptieren eine Wahlniederlage ihrer Partei, weil sie die Wahl für fair halten.", falle:"Legitimität (Anerkennung) ist nicht dasselbe wie Legalität (Gesetzmäßigkeit).", q:"Patzelt Kap. 3"}
 ]},
 {id:"v1-reg", c:"vl", ch:1, t:"Demokratie, Autokratie, Messung", items:[
  {id:"polyarchie", s:"Polyarchie", n:"Dahls Begriff für real existierende Demokratien", bed:"„Vielherrschaft“: öffentlicher Wettbewerb und Recht auf Teilhabe, gemessen an acht Garantien", bsp:"Deutschland erfüllt Dahls Garantien und ist damit eine Polyarchie.", falle:"Nicht Oligarchie (Herrschaft weniger).", q:"Merkel 2013, Lauth 2015"},
  {id:"hybrid", s:"Hybrides Regime", n:"Regime mit Merkmalen verschiedener Regimetypen", bed:"mischt demokratische und autokratische Merkmale, auch Anokratie genannt", bsp:"Wahlen, die noch halbwegs demokratisch sind, bei sehr schwacher Kontrolle der Macht.", falle:"Die defekte Demokratie ist kein hybrides Regime, sondern ein verminderter Subtyp der Demokratie.", q:"Lauth 2015"},
  {id:"koopt", s:"Kooptation", n:"wichtige Gruppen durch Vorteile an ein Regime binden", bed:"dritte Säule autokratischer Herrschaft: Ämter, Privilegien, Geld für Eliten aus Wirtschaft, Militär, Sicherheitsapparat", bsp:"Generäle bekommen lukrative Posten in Staatsfirmen.", falle:"Nicht Kooperation: Bei Kooptation wird Loyalität erkauft.", q:"Merkel 2013"},
  {id:"cj", s:"Critical Juncture", n:"kritische Weggabelung, in der ein Regime herausgefordert werden kann", bed:"Krise, in der die Säulen eines Regimes sich nicht mehr gegenseitig stützen", bsp:"Eine Wirtschaftskrise kostet Legitimation, gleichzeitig laufen Eliten über.", q:"Merkel 2013"},
  {id:"subsid", s:"Subsidiarität", n:"Aufgaben möglichst auf der unteren Ebene erledigen", bed:"Grundlage vertikaler Gewaltenteilung: erst Kommune, dann Land, Bund, EU", bsp:"Die Gemeinde regelt den Schulbus, nicht der Bund.", merk:"lateinisch subsidium: Beistand", q:"Patzelt Kap. 3"},
  {id:"veto", s:"Vetospieler", n:"Akteure, deren Zustimmung für eine Entscheidung nötig ist", bed:"Teil der horizontalen Gewaltenteilung", bsp:"Ein Verfassungsgericht kann ein Gesetz kippen.", merk:"lateinisch veto: ich verbiete", q:"Patzelt Kap. 3"},
  {id:"fh", s:"Freedom House", n:"Index, der Länder in free, partly free, not free einteilt", bed:"komplexe Demokratiemessung mit rund 100 Indikatoren", bsp:"Eine Dreiteilung, die Grauzone heißt partly free.", falle:"Polity IV teilt in democracy, anocracy, autocracy.", q:"Merkel 2013, Lauth 2015"},
  {id:"polity4", s:"Polity IV", n:"Index, der Länder in democracy, anocracy, autocracy einteilt", bed:"Regimeindex, Schwelle wird über addierte Punktwerte bestimmt", bsp:"Anocracy ist die Grauzone zwischen den Polen.", falle:"Nicht verwechseln mit Polity (Form der Politik).", q:"Merkel 2013"},
  {id:"vdem", s:"V-Dem", lang:"Varieties of Democracy", n:"Messprojekt mit über 3000 Länderexperten", bed:"misst verschiedene Demokratievorstellungen statt nur eines Modells", bsp:"Die Demokratiematrix nutzt V-Dem-Daten.", q:"Lauth 2015"},
  {id:"bti", s:"BTI", lang:"Bertelsmann Transformationsindex", n:"komplexer Index zur Demokratie- und Transformationsmessung", bed:"misst Teilaspekte politischer Regime auf einem Kontinuum", bsp:"wird bei Merkel als gradualistischer Messansatz genannt", q:"Merkel 2013, Lauth 2015"},
  {id:"wzb", s:"WZB", lang:"Wissenschaftszentrum Berlin für Sozialforschung", n:"Forschungsinstitut, an dem das Drei-Säulen-Modell entstand", bed:"Gerschewski et al. (2013): Legitimation, Repression, Kooptation", bsp:"Merkel forschte selbst am WZB.", q:"Merkel 2013"}
 ]}
);
termsReady();

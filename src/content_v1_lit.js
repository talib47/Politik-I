/* ================= Vorlesung, Sitzung 1: Lektüre der Selbstlernphase (22. und 29.10.) =================
   Grundlage: Patzelt (2023) Kap. 1 und Kap. 3 (I–IV), Lauth (2015), Merkel (2013); Texte im Projekt.
   Neue Lektionen v1-9 bis v1-14, danach wird die Reihenfolge aller Lektionen von Sitzung 1 festgelegt. */
const LIT=t=>`<span class="lit">${t}</span>`;

LESSONS[1].push(
{id:"v1-9", t:"Warum Wissenschaft? Alltagsdenken und Aussagen", html:`
<p>${LIT("Patzelt 2023, Kap. 1")} Patzelt beschreibt Wissenschaft als <b>Emanzipation aus den Fesseln des gesunden Menschenverstandes</b>. Wissenschaft braucht es erst dort, wo das Alltagswissen nicht mehr reicht.</p>
<h3>Drei Schwächen des Alltagsdenkens</h3>
<table class="kvq">
<tr><td><b>unreflektiert selektiv</b></td><td>Niemand nimmt alles wahr, und vom Wahrgenommenen vergisst man das meiste. Die Politikwissenschaft hält mit bewusster Fallauswahl und Stichproben dagegen.</td></tr>
<tr><td><b>unreflektiert perspektivisch</b></td><td>Jeder sieht von seinem Standort aus. Dagegen helfen bewusst gewählte Begriffe und Theorien.</td></tr>
<tr><td><b>selbstverständlich</b></td><td>Was nicht ins Weltbild passt, wird eher bezweifelt als das Weltbild. Dagegen helfen Wissenschaftstheorie und Methodenlehre.</td></tr></table>
<h3>Empirisch und logisch wahr</h3>
<p>Wissenschaftliche Aussagen sollen <b>empirisch wahr</b> sein, also mit der Wirklichkeit übereinstimmen, und <b>logisch wahr</b>, also ohne Denk- und Ableitungsfehler. Logik allein ersetzt nie die empirische Prüfung: Ein sauberes Argument mit falscher Prämisse bleibt falsch.</p>
<h3>Empirische und normative Aussagen</h3>
<table class="kvq">
<tr><td><b>empirisch</b></td><td>Beschreibungen, Zusammenhangsaussagen, Erklärungen, Prognosen. Sie sind wahr oder falsch und lassen sich an den Tatsachen prüfen.</td></tr>
<tr><td><b>normativ</b></td><td>Werturteile und Handlungsanweisungen. Sie sind nicht wahr oder falsch, sondern <b>normativ brauchbar oder unbrauchbar</b>, also besser oder schlechter begründet.</td></tr></table>
<div class="merk"><b>Begriffe</b><div class="mrows">
<div><span class="ml">Reliabilität</span><span>Daten werden unabhängig von Person und Laune des Forschers erhoben und ausgewertet.</span></div>
<div><span class="ml">Validität</span><span>Ein konkreter Begriff erfasst wirklich das, was der abstrakte Begriff meint (gelungene Operationalisierung).</span></div>
<div><span class="ml">Hypothese</span><span>Eine empirische Aussage, die gerade überprüft wird.</span></div></div></div>
<p>Patzelt nennt auch <b>Immunisierungsstrategien</b>, mit denen man sich unseriös gegen Kritik abschirmt: unklar formulieren, sich auf Autoritäten statt auf Belege berufen, nur „aus sich selbst heraus“ verstehen lassen, Überprüfbarkeit grundsätzlich ablehnen.</p>`,
check:[
 {q:"Welche Aussage ist normativ?", o:["„Wenn eine Regierung das Vertrauen verliert, wird ihr Sturz wahrscheinlich.“","„Es ist gut, wenn es in einem Staat Opposition gibt.“","„Die Sowjetunion zerfiel, weil …“"], a:1, ex:"Ein Werturteil ist normativ. Die anderen beiden sind eine Zusammenhangsaussage und eine Erklärung, also empirisch."},
 {q:"Normative Aussagen sind laut Patzelt …", o:["wahr oder falsch","normativ brauchbar oder unbrauchbar","grundsätzlich unwissenschaftlich"], a:1, ex:"Werturteile kann man nicht empirisch beweisen, aber gut oder schlecht begründen."},
 {q:"Das Alltagsdenken ist „unreflektiert perspektivisch“ heißt:", o:["Man vergisst das meiste","Man sieht von seinem Standort aus, ohne das zu bedenken","Man widerspricht sich logisch"], a:1, ex:"Perspektivität: Jeder Blick hat einen Standort. Vergessen gehört zur Selektivität."}
]},
{id:"v1-10", t:"Regierung, Regime, Staat, Regierungssystem", html:`
<p>${LIT("Merkel 2013, Lauth 2015")} Vier Begriffe, die oft verwechselt werden. Merkel ordnet sie nach ihrer Reichweite und Dauer.</p>
<table class="kvq">
<tr><td><b>Regierung</b></td><td>Der engste Begriff: Regierungschef und Kabinett. Lenkt die Entscheidungen, in Demokratien auf Zeit gewählt und abwählbar.</td></tr>
<tr><td><b>Regime</b></td><td>Formelle und informelle Organisation der Herrschaft: Wer hat Zugang zur Macht, wie verhalten sich Herrschende und Beherrschte? Die Regeln des Regimes unterscheiden Demokratie und Autokratie. Dauerhafter als eine Regierung.</td></tr>
<tr><td><b>Staat</b></td><td>Dauerhafte Herrschaftsstruktur mit Zwangsmitteln. Nach <b>Jellinek</b> (Drei-Elemente-Lehre): Staatsgebiet, Staatsvolk, Staatsgewalt. Überdauert Regimewechsel: „A state may remain in place, even when regimes come and go.“</td></tr>
<tr><td><b>Politisches System</b></td><td>Der umfassendste Begriff. Deckt Funktionen und Strukturen von Regierung und Staat ab und verbindet die Ordnung über Inputs und Outputs mit der Umwelt.</td></tr></table>
<div class="merk"><b>Beispiel</b>Spanien nach Franco: Das <b>Regime</b> wechselte von der Diktatur zur Demokratie, der <b>Staat</b> mit Verwaltung und vielen Beamten blieb. Dieselben Staatsapparate können in Demokratien wie Diktaturen funktionieren.</div>
<h3>Regime und Regierungssystem (Lauth)</h3>
<p>Lauth nutzt Regime und Herrschaftsform gleichbedeutend. Davon abzugrenzen ist das <b>Regierungssystem</b>: Parlamentarisch und präsidentiell sind zwei Varianten <i>innerhalb</i> des Regimetyps Demokratie. Das wird in Sitzung 2 wichtig.</p>
<p>Lauth betont außerdem: Jedes Regime setzt einen <b>Staat</b> mit Gewaltmonopol voraus. Bei fragiler Staatlichkeit lassen sich die Typologien nur eingeschränkt anwenden.</p>`,
check:[
 {q:"Was ändert sich bei einem Regimewechsel laut Merkel typischerweise nicht?", o:["Die Regeln des Zugangs zur Macht","Staatsgebiet, Staatsvolk und Staatsgewalt","Die Art, wie Herrschaft legitimiert wird"], a:1, ex:"Der Staat bleibt, das Regime, also die Regeln der Herrschaft, wird neu definiert."},
 {q:"Parlamentarische und präsidentielle Demokratie sind bei Lauth …", o:["zwei verschiedene Regime","zwei Regierungssysteme innerhalb des Regimes Demokratie","Formen defekter Demokratie"], a:1, ex:"Beide erfüllen die Merkmale der Demokratie voll, sie unterscheiden sich im Institutionendesign."}
]},
{id:"v1-11", t:"Zwei, drei oder stufenlos? Typologien und Grauzonen", html:`
<p>${LIT("Merkel 2013, Lauth 2015")} Die Folie zeigt Lauths Kontinuum. Merkel diskutiert, warum es überhaupt verschiedene Einteilungen gibt.</p>
<h3>Das Schwellenproblem</h3>
<p>Wie weit darf eine Demokratie bei Wahlen, Bürgerrechten oder Gewaltenkontrolle vom Ideal abweichen und trotzdem noch voll demokratisch sein? Wo genau hört Demokratie auf? Diese Frage ist laut Merkel <b>nirgends präzise gelöst</b>, vielleicht gar nicht lösbar. Dazu kommt die Frage, ob sehr gute Wahlen Schwächen bei den Bürgerrechten <b>ausgleichen</b> dürfen.</p>
<p>Das Problem verschwindet auch bei schlanken Definitionen nicht. Beispiele: Wahlen unter Putin gelten nicht als unfrei, aber zunehmend als unfair. Italien unter Berlusconi kontrollierte große Teile der Medien privat.</p>
<h3>Drei Antworten</h3>
<table class="kvq">
<tr><td><b>Dichotomie</b></td><td>Demokratie oder Autokratie (Kelsen, Przeworski). Klar und nützlich, wenn man mit vielen Fällen rechnet und den Regimetyp als Ursache für etwas anderes testet.</td></tr>
<tr><td><b>Dreiteilung</b></td><td>Mit hybriden Regimen als Grauzone. Freedom House: free, partly free, not free. Polity IV: democracy, anocracy, autocracy. Die Schwellenfrage verschiebt sich nur.</td></tr>
<tr><td><b>Gradualismus</b></td><td>Alle Regime auf einem Kontinuum zwischen idealer Demokratie und perfektem Totalitarismus. Mehr Präzision, aber auch hier keine exakte Grenze.</td></tr></table>
<p>Merkel selbst folgt der Zweiteilung mit Untertypen (Embedded und defekte Demokratie, autoritäre und totalitäre Regime).</p>
<h3>Untertypen oder hybride Regime? (Lauth)</h3>
<ul><li><b>Reguläre Subtypen</b> fügen Merkmale hinzu, zum Beispiel parlamentarisch oder präsidentiell.</li>
<li><b>Verminderte Subtypen</b> (diminished subtypes) haben alle Merkmale, aber einige nur eingeschränkt: die <b>defekte Demokratie</b>. Beispiel: die Schweiz bis zum Frauenwahlrecht 1971.</li>
<li><b>Hybride Regime</b> verbinden Merkmale <i>verschiedener</i> Regimetypen, etwa demokratische Wahlen mit sehr schwacher Machtkontrolle. Auch „competitive“ oder „electoral authoritarianism“.</li></ul>
<h3>Idealtyp und Realtyp</h3>
<p>Ein <b>Realtyp</b> nimmt einen echten Fall als Muster. Ein <b>Idealtyp</b> (Max Weber) spitzt die Leitidee gedanklich zu und muss mit keinem Fall genau übereinstimmen. „Ideal“ heißt hier nicht vorbildlich.</p>
<h3>Demokratie messen</h3>
<p>Einfache Messungen nutzen wenige Indikatoren (Vanhanen: Wettbewerb und Beteiligung nach Dahl). Komplexe Messungen wie <b>Freedom House</b> (rund 100 Indikatoren), der <b>Bertelsmann Transformationsindex</b> oder <b>V-Dem</b> (über 3000 Länderexperten) erfassen auch die Qualität. Gemessen wird graduell, darum braucht es begründete Schwellenwerte, um Typen zu bilden.</p>`,
check:[
 {q:"Was meint Merkel mit dem „Schwellenproblem“?", o:["Dass manche Staaten keine Wahlen abhalten","Dass sich die Grenze zwischen Demokratie und Autokratie nicht exakt bestimmen lässt","Dass Demokratien zu langsam entscheiden"], a:1, ex:"Wo genau Demokratie aufhört und Diktatur beginnt, ist theoretisch nicht präzise gelöst."},
 {q:"Eine defekte Demokratie ist bei Lauth …", o:["ein hybrides Regime","ein verminderter Subtyp der Demokratie","eine Form des Autoritarismus"], a:1, ex:"Alle Merkmale der Demokratie sind da, einige nur eingeschränkt. Hybride Regime mischen dagegen Merkmale verschiedener Regimetypen."},
 {q:"Freedom House teilt Länder ein in …", o:["democracy, anocracy, autocracy","free, partly free, not free","embedded, defective, authoritarian"], a:1, ex:"Die Dreiteilung democracy, anocracy, autocracy stammt von Polity IV."}
]},
{id:"v1-12", t:"Patzelts Merkmalsraum: Systeme einordnen", html:`
<p>${LIT("Patzelt 2023, Kap. 3")} Patzelt vergleicht politische Systeme nach vier Leitvariablen (nach Manfred Hättich). Jede ist ein Kontinuum mit zwei Polen.</p>
<table class="kvq">
<tr><th>Leitvariable</th><th>Pol 1</th><th>Pol 2</th></tr>
<tr><td>Herrschaftsstruktur</td><td>monistisch (ein Machtzentrum)</td><td>gewaltenteilend</td></tr>
<tr><td>Willensbildung</td><td>monopolisiert</td><td>konkurrierend (Pluralismus)</td></tr>
<tr><td>Gestaltungsanspruch</td><td>unbegrenzt</td><td>begrenzt</td></tr>
<tr><td>Offenheit</td><td>geschlossen</td><td>offen</td></tr></table>
<p>Die ersten drei spannen einen dreidimensionalen Merkmalsraum auf. Daraus ergeben sich zwei Extremtypen und eine große Mitte:</p>
<div class="merk"><b>Typen</b><div class="mrows">
<div><span class="ml">Liberaler demokratischer Verfassungsstaat</span><span>gewaltenteilend (Verfassungsstaat), konkurrierend unter Einbeziehung aller (demokratisch), begrenzter Anspruch (liberal)</span></div>
<div><span class="ml">Totalitäre Diktatur</span><span>monistisch (Diktatur), monopolisiert (autokratisch), unbegrenzter Anspruch (totalitär)</span></div>
<div><span class="ml">Autoritäre Systeme</span><span>ziemlich monistisch, monopolisierte Willensbildung ohne Einbeziehung aller (oligarchisch), begrenzter Anspruch. Die häufigste Gruppe.</span></div></div></div>
<p>Sind Zugang zur Macht, Willensbildung und die Debatte über Gestaltungsansprüche für alle offen, spricht Patzelt mit Karl Popper von einer <b>offenen Gesellschaft</b>, sonst von einer geschlossenen.</p>
<h3>Fünf Formen der Gewaltenteilung</h3>
<table class="kvq">
<tr><td><b>sozial</b></td><td>Zugang zu Ämtern für alle Bevölkerungskreise</td></tr>
<tr><td><b>dezisiv</b></td><td>Konkurrenz von Parteien und Verbänden (Pluralismus)</td></tr>
<tr><td><b>vertikal</b></td><td>Verteilung auf Ebenen: Kommunen, Länder, Bund, EU (Subsidiarität)</td></tr>
<tr><td><b>horizontal</b></td><td>Regierung, Parlament, Gerichte kontrollieren sich gegenseitig (Vetospieler)</td></tr>
<tr><td><b>temporal</b></td><td>Ämter nur auf Zeit</td></tr></table>
<p class="small muted">Für deinen GL-Unterricht: Die Einteilung nach „wie viele herrschen, und herrschen sie gut oder schlecht?“ geht auf Aristoteles zurück (Monarchie und Tyrannis, Aristokratie und Oligarchie, Politie und Demokratie). Sie taucht bei Merkel und Patzelt als Ausgangspunkt auf und eignet sich gut für den Einstieg in Herrschaftsformen.</p>`,
check:[
 {q:"Ein System mit Einheitspartei, die alle Macht bündelt, ist in der Dimension Herrschaftsstruktur …", o:["gewaltenteilend","monistisch","offen"], a:1, ex:"Ein einziges Machtzentrum heißt monistisch."},
 {q:"Föderalismus ist bei Patzelt eine Form der …", o:["horizontalen Gewaltenteilung","vertikalen Gewaltenteilung","temporalen Gewaltenteilung"], a:1, ex:"Vertikal: Macht wird auf Ebenen verteilt. Horizontal meint Regierung, Parlament und Gerichte."},
 {q:"Welche Kombination beschreibt den liberalen demokratischen Verfassungsstaat?", o:["monistisch, monopolisiert, unbegrenzt","gewaltenteilend, konkurrierend, begrenzt","monistisch, konkurrierend, begrenzt"], a:1, ex:"Verfassungsstaat (gewaltenteilend), demokratisch (konkurrierend), liberal (begrenzter Anspruch)."}
]},
{id:"v1-13", t:"Drei Demokratiemodelle", html:`
<p>${LIT("Merkel 2013")} Wie viel gehört zur Demokratie? Merkel unterscheidet drei Antworten. Das ist ein klassischer Essay-Baustein.</p>
<table class="kvq">
<tr><th>Modell</th><th>Was gehört dazu?</th><th>Vertreter</th></tr>
<tr><td><b>Minimalistisch</b></td><td>Freie, gleiche, geheime Wahlen sind die Demokratie. Parteien bieten Programme an wie auf einem Markt, die Wähler wählen aus. Nur vertikale Verantwortlichkeit. Auch „elitistisch“ genannt.</td><td>Schumpeter, Downs, der frühe Dahl, Przeworski</td></tr>
<tr><td><b>Mittel, prozedural</b></td><td>Wahlen plus Rechtsstaat und horizontale Gewaltenkontrolle. Beteiligung auch über Referenden, Zivilgesellschaft, öffentliche Debatte.</td><td>Bobbio, Habermas, Barber; Merkels Embedded Democracy</td></tr>
<tr><td><b>Maximalistisch</b></td><td>Auch der Output gehört dazu: Sicherheit, Wohlstand, Sozialstaat, vor allem eine faire Verteilung.</td><td>Bernstein, Heller, Thomas Meyer, Ringen</td></tr></table>
<h3>Merkels Abwägung</h3>
<ul><li>Gegen das Maximalmodell: Solche Leistungen sind nicht demokratiespezifisch, auch Diktaturen erbringen sie (Wachstum in China, Wohlstand in Singapur, Gleichheit in Kuba). Darum gehört der Output nicht in die <i>Definition</i>.</li>
<li>Aber: Liefert eine Demokratie nicht, sinkt ihre <b>Output-Legitimität</b>, und ihre Stabilität ist gefährdet. Seit drei Jahrzehnten wachsende Ungleichheit rückt die Verteilungsfrage wieder näher an die Demokratietheorie.</li>
<li>In Europa dominieren mittlere, prozedurale Modelle.</li></ul>
<h3>Weitere Kernsätze</h3>
<ul><li><b>Dahl</b> nennt real existierende Demokratien <b>Polyarchien</b> („public contestation and the right to participate“). Im Zentrum steht der pluralistische Wettbewerb. Laut Lauth hat Dahl sein achtes Kriterium später gestrichen.</li>
<li><b>Przeworski:</b> Demokratie ist „organisierte Unsicherheit“. Die Regeln stehen vorher fest, das Ergebnis nicht.</li>
<li><b>Habermas:</b> Bürgerrechte und politische Beteiligung sind gleichursprünglich. Weder Demokratie ohne Rechtsstaat noch Rechtsstaat ohne Beteiligung ist auf Dauer zu haben.</li></ul>
<div class="litbox"><b>Lauth ergänzt</b>Weitere Leitbilder: Rätedemokratie (imperatives Mandat, Ämterrotation), Konstitutionalismus (Machtbegrenzung, Loewenstein), soziale Demokratie (Demokratie auch in Betrieben und Schulen oder als Erzeugung sozialer Gerechtigkeit), partizipatorische und deliberative Demokratie (Barber). Auch Volkssouveränität heißt nicht unbegrenzte Herrschaft: Menschenrechte stehen nicht zur Disposition der Mehrheit.</div>`,
check:[
 {q:"Für welches Modell sind Wahlen die Demokratie selbst?", o:["minimalistisch","prozedural","maximalistisch"], a:0, ex:"Schumpeters Modell beschränkt Demokratie bewusst auf den Wettbewerb um Stimmen."},
 {q:"Warum nimmt Merkel den Output nicht in die Demokratiedefinition auf?", o:["Weil Ergebnisse unwichtig sind","Weil auch Diktaturen solche Leistungen erbringen können","Weil Output nicht messbar ist"], a:1, ex:"Wachstum oder Gleichheit sind nicht demokratiespezifisch. Für die Stabilität bleibt der Output trotzdem wichtig."},
 {q:"Zu welchem Modell gehört die Embedded Democracy?", o:["minimalistisch","mittel, prozedural","maximalistisch"], a:1, ex:"Sie geht über Wahlen hinaus (Rechtsstaat, Gewaltenkontrolle), nimmt aber keine Politikergebnisse in die Definition auf."}
]},
{id:"v1-14", t:"Autokratien: Typen und warum sie überleben", html:`
<p>${LIT("Merkel 2013, Lauth 2015")} Die meisten politischen Systeme waren lange Autokratien, die meisten davon autoritär. Wie lassen sie sich unterscheiden, und was hält sie zusammen?</p>
<h3>Typen nach der Legitimation (Merkel)</h3>
<p>Kommunistische, faschistische und theokratische Regime (autoritär oder totalitär), dazu Militärregime, rassistische Apartheidregime, Modernisierungsregime, dynastische und sultanistische Regime (autoritär). Faschistische und rassistische Autokratien sind im 21. Jahrhundert weitgehend verschwunden.</p>
<h3>Elektoraler Autoritarismus</h3>
<p>Heute häufigster Typ: Autokratien halten <b>semipluralistische Wahlen</b> ab, als demokratisches „Mäntelchen“. Die Wahlen sind manipuliert und mit Repression verbunden, meist gewinnt der Amtsinhaber, ein Rest Unsicherheit bleibt (Schedler, Levitsky/Way).</p>
<h3>Geddes: nach dem Herrschaftsträger</h3>
<table class="kvq"><tr><td><b>Einparteienregime</b></td><td>knapp 23 Jahre im Schnitt, am stabilsten: Konflikte werden in Verfahren gelöst</td></tr>
<tr><td><b>Personalistische Regime</b></td><td>15,1 Jahre, Schwachstelle ist die Nachfolgefrage</td></tr>
<tr><td><b>Militärregime</b></td><td>8,8 Jahre, Streit, ob man in die Kasernen zurückkehrt oder härter durchgreift</td></tr></table>
<p>Merkel kritisiert die personalistische Kategorie als Restkategorie, in der sehr verschiedene Herrscher landen.</p>
<h3>Drei-Säulen-Modell (WZB, Gerschewski et al. 2013)</h3>
<div class="merk"><b>Drei Säulen autokratischer Herrschaft</b><div class="mrows">
<div><span class="ml">Legitimation</span><span>normativ-ideologisch (wie diffuse support) und leistungsbezogen (wie specific support). Weil Heilsversprechen und Realität auseinanderklaffen, sind Diktaturen besonders auf ihre Leistungsbilanz angewiesen.</span></div>
<div><span class="ml">Repression</span><span>weich (Versammlungs-, Meinungs-, Pressefreiheit einschränken) oder hart (Leib und Leben). Allein trägt sie nicht: Steigt Repression, sinkt Legitimation.</span></div>
<div><span class="ml">Kooptation</span><span>Wichtige Gruppen (Wirtschaft, Militär, Sicherheitsapparat) werden mit Ämtern, Privilegien und Geld eingebunden: Korruption, Klientelismus. Rohstoffstaaten haben dafür die meisten Mittel.</span></div></div></div>
<p>Bricht eine Säule, können die anderen das eine Weile ausgleichen, aber auch überlastet werden. Dann entsteht eine <b>critical juncture</b>, in der die Opposition ihre Chance sieht.</p>
<div class="litbox"><b>Lauth ergänzt</b>Linz' Definition autoritärer Regime: begrenzter, nicht verantwortlicher Pluralismus, keine ausgearbeitete Ideologie, aber Mentalitäten, keine intensive Mobilisierung, ein Führer oder kleine Gruppe übt Macht in kaum definierten, aber vorhersagbaren Grenzen aus. Friedrich und Brzezinski nennen sechs Merkmale totalitärer Herrschaft: umfassende Ideologie, Massenpartei mit Führer, Geheimpolizei, Nachrichtenmonopol, Waffenmonopol, gelenkte Wirtschaft.</div>`,
check:[
 {q:"Welcher Autokratietyp ist laut Geddes am langlebigsten?", o:["Militärregime","Personalistische Regime","Einparteienregime"], a:2, ex:"Rund 23 Jahre im Schnitt, weil institutionalisierte Verfahren interne Konflikte auffangen."},
 {q:"Welche drei Säulen tragen autokratische Herrschaft im WZB-Modell?", o:["Legitimation, Repression, Kooptation","Wahlen, Medien, Militär","Ideologie, Partei, Führer"], a:0, ex:"Legitimation, Repression und Kooptation. Risse in einer Säule können die anderen überlasten."},
 {q:"Was ist elektoraler Autoritarismus?", o:["Eine defekte Demokratie mit freien Wahlen","Eine Autokratie mit manipulierten semipluralistischen Wahlen","Ein totalitäres Regime mit 99-Prozent-Wahlen"], a:1, ex:"Wahlen als demokratischer Anstrich, aber manipuliert. Heute der häufigste Autokratietyp."}
]}
);
/* Reihenfolge der Lektionen von Sitzung 1 */
(function(){ const order=["v1-1","v1-2","v1-3","v1-9","v1-4","v1-5","v1-10","v1-6","v1-11","v1-12","v1-7","v1-13","v1-8","v1-14"];
  LESSONS[1]=order.map(id=>LESSONS[1].find(x=>x.id===id)); })();
chOf(1).teaser="Politikbegriff, politisches System (Easton, Almond/Powell), Regierung, Regime, Staat, Demokratie und Autokratie, Typologien, drei Demokratiemodelle, Embedded Democracy, Autokratietypen. Folien plus Lektüre der Selbstlernphase.";

CARDS[1].push(
 {id:"v1-c27", f:"MINK-Schema (Patzelt)", b:"Macht\nIdeologie\nNormen\nKommunikation"},
 {id:"v1-c28", f:"Macht nach Max Weber", b:"Die Chance, in einer sozialen Beziehung den eigenen Willen auch gegen Widerstreben durchzusetzen, gleich worauf diese Chance beruht."},
 {id:"v1-c29", f:"Drei Schwächen des Alltagsdenkens (Patzelt)", b:"1. unreflektiert selektiv\n2. unreflektiert perspektivisch\n3. selbstverständlich"},
 {id:"v1-c30", f:"Empirische vs. normative Aussagen", b:"Arten: Beschreibung, Zusammenhang, Erklärung, Prognose / Werturteil, Handlungsanweisung\nPrüfung: wahr oder falsch / normativ brauchbar oder unbrauchbar"},
 {id:"v1-c31", f:"AGIL-Schema (Parsons)", b:"A: Adaptation (Anpassung)\nG: Goal Attainment (Zielerreichung, Aufgabe der Politik)\nI: Integration (Zusammenhalt)\nL: Latent Pattern Maintenance (Werterhalt)"},
 {id:"v1-c32", f:"Specific vs. diffuse support (Easton)", b:"Gilt: Leistungen und Amtsträgern / dem System als Ganzem\nGrundlage: Zufriedenheit mit Outputs / Werte, Normen, Verfahren"},
 {id:"v1-c33", f:"Withinputs (Easton)", b:"Forderungen, die im politischen System selbst entstehen, etwa bei den Entscheidungsträgern, und dort bearbeitet werden."},
 {id:"v1-c34", f:"Responsivität und Legitimität (Patzelt)", b:"Responsivität: Fähigkeit eines Systems, Input aufzunehmen und darauf zu reagieren\nLegitimität: Herrschaft gilt in der Gesellschaft aufrichtig als rechtens"},
 {id:"v1-c35", f:"Regierung, Regime, Staat (Merkel)", b:"Regierung: Regierungschef und Kabinett, auf Zeit\nRegime: Regeln des Zugangs zur Macht und der Beziehung zu den Beherrschten\nStaat: dauerhafte Herrschaftsstruktur mit Zwangsmitteln, überdauert Regimewechsel"},
 {id:"v1-c36", f:"Drei-Elemente-Lehre (Jellinek 1900)", b:"Staatsgebiet\nStaatsvolk\nStaatsgewalt"},
 {id:"v1-c37", f:"Autonome vs. heteronome Normen (Kelsen)", b:"Regime: Demokratie / Autokratie\nVerhältnis: Normautoren und Normadressaten sind dieselben / fallen auseinander"},
 {id:"v1-c38", f:"Linz: autoritär vs. totalitär", b:"Pluralismus: begrenzt / Monismus\nLegitimation: Mentalitäten / umfassende Weltanschauung\nMobilisierung: demobilisiert / Dauermobilisierung"},
 {id:"v1-c39", f:"Dichotomie, Dreiteilung, Gradualismus", b:"Dichotomie: Demokratie oder Autokratie (Kelsen, Przeworski)\nDreiteilung: mit hybriden Regimen (Freedom House, Polity IV)\nGradualismus: Kontinuum zwischen idealer Demokratie und Totalitarismus"},
 {id:"v1-c40", f:"Das Schwellenproblem (Merkel)", b:"Wo genau hört Demokratie auf? Wie weit darf sie bei Wahlen, Rechten, Kontrolle vom Ideal abweichen? Dürfen Stärken Schwächen ausgleichen? Theoretisch nicht exakt gelöst."},
 {id:"v1-c41", f:"Verminderter Subtyp vs. hybrides Regime (Lauth)", b:"Verminderter Subtyp: alle Merkmale eines Regimetyps, einige eingeschränkt (z. B. defekte Demokratie)\nHybrides Regime: Merkmale verschiedener Regimetypen gemischt"},
 {id:"v1-c42", f:"Idealtyp vs. Realtyp", b:"Realtyp: ein echter Fall dient als Muster\nIdealtyp (Weber): gedanklich zugespitzte Leitidee, muss mit keinem Fall genau übereinstimmen"},
 {id:"v1-c43", f:"Patzelts vier Leitvariablen (nach Hättich)", b:"Herrschaftsstruktur: monistisch / gewaltenteilend\nWillensbildung: monopolisiert / konkurrierend\nGestaltungsanspruch: unbegrenzt / begrenzt\nOffenheit: geschlossen / offen"},
 {id:"v1-c44", f:"Fünf Formen der Gewaltenteilung (Patzelt)", b:"1. sozial (Zugang zu Ämtern)\n2. dezisiv (Konkurrenz, Pluralismus)\n3. vertikal (Ebenen, Subsidiarität)\n4. horizontal (Regierung, Parlament, Gerichte)\n5. temporal (Ämter auf Zeit)"},
 {id:"v1-c45", f:"Drei Demokratiemodelle (Merkel)", b:"Minimalistisch: Wahlen sind die Demokratie (Schumpeter)\nMittel/prozedural: plus Rechtsstaat und Gewaltenkontrolle (Embedded Democracy)\nMaximalistisch: plus Output, faire Verteilung (Meyer, Heller)"},
 {id:"v1-c46", f:"Demokratie bei Przeworski", b:"„Organisierte Unsicherheit“: Die Verfahrensregeln stehen vorher fest, das Ergebnis ist offen."},
 {id:"v1-c47", f:"Vier Typen defekter Demokratie (Merkel)", b:"Exklusiv: Gruppen ohne Wahlrecht (A)\nIlliberal: Rechtsstaat und Freiheitsrechte beschädigt (C)\nDelegativ: Exekutive umgeht Parlament und Justiz (D)\nEnklaven: Vetomächte entziehen Politikbereiche (E)"},
 {id:"v1-c48", f:"Geddes: drei Autokratietypen und ihre Lebensdauer", b:"Einparteienregime: knapp 23 Jahre\nPersonalistische Regime: 15,1 Jahre\nMilitärregime: 8,8 Jahre"},
 {id:"v1-c49", f:"Drei-Säulen-Modell autokratischer Herrschaft", b:"1. Legitimation (ideologisch und leistungsbezogen)\n2. Repression (weich und hart)\n3. Kooptation (Eliten einbinden)"},
 {id:"v1-c50", f:"Elektoraler Autoritarismus", b:"Autokratie mit semipluralistischen, manipulierten Wahlen. Meist gewinnt der Amtsinhaber, ein Rest Unsicherheit bleibt. Heute häufigster Autokratietyp (Schedler)."}
);
Object.assign(CARD_CTX,{
 "v1-c27":"Was in jeder Politik zusammenwirkt","v1-c28":"Klassische Definition","v1-c29":"Warum es Wissenschaft braucht","v1-c30":"Zwei Gruppen wissenschaftlicher Aussagen",
 "v1-c31":"Vier Funktionen jedes Systems","v1-c32":"Zwei Arten der Unterstützung","v1-c33":"Eastons Systemmodell","v1-c34":"Systemkreislauf bei Patzelt",
 "v1-c35":"Drei Begriffe, oft verwechselt","v1-c36":"Klassische Staatslehre","v1-c37":"Kelsens Unterscheidung","v1-c38":"Drei Merkmale nach Linz",
 "v1-c39":"Drei Arten, Regime einzuteilen","v1-c40":"Grenze zwischen Demokratie und Autokratie","v1-c41":"Grauzone richtig benennen","v1-c42":"Zwei Arten, Typen zu bilden",
 "v1-c43":"Merkmalsraum zum Systemvergleich","v1-c44":"Wie man Macht verteilen kann","v1-c45":"Wie viel gehört zur Demokratie?","v1-c46":"Ein Satz zum Zitieren",
 "v1-c47":"Welches Teilregime ist beschädigt?","v1-c48":"Autokratien nach dem Herrschaftsträger","v1-c49":"Warum Autokratien überleben","v1-c50":"Die heute häufigste Autokratie"});
Object.assign(CARD_INFO,{
 "v1-c31":"Steht bei Merkel und bei Patzelt. G ist die Kernaufgabe des politischen Systems.",
 "v1-c36":"Georg Jellinek: deutscher Staatsrechtler, „Allgemeine Staatslehre“ 1900.",
 "v1-c37":"Hans Kelsen: österreichischer Verfassungstheoretiker (1881–1973), Hauptautor der österreichischen Verfassung von 1920.",
 "v1-c44":"Dezisiv: von lateinisch decidere, entscheiden.\nSubsidiarität: Aufgaben möglichst auf der unteren Ebene erledigen.",
 "v1-c45":"Schumpeter: österreichischer Ökonom, „Kapitalismus, Sozialismus und Demokratie“ (1942).",
 "v1-c49":"Entwickelt am WZB, dem Wissenschaftszentrum Berlin, an dem auch Merkel forschte.",
 "v1-c50":"Elektoral: auf Wahlen bezogen."});

KREUZ.push(
 {id:"v1-x08", ch:1, stem:"Zu Patzelts Wissenschaftsverständnis gilt:", s:[
  ["Werturteile können laut Patzelt nicht wahr oder falsch, sondern nur besser oder schlechter begründet sein.", true, "Er spricht von normativer Brauchbarkeit."],
  ["Ein logisch korrektes Argument ist immer auch empirisch wahr.", false, "Ist eine Prämisse empirisch falsch, bleibt auch die logisch richtige Folgerung falsch."],
  ["Prognosen gehören zu den empirischen Aussagen.", true, "Beschreibungen, Zusammenhänge, Erklärungen und Prognosen sind empirisch."]]},
 {id:"v1-x09", ch:1, stem:"Zu Regierung, Regime und Staat (Merkel) gilt:", s:[
  ["Die Regierung ist der engste der drei Begriffe.", true, "Regierungschef und Kabinett."],
  ["Bei einem Regimewechsel ändert sich in der Regel auch das Staatsgebiet.", false, "Staatsgebiet, -volk und -gewalt bleiben. Es ändern sich die <b>Regeln</b> des Zugangs zur Macht."],
  ["Dieselben Staatsapparate können in Demokratien wie in Diktaturen funktionieren.", true, "Merkels Beispiele: Spanien nach Franco, viele postkommunistische Staaten."]]},
 {id:"v1-x10", ch:1, stem:"Zu Typologien politischer Regime gilt:", s:[
  ["Polity IV unterscheidet democracy, anocracy und autocracy.", true, "Freedom House dagegen free, partly free, not free."],
  ["Das Schwellenproblem verschwindet, wenn man Demokratie minimalistisch über Wahlen definiert.", false, "Es verlagert sich nur in die Frage, wann Wahlen fair genug sind."],
  ["Ein hybrides Regime mischt nach Lauth Merkmale verschiedener Regimetypen.", true, "Ein verminderter Subtyp hat dagegen alle Merkmale eines Typs, nur eingeschränkt."]]},
 {id:"v1-x11", ch:1, stem:"Zu den drei Demokratiemodellen (Merkel) gilt:", s:[
  ["Schumpeter vertritt ein minimalistisches Demokratieverständnis.", true, "Wahlen sind für ihn die Demokratie selbst."],
  ["Die Embedded Democracy ist ein maximalistisches Modell.", false, "Sie ist ein <b>mittleres, prozedurales</b> Modell und nimmt den Output nicht in die Definition auf."],
  ["Gegen das maximalistische Modell spricht, dass auch Diktaturen Wohlstand oder Gleichheit erzeugen können.", true, "Merkels Beispiele: China, Singapur, Kuba."]]},
 {id:"v1-x12", ch:1, stem:"Zu Patzelts Merkmalsraum gilt:", s:[
  ["Eine Herrschaftsstruktur mit einem einzigen Machtzentrum heißt monistisch.", true, "Das Gegenteil ist gewaltenteilend."],
  ["Föderalismus ist eine Form horizontaler Gewaltenteilung.", false, "Er ist <b>vertikal</b>: Macht wird auf Ebenen verteilt."],
  ["Die meisten realen Systeme gehören zu keinem der beiden Extremtypen.", true, "Autoritäre Systeme bilden die große Mitte."]]},
 {id:"v1-x13", ch:1, stem:"Zu Autokratien gilt:", s:[
  ["Militärregime sind laut Geddes im Schnitt die kurzlebigsten Autokratien.", true, "Durchschnittlich 8,8 Jahre."],
  ["Im Drei-Säulen-Modell genügt Repression allein, um ein Regime dauerhaft zu stabilisieren.", false, "Steigt die Repression, sinkt die Legitimation. Repression allein trägt nicht."],
  ["Linz' Kriterien sind Pluralismus, Legitimation durch Ideologie oder Mentalitäten und Mobilisierung.", true, "So unterscheidet er autoritär und totalitär."]]},
 {id:"v1-x14", ch:1, stem:"Zu defekten Demokratien (Merkel) gilt:", s:[
  ["In einer Enklavendemokratie entziehen Vetomächte wie das Militär Politikbereiche den Gewählten.", true, "Betroffen ist Teilregime E, die effektive Regierungsgewalt."],
  ["Die delegative Demokratie ist laut Merkel der häufigste Typ.", false, "Der häufigste Typ ist die <b>illiberale</b> Demokratie."],
  ["Defekte Demokratien können stabil sein und sind nicht zwingend Übergangsstadien.", true, "Merkel widerspricht hier der älteren Transformationsforschung."]]}
);

/* Bestehende Essays um Lektüre ergänzen */
(function(){ const e2=ESSAYS.find(x=>x.id==="v1-e2");
  e2.k.splice(1,0,"Kelsen: autonome Normen (Demokratie) vs. heteronome Normen (Autokratie)");
  e2.k.splice(e2.k.length-1,0,"Schwellenproblem nach Merkel: Grenze zwischen Demokratie und Autokratie nicht exakt bestimmbar");
  e2.gl.splice(1,1,"<b>Kernkriterium:</b> Bindung des Gesetzgebers an die Gesetze, bei Kelsen autonome und heteronome Normen.");
  e2.gl.splice(e2.gl.length-1,0,"<b>Schwellenproblem:</b> Merkel, wo hört Demokratie auf? Dreiteilung mit hybriden Regimen als Ausweg, verschiebt das Problem aber nur.");
  e2.m.splice(2,0,"Hans Kelsen hat dieses Kriterium präzisiert: In Demokratien werden die Gesetze von denen gemacht, für die sie gelten (autonome Normen), in Autokratien fallen Normautoren und Normadressaten auseinander (heteronome Normen).");
  e2.m.splice(e2.m.length-1,0,"Merkel (2013) zeigt allerdings, dass auch das Kontinuum ein Grundproblem nicht löst: Wo genau eine Demokratie aufhört, lässt sich theoretisch nicht exakt bestimmen. Ob etwa sehr faire Wahlen Schwächen bei den Bürgerrechten ausgleichen dürfen, bleibt offen. Dreiteilungen mit einer Grauzone hybrider Regime, wie sie Freedom House oder Polity IV verwenden, verschieben die Schwelle nur.");
})();

ESSAYS.push(
 {id:"v1-e5", ch:1, kind:"lang", short:"Demokratiemodelle",
  q:"Stellen Sie die drei Demokratiemodelle nach Merkel dar und diskutieren Sie, ob die Leistungen eines politischen Systems (Output) Teil der Demokratiedefinition sein sollten.",
  op:"„Darstellen“: die drei Modelle mit Kernmerkmal und Vertretern beschreiben. „Diskutieren“: Argumente für und gegen ein Output-Kriterium abwägen und Stellung beziehen.",
  gl:["<b>Einleitung:</b> Demokratiedefinitionen sind „Legion“. Frage: Wie viel gehört dazu, und gehört auch der Output dazu?",
   "<b>Minimalistisch:</b> Schumpeter, Wahlen als Markt, vertikale Verantwortlichkeit, elitistisch.",
   "<b>Mittel, prozedural:</b> plus Rechtsstaat, Gewaltenkontrolle, Partizipation. Beispiel Embedded Democracy.",
   "<b>Maximalistisch:</b> plus Output, vor allem faire Verteilung (Meyer, Heller).",
   "<b>Pro Output:</b> politische Gleichheit braucht soziale Grundlagen, wachsende Ungleichheit, Output-Legitimität sichert Stabilität.",
   "<b>Contra Output:</b> nicht demokratiespezifisch (China, Singapur, Kuba), Definition würde unscharf und normativ überladen.",
   "<b>Fazit:</b> Output nicht in die Definition, aber als zentrale Bedingung für Stabilität und Qualität berücksichtigen."],
  k:["Alle drei Modelle mit Kernmerkmal genannt",
   "Mindestens ein Vertreter pro Modell (z. B. Schumpeter, Habermas oder Merkel, Meyer oder Heller)",
   "Embedded Democracy als Beispiel des mittleren Modells eingeordnet",
   "Argument für ein Output-Kriterium (soziale Grundlagen politischer Gleichheit, Ungleichheit)",
   "Argument dagegen: Leistungen auch in Autokratien möglich, mit Beispiel",
   "Output-Legitimität und Stabilität angesprochen",
   "Begründete eigene Position im Fazit"],
  m:["Was eine Demokratie ausmacht, ist in der Politikwissenschaft umstritten. Merkel (2013) ordnet die zahllosen Definitionen in drei Gruppen: minimalistische, mittlere und maximalistische Modelle. Die Modelle unterscheiden sich vor allem darin, wie viel sie in die Demokratie hineinnehmen. Im Folgenden werden sie dargestellt, bevor diskutiert wird, ob auch die Leistungen eines Systems zur Definition gehören sollten.",
   "Das minimalistische Modell geht auf Joseph Schumpeter (1942) zurück. Für ihn sind freie, gleiche und geheime Wahlen nicht nur der Kern der Demokratie, sondern die Demokratie selbst. Ähnlich wie auf einem Markt bieten Parteien Programme an, die Wähler wählen aus und können die Regierenden bei der nächsten Wahl abstrafen. Demokratie wird damit auf die vertikale Verantwortlichkeit zwischen Regierten und Regierenden beschränkt, weshalb man auch von einem elitistischen Modell spricht.",
   "Vertreter eines mittleren, prozeduralen Modells halten das für zu dünn. Sie ergänzen die Wahlen um den Rechtsstaat, die horizontale Gewaltenkontrolle und weitere Beteiligungsformen wie Referenden oder eine lebendige Zivilgesellschaft. Erst die Einbettung der Wahlen in Grund- und Bürgerrechte und die gegenseitige Kontrolle der Gewalten mache sie wirksam. Merkels Konzept der Embedded Democracy ist ein solches Modell. In Europa dominieren diese Ansätze.",
   "Maximalisten wie Hermann Heller oder heute Thomas Meyer gehen weiter: Für sie gehört auch der Output zur Demokratie, also Sicherheit, Wohlstand, sozialstaatliche Garantien und vor allem eine faire Verteilung. Erst die soziale Demokratie sichere die politische Gleichheit.",
   "Für ein Output-Kriterium spricht, dass formale Gleichheit wenig wert ist, wenn extreme soziale Ungleichheit die tatsächlichen Beteiligungschancen verzerrt. Merkel weist darauf hin, dass die seit Jahrzehnten wachsende Ungleichheit in den OECD-Staaten die Verteilungsfrage wieder näher an die Demokratietheorie gerückt hat. Zudem hängt die Stabilität einer Demokratie von ihrer Output-Legitimität ab: Liefert sie nicht, was die Bürger erwarten, gerät sie in die Krise.",
   "Gegen ein Output-Kriterium spricht jedoch, dass solche Leistungen nicht demokratiespezifisch sind. Auch Autokratien erzielen hohes Wirtschaftswachstum wie China, Wohlstand wie Singapur oder soziale Gleichheit wie Kuba. Nähme man den Output in die Definition auf, würde die Grenze zur Autokratie unscharf, und die Definition würde mit politischen Zielen überladen, über die in einer Demokratie gerade gestritten werden soll.",
   "Überzeugender ist deshalb, mit Merkel den Output nicht in die Definition der Demokratie aufzunehmen, ihn aber als zentrale Bedingung für ihre Stabilität und Qualität ernst zu nehmen. Die Definition bleibt so trennscharf, und trotzdem gerät nicht aus dem Blick, dass eine Demokratie, die dauerhaft keine Probleme löst, ihre eigene Grundlage untergräbt."]},
 {id:"v1-e6", ch:1, kind:"lang", short:"Warum Autokratien überleben",
  q:"Erläutern Sie, wie sich autoritäre und totalitäre Regime unterscheiden, und erklären Sie mithilfe des Drei-Säulen-Modells, wodurch autokratische Herrschaft stabil bleibt oder zerbricht.",
  op:"„Erläutern“: Unterschiede mit Kriterien und Beispielen darstellen. „Erklären“: das Modell anwenden und Ursachen für Stabilität und Krise benennen.",
  gl:["<b>Einleitung:</b> Autokratie nach Kelsen (heteronome Normen), Frage nach Formen und Stabilität.",
   "<b>Autoritär vs. totalitär:</b> Linz' drei Merkmale, Arendt-Zitat, Beispiele.",
   "<b>Heutige Formen:</b> elektoraler Autoritarismus, Geddes' Typen und ihre Lebensdauer.",
   "<b>Drei Säulen:</b> Legitimation, Repression, Kooptation, jeweils erklären.",
   "<b>Zusammenspiel und Krise:</b> Säulen gleichen sich aus oder überlasten sich, critical juncture.",
   "<b>Fazit:</b> Stabilität beruht auf der Balance aller drei Säulen, Repression allein reicht nicht."],
  k:["Autokratie definiert (z. B. Kelsen oder Gesetzgeber nicht an Gesetze gebunden)",
   "Linz' Unterscheidung mit den drei Merkmalen Pluralismus, Legitimation, Mobilisierung",
   "Mindestens ein heutiger Typ oder Befund (elektoraler Autoritarismus oder Geddes)",
   "Legitimation als Säule mit ideologischer und leistungsbezogener Quelle",
   "Repression als Säule, weich und hart, mit Grenze (sinkende Legitimation)",
   "Kooptation als Säule (Eliten durch Ämter, Privilegien, Geld binden)",
   "Zusammenspiel der Säulen und critical juncture erklärt",
   "Fazit beantwortet die Frage"],
  m:["Autokratien unterscheiden sich von Demokratien grundsätzlich dadurch, dass die Herrschenden nicht an die Gesetze gebunden sind, die sie für andere machen. Kelsen spricht von heteronomen Normen: Normautoren und Normadressaten fallen auseinander. Doch Autokratien sind sehr verschieden, und manche halten sich über Jahrzehnte. Dieses Essay erläutert zunächst, wie sich autoritäre und totalitäre Regime unterscheiden, und erklärt dann mit dem Drei-Säulen-Modell, was ihre Stabilität ausmacht.",
   "Juan Linz unterscheidet die beiden Subtypen anhand von drei Merkmalen. Autoritäre Regime lassen einen begrenzten Pluralismus zu, legitimieren sich über Mentalitäten wie Nationalismus oder Sicherheit und halten die Bevölkerung eher ruhig. Totalitäre Regime ersetzen den Pluralismus durch Monismus, stützen sich auf eine umfassende Weltanschauung und mobilisieren die Bevölkerung dauerhaft. Hannah Arendt hat den Unterschied zugespitzt: Autoritäre Herrschaft schränkt die Freiheit ein, totalitäre schafft sie ab. Heute gilt fast nur noch Nordkorea als totalitär. Häufiger ist der elektorale Autoritarismus, bei dem manipulierte Wahlen einen demokratischen Anstrich liefern.",
   "Warum überleben solche Regime? Das am Wissenschaftszentrum Berlin entwickelte Drei-Säulen-Modell nennt Legitimation, Repression und Kooptation. Legitimation speist sich aus einer ideologischen Quelle und aus der Leistungsbilanz, ähnlich wie bei Eastons diffuser und spezifischer Unterstützung. Weil Heilsversprechen und Wirklichkeit in Diktaturen auseinanderklaffen, sind sie besonders auf wirtschaftliche Erfolge und Ordnung angewiesen.",
   "Repression kann weich sein, etwa durch Einschränkung der Presse- und Versammlungsfreiheit, oder hart, wenn sie Leib und Leben betrifft. Sie allein kann ein Regime aber nicht dauerhaft tragen, denn steigende Repression senkt die Legitimation. Die dritte Säule, Kooptation, bindet wichtige Gruppen wie Militär, Sicherheitsapparat und Wirtschaftseliten über Ämter, Privilegien und Geld an das Regime. Rohstoffreiche Staaten haben dafür besonders viele Mittel.",
   "Entscheidend ist das Zusammenspiel. Bricht eine Säule, etwa die Legitimation in einer Wirtschaftskrise, können die anderen das eine Zeit lang ausgleichen, zum Beispiel durch mehr Repression oder mehr Geld für die Eliten. Sie können dabei aber überlastet werden. Dann entsteht eine critical juncture, in der oppositionelle Kräfte eine Chance sehen, das Regime herauszufordern. Auch der Herrschaftsträger spielt eine Rolle: Nach Geddes halten Einparteienregime im Schnitt am längsten, weil sie Konflikte in Verfahren lösen, während Militärregime an internen Streitigkeiten und personalistische Regime an der Nachfolgefrage scheitern.",
   "Autokratische Stabilität beruht also nicht allein auf Gewalt, sondern auf einer Balance aus Legitimation, Repression und Kooptation. Wo diese Balance kippt, werden auch lange stabile Regime verwundbar."]},
 {id:"v1-e7", ch:1, kind:"kurz", short:"Regierung, Regime, Staat",
  q:"Unterscheiden Sie die Begriffe Regierung, Regime, Staat und politisches System.",
  op:"„Unterscheiden“: jeden Begriff bestimmen und die Unterschiede an einem Beispiel zeigen. Etwa 15 Minuten.",
  gl:["<b>Regierung:</b> engster Begriff, Regierungschef und Kabinett, auf Zeit.",
   "<b>Regime:</b> Regeln des Zugangs zur Macht und der Beziehung zu den Beherrschten, unterscheidet Demokratie und Autokratie.",
   "<b>Staat:</b> dauerhafte Herrschaftsstruktur, Jellinek, überdauert Regimewechsel.",
   "<b>Politisches System:</b> umfassendster Begriff, Funktionen und Strukturen, Input und Output.",
   "<b>Beispiel:</b> Spanien nach Franco."],
  k:["Regierung als engster Begriff (Regierungschef und Kabinett, auf Zeit)",
   "Regime als Regeln des Machtzugangs und der Beziehung Herrschende und Beherrschte",
   "Staat mit Drei-Elemente-Lehre (Gebiet, Volk, Gewalt)",
   "Staat überdauert Regimewechsel",
   "Politisches System als umfassendster Begriff",
   "Ein passendes Beispiel"],
  m:["Die Regierung ist der engste der vier Begriffe. Sie besteht aus dem Regierungschef und dem Kabinett und lenkt die politischen Entscheidungen. In Demokratien ist sie auf Zeit gewählt und kann abgewählt werden.",
   "Das Regime bezeichnet nach Merkel die formelle und informelle Organisation der Herrschaft: wie man Zugang zu den Herrschaftspositionen erhält und wie Herrschende und Beherrschte zueinander stehen. Die Regeln des Regimes unterscheiden Demokratien von Autokratien. Regime sind dauerhafter als Regierungen.",
   "Der Staat ist eine noch dauerhaftere Herrschaftsstruktur, die die nötigen Zwangsmittel einschließt. Nach Jellineks Drei-Elemente-Lehre besteht er aus Staatsgebiet, Staatsvolk und Staatsgewalt. Bei einem Regimewechsel ändern sich diese nicht, sondern nur die Regeln der Herrschaft. So blieben in Spanien nach dem Ende der Franco-Diktatur Staat und Verwaltung weitgehend bestehen, während das Regime zur Demokratie wurde.",
   "Das politische System schließlich ist der umfassendste Begriff. Es deckt Funktionen und Strukturen von Regierung und Staat ab und verbindet die politische Ordnung über Inputs und Outputs mit ihrer Umwelt."]},
 {id:"v1-e8", ch:1, kind:"kurz", short:"Wissenschaft und Alltagswissen",
  q:"Was ist Wissenschaft nach Patzelt, und warum braucht die Politik mehr als den „gesunden Menschenverstand“?",
  op:"„Erklären“: Definition wiedergeben und an den Schwächen des Alltagsdenkens begründen. Etwa 15 Minuten. (Kontrollfrage aus Patzelt, Kap. 1)",
  gl:["<b>Definition:</b> Aussagen, die dem gesunden Menschenverstand an empirischem und logischem Wahrheitsgehalt überlegen sind.",
   "<b>Drei Schwächen des Alltagsdenkens:</b> selektiv, perspektivisch, selbstverständlich, jeweils mit Gegenmittel.",
   "<b>Anforderungen:</b> empirisch und logisch wahr, empirische und normative Aussagen unterscheiden.",
   "<b>Schluss:</b> kritische, aufklärende Aufgabe der Politikwissenschaft."],
  k:["Definition von Wissenschaft (empirischer und logischer Wahrheitsgehalt über dem gesunden Menschenverstand)",
   "Alltagsdenken unreflektiert selektiv",
   "Alltagsdenken unreflektiert perspektivisch",
   "Alltagsdenken selbstverständlich",
   "Empirische und logische Wahrheit unterschieden",
   "Aufklärende Aufgabe der Politikwissenschaft genannt"],
  m:["Patzelt versteht Wissenschaft als menschliches Handeln, das Aussagen herstellen will, die an empirischem und logischem Wahrheitsgehalt dem überlegen sind, was der gesunde Menschenverstand formulieren kann. Wissenschaft ist also eine Emanzipation aus dem Alltagsdenken und wird erst dort gebraucht, wo dieses nicht mehr ausreicht.",
   "Das Alltagsdenken hat nach Patzelt drei Schwächen. Es ist unreflektiert selektiv: Niemand nimmt alles wahr, und das meiste vergisst man wieder. Es ist unreflektiert perspektivisch, weil jeder von seinem eigenen Standort aus urteilt. Und es ist selbstverständlich: Was nicht ins eigene Weltbild passt, wird eher angezweifelt als das Weltbild selbst. Die Politikwissenschaft setzt dem eine bewusste Fallauswahl, klar definierte Begriffe und Theorien sowie Methodenlehre entgegen.",
   "Wissenschaftliche Aussagen sollen empirisch wahr sein, also mit der Wirklichkeit übereinstimmen, und logisch wahr, also frei von Denkfehlern. Gerade in der Politik, wo Ideologien oft mit überzeugend wirkenden Argumenten auf falschen Prämissen arbeiten, ist diese doppelte Prüfung wichtig. Darin liegt die aufklärende Aufgabe der Politikwissenschaft: Alltagswissen und politische Theorien auf Vorurteile und Fehler zu prüfen und bessere Aussagen anzubieten."]}
);

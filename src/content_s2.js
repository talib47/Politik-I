/* ================= Seminar, Block II (12.11., asynchron): Politische Parteien und Wahlen =================
   Textgrundlage (Kern, unmarkiert): Mielke (2013), Parteiensysteme, gesellschaftliche Konflikte und komplexe Wählermärkte,
   in: Korte/Grunden (Hrsg.), Handbuch Regierungsforschung, S. 175–186.
   Literaturempfehlungen (als Empfehlung markiert, litbox/lit): Lucardie (2018), Merten (2018), Niedermayer (2018), alle in Decker/Neu (Hrsg.),
   Handbuch der deutschen Parteien. Moodle nennt bei den drei Empfehlungen 2013, die PDFs sind die Ausgabe 2018.
   Darüber hinaus: erg/ergbox. IDs se2-… nie umbenennen.
   Umfang bewusst schlanker als Block I (Prüfauftrag 10.11.2026: Lernzeit am Abend). */
UPLOADS.push({c:"se", ch:102, known:true, src:"Moodle-Screenshot (10.11.) und Verlaufsplan", items:[
 {k:"Textgrundlage", t:"Mielke 2013", ok:true}, {k:"Empfehlung", t:"Lucardie 2018", ok:true}, {k:"Empfehlung", t:"Merten 2018", ok:true},
 {k:"Empfehlung", t:"Niedermayer 2018", ok:true}], added:"2026-11-10"});
chOf(102).lit="Textgrundlage: Mielke (2013), Handbuch Regierungsforschung, S. 175–186. Empfehlungen: Lucardie (2018), Merten (2018), Niedermayer (2018), Handbuch der deutschen Parteien. Alle als PDF im Moodle-Kurs.";

const FIG_KONFLIKT=`<svg viewBox="0 0 360 300" role="img" aria-label="Zweidimensionale Konfliktstruktur des deutschen Parteiensystems nach Mielke" style="width:100%;max-width:440px;display:block;margin:10px auto;font:12px var(--sans)">
  <line x1="40" y1="150" x2="330" y2="150" style="stroke:var(--muted);stroke-width:1.2"/>
  <line x1="185" y1="22" x2="185" y2="278" style="stroke:var(--muted);stroke-width:1.2"/>
  <text x="40" y="168" style="fill:var(--muted)">soziale</text><text x="40" y="181" style="fill:var(--muted)">Gerechtigkeit</text>
  <text x="330" y="168" text-anchor="end" style="fill:var(--muted)">Markt-</text><text x="330" y="181" text-anchor="end" style="fill:var(--muted)">freiheit</text>
  <text x="185" y="16" text-anchor="middle" style="fill:var(--muted)">libertär</text>
  <text x="185" y="294" text-anchor="middle" style="fill:var(--muted)">autoritär</text>
  <g style="font-weight:600">
   <circle cx="105" cy="52" r="5" style="fill:var(--accent)"/><text x="113" y="56" style="fill:var(--ink)">Grüne</text>
   <circle cx="70" cy="105" r="5" style="fill:var(--accent)"/><text x="78" y="109" style="fill:var(--ink)">Linke</text>
   <circle cx="125" cy="118" r="5" style="fill:var(--accent)"/><text x="133" y="122" style="fill:var(--ink)">SPD</text>
   <circle cx="138" cy="80" r="5" style="fill:var(--accent)"/><text x="146" y="84" style="fill:var(--ink)">Piraten</text>
   <circle cx="285" cy="108" r="5" style="fill:var(--accent)"/><text x="276" y="100" text-anchor="end" style="fill:var(--ink)">FDP</text>
   <circle cx="245" cy="205" r="5" style="fill:var(--accent)"/><text x="253" y="209" style="fill:var(--ink)">Union</text>
   <circle cx="235" cy="262" r="5" style="fill:none;stroke:var(--accent)"/><text x="243" y="266" style="fill:var(--muted)">NPD (nicht im BT)</text>
  </g>
</svg><p class="small muted" style="text-align:center;margin-top:0">Schematisch nach Mielke 2013, S. 182 f. Die Lage der Punkte ist eine Lesehilfe, keine Messung.</p>`;

LESSONS[102]=[
{id:"se2-1", t:"Parteien als Vermittler: Repräsentation und Integration", html:`
<p>Mielke beginnt mit der Rolle der Parteien: Sie sind in der parlamentarischen Demokratie die <b>zentrale Vermittlerin zwischen Staat und Gesellschaft</b>. Sie greifen Interessen auf, bündeln sie und verschaffen ihnen in Parlamenten und Regierungen Gewicht.</p>
<p>Parteien handeln aber nicht allein. Sie wirken als Teile eines <b>Parteiensystems</b>, in dem sie konkurrieren und kooperieren. Gesteuert wird das von den <b>Parteieliten</b>: Sie analysieren Wählermärkte, machen Programm- und Personalangebote und entwickeln Koalitionsperspektiven.</p>
<div class="merk"><b>Zwei Funktionen des Parteiensystems</b><div class="mrows">
<div><span class="ml">Repräsentation</span><span>gesellschaftliche Konflikte und Interessen werden auf die Ebene der politischen Entscheidung übertragen</span></div>
<div><span class="ml">Integration</span><span>die Gruppen hinter diesen Interessen werden anerkannt und in den politischen Prozess eingebunden</span></div></div></div>
<p>Beide Funktionen sind laut Mielke entscheidend für die <b>Legitimität</b> des politischen Prozesses (S. 175).</p>
<h3>Parteienstaat mit Verfassungsauftrag</h3>
<p>Nach dem Zusammenbruch des Parteiensystems der <b>Weimarer Republik</b> nennt das Grundgesetz die Parteien ausdrücklich in <b>Art. 21</b>. Die Bundesrepublik versteht sich damit von Anfang an als <b>Parteienstaat</b> (Leibholz 1974). Dieser Anspruch ist bis heute umstritten.</p>
<p>In der Forschung herrscht <b>Konsens</b> über die Entwicklungslinien des Parteiensystems, aber <b>Streit</b> über die Triebkräfte dahinter und ihre Bewertung. Genau diesen Streit entscheidet Mielke am Ende für sich.</p>
<p class="small muted">Für deinen GL-Unterricht: Die Klassensprecherwahl zeigt beide Funktionen im Kleinen. Wer gewählt wird, vertritt Interessen (Repräsentation), und die Klasse fühlt sich eingebunden, wenn auch Minderheiten gehört werden (Integration).</p>`,
check:[
 {q:"Welche beiden Funktionen des Parteiensystems hebt Mielke als entscheidend für die Legitimität hervor?", o:["Repräsentation und Integration","Rekrutierung und Kontrolle","Gesetzgebung und Rechtsprechung"], a:0, ex:"Parteiensysteme übertragen gesellschaftliche Konflikte in die Politik und binden die betroffenen Gruppen ein.",
  w:{1:"Rekrutierung und Kontrolle sind Aufgaben von Parteien und Parlament, aber nicht die beiden Funktionen, die Mielke ins Zentrum stellt.",2:"Das sind Staatsgewalten. Parteien wirken mit, sind aber nicht selbst Gesetzgeber oder Gericht."}},
 {q:"Warum nennt das Grundgesetz die Parteien ausdrücklich in Art. 21?", o:["Als Lehre aus dem Zusammenbruch des Weimarer Parteiensystems","Weil die Alliierten ein Zweiparteiensystem nach US-Vorbild verlangten","Weil Parteien seit 1949 die Abgeordneten selbst ernennen dürfen"], a:0, ex:"Mielke: Nach der krisenhaften Entwicklung in Weimar wurden die Parteien verfassungsrechtlich anerkannt. Deutschland versteht sich seitdem als Parteienstaat (Leibholz).",
  w:{1:"Davon steht nichts im Text. Das deutsche System war nie ein Zweiparteiensystem nach US-Vorbild.",2:"Abgeordnete werden gewählt. Parteien stellen Kandidaten auf, ernennen aber keine Abgeordneten."}}
]},
{id:"se2-2", t:"Die alte Bundesrepublik: Konzentration und Volksparteien", html:`
<p>Zwischen 1960 und 1990 galt das deutsche Parteiensystem als Beispiel für <b>Stabilität und Funktionstüchtigkeit</b>. Ab 1953 setzte ein Konzentrations- und Konsolidierungsprozess ein, der bis zur ersten gesamtdeutschen Wahl 1990 dauerte (S. 176).</p>
<h3>Ein neuer Parteityp: die Volkspartei</h3>
<ul><li>Die <b>Union</b> entwickelte das Selbstverständnis als Volkspartei zuerst, als überkonfessionelle Neugründung aus der Zentrumstradition heraus.</li>
<li>Die <b>SPD</b> verließ die klassische Milieupartei rund ein Jahrzehnt später.</li>
<li>Beide blieben aber unterscheidbar. Sie wurden <b>keine profillosen „catch-all parties“</b> im Sinne Kirchheimers (1965).</li>
<li>Dennoch begünstigte das Volksparteidenken eine <b>„ideologische Entfrachtung“</b> (Wiesendahl) und neue Spielräume für Wähler und Koalitionen.</li></ul>
<p>Seit den 1960ern wuchsen die Mitgliederzahlen stark. Die Volksparteien wurden zugleich <b>Mitgliederparteien</b>. Die Mitgliedschaft war eine „strategische Organisationsressource“ für Wahlkämpfe, Kandidaturen und Mobilisierung.</p>
<div class="merk"><b>Zwei Arten von Wandel, die sich verstärkten</b><div class="mrows">
<div><span class="ml">party system change</span><span>das System konzentriert sich auf wenige Parteien</span></div>
<div><span class="ml">party change</span><span>der dominante Parteityp wandelt sich zur Volks- und Mitgliederpartei</span></div></div></div>
<h3>Hohe Repräsentationsleistung</h3>
<p>Im <b>Dreiparteiensystem 1963 bis 1980</b> (Union, SPD, FDP) und nach dem Einzug der <b>Grünen 1983</b> vereinten die Bundestagsparteien die überragende Mehrheit der Stimmen. Bei hoher Wahlbeteiligung repräsentierten Bundestag und Regierung die große Mehrheit der Wahlbevölkerung.</p>
<table class="kvq"><tr><th colspan="2">Zahlen bei Mielke (S. 178 f.)</th></tr>
<tr><td>Union + SPD 1976</td><td>91,2 % (Höhepunkt der Konzentration)</td></tr>
<tr><td>Union + SPD 2005 / 2009</td><td>69,4 % / 56,8 %</td></tr>
<tr><td>Wahlbeteiligung 1976 / 1990 / 2009</td><td>90,7 % / 77,8 % / 70,8 %</td></tr></table>`,
check:[
 {q:"Was meint Mielke, wenn er sagt, „party system change“ und „party change“ verstärkten sich bis 1990?", o:["Das System konzentrierte sich, und zugleich wurden Union und SPD zu Volks- und Mitgliederparteien","Die Zahl der Parteien stieg, und zugleich verloren alle Parteien Mitglieder","Die Parteien tauschten ihre Programme, und das Wahlrecht wurde zur Mehrheitswahl umgebaut"], a:0, ex:"Konzentration des Systems und Wandel des Parteityps liefen gleichzeitig und stützten sich gegenseitig.",
  w:{1:"Das beschreibt die Zeit nach 1990: Pluralisierung und Mitgliederschwund.",2:"Das Wahlrecht blieb eine personalisierte Verhältniswahl. Von einem Programmtausch spricht Mielke nicht."}},
 {q:"Wurden Union und SPD laut Mielke zu „catch-all parties“ im Sinne Kirchheimers?", o:["Ja, sie verloren schon in den 1960ern jedes eigene Profil","Nein, bis in die 1990er blieben ihre Traditionen und Unterschiede sichtbar","Nur die SPD, weil sie sich als Erste von der Milieupartei löste"], a:1, ex:"Mielke betont, dass programmatische, organisatorische und wahlsoziologische Unterschiede blieben. Es gab aber eine ideologische Entfrachtung.",
  w:{0:"Genau diese Prognose kritischer Kommentatoren trat laut Mielke nicht ein.",2:"Die Union entwickelte das Volkspartei-Verständnis zuerst. Die SPD folgte etwa ein Jahrzehnt später."}},
 {q:"Wie hoch war der gemeinsame Stimmenanteil von Union und SPD 1976 und 2009?", o:["91,2 % und 56,8 %","77,8 % und 70,8 %","69,4 % und 56,8 %"], a:0, ex:"1976 ist der Höhepunkt der Konzentration, 2009 der Tiefpunkt in Mielkes Text.",
  w:{1:"Das sind Werte der Wahlbeteiligung (1990 und 2009).",2:"69,4 % ist der Wert von 2005, nicht von 1976."}}
]},
{id:"se2-3", t:"Seit 1990: Pluralisierung, Schwankungen, Nichtwahl", html:`
<p>Mit der Vereinigung beginnt ein Wandel, bei dem Mielke <b>drei Aspekte</b> hervorhebt (S. 177–179).</p>
<ol><li><b>Mehr Parteien:</b> Die PDS (später Die Linke) zieht in den Bundestag ein. Das ist ein doppeltes Symbol:
 <ul><li>für eine <b>Zweiteilung</b>: im Westen das alte System, im Osten ein Dreiparteiensystem mit der PDS als Regionalpartei (rund ein Viertel der Stimmen), FDP und Grüne schwach. Angleichung erst nach 2005.</li>
 <li>für eine allgemeine <b>Pluralisierung</b>, in der neue Parteien vor allem bei Landtagswahlen stark zulegen.</li></ul></li>
<li><b>Schwindende Bindungskraft</b> der Volksparteien und starke Schwankungen. Beispiele: FDP 2009 mit 14,6 %, 2012 in Umfragen bei 4 %. Grüne 2011 in Baden-Württemberg bei 24,2 %.</li>
<li><b>Sinkende Wahlbeteiligung:</b> Der Nichtwähleranteil liegt bei knapp einem Drittel. Ursachen: Normalisierung nach außergewöhnlich hoher Beteiligung, Desinteresse, soziale Marginalisierung.</li></ol>
<p>Forscher sprechen von einer <b>fluiden Phase</b> ab 2002, dem <b>„fluiden Fünfparteiensystem“</b> (Niedermayer 2008). Es ist nicht auf fünf Parteien festgelegt, es können auch sechs oder drei sein.</p>
<h3>Auch der Parteityp wandelt sich wieder</h3>
<p>Die Mitgliederzahlen der großen Parteien sinken dramatisch, weil kaum Junge eintreten. Die Folge ist eine <b>Krise der Mitgliederparteien</b> und eine Überalterung. Die Forschung diskutiert neue Typen: <b>Rahmenpartei, wahlprofessionelle Partei, Medien-, Fraktions- und Dienstleistungspartei, Profipartei, Kartellpartei</b> (Katz/Mair 1995).</p>
<div class="ergbox"><b>Ergänzung:</b> Mielkes Text endet 2012. Seit 2017 sitzt auch die AfD im Bundestag, die Fragmentierung ist weiter gestiegen. Für die Klausur zählt Mielkes Argument, aktuelle Beispiele können es stützen.</div>`,
check:[
 {q:"Welche drei Aspekte kennzeichnen laut Mielke den Wandel des Parteiensystems nach 1990?", o:["Mehr Parteien, schwindende Bindung mit starken Schwankungen, sinkende Wahlbeteiligung","Mehr Mitglieder, stabilere Lager und eine wieder steigende Wahlbeteiligung","Ein neues Wahlrecht, das Ende der Volksparteien und mehrere Parteiverbote"], a:0, ex:"Pluralisierung, Volatilität und Nichtwahl schwächen zusammen die Repräsentations- und Integrationsleistung.",
  w:{1:"Das Gegenteil trifft zu: Mitglieder und Beteiligung sinken.",2:"Ein neues Wahlrecht oder Parteiverbote nennt Mielke nicht. Die Volksparteien sind geschwächt, aber nicht verschwunden."}},
 {q:"Warum ist der Einzug der PDS in den Bundestag für Mielke ein „doppeltes Symbol“?", o:["Er steht für die Ost-West-Zweiteilung und für die allgemeine Pluralisierung","Er steht für die Wiedervereinigung und zugleich für das endgültige Ende der SED","Er steht für mehr Frauen und deutlich mehr junge Abgeordnete im Bundestag"], a:0, ex:"Im Osten bildete sich ein eigenes Dreiparteiensystem, und zugleich fächerte sich das Gesamtsystem auf.",
  w:{1:"Die PDS ging aus der SED hervor. Das „doppelte Symbol“ bezieht sich aber auf das Parteiensystem.",2:"Davon steht nichts im Text."}},
 {q:"Was meint „fluides Fünfparteiensystem“ (Niedermayer)?", o:["Ein System ab etwa 2002 mit offenen Kräfteverhältnissen, das nicht fest auf fünf Parteien beschränkt ist","Ein System mit genau fünf Parteien, deren Stimmanteile seit 1990 gleich bleiben","Ein System, in dem fünf Parteien eine feste Koalition aller gegen die Opposition bilden"], a:0, ex:"„Fluide“ betont die Schwankungen. Je nach Wahl können es sechs oder auch nur drei Parteien sein.",
  w:{1:"Gerade die Schwankungen machen das System „fluide“.",2:"Eine feste Allparteienkoalition gibt es nicht. Es geht um Wettbewerb mit offenen Ergebnissen."}}
]},
{id:"se2-4", t:"Cleavages: die Konfliktlinien hinter den Parteien", html:`
<p>Wie sind die Parteien in der Gesellschaft verankert? Mielke nutzt das Modell von <b>Lipset und Rokkan (1967)</b>. Es geht von langfristigen Großkonflikten aus, den <b>Cleavages</b> oder „Hauptspannungslinien“ (Pappi 1973). Sie betreffen große Gruppen und führen zu Parteigründungen. Klassische deutsche Beispiele: <b>SPD</b> und katholisches <b>Zentrum</b>.</p>
<h3>Die alte Bundesrepublik: zwei Cleavages</h3>
<div class="merk"><b>Hauptspannungslinien</b><div class="mrows">
<div><span class="ml">sozio-ökonomisch</span><span>Arbeitnehmer- und Gewerkschaftsorientierung gegen bürgerlich-mittelständische, freiberufliche Orientierung</span></div>
<div><span class="ml">kulturell</span><span>katholisch und kirchengebunden gegen protestantisch und säkularisiert</span></div></div></div>
<p>Union und SPD sind <b>nicht Gegenpole einer Linie</b>. Jede besetzt einen Pol <i>verschiedener</i> Cleavages: die Union den katholisch-kirchlichen, die SPD den Arbeitnehmer-Pol. Darum spricht man von einer <b>asymmetrischen Konfliktstruktur</b>. Beide binden aber auch Wähler vom Gegenpol. Die <b>FDP</b> steht im kulturellen Konflikt bei der SPD, im ökonomischen bei der Union.</p>
<h3>Seit den 1980ern: dieselben Achsen, neuer Inhalt</h3>
<ul><li><b>Ökonomisch:</b> aus dem Gruppenkonflikt wird ein Konflikt der Gesellschaftsmodelle: <b>wohlfahrtsstaatliche soziale Gerechtigkeit gegen Marktfreiheit</b>. Linke, SPD, Grüne und Piraten stehen auf der Gerechtigkeitsseite, FDP und mit Abstrichen die Union näher an der Marktfreiheit.</li>
<li><b>Kulturell:</b> aus Konfession wird ein Gegensatz von <b>libertär und autoritär</b> (modern-aufklärerisch gegen konservativ-traditionell). Themen: Familienbild, Zuwanderung, Teilhabe, Umwelt. Libertärer Pol: vor allem die Grünen. Gemäßigt autoritär: die Union, extrem autoritär: die NPD.</li></ul>
${FIG_KONFLIKT}
<p>Die Folge: Es stehen sich keine geschlossenen Gruppen mehr gegenüber, sondern <b>heterogene Gruppen</b>, die nur durch Grundsätze zusammengehalten werden. Die <b>Wählermärkte werden komplexer</b>, die Strategie für Parteien schwieriger.</p>
<h3>Sonderfall Linke</h3>
<p>Die PDS schien zunächst den alten <b>Zentrum-Peripherie-Konflikt</b> wiederzubeleben. Nach Schröders Kurswechsel stieß die Linke ab 2005 in eine <b>„Repräsentationslücke“</b> bei sozialdemokratischen Traditionswählern und wurde ein teilweiser Ersatz für die alte SPD.</p>`,
check:[
 {q:"Warum spricht man für die alte Bundesrepublik von einer „asymmetrischen“ Konfliktstruktur?", o:["Union und SPD besetzten je einen Pol verschiedener Cleavages statt Gegenpole derselben Linie","Die Union war stets viel stärker als die SPD und gewann deshalb fast jede Wahl","Es gab nur einen einzigen Konflikt, nämlich den zwischen Ost- und Westdeutschland"], a:0, ex:"Die Union steht für den katholisch-kirchlichen Pol, die SPD für den Arbeitnehmer-Pol. Sie stehen sich also nicht auf einer Linie gegenüber.",
  w:{1:"Eine Asymmetrie der Stärke gibt es auch (Niedermayer), Mielke meint hier aber die Struktur der Konflikte.",2:"Mielke beschreibt zwei Cleavages, einen ökonomischen und einen kulturellen. Ost-West ist ein Thema nach 1990."}},
 {q:"Welchen Inhalt hat der kulturelle Cleavage seit den 1980ern?", o:["Libertär gegen autoritär: modern-aufklärerische gegen konservativ-traditionelle Orientierung","Katholisch gegen protestantisch, also derselbe Inhalt wie im Kaiserreich und in Weimar","Soziale Gerechtigkeit gegen Marktfreiheit, also Wohlfahrtsstaat gegen Wettbewerbsgesellschaft"], a:0, ex:"Streitfragen sind etwa Familienbild, Zuwanderung, Teilhabe und Umwelt. Libertär: vor allem Grüne, gemäßigt autoritär: Union.",
  w:{1:"Das ist der ursprüngliche Inhalt. Er hat sich über kirchlich gegen säkular zu libertär gegen autoritär gewandelt.",2:"Das ist der neue Inhalt des sozio-ökonomischen Cleavages."}},
 {q:"Wo verortet Mielke die FDP in der alten Bundesrepublik?", o:["Kulturell bei der SPD, ökonomisch bei der Union","Ökonomisch bei der SPD, kulturell bei der Union","In beiden Konflikten genau zwischen den Lagern"], a:0, ex:"Darum konnte die FDP mit beiden großen Parteien koalieren.",
  w:{1:"Umgekehrt: Im Verteilungskonflikt steht die FDP auf der bürgerlich-marktliberalen Seite.",2:"Sie bewegt sich zwar zwischen Union und SPD, aber mit klarer Seite je Konflikt."}}
]},
{id:"se2-5", t:"Mielkes These: Eliten haben sich von den Wählern entfernt", html:`
<p>Warum schwächeln die Volksparteien? Viele verweisen auf komplexe Wählermärkte. Mielke widerspricht: Es liegt vor allem an den <b>Parteieliten</b> (S. 183–185).</p>
<h3>Die Wähler</h3>
<ul><li>Das <b>Rechts-Links-Schema</b> bleibt wichtig. Eine Politik „jenseits von rechts und links“ ist ein <b>Mythos</b> (Bytzek/Roßteutscher 2011).</li>
<li>Nach der Vereinigung neigt eine <b>deutliche Mehrheit der Wähler</b> wohlfahrtsstaatlichen und libertären Orientierungen zu.</li>
<li>Die wohlfahrtsstaatlichen Orientierungen sind über Schichten und Generationen <b>stabil</b>, durch die Ostdeutschen sogar stärker geworden.</li></ul>
<h3>Die Eliten</h3>
<ul><li>Bis in die 1990er bauten Union und SPD gemeinsam den Sozialstaat auf. Dieser <b>wohlfahrtsstaatliche Konsens</b> trug ihre Repräsentationsleistung.</li>
<li>Seit Mitte der 1990er betrieben beide Eliten einen <b>Rückbau des Wohlfahrtsstaats</b>, unterstützt von FDP (wirtschaftsliberale Vorhut) und, am Rande, den Grünen.</li>
<li>Zwischen den eher linken Parteien gibt es auf Elitenebene <b>große Vorbehalte</b> gegen Kooperation, die Linke ist weitgehend ausgeschlossen.</li></ul>
<div class="quote">Nicht in erster Linie komplexe Wählermärkte, sondern der kollektive programmatisch-politische Schwenk auf der Ebene der Parteieliten hat die Repräsentation geschwächt.<cite>Mielke 2013, S. 184 f., sinngemäß</cite></div>
<p>So entsteht eine <b>Entfremdung</b> zwischen Eliten und Teilen der Wählerschaft. Die viel zitierte <b>Parteiverdrossenheit</b> geht auch auf die verminderte Berücksichtigung sozio-ökonomischer Interessen zurück.</p>
<h3>Fazit: zwei Großetappen</h3>
<table class="kvq"><tr><th>alte Bundesrepublik</th><th>nach der Wende</th></tr>
<tr><td>Volks- und Mitgliederparteien, geringe Fragmentierung, einfache Lager</td><td>Auffaserung, Krise der Volks- und Mitgliederparteien, Ost-West-Gegensatz</td></tr>
<tr><td>hohe Repräsentation und Integration</td><td>ab 2002 fluides System mit eingeschränkter Repräsentation</td></tr>
<tr><td>wohlfahrtsstaatlicher Konsens von Eliten und Wählern</td><td>Konsens schwächt sich ab, vor allem durch die Eliten</td></tr></table>
<p>Ob die Fluidität dauerhaft ist oder in eine neue stabile Phase übergeht, lässt Mielke offen.</p>`,
check:[
 {q:"Was ist laut Mielke die Hauptursache für die schwächere Repräsentationsleistung der Volksparteien?", o:["Der kollektive programmatische Schwenk der Parteieliten weg vom Wohlfahrtsstaat","Die besonders komplexen Wählermärkte, auf die keine Partei reagieren kann","Die sinkende Bedeutung des Rechts-Links-Schemas bei den Wählern"], a:0, ex:"Die Wähler blieben wohlfahrtsstaatlich orientiert, die Eliten näherten sich der Marktfreiheit an. Daraus folgt Entfremdung.",
  w:{1:"Genau diese verbreitete Erklärung relativiert Mielke. Komplexe Märkte sind nicht die Hauptursache.",2:"Das Gegenteil: Das Schema bleibt laut Wahlforschung fest verankert. „Jenseits von rechts und links“ nennt Mielke einen Mythos."}},
 {q:"Wie haben sich die wohlfahrtsstaatlichen Orientierungen der Bevölkerung laut Mielke entwickelt?", o:["Sie sind stabil geblieben und durch die Ostdeutschen sogar stärker geworden","Sie sind seit den 1990ern in allen Schichten deutlich gesunken","Sie sind nur bei Älteren stabil, bei Jüngeren fast verschwunden"], a:0, ex:"Gerade deshalb öffnet sich eine Lücke zwischen Wählern und Eliten.",
  w:{1:"Das wäre die Erklärung der Eliten, Mielke findet aber Stabilität.",2:"Die Stabilität gilt laut Mielke über alle Schichten und Generationen."}}
]},
{id:"se2-6", t:"Empfehlung: Parteitypen nach Lucardie", html:`
${EMPF("Lucardie (2018), Zur Typologie der politischen Parteien")}
<div class="litbox"><b>Empfehlung: fünf Perspektiven statt einer Typologie</b>
<p>Lucardie hält eine einzige Typologie für unmöglich. Er ordnet Parteien nach <b>fünf Dimensionen</b>: Programmatik, Ziele, Ursprung, Organisation, Wählerschaft.</p>
<h3>1 Programmatik: Parteifamilien</h3>
<p>Drei „Großfamilien“: <b>Liberale</b> (Staat und Gesellschaft trennen, Freiheit und Wettbewerb), <b>Sozialisten</b> (Gesellschaft durch den Staat steuern, Gleichheit und Solidarität), <b>Konservative</b> (soziale Marktwirtschaft über Sozialpartner, Gesellschaft als Organismus). Dazu „dünne“ Ideologien wie Ökologismus, Feminismus, Nationalismus und, umstritten, Populismus.</p>
<h3>2 Ziele</h3>
<ul><li><b>prophetisch</b>: Ideologie verbreiten, kaum Kompromisse</li>
<li><b>Ideologiehüter</b>: Ideologie pflegen, aber anpassen, Mandate wollen</li>
<li><b>pragmatisch</b>: Sachpolitik und Wählerinteressen</li></ul>
<p>Verwandt: <b>Strøm (1990)</b> mit den drei Zielen <b>policy, votes, office</b>.</p>
<h3>3 Ursprung (Duverger)</h3>
<p><b>création parlementaire</b> (aus einer Fraktion, eher pragmatisch und dezentral) oder <b>création extérieure</b> (außerhalb des Parlaments, eher diszipliniert und ideologisch). Dazu Abspaltung, Verschmelzung, Neugründung und Transformation (Beispiel PDS aus der SED).</p>
<h3>4 Organisation</h3>
<table class="kvq"><tr><th colspan="2">Organisationstypen</th></tr>
<tr><td>Honoratioren- oder Kaderpartei</td><td>wenige Notable, nur im Wahlkampf aktiv, 19. Jahrhundert</td></tr>
<tr><td>Massenpartei</td><td>ständig aktiv, viele Mitglieder aus einer Klasse oder Kirche, straff organisiert</td></tr>
<tr><td>Wählerpartei</td><td>Mitglieder kaum wichtig, Profis führen den Wahlkampf. Subtypen: Unternehmerpartei, Kartellpartei (Katz/Mair), Wahlkampfpartei</td></tr>
<tr><td>Bewegungspartei (umstritten)</td><td>locker, von Aktivisten getragen, Basisdemokratie (frühe Grüne, Piraten)</td></tr></table>
<h3>5 Wählerschaft</h3>
<p>Sozio-ökonomische, religiöse, regionale oder ethnische Interessen werden politisiert (Lipset/Rokkan). Weil Stammwähler schwinden, werden Klassen- und Konfessionsparteien zu <b>Allerweltsparteien</b> (Kirchheimer).</p>
<p>CDU und SPD liegen heute laut Lucardie irgendwo zwischen Massen- und Wählerpartei.</p></div>`,
check:[
 {q:"Welche drei Parteiziele unterscheidet Strøm (1990)?", o:["policy, votes, office","Ideologie, Mitglieder, Finanzen","Repräsentation, Integration, Legitimation"], a:0, ex:"Politikgestaltung, Stimmen und Regierungsämter. Fast alle Parteien verfolgen alle drei, aber mit unterschiedlichem Gewicht.",
  w:{1:"Das sind Merkmale von Organisationen, keine Ziele im Sinne Strøms.",2:"Das sind Funktionen von Parteiensystemen bei Mielke."}},
 {q:"Welcher Organisationstyp ist nur im Wahlkampf aktiv und wird von wenigen Notablen getragen?", o:["Honoratioren- oder Kaderpartei","Massenpartei mit Ortsvereinen","Bewegungspartei mit Basisdemokratie"], a:0, ex:"Der älteste Typ, meist im 19. Jahrhundert aus Parlamenten heraus gegründet.",
  w:{1:"Massenparteien sind ständig aktiv und haben viele Mitglieder.",2:"Bewegungsparteien leben von Aktivisten und Basisdemokratie, nicht von Notablen."}}
]},
{id:"se2-7", t:"Empfehlung: Parteiensystem messen, Parteienrecht", html:`
${EMPF("Niedermayer (2018), Die Entwicklung des bundesdeutschen Parteiensystems, und Merten (2018), Rechtliche Grundlagen der Parteiendemokratie")}
<div class="litbox"><b>Empfehlung: Niedermayer, Eigenschaften eines Parteiensystems</b>
<p>Ein Parteiensystem ist mehr als die Summe seiner Parteien: ein Geflecht von Beziehungen (Duverger, Sartori). Niedermayer misst es mit wenigen Eigenschaften:</p>
<ul><li><b>Format</b>: Zahl der Parteien (CDU und CSU zählen als eine Einheit, weil sie nicht konkurrieren)</li>
<li><b>Fragmentierung</b>: Zersplitterung, gemessen mit der „effective number of parties“ (Laakso/Taagepera)</li>
<li><b>Dominanz und Asymmetrie</b> der beiden Großparteien. Eine <b>strukturelle Asymmetrie</b> entsteht, wenn eine Partei mehr dauerhaft gebundene Wähler hat.</li>
<li><b>Polarisierung</b>: ideologische Distanz (Sartori), in Deutschland zweidimensional</li>
<li><b>Segmentierung</b>: wer mit wem koalieren kann</li></ul>
<p><b>Zweiparteiendominanz</b>: Die beiden Großen haben je mehr als ein Viertel und zusammen mindestens zwei Drittel der Sitze, die nächste Partei weniger als die Hälfte der kleineren Großpartei. Deutschland war das von Anfang an. <b>2009</b> folgte ein <b>Typwechsel zum pluralistischen System</b>, <b>2013</b> die Rückkehr.</p></div>
<div class="litbox"><b>Empfehlung: Merten, rechtliche Grundlagen</b>
<p><b>Art. 21 GG</b> erkennt Parteien als Faktoren der Willensbildung an. Daraus folgen vier Grundsätze: <b>Freiheit</b> (vom Staat), <b>Gleichheit</b> (Chancengleichheit, abgestuft nach Bedeutung, § 5 PartG), <b>Öffentlichkeit</b> (Rechenschaft über Finanzen) und <b>innerparteiliche Demokratie</b>.</p>
<ul><li><b>Parteienprivileg</b>: Eine Partei kann nur das <b>Bundesverfassungsgericht</b> verbieten (Art. 21 Abs. 2 GG), Ausdruck der <b>wehrhaften Demokratie</b>. Antrag stellen Bundestag, Bundesrat oder Bundesregierung.</li>
<li>Das BVerfG nennt das Verbot die „schärfste und zweischneidige Waffe“. Beide <b>NPD-Verfahren</b> scheiterten, das zweite 2017, weil der verfassungsfeindlichen Partei die <b>Potenzialität</b> fehlte, ihre Ziele zu erreichen.</li>
<li><b>Finanzierung</b>: staatliche Teilfinanzierung ab 0,5 % bei Bundestags- oder Europawahl bzw. 1 % bei einer Landtagswahl. <b>Relative Obergrenze</b>: nicht mehr als die eigenen Einnahmen. <b>Absolute Obergrenze</b>: Summe für alle Parteien.</li>
<li><b>Wahlrecht</b>: Das GG schreibt kein Wahlsystem vor (Art. 38 Abs. 3). Gewählt wird nach personalisierter Verhältniswahl mit Erst- und Zweitstimme, Fünfprozenthürde und Grundmandatsklausel (drei Direktmandate).</li></ul></div>
<div class="ergbox"><b>Ergänzung:</b> Seit 2017 können verfassungsfeindliche Parteien von der staatlichen Finanzierung ausgeschlossen werden (Art. 21 Abs. 3 GG neu). 2024 hat das BVerfG das erstmals für die frühere NPD („Die Heimat“) entschieden. Die Wahlrechtsreform 2023 deckelt den Bundestag auf 630 Sitze, Direktmandate brauchen seitdem Deckung durch Zweitstimmen.</div>`,
check:[
 {q:"Wer darf in Deutschland eine Partei verbieten?", o:["Nur das Bundesverfassungsgericht","Der Bundesinnenminister per Verbotsverfügung","Der Bundestag mit Zweidrittelmehrheit"], a:0, ex:"Das ist das Parteienprivileg nach Art. 21 Abs. 2 GG. Bundestag, Bundesrat oder Bundesregierung können nur den Antrag stellen.",
  w:{1:"So werden Vereine verboten. Parteien sind durch das Parteienprivileg davor geschützt.",2:"Der Bundestag kann einen Antrag stellen, aber nicht selbst entscheiden."}},
 {q:"Warum wurde die NPD 2017 nicht verboten?", o:["Ihr fehlte die Potenzialität, ihre verfassungsfeindlichen Ziele durchzusetzen","Das Gericht hielt die Partei nach Prüfung ihres Programms für verfassungstreu","Der Antrag kam von einer Stelle, die gar nicht antragsberechtigt war"], a:0, ex:"Das Gericht sah sie als verfassungsfeindlich, aber zu schwach, um gefährlich zu werden.",
  w:{1:"Das Gericht stellte gerade die Verfassungsfeindlichkeit fest.",2:"Der Bundesrat war antragsberechtigt."}},
 {q:"Was misst die „effective number of parties“?", o:["Die Fragmentierung, also wie zersplittert das System nach Größenverhältnissen ist","Die Zahl der Parteien, die zu einer Bundestagswahl überhaupt zugelassen sind","Den ideologischen Abstand zwischen den beiden äußersten Parteien des Systems"], a:0, ex:"Bei gleich großen Parteien entspricht sie der realen Zahl. Je ungleicher, desto kleiner der Wert.",
  w:{1:"Das wäre das Format. Die effektive Zahl gewichtet die Parteien nach ihrer Größe.",2:"Das ist die Polarisierung."}}
]}
];

CARDS[102]=[
 {id:"se2-c01", f:"Repräsentation und Integration (Mielke)", b:"Repräsentation: gesellschaftliche Konflikte in die politische Entscheidung übertragen\nIntegration: die Gruppen dahinter anerkennen und einbinden\nBeides entscheidend für die Legitimität"},
 {id:"se2-c02", f:"Parteienstaat", b:"Seit 1949 nennt das GG die Parteien in Art. 21, als Lehre aus Weimar. Deutschland versteht sich als Parteienstaat (Leibholz)."},
 {id:"se2-c03", f:"Party system change vs. party change", b:"System: Konzentration auf wenige Parteien (1953–1990)\nTyp: Wandel zur Volks- und Mitgliederpartei\nBeides verstärkte sich gegenseitig"},
 {id:"se2-c04", f:"Volksparteien vs. catch-all parties", b:"Union und SPD wurden Volksparteien, blieben aber bis in die 1990er unterscheidbar. Also keine profillosen catch-all parties (Kirchheimer), wohl aber ideologische Entfrachtung."},
 {id:"se2-c05", f:"Union + SPD und Wahlbeteiligung in Zahlen", b:"Union + SPD: 1976 91,2 %, 2005 69,4 %, 2009 56,8 %\nWahlbeteiligung: 1976 90,7 %, 1990 77,8 %, 2009 70,8 %"},
 {id:"se2-c06", f:"Drei Aspekte des Wandels nach 1990", b:"1. Mehr Parteien (PDS/Linke), Ost-West-Zweiteilung\n2. Schwindende Bindung, starke Schwankungen\n3. Sinkende Wahlbeteiligung"},
 {id:"se2-c07", f:"Fluides Fünfparteiensystem", b:"Niedermayer (2008), ab etwa 2002: offene Kräfteverhältnisse, starke Schwankungen. Nicht fest auf fünf Parteien festgelegt."},
 {id:"se2-c08", f:"Cleavage (Lipset/Rokkan)", b:"Langfristiger Großkonflikt (Hauptspannungslinie), der große Gruppen betrifft und zu Parteigründungen führt. Beispiele: SPD, Zentrum."},
 {id:"se2-c09", f:"Zwei Cleavages der alten Bundesrepublik", b:"Sozio-ökonomisch: Arbeitnehmer/Gewerkschaft gegen bürgerlich-mittelständisch\nKulturell: katholisch/kirchengebunden gegen protestantisch/säkular"},
 {id:"se2-c10", f:"Asymmetrische Konfliktstruktur", b:"Union und SPD sind nicht Gegenpole einer Linie, sondern besetzen je einen Pol verschiedener Cleavages. FDP: kulturell bei SPD, ökonomisch bei Union."},
 {id:"se2-c11", f:"Die beiden Cleavages seit den 1980ern", b:"Ökonomisch: soziale Gerechtigkeit gegen Marktfreiheit\nKulturell: libertär gegen autoritär\nFolge: komplexe Wählermärkte, heterogene Gruppen"},
 {id:"se2-c12", f:"Repräsentationslücke", b:"Nach dem Kurswechsel der SPD unter Schröder stieß die Linke ab 2005 zu sozialdemokratischen Traditionswählern vor und wurde ein teilweiser Ersatz für die alte SPD."},
 {id:"se2-c13", f:"Mielkes Kernthese", b:"Nicht komplexe Wählermärkte, sondern der kollektive Schwenk der Parteieliten zur Marktfreiheit schwächt die Repräsentation. Die Wähler blieben wohlfahrtsstaatlich."},
 {id:"se2-c14", f:"Fünf Perspektiven auf Parteien (Lucardie)", b:"Programmatik, Ziele, Ursprung, Organisation, Wählerschaft"},
 {id:"se2-c15", f:"Organisationstypen von Parteien", b:"Honoratioren-/Kaderpartei: wenige Notable, nur Wahlkampf\nMassenpartei: ständig aktiv, viele Mitglieder\nWählerpartei: Profis, Mitglieder unwichtig (Kartellpartei als Subtyp)\nBewegungspartei: Aktivisten, Basisdemokratie"},
 {id:"se2-c16", f:"Vier Grundsätze aus Art. 21 GG (Merten)", b:"Freiheit · Gleichheit · Öffentlichkeit · innerparteiliche Demokratie"},
 {id:"se2-c17", f:"Parteiverbot", b:"Nur durch das BVerfG (Parteienprivileg, Art. 21 Abs. 2 GG), Antrag von Bundestag, Bundesrat oder Bundesregierung. NPD 2017 nicht verboten: verfassungsfeindlich, aber ohne Potenzialität."},
 {id:"se2-c19", f:"Ziele und Ursprung von Parteien (Lucardie)", b:"Ziele: prophetisch · Ideologiehüter · pragmatisch (verwandt: Strøm, policy/votes/office)\nUrsprung (Duverger): création parlementaire, eher pragmatisch · création extérieure, eher diszipliniert und ideologisch"},
 {id:"se2-c20", f:"Staatliche Parteienfinanzierung (Merten)", b:"Anspruch ab 0,5 % (Bundestags- oder Europawahl) bzw. 1 % (Landtagswahl)\nRelative Obergrenze: höchstens die eigenen Einnahmen der Partei\nAbsolute Obergrenze: Summe für alle Parteien"},
 {id:"se2-c18", f:"Zweiparteiendominanz (Niedermayer)", b:"Zwei Große je über ein Viertel, zusammen mindestens zwei Drittel der Sitze, die nächste Partei unter der Hälfte der kleineren Großpartei. 2009 Typwechsel zum pluralistischen System, 2013 Rückkehr."}
];
Object.assign(CARD_CTX,{
 "se2-c01":"Was Parteiensysteme leisten","se2-c02":"Warum Art. 21 GG","se2-c03":"Zwei Arten von Wandel bis 1990","se2-c04":"Volkspartei richtig einordnen",
 "se2-c05":"Konzentration und ihr Ende","se2-c06":"Was sich nach 1990 ändert","se2-c07":"Die Phase ab 2002","se2-c08":"Grundbegriff der Parteienforschung",
 "se2-c09":"Konflikte der alten Bundesrepublik","se2-c10":"Wer steht wo?","se2-c11":"Gleiche Achsen, neuer Inhalt","se2-c12":"Warum die Linke im Westen gewann",
 "se2-c13":"Wer ist schuld an der Schwäche?","se2-c14":"Typologie (Empfehlung)","se2-c15":"Typen nach Aufbau (Empfehlung)","se2-c16":"Parteienrecht (Empfehlung)",
 "se2-c17":"Wehrhafte Demokratie (Empfehlung)","se2-c18":"Parteiensystemtypen (Empfehlung)","se2-c19":"Typologie (Empfehlung)","se2-c20":"Geld vom Staat (Empfehlung)"});
Object.assign(CARD_INFO,{
 "se2-c02":"Gerhard Leibholz: Staatsrechtler und Verfassungsrichter, prägte die Lehre vom Parteienstaat.",
 "se2-c04":"Otto Kirchheimer (1965): catch-all party, auf Deutsch Allerweltspartei.",
 "se2-c08":"Seymour Martin Lipset und Stein Rokkan (1967). Deutsch: Hauptspannungslinien (Pappi 1973).",
 "se2-c15":"Kartellpartei: Richard Katz und Peter Mair (1995), finanziell vom Staat abhängig."});

KREUZ.push(
 {id:"se2-x01", ch:102, stem:"Zum Parteiensystem der alten Bundesrepublik nach Mielke gilt:", s:[
  ["Union und SPD bildeten die beiden Gegenpole desselben Konflikts.", false, "Sie besetzten je einen Pol <b>verschiedener</b> Cleavages, daher die asymmetrische Konfliktstruktur."],
  ["Die Volksparteien waren zugleich Mitgliederparteien.", true, "Seit den 1960ern wuchsen die Mitgliederzahlen auf Rekordniveau."],
  ["Die FDP stand im kulturell-kirchlichen Konflikt auf der Seite der SPD.", true, "Im ökonomischen Konflikt dagegen bei der Union."]]},
 {id:"se2-x02", ch:102, stem:"Zum Wandel nach 1990 gilt:", s:[
  ["Die PDS war im Westen von Anfang an so stark wie im Osten.", false, "Im Westen scheiterte sie lange an der Fünfprozenthürde. Erst nach 2005 legte die Linke dort zu."],
  ["Der Nichtwähleranteil stieg auf knapp ein Drittel.", true, "2009 lag die Wahlbeteiligung bei 70,8 %."],
  ["Die Forschung diskutiert neue Parteitypen wie die Kartellpartei.", true, "Katz/Mair 1995, dazu Rahmen-, Medien- oder Profipartei."]]},
 {id:"se2-x03", ch:102, stem:"Zu Mielkes Erklärung gilt:", s:[
  ["Die Wähler haben sich mehrheitlich vom Wohlfahrtsstaat abgewandt.", false, "Die wohlfahrtsstaatlichen Orientierungen blieben <b>stabil</b>. Abgewandt haben sich die Eliten."],
  ["Politik „jenseits von rechts und links“ ist für Mielke ein Mythos.", true, "Das Rechts-Links-Schema bleibt eine wichtige Orientierung."],
  ["Die Parteiverdrossenheit hängt auch mit der geringeren Berücksichtigung sozio-ökonomischer Interessen zusammen.", true, "Darin zeigt sich die Entfremdung zwischen Eliten und Wählern."]]},
 {id:"se2-x04", ch:102, stem:"Zu den Empfehlungen gilt:", s:[
  ["Ein Parteiverbot kann auch der Bundesinnenminister aussprechen.", false, "Parteien verbietet nur das <b>Bundesverfassungsgericht</b> (Parteienprivileg)."],
  ["Bei Niedermayer zählen CDU und CSU auf der Systemebene als eine Einheit.", true, "Sie konkurrieren nicht miteinander."],
  ["Lucardie hält eine einzige Typologie aller Parteien für wenig zweckmäßig.", true, "Er schlägt fünf Perspektiven vor."]]}
);

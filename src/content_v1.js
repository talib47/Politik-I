/* ================= Vorlesung, Sitzung 1 (15.10.): Politik, Politikwissenschaft, Demokratie und Autokratie =================
   Grundlage: Folien Schwanholz „Einführung Vorlesung 261015“ (Folien 12–32).
   Inhalte aus der Lektüre (Merkel 2013, Lauth 2015, Patzelt 2023) sind als Lektüre markiert (lit / litbox), alles andere über die Folien hinaus als Ergänzung (erg / ergbox).
   Lektüre der Selbstlernphase (22. und 29.10.): Patzelt 2023 Kap. 1 und 3, Lauth 2015, Merkel 2013. Neue Lektionen dazu in content_v1_lit.js. */
const ERG='<span class="erg">Ergänzung</span>';
chOf(1).lit="Lektüre: Patzelt (2023, S. 11–36 und 111–367), Lauth (2015), Merkel (2013). Selbstlernphase am 22. und 29.10. mit Fragen und Essay-Aufgabe auf Acemate.";

/* Kleine Schaubilder (Farben über CSS-Variablen, funktionieren hell und dunkel) */
const FIG_EASTON=`<svg viewBox="0 0 360 210" role="img" aria-label="Eastons Systemmodell" style="width:100%;max-width:440px;display:block;margin:10px auto;font:12px var(--sans)">
  <rect x="4" y="4" width="352" height="160" rx="10" style="fill:none;stroke:var(--line);stroke-dasharray:4 4"/>
  <text x="180" y="20" text-anchor="middle" style="fill:var(--muted)">Umwelt (environment)</text>
  <rect x="16" y="44" width="70" height="78" rx="8" style="fill:var(--accent-soft);stroke:var(--accent)"/>
  <text x="51" y="68" text-anchor="middle" style="fill:var(--ink);font-weight:600">Inputs</text>
  <text x="51" y="88" text-anchor="middle" style="fill:var(--ink)">Forderungen</text>
  <text x="51" y="104" text-anchor="middle" style="fill:var(--ink)">Unterstützung</text>
  <rect x="125" y="44" width="110" height="78" rx="8" style="fill:var(--surface);stroke:var(--ink)"/>
  <text x="180" y="80" text-anchor="middle" style="fill:var(--ink);font-weight:600">Politisches</text>
  <text x="180" y="96" text-anchor="middle" style="fill:var(--ink);font-weight:600">System</text>
  <rect x="274" y="44" width="70" height="78" rx="8" style="fill:var(--accent-soft);stroke:var(--accent)"/>
  <text x="309" y="68" text-anchor="middle" style="fill:var(--ink);font-weight:600">Outputs</text>
  <text x="309" y="88" text-anchor="middle" style="fill:var(--ink)">Entschei-</text>
  <text x="309" y="104" text-anchor="middle" style="fill:var(--ink)">dungen</text>
  <path d="M88 83 H121" style="stroke:var(--ink);stroke-width:2"/><path d="M121 78 l6 5 -6 5z" style="fill:var(--ink)"/>
  <path d="M237 83 H270" style="stroke:var(--ink);stroke-width:2"/><path d="M270 78 l6 5 -6 5z" style="fill:var(--ink)"/>
  <path d="M309 124 V146 H51 V128" style="fill:none;stroke:var(--accent);stroke-width:2;stroke-dasharray:5 4"/><path d="M46 130 l5 -7 5 7z" style="fill:var(--accent)"/>
  <text x="180" y="141" text-anchor="middle" style="fill:var(--accent);font-weight:600">Rückkopplung (feedback)</text>
  <text x="51" y="186" text-anchor="middle" style="fill:var(--ink);font-weight:600">soziale</text>
  <text x="51" y="201" text-anchor="middle" style="fill:var(--muted)">Zustimmung</text>
  <text x="180" y="186" text-anchor="middle" style="fill:var(--ink);font-weight:600">Input-Legitimation</text>
  <text x="180" y="201" text-anchor="middle" style="fill:var(--muted)">demokratische Verfahren</text>
  <text x="309" y="186" text-anchor="middle" style="fill:var(--ink);font-weight:600">Output-Legit.</text>
  <text x="309" y="201" text-anchor="middle" style="fill:var(--muted)">Problemlösung</text>
</svg>`;
const FIG_EMBEDDED=`<svg viewBox="0 0 360 250" role="img" aria-label="Embedded Democracy nach Merkel" style="width:100%;max-width:440px;display:block;margin:10px auto;font:11.5px var(--sans)">
  <ellipse cx="180" cy="128" rx="176" ry="120" style="fill:var(--bg);stroke:var(--line)"/>
  <ellipse cx="180" cy="134" rx="148" ry="96" style="fill:var(--surface);stroke:var(--line)"/>
  <ellipse cx="180" cy="140" rx="120" ry="72" style="fill:var(--accent-soft);stroke:var(--accent)"/>
  <text x="180" y="24" text-anchor="middle" style="fill:var(--muted)">Ökonomische Voraussetzungen / soziale Gerechtigkeit</text>
  <text x="180" y="52" text-anchor="middle" style="fill:var(--muted)">Zivilgesellschaft</text>
  <text x="180" y="82" text-anchor="middle" style="fill:var(--accent);font-weight:600">Staatlichkeit</text>
  <ellipse cx="180" cy="142" rx="34" ry="18" style="fill:var(--accent)"/>
  <text x="180" y="146" text-anchor="middle" style="fill:var(--accent-ink);font-weight:700">A Wahlen</text>
  <text x="112" y="112" text-anchor="middle" style="fill:var(--ink)">C Bürgerliche</text><text x="112" y="126" text-anchor="middle" style="fill:var(--ink)">Rechte</text>
  <text x="248" y="112" text-anchor="middle" style="fill:var(--ink)">B Politische</text><text x="248" y="126" text-anchor="middle" style="fill:var(--ink)">Freiheiten</text>
  <text x="112" y="168" text-anchor="middle" style="fill:var(--ink)">D Horizontale</text><text x="112" y="182" text-anchor="middle" style="fill:var(--ink)">Verantwortlichkeit</text>
  <text x="248" y="168" text-anchor="middle" style="fill:var(--ink)">E Effektive</text><text x="248" y="182" text-anchor="middle" style="fill:var(--ink)">Regierungsgewalt</text>
</svg>`;

LESSONS[1]=[
{id:"v1-1", t:"Was ist Politik?", html:`
<p>Politik ist nicht nur das, was im Bundestag passiert. Schwanholz beginnt mit zwei Bildern: dem Bundespräsidenten, der mit Familien in einer Schlange im Wahllokal steht, und einer Großdemonstration gegen Stuttgart 21. Beides ist Politik. Was haben die beiden Bilder gemeinsam?</p>
<div class="quote">Politik ist soziales Handeln, das auf Entscheidungen und Steuerungsmechanismen ausgerichtet ist, die <b>allgemein verbindlich</b> sind und das Zusammenleben von Menschen regeln.<cite>Bernauer et al. 2009, S. 32</cite></div>
<p>Der Kern ist das Wort <b>allgemein verbindlich</b>: Eine Entscheidung gilt für alle, auch für die, die dagegen waren. Ein Vereinsbeschluss bindet nur Mitglieder, ein Gesetz bindet alle.</p>
<h3>Merkmale politischer Realität</h3>
<table class="kvq">
<tr><td><b>Ebenen</b></td><td>lokal, regional, national, europäisch, international</td></tr>
<tr><td><b>Akteure</b></td><td>individuelle (z. B. Bundeskanzler) und kollektive (z. B. Kabinett, Parteien, Fraktionen)</td></tr>
<tr><td><b>Institutionen und Organe</b></td><td>z. B. Regierung, Parlament, Verfassungsgericht</td></tr>
<tr><td><b>Verfahren</b></td><td>z. B. demokratische Wahlen, Gesetzgebung, Normenkontrollverfahren</td></tr></table>
<div class="litbox"><b>Lektüre: Patzelt (2023, Kap. 1)</b>Patzelt definiert ähnlich: Politik ist menschliches Handeln, das auf die <b>Herstellung und Durchsetzung allgemein verbindlicher Regelungen und Entscheidungen</b> in und zwischen Gruppen zielt. Dabei wirken immer vier Dinge zusammen, das <b>MINK-Schema</b>: <b>M</b>acht (nach Max Weber die Chance, den eigenen Willen auch gegen Widerstreben durchzusetzen), <b>I</b>deologie, <b>N</b>ormen und <b>K</b>ommunikation.</div>
<div class="ergbox"><b>Ergänzung: Normenkontrolle</b>Ein Normenkontrollverfahren ist ein Verfahren vor dem Bundesverfassungsgericht, in dem geprüft wird, ob ein Gesetz mit dem Grundgesetz vereinbar ist. Kommt in Sitzung 5 (Verfassungsorgane) wieder.</div>`,
check:[
 {q:"Was macht eine Entscheidung laut Bernauer et al. zu einer politischen?", o:["Sie wird von Politikern getroffen","Sie ist allgemein verbindlich und regelt das Zusammenleben","Sie wird im Parlament verkündet","Sie betrifft die Wirtschaft"], a:1, ex:"Nicht wer entscheidet, ist entscheidend, sondern dass die Entscheidung für alle gilt und das Zusammenleben regelt."},
 {q:"Ein Normenkontrollverfahren ist auf der Folie ein Beispiel für …", o:["einen Akteur","eine Ebene","ein Verfahren","eine Institution"], a:2, ex:"Die Folie nennt es zusammen mit Wahlen und Gesetzgebung unter den Verfahren."}
]},
{id:"v1-2", t:"Polity, Politics, Policy", html:`
<p>Das Deutsche hat ein Wort für Politik, das Englische drei. Die Politikwissenschaft nutzt diese drei Wörter, um Politik in drei Dimensionen zu zerlegen: die <b>Dreifachgliederung des Politischen</b>.</p>
<table class="kvq">
<tr><th>Dimension</th><th>Was gemeint ist</th><th>Stichworte</th></tr>
<tr><td><b>Polity</b></td><td>Form: das Regelwerk für Politik, die Grundlagen des Gemeinwesens</td><td>Verfassung, Staat, politisches System</td></tr>
<tr><td><b>Politics</b></td><td>Prozess: wie um Entscheidungen gerungen wird</td><td>Interesse, Akteur, Kommunikation, Legitimation, Macht</td></tr>
<tr><td><b>Policy</b></td><td>Inhalt: Handlungsprogramme, also was entschieden wird</td><td>Problem, Programm, Erfolg</td></tr></table>
<div class="merk"><b>Eselsbrücke</b>Polit<b>y</b> wie <b>Y</b>-Rahmen: das Gerüst. Polit<b>ics</b> wie „Kampf“: der Streit. Polic<b>y</b> wie Police (Versicherungspolice): das Programm, das am Ende auf dem Papier steht.</div>
<div class="ergbox"><b>Ergänzung: Beispiel G9 in NRW</b>
<b>Polity:</b> Bildung ist nach dem Grundgesetz Ländersache, also entscheidet der Landtag NRW über das Schulgesetz.<br>
<b>Politics:</b> Elterninitiativen, Lehrerverbände und Parteien streiten jahrelang über G8 oder G9, es gibt Anhörungen und Mehrheiten im Landtag.<br>
<b>Policy:</b> Das beschlossene Programm: Gymnasien kehren zu neun Jahren bis zum Abitur zurück.</div>
<p class="small muted">Für deinen GL-Unterricht: Der Klassenrat zeigt alle drei Dimensionen im Kleinen. Die Klassenratsregeln sind die Polity, die Diskussion ist Politics, der Beschluss (etwa eine Pausenregel) ist die Policy.</p>`,
check:[
 {q:"Ein Streit zwischen Parteien im Landtag über ein neues Gesetz gehört vor allem zu …", o:["Polity","Politics","Policy"], a:1, ex:"Politics ist der Prozess: Interessen, Akteure, Macht, Aushandlung."},
 {q:"Das Grundgesetz gehört zu …", o:["Polity","Politics","Policy"], a:0, ex:"Polity ist die Form, das Regelwerk: Verfassung, Staat, politisches System."},
 {q:"Welche Stichworte nennt die Folie für Policy?", o:["Verfassung, Staat, System","Interesse, Akteur, Macht","Problem, Programm, Erfolg"], a:2, ex:"Policy sind Handlungsprogramme: ein Problem, ein Programm dagegen und die Frage, ob es Erfolg hat."}
]},
{id:"v1-3", t:"Was ist Politikwissenschaft?", html:`
<p>Bevor es um Politikwissenschaft geht, klärt Schwanholz, was Wissenschaft überhaupt ist.</p>
<div class="quote">Wissenschaft zielt auf Aussagen, die an <b>empirischem und logischem Wahrheitsgehalt</b> dem überlegen sind, was schon der „gesunde Menschenverstand“ formulieren kann.<cite>sinngemäß nach Patzelt 2007</cite></div>
<h3>Arten wissenschaftlicher Aussagen</h3>
<ul><li>Beschreibungen</li><li>Aussagen über Zusammenhänge</li><li>Erklärungen</li><li>Prognosen</li><li>Werturteile</li><li>Empfehlungen oder Handlungsanweisungen</li></ul>
<h3>Politikwissenschaft</h3>
<p>Nach <b>Schmidt (2010)</b> ist Politikwissenschaft die Wissenschaft von der Politik, also die wissenschaftliche <b>Beschreibung, Erklärung oder Prognose</b> politischer Phänomene auf Basis wissenschaftlich fundierter Analysen. Sie</p>
<ul><li>analysiert Ursachen und Auswirkungen von Polities, Politics und Policies,</li>
<li>arbeitet mit wissenschaftlichen <b>Methoden</b> (Umfragen, vergleichende Fallstudien, Prozessanalysen, Dokumentenanalysen, Fokusgruppen, Regressionen, Experimente …)</li>
<li>und auf Basis von <b>Modellen und Theorien</b>: Gesetzesaussagen, die Tatbestände erklären, Ereignisse prognostizieren, überprüfbar sind und neue Theorien hervorbringen.</li></ul>
<p>Moderne Politikwissenschaft ist vor allem <b>empirisch-analytisch</b> und <b>werturteilsfrei</b>: Aussagen sollen auf Erfahrung beruhen und überprüfbar sein. Gütekriterien sind <b>Systematik, Generalisierbarkeit, Kausalmechanismen, Reliabilität</b> (Verlässlichkeit) und <b>Validität</b> (Gültigkeit).</p>
<h3>Teilgebiete des Fachs</h3>
<table class="kvq"><tr><td>1</td><td>Politische Theorie / Ideengeschichte</td></tr><tr><td>2</td><td>Internationale Beziehungen / EU</td></tr><tr><td><b>3</b></td><td><b>Vergleichende Politikwissenschaft / Regierungslehre</b></td></tr><tr><td><b>4</b></td><td><b>Politisches System der BRD</b></td></tr><tr><td>5</td><td>Sozialwissenschaftliche Methoden</td></tr></table>
<p>Die Vorlesung bewegt sich in den Feldern <b>3 und 4</b>: das politische System Deutschlands, verglichen mit anderen Ländern.</p>`,
check:[
 {q:"Welche drei Leistungen nennt Schmidt für die Politikwissenschaft?", o:["Beschreibung, Erklärung, Prognose","Bewertung, Empfehlung, Beratung","Gesetzgebung, Verwaltung, Rechtsprechung"], a:0, ex:"Schmidt 2010: wissenschaftliche Beschreibung, Erklärung oder Prognose politischer Phänomene."},
 {q:"„Werturteilsfrei“ heißt in der Folie vor allem:", o:["Politikwissenschaft darf nie Werturteile untersuchen","Sie beschreibt und erklärt möglichst objektiv, ohne eigene Wertung als Ergebnis auszugeben","Sie gibt nur Handlungsempfehlungen"], a:1, ex:"Ziel ist eine möglichst objektive Beschreibung und Erklärung der politischen Wirklichkeit."},
 {q:"In welchen Teilgebieten liegt diese Vorlesung?", o:["Politische Theorie und Methoden","Vergleichende PoWi und politisches System der BRD","Internationale Beziehungen und EU"], a:1, ex:"Auf der Folie sind die Felder 3 und 4 eingekreist."}
]},
{id:"v1-4", t:"Politisches System und Eastons Modell", html:`
<p>Nach <b>Parsons</b> ist das politische System ein <b>Subsystem der Gesellschaft</b>, das auf <b>Zielverfolgung und politische Steuerung</b> spezialisiert ist. Wie weit man den Begriff fasst, ist eine Entscheidung:</p>
<div class="merk"><b>Eng oder weit?</b><div class="mrows">
<div><span class="ml">Eng: Zentrales Politisches Entscheidungssystem (ZPES)</span><span>Nur die Institutionen, die verbindlich entscheiden. Formal-institutionenbezogene Sicht.</span></div>
<div><span class="ml">Weit: ZPES plus angrenzende Akteure</span><span>Dazu Parteien, Wirtschaftsakteure, Verbände und andere Interessengruppen. Inhaltlich-prozessbezogene Sicht.</span></div></div></div>
<h3>Eastons Systemmodell</h3>
${FIG_EASTON}
<p>David Easton betrachtet das politische System wie eine Maschine in einer Umwelt:</p>
<ul><li><b>Inputs</b> kommen aus der Umwelt: <b>Forderungen</b> (demands) und <b>Unterstützung</b> (support).</li>
<li>Das <b>politische System</b> verarbeitet sie zu <b>Entscheidungen</b> (decisions).</li>
<li>Die <b>Outputs</b> wirken auf die Umwelt zurück.</li>
<li>Über die <b>Rückkopplung</b> (feedback) beeinflussen die Ergebnisse die nächsten Forderungen und die Unterstützung.</li></ul>
<h3>Drei Formen der Legitimation</h3>
<table class="kvq"><tr><th>Form</th><th>woher sie kommt</th></tr>
<tr><td><b>Soziale Legitimation</b></td><td>Zustimmung durch die Bürgerinnen und Bürger (bei Inputs und Unterstützung)</td></tr>
<tr><td><b>Input-Legitimation</b></td><td>demokratische Verfahren (im System selbst)</td></tr>
<tr><td><b>Output-Legitimation</b></td><td>erfolgreiche Problembearbeitung (bei den Outputs)</td></tr></table>
<div class="litbox"><b>Lektüre: Merkel (2013), Patzelt (2023)</b><p><b>Parsons' AGIL-Schema:</b> Jedes System muss vier Funktionen erfüllen: <b>A</b>daptation (Anpassung an die Umwelt), <b>G</b>oal Attainment (Zielerreichung, die Aufgabe des politischen Systems), <b>I</b>ntegration (Zusammenhalt), <b>L</b>atent Pattern Maintenance (Erhalt kultureller Wertmuster).</p>
<p><b>Easton genauer:</b> Seine Leitfrage war, wie sich politische Systeme in einer Welt aus Stabilität und Wandel behaupten. Typische Forderungen sind Frieden, Rechtssicherheit, Wohlstand und soziale Sicherheit, eine saubere Umwelt. <b>Withinputs</b> sind Forderungen, die im System selbst entstehen, etwa aus der Regierung. Easton unterscheidet <b>specific support</b> (Zufriedenheit mit den Leistungen und Amtsträgern) und <b>diffuse support</b> (Bindung an das System als Ganzes, seine Werte und Verfahren).</p>
<p><b>Patzelt:</b> Die Fähigkeit eines Systems, Input aufzunehmen und darauf zu reagieren, heißt <b>Responsivität</b>. Gelingt der Kreislauf so, dass die Bürger das System aus freien Stücken für rechtens halten, entsteht <b>Legitimität</b>. Fehlt sie, reagiert ein System mit Reformen oder mit Repression.</p></div>
<div class="ergbox"><b>Ergänzung</b>Die Unterscheidung von Input- und Output-Legitimation geht vor allem auf Fritz Scharpf zurück. Sie passt gut in Essays über die EU: Die EU gilt oft als stark bei der Output-, aber schwächer bei der Input-Legitimation.</div>`,
check:[
 {q:"Welche zwei Arten von Inputs unterscheidet Easton?", o:["Forderungen und Unterstützung","Gesetze und Urteile","Wahlen und Abstimmungen"], a:0, ex:"Demands und support: Was die Gesellschaft verlangt, und wie sehr sie das System trägt."},
 {q:"Eine Regierung bekämpft eine Wirtschaftskrise erfolgreich und gewinnt dadurch Zustimmung. Welche Legitimation ist das vor allem?", o:["Input-Legitimation","Output-Legitimation","Soziale Legitimation"], a:1, ex:"Output-Legitimation entsteht durch erfolgreiche Problembearbeitung."},
 {q:"Das „weite“ Verständnis des politischen Systems umfasst …", o:["nur Regierung und Parlament","das ZPES plus Parteien, Verbände, Wirtschaftsakteure","nur die Verfassung"], a:1, ex:"Weit heißt: ZPES und angrenzende Akteure, inhaltlich-prozessbezogen."}
]},
{id:"v1-5", t:"Kreislaufmodell nach Almond und Powell", html:`
<p>Almond und Powell (1988) bauen Eastons Modell aus. Sie fragen, welche <b>Funktionen</b> ein politisches System erfüllen muss und welche <b>Strukturen</b> das übernehmen.</p>
<table class="kvq">
<tr><th>Ebene</th><th>Funktionen</th></tr>
<tr><td><b>Systemfunktionen</b></td><td>Sozialisierung, Rekrutierung, Kommunikation: halten das System am Laufen</td></tr>
<tr><td><b>Prozessfunktionen</b></td><td>Interessenartikulation → Interessenaggregation → Policy-making → Implementierung und Überprüfung</td></tr>
<tr><td><b>Policy-Funktionen</b></td><td>Steuern, Regulierung, Verteilung: die Outputs, die als Outcomes in der Gesellschaft ankommen</td></tr></table>
<h3>Wer übernimmt welche Funktion?</h3>
<table class="kvq">
<tr><td>Parteien</td><td>Interessen bündeln (Aggregation)</td></tr>
<tr><td>Interessengruppen, Verbände</td><td>Interessen äußern (Artikulation)</td></tr>
<tr><td>Parlament, Regierung</td><td>Entscheiden (Policy-making)</td></tr>
<tr><td>Verwaltung, Justiz</td><td>Umsetzen und überprüfen</td></tr></table>
<p>Bei den Inputs unterscheiden sie <b>diffuse Unterstützung</b> und <b>spezifische Unterstützung</b>. Umwelt und Rückkopplungen (Feedbacks) umschließen das Ganze wie bei Easton.</p>
<div class="litbox"><b>Lektüre: Merkel (2013)</b><p><b>Diffuse Unterstützung</b> gilt dem System als Ganzem, etwa der Demokratie an sich. <b>Spezifische Unterstützung</b> hängt von den Leistungen ab und gilt den aktuellen Entscheidungen und Amtsträgern. Man kann die Regierung ablehnen und trotzdem die Demokratie unterstützen.</p>
<p>Laut Merkel ist Almond/Powell die ausgefeilteste Version des Systemkonzepts, weil sie Eastons „Blackbox“ ausleuchtet: welche Struktur welche Funktion übernimmt. <b>Kritik von Luhmann:</b> Kein Teilsystem steht über den anderen. Wirtschaft, Recht oder Wissenschaft folgen eigenen Codes, darum kann die Politik sie nicht einfach steuern. Merkel hält das für zu radikal, nimmt aber eine gewisse <b>Steuerungsskepsis</b> mit: Politische Steuerung erzeugt oft nicht beabsichtigte Effekte.</p></div>
<div class="ergbox"><b>Ergänzung</b>„Steuern“ meint im Schaubild das Erheben von Abgaben (englisch extraction), nicht das Lenken.</div>`,
check:[
 {q:"Welche Struktur übernimmt im Modell typischerweise die Interessenaggregation?", o:["Verwaltung","Parteien","Justiz"], a:1, ex:"Parteien bündeln viele einzelne Interessen zu Programmen."},
 {q:"Sozialisierung, Rekrutierung und Kommunikation sind …", o:["Systemfunktionen","Prozessfunktionen","Policy-Funktionen"], a:0, ex:"Sie stehen im Kreislaufdiagramm ganz oben als Systemfunktionen."}
]},
{id:"v1-6", t:"Demokratie und Autokratie unterscheiden", html:`
<p><b>Demokratie</b> kommt von griechisch <i>démos</i> (Volk) und <i>kratía</i> (Herrschaft): Herrschaft des Volkes. Das entscheidende Unterscheidungsmerkmal:</p>
<div class="merk"><b>Kernsatz</b>In Demokratien ist der <b>Gesetzgeber selbst den Gesetzen unterworfen</b>, in Autokratien nicht.</div>
<ul><li><b>Autokratie</b> wird oft mit Diktatur gleichgesetzt.</li>
<li>Vorschlag einer <b>dichotomen</b> Typenlehre: Alle Nicht-Demokratien sind Autokratien. „Democracy is the opposite of autocracy“ (Jaggers/Gurr 1995).</li>
<li><b>Linz (1975)</b> unterteilt Autokratien in <b>totalitäre</b> und <b>autoritäre</b> Regime.</li>
<li><b>Merkel (2010)</b> unterteilt Demokratien in <b>eingebettete rechtsstaatliche</b> (embedded) und <b>defekte</b> Demokratien.</li></ul>
<h3>Kontinuum politischer Regime (Lauth et al. 2014)</h3>
<table class="kvq">
<tr><th colspan="2">Demokratie-Seite</th></tr>
<tr><td><b>Demokratie</b></td><td>repräsentativ, direkt, parlamentarisch oder präsidentiell</td></tr>
<tr><td><b>Defekte Demokratie</b></td><td>illiberal, delegativ, exklusiv</td></tr>
<tr><th colspan="2">Autokratie-Seite: autoritäre Regime</th></tr>
<tr><td><b>Schwach autoritär</b></td><td>kontrolliertes Mehrparteienregime (mit dominanter Partei) oder Einparteiensystem</td></tr>
<tr><td><b>Stark autoritär</b></td><td>Militärregime, absolute Monarchie, ideologisch fundiertes Einparteiensystem</td></tr>
<tr><th colspan="2">Autokratie-Seite: totalitäre Regime</th></tr>
<tr><td><b>Totalitär</b></td><td>faschistisch, kommunistisch, theokratisch (jeweils mit Totalitätsanspruch)</td></tr></table>
<h3>Drei Dimensionen (Lauth 2006)</h3>
<table class="kvq"><tr><th></th><th>totalitär</th><th>autoritär</th><th>demokratisch</th></tr>
<tr><td>politische Freiheit</td><td>nicht gegeben</td><td>partiell</td><td>gegeben</td></tr>
<tr><td>politische Gleichheit</td><td>nicht gegeben</td><td>partiell</td><td>gegeben</td></tr>
<tr><td>politische und rechtliche Kontrolle</td><td>nicht gegeben</td><td>partiell</td><td>gegeben</td></tr></table>
<div class="litbox"><b>Lektüre: Kelsen und Linz (Merkel 2013, Lauth 2015)</b><p><b>Kelsen (1925)</b> liefert die abstrakte Begründung des Kernsatzes: In Demokratien sind die, die Gesetze machen, und die, für die sie gelten, dieselben (<b>autonome Normen</b>). In Autokratien fallen Normautoren und Normadressaten auseinander (<b>heteronome Normen</b>).</p>
<p><b>Linz</b> unterscheidet autoritär und totalitär an drei Merkmalen:</p>
<table class="kvq"><tr><th></th><th>autoritär</th><th>totalitär</th></tr>
<tr><td>Pluralismus</td><td>begrenzt</td><td>Monismus</td></tr>
<tr><td>Legitimation</td><td>Mentalitäten (Patriotismus, Nationalismus, Sicherheit, Modernisierung)</td><td>umfassende Weltanschauung (z. B. Marxismus-Leninismus)</td></tr>
<tr><td>Mobilisierung</td><td>Bevölkerung demobilisiert</td><td>inszenierte Dauermobilisierung</td></tr></table>
<p>Merkel nennt dazu Hannah Arendts Satz: Autoritäre Herrschaft schränkt die Freiheit ein, totalitäre schafft sie ab. Heute gilt nur noch Nordkorea als totalitär.</p></div>
<p>Für Essays wichtig: Die Tabelle von Lauth zeigt ein <b>Kontinuum</b>. Die dichotome Sicht (entweder Demokratie oder Autokratie) ist einfach, aber sie kann Grauzonen wie defekte Demokratien schlecht abbilden.</p>`,
check:[
 {q:"Was unterscheidet nach der Folie Demokratie grundlegend von Autokratie?", o:["In der Demokratie gibt es Wahlen, in der Autokratie nie","In der Demokratie ist der Gesetzgeber selbst an die Gesetze gebunden","In der Demokratie gibt es eine Verfassung"], a:1, ex:"Auch Autokratien halten oft Wahlen ab und haben Verfassungen. Entscheidend ist die Bindung des Gesetzgebers an das Recht."},
 {q:"In der Tabelle von Lauth et al. steht die „delegative Demokratie“ unter …", o:["Demokratie","Defekte Demokratie","Schwach autoritäres Regime"], a:1, ex:"Illiberale, delegative und exklusive Demokratie sind Formen der defekten Demokratie, also noch Demokratien."},
 {q:"Ein autoritäres Regime ist bei Lauth bei politischer Freiheit, Gleichheit und Kontrolle …", o:["jeweils nicht gegeben","jeweils partiell gegeben","jeweils gegeben"], a:1, ex:"Partiell gegeben, das unterscheidet es vom totalitären Regime."}
]},
{id:"v1-7", t:"Was ist eine Demokratie? Lauth, Dahl, Merkel", html:`
<p>Für Essays brauchst du eine Definition, die du zitieren kannst. Schwanholz nutzt die von Lauth:</p>
<div class="quote">Demokratie ist eine <b>rechtsstaatliche Herrschaftsform</b>, die <b>Selbstbestimmung</b> für alle Staatsbürger im Sinne der <b>Volkssouveränität</b> ermöglicht: durch maßgebliche Beteiligung an der Besetzung der Entscheidungspositionen in <b>freien, kompetitiven und fairen Verfahren</b>, durch die Chance auf kontinuierliche Einflussnahme und durch eine <b>Kontrolle der Herrschaft</b>.<cite>gekürzt nach Lauth 2006, S. 100</cite></div>
<p>Daraus folgen die drei Dimensionen: <b>Freiheit, Gleichheit, Kontrolle</b>.</p>
<h3>Prozedural oder materiell?</h3>
<table class="kvq"><tr><td><b>Prozedural</b></td><td>Wie wird Herrschaft vergeben und kontrolliert? Rekrutierung des Personals, Kontrolle der Exekutive, Offenheit für Beteiligung.</td></tr>
<tr><td><b>Materiell</b></td><td>Was kommt heraus? Politikinhalte und -ergebnisse, etwa gerechte Verteilung.</td></tr></table>
<p>Laut Folie hat sich die <b>prozedurale</b> Vorstellung als weitaus wirkungsmächtiger erwiesen.</p>
<h3>Dahl (1971): acht Garantien</h3>
<ol class="cb-ol">
<li><span>Assoziations- und Koalitionsfreiheit</span></li><li><span>Recht auf freie Meinungsäußerung</span></li><li><span>aktives Wahlrecht</span></li><li><span>passives Wahlrecht</span></li><li><span>Recht der Eliten, um Wählerstimmen zu konkurrieren</span></li><li><span>alternative, pluralistische Informationsquellen</span></li><li><span>freie und faire Wahlen</span></li><li><span>Institutionen, die Regierungspolitik von Wählerstimmen und Bürgerpräferenzen abhängig machen</span></li></ol>
<h3>Merkel (2010): sechs Fragen an jede Herrschaft</h3>
<table class="kvq"><tr><th>Dimension</th><th>Frage</th></tr>
<tr><td>Legitimation</td><td>Durch wen wird Macht legitimiert?</td></tr>
<tr><td>Zugang</td><td>Wie ist der Zugang zur Macht geregelt?</td></tr>
<tr><td>Monopol</td><td>Wer trifft die bindenden Entscheidungen?</td></tr>
<tr><td>Struktur</td><td>Auf wie viele Träger ist die Macht verteilt?</td></tr>
<tr><td>Anspruch</td><td>Ist der Herrschaftsanspruch gegenüber den Bürgern begrenzt?</td></tr>
<tr><td>Weise</td><td>Wie wird Herrschaft ausgeübt?</td></tr></table>
<div class="litbox"><b>Lektüre: Merkel (2013), Tabelle 1</b>
<p style="margin:6px 0 4px"><b>Autokratien</b></p>
<table class="kvq"><tr><th></th><th>totalitär</th><th>autoritär</th></tr>
<tr><td>Legitimation</td><td>Weltanschauung</td><td>Mentalitäten</td></tr>
<tr><td>Zugang</td><td>geschlossen</td><td>restriktiv</td></tr>
<tr><td>Anspruch</td><td>unbegrenzt</td><td>umfangreich</td></tr>
<tr><td>Monopol</td><td>Führer, Partei</td><td>Führer, Oligarchie</td></tr>
<tr><td>Struktur</td><td>monistisch</td><td>semipluralistisch</td></tr>
<tr><td>Weise</td><td>systematisch repressiv, terroristisch</td><td>willkürlich repressiv</td></tr></table>
<p style="margin:10px 0 4px"><b>Demokratien</b></p>
<table class="kvq"><tr><th></th><th>defekt</th><th>rechtsstaatlich (embedded)</th></tr>
<tr><td>Legitimation</td><td>Volkssouveränität</td><td>Volkssouveränität</td></tr>
<tr><td>Zugang</td><td>offen</td><td>offen</td></tr>
<tr><td>Anspruch</td><td>begrenzt, Grenzen aber verletzt</td><td>begrenzt und garantiert</td></tr>
<tr><td>Monopol</td><td>gewählte Autoritäten, evtl. durch Vetomächte eingeschränkt</td><td>gewählte Autoritäten</td></tr>
<tr><td>Struktur</td><td>pluralistisch</td><td>pluralistisch</td></tr>
<tr><td>Weise</td><td>beschädigte Rechtsstaatlichkeit</td><td>rechtsstaatlich</td></tr></table>
<p>Mit diesen sechs Kriterien lassen sich Demokratie und Autokratie und jeweils ihre beiden Untertypen trennen.</p></div>`,
check:[
 {q:"Welche Demokratievorstellung hat sich laut Folie als wirkungsmächtiger erwiesen?", o:["die materielle","die prozedurale","beide gleich"], a:1, ex:"Prozedurale Theorien, die auf Verfahren der Beteiligung und Kontrolle schauen, haben sich durchgesetzt."},
 {q:"Welches Kriterium gehört zu Dahls acht Garantien?", o:["Gerechte Einkommensverteilung","Alternative, pluralistische Informationsquellen","Eine geschriebene Verfassung"], a:1, ex:"Informationsfreiheit ist Punkt 6. Einkommensverteilung wäre eine materielle Vorstellung."},
 {q:"„Auf wie viele Herrschaftsträger ist die staatliche Macht verteilt?“ ist bei Merkel die Dimension …", o:["Herrschaftsmonopol","Herrschaftsstruktur","Herrschaftsweise"], a:1, ex:"Die Struktur fragt nach der Verteilung der Macht. Das Monopol fragt, wer entscheidet."}
]},
{id:"v1-8", t:"Embedded Democracy und defekte Demokratien", html:`
<p>Merkels Konzept der <b>Embedded Democracy</b> (2010) ist ein Messkonzept für die <b>Qualität</b> von Demokratien. Das ist sehr wahrscheinlich Essay-Stoff.</p>
<div class="merk"><b>Idee</b>Stabile rechtsstaatliche Demokratien sind <b>doppelt eingebettet</b>: <b>intern</b> (die Teilregime stützen sich gegenseitig) und <b>extern</b> (durch ihr Umfeld). Annahme: So ist die Demokratie gegen äußere und innere Schocks geschützt.</div>
${FIG_EMBEDDED}
<h3>Interne Einbettung: fünf Teilregime</h3>
<table class="kvq">
<tr><td><b>A</b></td><td>Wahlregime</td></tr>
<tr><td><b>B</b></td><td>Politische Freiheiten (Teilhaberechte)</td></tr>
<tr><td><b>C</b></td><td>Bürgerliche Rechte</td></tr>
<tr><td><b>D</b></td><td>Horizontale Verantwortlichkeit (Gewaltenkontrolle)</td></tr>
<tr><td><b>E</b></td><td>Effektive Regierungsgewalt</td></tr></table>
<h3>Externe Einbettung</h3>
<p>Staatlichkeit, Zivilgesellschaft, ökonomische Voraussetzungen und soziale Gerechtigkeit.</p>
<h3>Wozu das Konzept?</h3>
<ul><li>„Qualität“ von Demokratie genauer bestimmen</li><li>Länder vergleichen und Demokratiedefekte identifizieren</li><li>systematisch beobachten, wie einzelne Teilsysteme „infiziert“ werden</li><li>Aushöhlung der Demokratie und schleichende Autokratisierung erkennen</li></ul>
<div class="litbox"><b>Lektüre: vier Typen defekter Demokratie (Merkel 2013)</b>
<p><b>Exklusive Demokratie:</b> Ganze Gruppen sind vom universellen Wahlrecht ausgeschlossen (A). Beispiel: Südafrika zur Zeit der Apartheid, mildere Form bei der russischen Minderheit in Lettland und Estland.</p>
<p><b>Enklavendemokratie:</b> Vetomächte wie Militär, Milizen, Großgrundbesitzer oder Konzerne entziehen ganze Politikbereiche den Gewählten (E). Beispiele: Chile kurz nach Pinochet, Indonesien.</p>
<p><b>Illiberale Demokratie:</b> Die Gerichte kontrollieren Regierung und Parlament nur eingeschränkt, Freiheits- und Schutzrechte sind beschädigt (C). Häufigster Typ, etwa Türkei, Ukraine, Peru.</p>
<p><b>Delegative Demokratie:</b> Ein meist charismatischer Präsident regiert am Parlament vorbei und greift in die Justiz ein (D). Beispiele bei Merkel: Russland unter Putin, Venezuela unter Chávez.</p>
<p><b>Ursachen</b> sind meist Bündel: unvollständige Modernisierung, Wirtschaftskrisen, schwache Zivilgesellschaft, Klientelismus und Korruption, fehlende regionale Einbindung. Defekte Demokratien sind nicht unbedingt Übergangsstadien, sie können stabil sein. Um 2011 war etwa die Hälfte der 117 Wahldemokratien defekt.</p>
<p>Zur externen Einbettung zählt Merkel im Text neben sozioökonomischem Kontext und Zivilgesellschaft auch die <b>internationale und regionale Einbindung</b>.</p></div>
<p>Kernaussage für Essays: Eine defekte Demokratie hat noch ein funktionierendes Wahlregime, aber in anderen Teilregimen fehlt die gegenseitige Absicherung. Darum reicht es nicht, nur zu fragen, ob gewählt wird.</p>`,
check:[
 {q:"Was bedeutet „doppelt eingebettet“?", o:["Demokratie und Marktwirtschaft","Intern durch die Teilregime und extern durch das Umfeld","National und europäisch"], a:1, ex:"Intern stützen sich die fünf Teilregime gegenseitig, extern schützen Staatlichkeit, Zivilgesellschaft und sozioökonomische Voraussetzungen."},
 {q:"Welches Teilregime steht im Zentrum des Modells?", o:["Effektive Regierungsgewalt","Wahlregime","Bürgerliche Rechte"], a:1, ex:"A, das Wahlregime, ist der Kern, um den die anderen vier Teilregime liegen."},
 {q:"Eine Regierung schränkt die Unabhängigkeit der Gerichte ein und regiert am Parlament vorbei. Welches Teilregime ist vor allem betroffen?", o:["A Wahlregime","D Horizontale Verantwortlichkeit","B Politische Freiheiten"], a:1, ex:"Horizontale Verantwortlichkeit heißt: Die Gewalten kontrollieren sich gegenseitig. Das wäre der Weg zur delegativen Demokratie."}
]}
];

CARDS[1]=[
 {id:"v1-c01", f:"Politik nach Bernauer et al. (2009)", b:"Soziales Handeln, das auf Entscheidungen und Steuerungsmechanismen ausgerichtet ist, die allgemein verbindlich sind und das Zusammenleben von Menschen regeln."},
 {id:"v1-c02", f:"Vier Merkmale politischer Realität", b:"1. Ebenen (lokal bis international)\n2. Akteure (individuell und kollektiv)\n3. Institutionen und Organe\n4. Verfahren"},
 {id:"v1-c03", f:"Polity, Politics, Policy", b:"Polity: Form, Regelwerk (Verfassung, Staat, politisches System)\nPolitics: Prozess (Interesse, Akteur, Kommunikation, Legitimation, Macht)\nPolicy: Inhalt, Handlungsprogramme (Problem, Programm, Erfolg)"},
 {id:"v1-c04", f:"Sechs Arten wissenschaftlicher Aussagen", b:"1. Beschreibungen\n2. Aussagen über Zusammenhänge\n3. Erklärungen\n4. Prognosen\n5. Werturteile\n6. Empfehlungen oder Handlungsanweisungen"},
 {id:"v1-c05", f:"Politikwissenschaft nach Schmidt (2010)", b:"Wissenschaftliche Beschreibung, Erklärung oder Prognose politischer Phänomene auf Basis wissenschaftlich fundierter Analysen."},
 {id:"v1-c06", f:"Gütekriterien politikwissenschaftlicher Forschung", b:"Systematik\nGeneralisierbarkeit\nIdentifikation von Kausalmechanismen\nReliabilität (Verlässlichkeit)\nValidität (Gültigkeit)"},
 {id:"v1-c07", f:"Fünf Teilgebiete der Politikwissenschaft", b:"1. Politische Theorie / Ideengeschichte\n2. Internationale Beziehungen / EU\n3. Vergleichende PoWi / Regierungslehre\n4. Politisches System der BRD\n5. Sozialwissenschaftliche Methoden\nDiese Vorlesung: 3 und 4."},
 {id:"v1-c08", f:"Politisches System nach Parsons", b:"Ein Subsystem der Gesellschaft, das auf Zielverfolgung und politische Steuerung spezialisiert ist."},
 {id:"v1-c09", f:"Enger vs. weiter Begriff des politischen Systems", b:"Umfang: nur ZPES / ZPES plus Parteien, Verbände, Wirtschaftsakteure\nSichtweise: formal-institutionenbezogen / inhaltlich-prozessbezogen"},
 {id:"v1-c10", f:"Eastons Systemmodell: die Bausteine", b:"Inputs: Forderungen (demands) und Unterstützung (support)\nSystem: verarbeitet zu Entscheidungen\nOutputs: wirken auf die Umwelt\nFeedback: Rückkopplung auf neue Inputs\nUmwelt: umgibt das Ganze"},
 {id:"v1-c11", f:"Drei Formen der Legitimation (Easton-Folie)", b:"Soziale Legitimation: Zustimmung durch die Bürger\nInput-Legitimation: demokratische Verfahren\nOutput-Legitimation: erfolgreiche Problembearbeitung"},
 {id:"v1-c12", f:"Almond/Powell: drei Funktionsebenen", b:"Systemfunktionen: Sozialisierung, Rekrutierung, Kommunikation\nProzessfunktionen: Interessenartikulation, Interessenaggregation, Policy-making, Implementierung\nPolicy-Funktionen: Steuern, Regulierung, Verteilung"},
 {id:"v1-c13", f:"Almond/Powell: Strukturen und ihre Aufgabe", b:"Parteien: Interessenaggregation\nVerbände: Interessenartikulation\nParlament, Regierung: Policy-making\nVerwaltung, Justiz: Implementierung und Überprüfung"},
 {id:"v1-c14", f:"Kernunterschied Demokratie und Autokratie", b:"In Demokratien ist der Gesetzgeber selbst den Gesetzen unterworfen, in Autokratien nicht."},
 {id:"v1-c15", f:"Dichotome Typenlehre", b:"Alle Nicht-Demokratien sind Autokratien.\n„Democracy is the opposite of autocracy“ (Jaggers/Gurr 1995)."},
 {id:"v1-c16", f:"Wer unterteilt was?", b:"Linz (1975): Autokratien in totalitäre und autoritäre Regime\nMerkel (2010): Demokratien in eingebettete und defekte Demokratien"},
 {id:"v1-c17", f:"Lauth: drei Dimensionen der Demokratie", b:"1. Politische Freiheit\n2. Politische Gleichheit\n3. Politische und rechtliche Kontrolle\nDemokratie: alle gegeben. Autoritär: partiell. Totalitär: nicht gegeben."},
 {id:"v1-c18", f:"Kontinuum politischer Regime (Lauth et al. 2014)", b:"1. Demokratie\n2. Defekte Demokratie\n3. Schwach autoritäres Regime\n4. Stark autoritäres Regime\n5. Totalitäres Regime"},
 {id:"v1-c19", f:"Formen defekter Demokratie in Lauths Tabelle", b:"Illiberale Demokratie\nDelegative Demokratie\nExklusive Demokratie"},
 {id:"v1-c20", f:"Demokratiedefinition nach Lauth (2006): Kernelemente", b:"Rechtsstaatliche Herrschaftsform\nSelbstbestimmung im Sinne der Volkssouveränität\nBeteiligung an der Besetzung der Entscheidungspositionen in freien, kompetitiven, fairen Verfahren\nChance auf kontinuierliche Einflussnahme\nKontrolle der politischen Herrschaft"},
 {id:"v1-c21", f:"Prozedurale vs. materielle Demokratievorstellung", b:"Blick auf: Verfahren der Beteiligung / Inhalte und Ergebnisse\nBeispiele: Rekrutierung, Kontrolle der Exekutive, Partizipation / gerechte Verteilung\nWirkung: weitaus wirkungsmächtiger / weniger verbreitet"},
 {id:"v1-c22", f:"Dahls acht Garantien (1971)", b:"1. Assoziations- und Koalitionsfreiheit\n2. Meinungsfreiheit\n3. Aktives Wahlrecht\n4. Passives Wahlrecht\n5. Konkurrenz der Eliten um Stimmen\n6. Pluralistische Informationsquellen\n7. Freie und faire Wahlen\n8. Regierungspolitik hängt von Wählerpräferenzen ab"},
 {id:"v1-c23", f:"Merkels sechs Herrschaftsdimensionen (2010)", b:"1. Legitimation\n2. Zugang\n3. Monopol\n4. Struktur\n5. Anspruch\n6. Weise"},
 {id:"v1-c24", f:"Embedded Democracy: fünf Teilregime", b:"A: Wahlregime\nB: Politische Freiheiten\nC: Bürgerliche Rechte\nD: Horizontale Verantwortlichkeit\nE: Effektive Regierungsgewalt"},
 {id:"v1-c25", f:"Embedded Democracy: externe Einbettung", b:"Staatlichkeit\nZivilgesellschaft\nÖkonomische Voraussetzungen und soziale Gerechtigkeit"},
 {id:"v1-c26", f:"Wozu dient das Konzept Embedded Democracy?", b:"Qualität von Demokratie genauer bestimmen\nLänder vergleichen, Defekte identifizieren\nInfizierung einzelner Teilsysteme beobachten\nAushöhlung und schleichende Autokratisierung erkennen"}
];

KREUZ.push(
 {id:"v1-x01", ch:1, stem:"Zur Dreifachgliederung des Politischen gilt:", s:[
  ["Die Verfassung eines Staates gehört zur Polity-Dimension.", true, "Polity ist das Regelwerk: Verfassung, Staat, politisches System."],
  ["Policy bezeichnet den Machtkampf zwischen Parteien.", false, "Das ist <b>Politics</b>. Policy meint Inhalte und Handlungsprogramme."],
  ["Legitimation und Macht sind Stichworte der Politics-Dimension.", true, "Die Folie nennt für Politics: Interesse, Akteur, Kommunikation, Legitimation, Macht."]]},
 {id:"v1-x02", ch:1, stem:"Zur Politikwissenschaft gilt laut Folie:", s:[
  ["Moderne Politikwissenschaft ist primär normativ und gibt vor, was gute Politik ist.", false, "Sie ist primär <b>empirisch-analytisch und werturteilsfrei</b>."],
  ["Reliabilität und Validität gehören zu ihren Gütekriterien.", true, "Dazu Systematik, Generalisierbarkeit und Kausalmechanismen."],
  ["Die Vorlesung liegt in den Teilgebieten Vergleichende Politikwissenschaft und Politisches System der BRD.", true, "Die Felder 3 und 4 sind auf der Folie eingekreist."]]},
 {id:"v1-x03", ch:1, stem:"Zu Eastons Systemmodell gilt:", s:[
  ["Forderungen und Unterstützung sind Outputs des politischen Systems.", false, "Sie sind <b>Inputs</b>. Outputs sind die Entscheidungen."],
  ["Über die Rückkopplung beeinflussen Outputs die künftigen Inputs.", true, "Das Feedback verbindet Outputs wieder mit den Inputs."],
  ["Output-Legitimation entsteht durch erfolgreiche Problembearbeitung.", true, "Input-Legitimation entsteht dagegen durch demokratische Verfahren."]]},
 {id:"v1-x04", ch:1, stem:"Zum Begriff des politischen Systems gilt:", s:[
  ["Nach Parsons ist das politische System auf Zielverfolgung und Steuerung spezialisiert.", true, "Es ist ein Subsystem der Gesellschaft mit genau dieser Aufgabe."],
  ["Das enge Verständnis (ZPES) schließt Verbände und Parteien ausdrücklich mit ein.", false, "Das ist das <b>weite</b> Verständnis. Das ZPES umfasst nur das zentrale Entscheidungssystem."],
  ["Im Kreislaufmodell von Almond/Powell übernehmen Parteien vor allem die Interessenaggregation.", true, "Verbände artikulieren Interessen, Parteien bündeln sie."]]},
 {id:"v1-x05", ch:1, stem:"Zur Unterscheidung von Demokratie und Autokratie gilt:", s:[
  ["Linz unterscheidet totalitäre und autoritäre Regime.", true, "Linz (1975) unterteilt die Autokratien."],
  ["Eine defekte Demokratie zählt bei Lauth et al. bereits zu den Autokratien.", false, "Sie steht auf der <b>Demokratie-Seite</b> des Kontinuums."],
  ["In autoritären Regimen sind Freiheit, Gleichheit und Kontrolle partiell gegeben.", true, "In totalitären Regimen sind sie gar nicht gegeben."]]},
 {id:"v1-x06", ch:1, stem:"Zu Demokratiebegriffen gilt:", s:[
  ["Dahls Kriterien beschreiben vor allem eine materielle Demokratievorstellung.", false, "Dahls Garantien sind <b>prozedural</b>: Wahlen, Freiheiten, Konkurrenz, Information."],
  ["Lauth versteht Demokratie als rechtsstaatliche Herrschaftsform.", true, "So beginnt seine Definition (Lauth 2006, S. 100)."],
  ["Bei Merkel fragt die Dimension „Herrschaftsanspruch“, ob die Macht des Staates gegenüber den Bürgern begrenzt ist.", true, "Herrschaftsanspruch: begrenzt oder unbegrenzt."]]},
 {id:"v1-x07", ch:1, stem:"Zur Embedded Democracy nach Merkel gilt:", s:[
  ["Das Wahlregime bildet den Kern des Modells.", true, "Teilregime A steht im Zentrum."],
  ["Die Zivilgesellschaft gehört zu den fünf internen Teilregimen.", false, "Sie gehört zur <b>externen</b> Einbettung, neben Staatlichkeit und sozioökonomischen Voraussetzungen."],
  ["Das Konzept soll auch schleichende Autokratisierung sichtbar machen.", true, "Eines der genannten Ziele auf der Folie."]]}
);

ESSAYS.push(
 {id:"v1-e1", ch:1, kind:"lang", short:"Embedded Democracy",
  q:"Erläutern Sie das Konzept der „Embedded Democracy“ nach Merkel und diskutieren Sie, inwiefern es sich eignet, Defekte von Demokratien zu erkennen.",
  op:"„Erläutern“: Konzept erklären, mit Beispielen veranschaulichen. „Diskutieren“: Stärken und Grenzen abwägen und am Ende Stellung nehmen.",
  gl:["<b>Einleitung:</b> Problem: Viele Staaten halten Wahlen ab und sind trotzdem keine vollständigen Demokratien. Frage: Wie lässt sich die Qualität einer Demokratie messen?",
   "<b>Demokratiebegriff:</b> Abgrenzung zur Autokratie (Gesetzgeber an Gesetze gebunden), kurz Lauths Definition oder Dahls Kriterien.",
   "<b>Das Konzept:</b> doppelte Einbettung. Intern fünf Teilregime A bis E, extern Staatlichkeit, Zivilgesellschaft, sozioökonomische Voraussetzungen.",
   "<b>Defekte Demokratie:</b> Wahlregime funktioniert, ein anderes Teilregime ist beschädigt. Typen mit Beispielen.",
   "<b>Diskussion Stärken:</b> differenzierter als die Dichotomie, Teilregime einzeln prüfbar, Ländervergleich, schleichende Autokratisierung sichtbar.",
   "<b>Diskussion Grenzen:</b> Abgrenzung zwischen defekter Demokratie und autoritärem Regime unscharf, Messung erfordert Urteile, normativ geprägt.",
   "<b>Fazit:</b> gut geeignet als Analyseraster, aber kein Automatismus. Eigene Einschätzung."],
  k:["Problemstellung in der Einleitung (Wahlen allein machen noch keine Demokratie)",
   "Idee der doppelten Einbettung: intern und extern",
   "Alle fünf Teilregime genannt (Wahlregime, politische Freiheiten, bürgerliche Rechte, horizontale Verantwortlichkeit, effektive Regierungsgewalt)",
   "Externe Einbettung genannt (Staatlichkeit, Zivilgesellschaft, sozioökonomische Voraussetzungen)",
   "Defekte Demokratie erklärt: Wahlregime intakt, andere Teilregime beschädigt, mindestens ein Typ mit Beispiel",
   "Ziele des Konzepts: Qualität messen, vergleichen, Aushöhlung erkennen",
   "Abwägung mit mindestens einer Stärke und einer Grenze",
   "Fazit beantwortet die Frage mit begründeter eigener Einschätzung"],
  m:["Heute halten die meisten Staaten der Welt Wahlen ab. Dennoch würde kaum jemand jeden dieser Staaten als Demokratie bezeichnen. Die Vergleichende Politikwissenschaft braucht deshalb Instrumente, die mehr leisten als die Frage, ob gewählt wird. Ein solches Instrument ist das Konzept der „Embedded Democracy“ von Wolfgang Merkel (2010). Im Folgenden wird das Konzept erläutert und anschließend diskutiert, wie gut es Demokratiedefekte sichtbar macht.",
   "Grundlage ist ein prozeduraler Demokratiebegriff. Nach Lauth (2006) ist Demokratie eine rechtsstaatliche Herrschaftsform, die Selbstbestimmung im Sinne der Volkssouveränität durch freie, kompetitive und faire Verfahren ermöglicht und die Kontrolle der Herrschaft garantiert. Anders als in Autokratien ist der Gesetzgeber selbst an die Gesetze gebunden.",
   "Merkel geht davon aus, dass stabile rechtsstaatliche Demokratien doppelt eingebettet sind. Intern besteht die Demokratie aus fünf Teilregimen: dem Wahlregime (A) im Zentrum, den politischen Freiheiten (B), den bürgerlichen Rechten (C), der horizontalen Verantwortlichkeit, also der gegenseitigen Kontrolle der Gewalten (D), und der effektiven Regierungsgewalt der gewählten Vertreter (E). Diese Teilregime sichern sich gegenseitig ab: Freie Wahlen nützen wenig, wenn die Presse nicht berichten darf oder Gerichte die Regierung nicht kontrollieren können. Extern ist die Demokratie in Staatlichkeit, eine lebendige Zivilgesellschaft und sozioökonomische Voraussetzungen eingebettet. Die Annahme ist, dass diese doppelte Einbettung die Demokratie gegen innere und äußere Schocks schützt.",
   "Daraus ergibt sich der Begriff der defekten Demokratie: Das Wahlregime funktioniert im Kern, aber andere Teilregime sind beschädigt. Je nach betroffenem Teilregime unterscheidet man etwa die illiberale Demokratie, in der bürgerliche Rechte eingeschränkt sind, die delegative Demokratie, in der die Regierung Parlament und Justiz umgeht, und die exklusive Demokratie, in der Teile der Bevölkerung von der Teilhabe ausgeschlossen sind. Ungarn wird in der Forschung häufig als Beispiel für eine illiberale Entwicklung genannt.",
   "Für die Erkennung von Defekten hat das Konzept klare Stärken. Es ist differenzierter als eine dichotome Einteilung in Demokratien und Autokratien, wie sie Jaggers und Gurr vorschlagen. Weil die Teilregime einzeln geprüft werden, lässt sich genau benennen, wo eine Demokratie Schwächen hat. Das ermöglicht Ländervergleiche und macht sichtbar, wie einzelne Teilsysteme nach und nach „infiziert“ werden. Gerade schleichende Autokratisierung, die ohne offenen Putsch über Jahre abläuft, wird so erkennbar.",
   "Zugleich hat das Konzept Grenzen. Die Grenze zwischen einer stark defekten Demokratie und einem schwach autoritären Regime bleibt unscharf, und die Einstufung erfordert Urteile, die je nach Forscher unterschiedlich ausfallen können. Außerdem beruht das Modell auf einem westlich-liberalen Leitbild, an dem alle Staaten gemessen werden.",
   "Insgesamt eignet sich das Konzept der Embedded Democracy gut, um Defekte von Demokratien zu erkennen, weil es den Blick von den Wahlen auf das Zusammenspiel aller Teilregime lenkt. Es ersetzt aber nicht die genaue Analyse des Einzelfalls und liefert keine automatische Einstufung. Gerade deshalb ist es als Analyseraster für die Vergleichende Politikwissenschaft wertvoll."]},
 {id:"v1-e2", ch:1, kind:"lang", short:"Demokratie und Autokratie",
  q:"Grenzen Sie Demokratie und Autokratie voneinander ab. Diskutieren Sie dabei, ob eine dichotome Unterscheidung der politischen Wirklichkeit gerecht wird.",
  op:"„Abgrenzen“: Kriterien nennen, nach denen sich beide unterscheiden. „Diskutieren“: dichotome Sicht und Kontinuum gegenüberstellen, Stellung nehmen.",
  gl:["<b>Einleitung:</b> Wortbedeutung (démos, kratía), Fragestellung: Reicht „Demokratie oder nicht“?",
   "<b>Kernkriterium:</b> Bindung des Gesetzgebers an die Gesetze.",
   "<b>Kriterien für Demokratie:</b> Lauths Definition und die drei Dimensionen Freiheit, Gleichheit, Kontrolle; Dahls Garantien als Beispiel.",
   "<b>Autokratien unterscheiden:</b> Linz: autoritär und totalitär, mit Merkmalen.",
   "<b>Dichotome Sicht:</b> Jaggers/Gurr, Vorteile (klar, messbar).",
   "<b>Kontinuum:</b> Lauth et al. 2014, defekte Demokratien, schwach und stark autoritär; Merkels Embedded Democracy als Werkzeug.",
   "<b>Fazit:</b> Dichotomie als erster Schritt, für die Wirklichkeit braucht es das Kontinuum."],
  k:["Wortbedeutung oder Grundidee der Demokratie als Volksherrschaft",
   "Kernkriterium: Gesetzgeber in der Demokratie an die Gesetze gebunden, in der Autokratie nicht",
   "Drei Dimensionen nach Lauth (Freiheit, Gleichheit, Kontrolle) mit Abstufung gegeben, partiell, nicht gegeben",
   "Autoritär und totalitär nach Linz unterschieden",
   "Dichotome Typenlehre (Jaggers/Gurr) dargestellt",
   "Kontinuum nach Lauth et al. mit defekter Demokratie und Abstufungen der Autokratie",
   "Begründete Antwort auf die Frage nach der Dichotomie"],
  m:["Der Begriff Demokratie stammt aus dem Griechischen: démos bedeutet Volk, kratía Herrschaft. Demokratie ist also der Grundidee nach die Herrschaft des Volkes, Autokratie die Selbstherrschaft eines Einzelnen oder einer kleinen Gruppe. Doch zwischen beiden liegen viele Staaten, die sich nicht eindeutig zuordnen lassen. Dieses Essay grenzt beide Herrschaftsformen ab und fragt, ob eine Einteilung in nur zwei Typen der Wirklichkeit gerecht wird.",
   "Das grundlegende Unterscheidungsmerkmal ist die Bindung an das Recht: In Demokratien ist der Gesetzgeber selbst den Gesetzen unterworfen, in Autokratien nicht. Lauth (2006) bestimmt Demokratie als rechtsstaatliche Herrschaftsform, die Selbstbestimmung im Sinne der Volkssouveränität ermöglicht. Daraus leitet er drei Dimensionen ab: politische Freiheit, politische Gleichheit sowie politische und rechtliche Kontrolle. In einer Demokratie sind alle drei gegeben, in einem autoritären Regime nur teilweise, in einem totalitären Regime gar nicht. Dahls (1971) Kriterien wie freie und faire Wahlen, Meinungsfreiheit und pluralistische Informationsquellen konkretisieren diese Dimensionen.",
   "Auch Autokratien sind nicht gleich. Linz (1975) unterscheidet autoritäre Regime, die einen begrenzten Pluralismus zulassen und die Bevölkerung eher ruhigstellen, von totalitären Regimen, die mit einer umfassenden Ideologie alle Lebensbereiche erfassen und die Bevölkerung mobilisieren.",
   "Eine dichotome Typenlehre, wie sie Jaggers und Gurr (1995) vertreten, ordnet jeden Staat entweder als Demokratie oder als Autokratie ein. Ihr Vorteil ist Klarheit: Sie erleichtert Zählungen und große Vergleiche. Ihr Nachteil zeigt sich bei Staaten, die zwar regelmäßig wählen lassen, aber Gerichte schwächen oder die Presse kontrollieren.",
   "Lauth et al. (2014) ordnen politische Regime deshalb auf einem Kontinuum an: von der Demokratie über die defekte Demokratie, das schwach und das stark autoritäre Regime bis zum totalitären Regime. Defekte Demokratien wie die illiberale oder die delegative Demokratie stehen noch auf der Seite der Demokratie, weisen aber deutliche Mängel auf. Mit Merkels Konzept der Embedded Democracy lässt sich genau bestimmen, welches Teilregime beschädigt ist.",
   "Im Ergebnis ist die dichotome Unterscheidung ein sinnvoller erster Schritt, weil das Kernkriterium der Rechtsbindung klar ist. Der politischen Wirklichkeit wird sie aber nicht gerecht, da viele Staaten in einer Grauzone liegen. Erst ein Kontinuum erlaubt es, diese Zwischenformen zu beschreiben und Entwicklungen wie eine schleichende Autokratisierung zu erkennen."]},
 {id:"v1-e3", ch:1, kind:"kurz", short:"Polity, Politics, Policy",
  q:"Erläutern Sie den dreidimensionalen Politikbegriff an einem selbst gewählten Beispiel.",
  op:"„Erläutern“: alle drei Dimensionen definieren und am selben Beispiel zeigen. Etwa 15 Minuten.",
  gl:["<b>Einstieg:</b> Politik nach Bernauer et al. (allgemein verbindliche Entscheidungen), drei englische Begriffe für ein deutsches Wort.",
   "<b>Polity</b> definieren und am Beispiel zeigen.",
   "<b>Politics</b> definieren und am Beispiel zeigen.",
   "<b>Policy</b> definieren und am Beispiel zeigen.",
   "<b>Schluss:</b> Die Dimensionen hängen zusammen, die Polity setzt den Rahmen für Politics, daraus entsteht Policy."],
  k:["Polity als Form oder Regelwerk (Verfassung, Staat, politisches System)",
   "Politics als Prozess (Interessen, Akteure, Macht, Legitimation)",
   "Policy als Inhalt oder Handlungsprogramm (Problem, Programm, Erfolg)",
   "Ein durchgehendes Beispiel, an dem alle drei Dimensionen gezeigt werden",
   "Zusammenhang der drei Dimensionen angesprochen"],
  m:["Politik ist nach Bernauer et al. (2009) soziales Handeln, das auf allgemein verbindliche Entscheidungen zielt. Um Politik genauer zu analysieren, unterscheidet die Politikwissenschaft drei Dimensionen, die mit den englischen Begriffen Polity, Politics und Policy bezeichnet werden. Das lässt sich an der Rückkehr von G8 zu G9 an den Gymnasien in Nordrhein-Westfalen zeigen.",
   "Polity bezeichnet die Form der Politik, also das Regelwerk und die Grundlagen des Gemeinwesens: Verfassung, Staat und politisches System. Im Beispiel gehört dazu, dass Bildung nach dem Grundgesetz in die Zuständigkeit der Länder fällt und deshalb der Landtag über das Schulgesetz entscheidet.",
   "Politics meint den Prozess, in dem um Entscheidungen gerungen wird. Hier geht es um Interessen, Akteure, Kommunikation, Legitimation und Macht. Im Beispiel stritten Elterninitiativen, Lehrerverbände und Parteien über Jahre, ob die verkürzte Schulzeit beibehalten werden soll, bis sich im Landtag eine Mehrheit fand.",
   "Policy schließlich bezeichnet die Inhalte, also die Handlungsprogramme mit Problem, Programm und Erfolg. Im Beispiel ist das die beschlossene Regel, dass das Abitur am Gymnasium wieder nach neun Jahren abgelegt wird, und die Frage, ob sie das Problem der Überlastung löst.",
   "Die drei Dimensionen hängen eng zusammen: Die Polity setzt den Rahmen, in dem Politics stattfindet, und aus diesem Prozess entsteht die Policy."]},
 {id:"v1-e4", ch:1, kind:"kurz", short:"Easton und Legitimation",
  q:"Erklären Sie Eastons Modell des politischen Systems und ordnen Sie die drei Formen der Legitimation darin ein.",
  op:"„Erklären“: Bausteine und Zusammenhang des Modells darstellen. „Einordnen“: jede Legitimationsform an der richtigen Stelle verorten. Etwa 15 Minuten.",
  gl:["<b>Einstieg:</b> politisches System als Teil der Gesellschaft (Parsons), Easton als Systemtheoretiker.",
   "<b>Inputs:</b> Forderungen und Unterstützung aus der Umwelt.",
   "<b>System und Outputs:</b> Verarbeitung zu Entscheidungen, Wirkung auf die Umwelt.",
   "<b>Rückkopplung:</b> Outputs verändern neue Inputs, Kreislauf.",
   "<b>Legitimation:</b> sozial (Zustimmung), Input (Verfahren), Output (Problemlösung), jeweils mit Beispiel."],
  k:["Inputs: Forderungen (demands) und Unterstützung (support) aus der Umwelt",
   "Das politische System verarbeitet Inputs zu Entscheidungen",
   "Outputs wirken auf die Umwelt",
   "Rückkopplung (Feedback) erklärt",
   "Soziale Legitimation: Zustimmung durch die Bürger",
   "Input-Legitimation: demokratische Verfahren",
   "Output-Legitimation: erfolgreiche Problembearbeitung"],
  m:["David Easton versteht das politische System als Teil der Gesellschaft, der mit seiner Umwelt in ständigem Austausch steht. Aus der Umwelt gelangen Inputs in das System. Easton unterscheidet dabei Forderungen, etwa nach mehr Lehrkräften, und Unterstützung, also die Bereitschaft der Bürger, das System und seine Entscheidungen mitzutragen.",
   "Im politischen System werden diese Inputs zu verbindlichen Entscheidungen verarbeitet, etwa zu einem Gesetz. Diese Outputs wirken auf die Umwelt zurück. Über die Rückkopplung beeinflussen sie wiederum die künftigen Inputs: Ein erfolgreiches Gesetz kann die Unterstützung erhöhen, ein gescheitertes neue Forderungen auslösen. So entsteht ein Kreislauf.",
   "In dieses Modell lassen sich drei Formen der Legitimation einordnen. Die soziale Legitimation liegt auf der Seite der Inputs: Sie beruht auf der Zustimmung der Bürgerinnen und Bürger. Die Input-Legitimation liegt im System selbst und entsteht durch demokratische Verfahren wie Wahlen und parlamentarische Beratung. Die Output-Legitimation schließlich ergibt sich aus den Ergebnissen, also aus einer erfolgreichen Bearbeitung gesellschaftlicher Probleme."]}
);

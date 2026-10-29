/* ================= Seminar, Sitzung 1 (29.10., Zoom): Begriff und Konzept des politischen Systems =================
   Textgrundlage (Kern, unmarkiert): Korte/Fröhlich (2009), Kap. 1 „Politisches System und Regierungsforschung“, S. 9–24.
   Literaturempfehlungen (als Empfehlung markiert, litbox/lit): Croissant (2010), Lauth (2010), Pickel/Pickel (2016), Schneider/Janning (2006).
   Darüber hinaus: erg/ergbox. IDs se1-… nie umbenennen. */
const EMPF=t=>`<p class="small muted" style="margin:0 0 10px">Grundlage: ${t}. Literaturempfehlung zur Vertiefung, keine Textgrundlage.</p>`;
chOf(101).lit="Textgrundlage: Korte/Fröhlich (2009), Kap. 1. Empfehlungen: Croissant (2010), Lauth (2010), Pickel/Pickel (2016), Schneider/Janning (2006). Alle als PDF im Moodle-Kurs.";

const FIG_ZUGAENGE=`<svg viewBox="0 0 360 200" role="img" aria-label="Vier Zugänge der Regierungsforschung" style="width:100%;max-width:440px;display:block;margin:10px auto;font:12px var(--sans)">
  <rect x="120" y="78" width="120" height="44" rx="10" style="fill:var(--surface);stroke:var(--ink)"/>
  <text x="180" y="96" text-anchor="middle" style="fill:var(--ink);font-weight:600">Regieren in</text>
  <text x="180" y="112" text-anchor="middle" style="fill:var(--ink);font-weight:600">Deutschland</text>
  <rect x="6" y="8" width="150" height="54" rx="8" style="fill:var(--accent-soft);stroke:var(--accent)"/>
  <text x="81" y="28" text-anchor="middle" style="fill:var(--ink);font-weight:600">Struktur (polity)</text>
  <text x="81" y="46" text-anchor="middle" style="fill:var(--muted)">Institutionen, Ordnung</text>
  <rect x="204" y="8" width="150" height="54" rx="8" style="fill:var(--accent-soft);stroke:var(--accent)"/>
  <text x="279" y="28" text-anchor="middle" style="fill:var(--ink);font-weight:600">Prozess (politics)</text>
  <text x="279" y="46" text-anchor="middle" style="fill:var(--muted)">Politikmanagement</text>
  <rect x="6" y="138" width="150" height="54" rx="8" style="fill:var(--accent-soft);stroke:var(--accent)"/>
  <text x="81" y="158" text-anchor="middle" style="fill:var(--ink);font-weight:600">Inhalte (policy)</text>
  <text x="81" y="176" text-anchor="middle" style="fill:var(--muted)">Politikfelder</text>
  <rect x="204" y="138" width="150" height="54" rx="8" style="fill:var(--accent-soft);stroke:var(--accent)"/>
  <text x="279" y="158" text-anchor="middle" style="fill:var(--ink);font-weight:600">Kommunikation</text>
  <text x="279" y="176" text-anchor="middle" style="fill:var(--muted)">Medien, Aufmerksamkeit</text>
  <path d="M120 80 L150 62 M240 80 L210 62 M120 120 L150 138 M240 120 L210 138" style="stroke:var(--ink);stroke-width:1.5"/>
</svg>`;
const FIG_ZYKLUS=`<svg viewBox="0 0 360 230" role="img" aria-label="Policy-Zyklus" style="width:100%;max-width:440px;display:block;margin:10px auto;font:12px var(--sans)">
  <rect x="105" y="6" width="150" height="40" rx="8" style="fill:var(--accent-soft);stroke:var(--accent)"/>
  <text x="180" y="23" text-anchor="middle" style="fill:var(--ink);font-weight:600">1 Problemdefinition</text>
  <text x="180" y="38" text-anchor="middle" style="fill:var(--muted)">Thematisierung</text>
  <rect x="226" y="72" width="128" height="40" rx="8" style="fill:var(--accent-soft);stroke:var(--accent)"/>
  <text x="290" y="96" text-anchor="middle" style="fill:var(--ink);font-weight:600">2 Agenda-Setting</text>
  <rect x="226" y="146" width="128" height="40" rx="8" style="fill:var(--accent-soft);stroke:var(--accent)"/>
  <text x="290" y="163" text-anchor="middle" style="fill:var(--ink);font-weight:600">3 Programm-</text>
  <text x="290" y="178" text-anchor="middle" style="fill:var(--ink);font-weight:600">formulierung</text>
  <rect x="105" y="184" width="150" height="40" rx="8" style="fill:var(--accent-soft);stroke:var(--accent)"/>
  <text x="180" y="208" text-anchor="middle" style="fill:var(--ink);font-weight:600">4 Implementation</text>
  <rect x="6" y="110" width="128" height="40" rx="8" style="fill:var(--surface);stroke:var(--ink);stroke-dasharray:4 3"/>
  <text x="70" y="127" text-anchor="middle" style="fill:var(--ink);font-weight:600">Evaluation</text>
  <text x="70" y="142" text-anchor="middle" style="fill:var(--muted)">neu oder Ende</text>
  <path d="M255 34 Q290 46 290 70 M290 112 V144 M256 192 Q262 202 255 204 M105 204 Q70 196 70 152 M70 108 Q72 40 103 30" style="fill:none;stroke:var(--ink);stroke-width:1.5"/>
  <path d="M286 64 l4 7 4 -7z M286 138 l4 7 4 -7z M99 26 l6 4 -6 4z" style="fill:var(--ink)"/>
</svg>`;

LESSONS[101]=[
{id:"se1-1", t:"Worum es in der Regierungsforschung geht", html:`
<p>Das Seminar startet mit Korte und Fröhlich (2009). Ihr Lehrbuch fragt nicht, wie das Grundgesetz aufgebaut ist, sondern <b>wie in Deutschland regiert wird</b>.</p>
<div class="quote">Wer regiert wie in Berlin? Wie nehmen die Wähler Einfluss auf die politische Führung? Wie steuert man Reformen?<cite>Leitfragen bei Korte/Fröhlich 2009, S. 9</cite></div>
<p>Um das zu beantworten, braucht man Kenntnisse im <b>Politikmanagement</b>. Der Begriff verbindet zwei Seiten:</p>
<div class="merk"><b>Politikmanagement</b><div class="mrows">
<div><span class="ml">Steuerbarkeit des Systems</span><span>Lässt sich das politische System überhaupt lenken?</span></div>
<div><span class="ml">Steuerungsfähigkeit der Akteure</span><span>Können die wichtigen Akteure es lenken?</span></div></div></div>
<p>Dabei sind <b>Sach- und Machtfragen</b> immer verwoben. „Management“ meint nicht Betriebswirtschaft: Das Wort kommt von lateinisch <i>manus</i> (Hand) und <i>agere</i> (handeln), also richtunggebendes Handeln in komplexen Strukturen.</p>
<h3>Regieren ist mehr als Gesetze machen</h3>
<p>Regieren ist weder bloße Gesetzesinitiative noch Anpassung an Stimmungen noch „Sich-Durchwursteln“. Im Regierungsalltag finden sich <b>Routine, spontane Improvisation und grundlegende Strategie</b> nebeneinander.</p>
<h3>Was das Buch anders macht</h3>
<ul><li><b>Keine Verfassungskunde</b>, sondern eine Darstellung der <b>Funktionsweise des Regierens</b>.</li>
<li>Formale Institutionenkunde wird ergänzt um <b>informelle Entscheidungsprozesse, politische Kommunikation, personalisierte Regierungsstile und Strategien</b>.</li>
<li>Die <b>Exekutive</b> steht im Mittelpunkt. Kernthese: Der politische Prozess wird zunehmend <b>exekutivlastig</b>.</li>
<li>Steuerung von Politikinhalten soll mit politischen Machtprozessen verbunden werden (nach Renate Mayntz).</li>
<li>Beispiele stammen vor allem aus den Regierungszeiten von Kohl, Schröder und Merkel.</li></ul>
<p class="small muted">Für deinen GL-Unterricht: Auch eine Schulleitung „regiert“ so. Es gibt Routine (Stundenplan), Improvisation (Vertretung bei Krankheit) und Strategie (Schulprogramm). Formale Regeln allein erklären nicht, wie Entscheidungen wirklich fallen.</p>`,
check:[
 {q:"Was verbindet der Begriff „Politikmanagement“ bei Korte/Fröhlich?", o:["Die Steuerbarkeit des Systems mit der Steuerungsfähigkeit der Akteure","Die Wirtschaftspolitik mit der Haushaltspolitik","Die Gesetzgebung mit der Rechtsprechung","Die Bundesebene mit der Landesebene"], a:0, ex:"Politikmanagement fragt, ob das System lenkbar ist und ob die Akteure es lenken können. Sach- und Machtfragen sind dabei verwoben.",
  w:{1:"Das wären zwei Politikfelder. Politikmanagement ist kein Politikfeld, sondern eine Perspektive auf das Regieren insgesamt.",2:"Gesetzgebung und Rechtsprechung sind Staatsgewalten. Um ihr Verhältnis geht es bei der Gewaltenteilung.",3:"Das Zusammenspiel der Ebenen ist ein Thema des Föderalismus (Sitzung 4)."}},
 {q:"Welche Kernthese vertreten Korte und Fröhlich?", o:["Das Parlament wird immer mächtiger","Der politische Prozess wird zunehmend exekutivlastig","Medien entscheiden heute die Politik","Parteien verlieren jede Bedeutung"], a:1, ex:"Deshalb rücken sie die Regierung, also die Exekutive, in den Mittelpunkt ihres Buches.",
  w:{0:"Das Gegenteil: Sie sehen das Gewicht bei der Regierung. Darum steht die Exekutive im Zentrum.",2:"Medien gewinnen Einfluss, aber Korte/Fröhlich warnen gerade davor, Medienmacht mit kommunikativer Macht zu verwechseln.",3:"Parteien bleiben wichtig, etwa als Basis der Regierungsmehrheit. Eine solche These steht nicht im Text."}},
 {q:"Warum sprechen Korte/Fröhlich von „Management“?", o:["Weil Regieren eine genuin ökonomische Tätigkeit ist","Weil das Wort von manus und agere kommt: richtunggebendes Handeln in komplexen Strukturen","Weil Minister wie Unternehmensvorstände bezahlt werden"], a:1, ex:"Sie betonen ausdrücklich, dass Politik eigenen Gesetzen folgt und sich nicht in ökonomischer Rationalität erschöpft.",
  w:{0:"Genau das verneinen sie: Der Begriff soll keine ökonomische Tätigkeit unterstellen.",2:"Davon steht nichts im Text. Es geht um die Wortherkunft und die Art des Handelns."}}
]},
{id:"se1-2", t:"Deutschland als parlamentarische Demokratie", html:`
<p>Das politische System Deutschlands ist laut Korte/Fröhlich einmalig, lässt sich formal aber einem häufigen Typ zuordnen: ein <b>repräsentatives, freiheitliches und parlamentarisches Regierungssystem</b>.</p>
<h3>Warum „parlamentarisch“?</h3>
<ul><li>Nur der <b>Bundeskanzler</b> ist unmittelbar parlamentarisch verantwortlich und legitimiert.</li>
<li>Er wird von der <b>Mehrheit des Bundestages gewählt</b> und kann durch das <b>konstruktive Misstrauensvotum</b> abberufen werden.</li>
<li>Diese <b>Abberufbarkeit</b> der Regierung durch das Parlament macht das System zur parlamentarischen Demokratie, im Gegensatz zum präsidentiellen System (<b>Steffani 1979</b>).</li></ul>
<h3>Artikel 20 GG: Verfassung in Kurzform</h3>
<p>Art. 20 enthält die tragenden <b>Strukturprinzipien</b>:</p>
<table class="kvq"><tr><td><b>Demokratie</b></td><td>Alle Staatsgewalt geht vom Volke aus, ausgeübt in Wahlen und Abstimmungen und durch besondere Organe.</td></tr>
<tr><td><b>Bundesstaat</b></td><td>„demokratischer und sozialer Bundesstaat“</td></tr>
<tr><td><b>Rechtsstaat</b></td><td>Gesetzgebung an die verfassungsmäßige Ordnung, Verwaltung und Gerichte an Gesetz und Recht gebunden</td></tr>
<tr><td><b>Sozialstaat</b></td><td>ebenfalls in Abs. 1</td></tr></table>
<p class="small muted">Abs. 4 (Widerstandsrecht) wurde 1968 eingefügt.</p>
<h3>Freiheitliche demokratische Grundordnung</h3>
<p>Das Bundesverfassungsgericht hat sie im <b>SRP-Verbotsurteil (1952)</b> präzisiert. Dazu gehören mindestens:</p>
<ul><li>Achtung der Menschenrechte, vor allem Leben und freie Entfaltung</li><li>Volkssouveränität und Gewaltenteilung</li><li>Verantwortlichkeit der Regierung, Gesetzmäßigkeit der Verwaltung</li><li>Unabhängigkeit der Gerichte</li><li>Mehrparteienprinzip und Chancengleichheit der Parteien, Recht auf Opposition</li></ul>
<h3>Qualität statt Liste</h3>
<p>Solche Listen nennen Bestandteile, sagen aber nichts über die <b>Qualität</b> einer Demokratie. Dafür greifen Korte/Fröhlich auf <b>Dahl (1971)</b> zurück: offener <b>Wettbewerb</b> um Ämter und Macht und Raum für <b>Partizipation</b> aller. Die Qualität hängt auch von der Qualität des Regierens ab: <b>Good Governance</b> verbindet effektive Steuerung mit der Stabilität des Systems.</p>
<h3>Mehrheit und Legitimationskette</h3>
<ul><li>Entschieden wird meist nach dem <b>Mehrheitsprinzip</b>, ergänzt durch <b>Minderheitenschutz</b>. Beides ist konstitutiv für die repräsentative Demokratie.</li>
<li>Abgeordnete sind <b>nicht an Aufträge und Weisungen gebunden</b> und stellen sich alle vier Jahre zur Wahl.</li>
<li>Kanzler und Ministerpräsidenten verdanken ihr Amt einer <b>Wahl durch das Parlament</b>, die Abgeordneten einer freien Wahl. So entsteht eine <b>lückenlose Legitimationskette</b> vom Volk bis zur Entscheidung.</li></ul>
<div class="litbox"><b>Empfehlung: Croissant (2010)</b>Steffanis Kriterium im Detail und weitere Typologien von Regierungssystemen findest du in der Lektion „Regierungssysteme typisieren“.</div>`,
check:[
 {q:"Was macht Deutschland nach Steffani zu einer parlamentarischen Demokratie?", o:["Die Direktwahl des Bundespräsidenten","Die Abberufbarkeit der Regierung durch das Parlament","Das Verhältniswahlrecht","Der Föderalismus"], a:1, ex:"Der Bundestag kann den Kanzler mit dem konstruktiven Misstrauensvotum abberufen. Das ist das entscheidende Merkmal.",
  w:{0:"Der Bundespräsident wird nicht direkt gewählt, sondern von der Bundesversammlung. Für Steffani zählt ohnehin nur die Abberufbarkeit der Regierung.",2:"Das Wahlsystem ist kein Kriterium für den Typ des Regierungssystems.",3:"Föderalismus betrifft den Staatsaufbau. Auch präsidentielle Systeme wie die USA sind föderal."}},
 {q:"Welche vier Strukturprinzipien enthält Art. 20 GG?", o:["Demokratie, Bundesstaat, Rechtsstaat, Sozialstaat","Freiheit, Gleichheit, Kontrolle, Teilhabe","Legislative, Exekutive, Judikative, Medien","Polity, Politics, Policy, Governance"], a:0, ex:"Darum nennen Korte/Fröhlich Art. 20 eine „Verfassung in Kurzform“.",
  w:{1:"Freiheit, Gleichheit, Kontrolle sind Lauths drei Dimensionen der Demokratie (Vorlesung), nicht Art. 20.",2:"Die drei Gewalten stehen zwar in Art. 20 Abs. 2, Medien gehören nicht dazu. Und es sind keine Strukturprinzipien.",3:"Das sind Begriffe der Politikwissenschaft, nicht des Grundgesetzes."}},
 {q:"Was ist mit der „lückenlosen Legitimationskette“ gemeint?", o:["Jede Entscheidung muss vom Bundesverfassungsgericht geprüft werden","Hoheitliche Entscheidungen lassen sich über gewählte Organe auf den Willen des Volkes zurückführen","Jede Partei muss im Bundestag vertreten sein"], a:1, ex:"Bürger wählen das Parlament, das Parlament wählt den Kanzler, die Regierung entscheidet. So bleibt jede Entscheidung an das Volk rückgebunden.",
  w:{0:"Das Gericht prüft nur auf Antrag. Die Kette läuft über Wahlen, nicht über Gerichte.",2:"Die Fünf-Prozent-Hürde zeigt, dass das nicht gilt. Es geht um die Rückbindung von Entscheidungen an Wahlen."}}
]},
{id:"se1-3", t:"Grundbegriffe I: Darstellung, Entscheidung, Governance, Politik", html:`
<p>Korte/Fröhlich definieren vorab einige Begriffe, die im ganzen Seminar wiederkommen.</p>
<h3>Darstellungspolitik und Entscheidungspolitik</h3>
<table class="kvq"><tr><th></th><th>Darstellungspolitik</th><th>Entscheidungspolitik</th></tr>
<tr><td>Was</td><td>medienvermittelte, symbolische, öffentlich inszenierte Politik</td><td>Verfahren der Politik, konkreter Gesetzgebungsprozess</td></tr>
<tr><td>Regeln</td><td>Wettbewerbsregeln der medialen Öffentlichkeit</td><td>weitgehend unabhängig von Medienaufmerksamkeit, meist Routine-Gesetzgebung</td></tr></table>
<p class="small muted">Die Unterscheidung geht auf Ulrich Sarcinelli zurück.</p>
<h3>Governance</h3>
<p>Governance meint nicht nur die Tätigkeit des Regierens, sondern auch <b>die Art und Weise</b>, wie gesteuert und koordiniert wird. Ziel ist das <b>Management von Interdependenzen</b> zwischen staatlichen und nichtstaatlichen Akteuren (Benz). Es ist ein <b>strukturorientiertes</b> Konzept: Wie koordinieren sich öffentliche und private Akteure bei der Herstellung öffentlicher Güter?</p>
<div class="merk"><b>Vier Formen von Governance</b>Hierarchie · Netzwerk · Verhandlung · Wettbewerb</div>
<h3>Politik: drei Dimensionen</h3>
<p>Auch Korte/Fröhlich nutzen die Dreiteilung, mit einer Tabelle nach Lauth/Wagner (2006):</p>
<table class="kvq"><tr><th></th><th>Polity</th><th>Politics</th><th>Policy</th></tr>
<tr><td>Interesse</td><td>Rahmenbedingungen</td><td>Ausgestaltung der Prozesse</td><td>Inhalte</td></tr>
<tr><td>Ausrichtung</td><td>institutionenorientiert</td><td>inputorientiert</td><td>outputorientiert</td></tr>
<tr><td>Erscheinung</td><td>Verfassungen, Gesetze, Normen, formale und informale Spielregeln</td><td>Einstellungen, Interessen, Konflikte, Entscheidungsfindung</td><td>Ziele, Aufgaben, Tun und Lassen von Regierungen, Steuerung</td></tr>
<tr><td>Gegenstände</td><td>Verfassungsrecht, Regimetypen, Regierungssysteme, Institutionen</td><td>Parteien, Verbände, Wahlen, politische Kultur</td><td>Politikfelder, Staatstätigkeit</td></tr></table>
<p>Neu gegenüber der Vorlesung: Politics ist <b>inputorientiert</b>, Policy <b>outputorientiert</b>. Das verbindet die Dreiteilung mit Eastons Systemmodell.</p>`,
check:[
 {q:"Eine Kanzlerin gibt nach einer Flutkatastrophe in Gummistiefeln Interviews vor Ort. Das ist vor allem …", o:["Entscheidungspolitik","Darstellungspolitik","Governance"], a:1, ex:"Symbolische, medienvermittelte Inszenierung. Ein Hilfsgesetz im Bundestag wäre dagegen Entscheidungspolitik.",
  w:{0:"Entscheidungspolitik wäre das Verfahren, etwa die Verabschiedung eines Wiederaufbaugesetzes.",2:"Governance beschreibt die Art der Koordination zwischen Akteuren, nicht einen Medienauftritt."}},
 {q:"Welche Formen von Governance unterscheiden Korte/Fröhlich?", o:["Hierarchie, Netzwerk, Verhandlung, Wettbewerb","Legislative, Exekutive, Judikative","Polity, Politics, Policy","Regulierung, Anreiz, Leistung"], a:0, ex:"Vier Arten, wie staatliche und private Akteure koordiniert werden können.",
  w:{1:"Das sind die Staatsgewalten.",2:"Das ist die Dreiteilung des Politikbegriffs.",3:"Das sind Programmtypen in der Politikfeldanalyse (Mayntz, Schneider/Janning)."}},
 {q:"In der Tabelle nach Lauth/Wagner ist Politics …", o:["institutionenorientiert","inputorientiert","outputorientiert"], a:1, ex:"Politics fragt nach Einstellungen, Interessen, Konflikten: nach dem, was ins System hineingetragen wird.",
  w:{0:"Institutionenorientiert ist Polity.",2:"Outputorientiert ist Policy: Was kommt am Ende heraus?"}}
]},
{id:"se1-4", t:"Grundbegriffe II: Macht, System, Regieren", html:`
<h3>Politische Macht</h3>
<ul><li>Macht ist <b>kein Attribut einzelner Akteure</b>. Wer Macht ausüben will, ist auf andere angewiesen.</li>
<li>Sie ist <b>nicht statisch</b> und folgt nicht einfach aus Positionen wie Parteivorsitz oder Kanzleramt. Positionen schaffen nur eine formale Über- und Unterordnung.</li>
<li>Wer ein Amt hat, muss sich als <b>„Machtjongleur“</b> täglich Macht durch Führung und Einflusssicherung erarbeiten.</li>
<li>Einfluss wird vor allem <b>durch Kommunikation</b> gesichert: Kontaktstellen haben, Netzwerke pflegen.</li>
<li>Macht ist durch Wahlen <b>zeitlich begrenzt</b>. Darum gilt: <b>Kommunikative Macht ist zugleich politische Macht.</b></li></ul>
<table class="kvq"><tr><th colspan="2">Bezugsgrößen von Macht (Pfetsch 2006)</th></tr>
<tr><td><b>Besitzgröße</b></td><td>Grundlage sind Potenziale</td></tr>
<tr><td><b>Beziehungsgröße</b></td><td>Grundlage sind sozialpsychologische Beziehungen</td></tr>
<tr><td><b>Relationale Größe</b></td><td>Grundlage ist ein Vergleich relativer Positionen</td></tr></table>
<h3>Politisches System: eng oder weit</h3>
<p>In Lehrveranstaltungen werden „Regierungssystem“, „politisches System“ und „Innenpolitik“ oft gleich verwendet. Nach Murswieck (1989) lässt sich unterscheiden:</p>
<div class="merk"><b>Eng oder weit?</b><div class="mrows">
<div><span class="ml">Eng (government)</span><span>Verfassungsorgane: Parlament, Regierung, nachgeordnet Rechtsprechung. Formal, ohne ökonomische, soziale und kommunikative Bedingungen.</span></div>
<div><span class="ml">Weit</span><span>auch ökonomische, soziale und gesellschaftliche Konstellationen, dazu Verbände, Parteien und andere Organisationen, die auf Politik einwirken.</span></div></div></div>
<h3>Regieren und Regierung</h3>
<table class="kvq">
<tr><td><b>Regieren</b></td><td>Herbeiführung und Durchsetzung gesellschaftlich verbindlicher Entscheidungen. Mischung aus Koordination und Steuerung, Leitung und Entscheidung, Durchsetzung.</td></tr>
<tr><td><b>Regierung</b></td><td>im parlamentarischen System gleich Exekutive: Regierungschef und Kabinett</td></tr>
<tr><td><b>Regierungshandeln</b></td><td>das Tun und Lassen der Regierung</td></tr>
<tr><td><b>Regierungssteuerung</b></td><td>strategisches Regierungshandeln, um materielle Politikziele zu erreichen</td></tr>
<tr><td><b>Strategie</b></td><td>Strategiefähigkeit beruht auf Orientierungswissen für offene Problemsituationen</td></tr></table>
<p class="small muted">Vergleich Vorlesung: Dort hieß das enge Verständnis ZPES (Patzelt). Gleiche Idee, anderer Name.</p>`,
check:[
 {q:"Warum sprechen Korte/Fröhlich vom „Machtjongleur“?", o:["Weil Macht automatisch mit dem Amt kommt","Weil Amtsinhaber sich Macht täglich durch Führung und Einflusssicherung erarbeiten müssen","Weil Politiker mehrere Ämter gleichzeitig haben"], a:1, ex:"Macht ist nicht statisch und folgt nicht einfach aus Positionen. Sie muss immer wieder hergestellt werden, vor allem durch Kommunikation.",
  w:{0:"Genau das bestreiten sie: Positionen schaffen nur eine formale Ordnung, keine sichere Macht.",2:"Ämterhäufung ist nicht gemeint. Das Bild beschreibt die ständige Arbeit am Einfluss."}},
 {q:"Welche Bezugsgröße von Macht beruht auf dem Vergleich relativer Positionen?", o:["Besitzgröße","Beziehungsgröße","Relationale Größe"], a:2, ex:"Relational: Macht ergibt sich daraus, wie man im Vergleich zu anderen dasteht.",
  w:{0:"Die Besitzgröße beruht auf Potenzialen, etwa Ressourcen oder Ämtern.",1:"Die Beziehungsgröße beruht auf sozialpsychologischen Beziehungen, etwa Vertrauen oder Loyalität."}},
 {q:"Was gehört zum weiten, aber nicht zum engen Verständnis des politischen Systems?", o:["Die Bundesregierung","Der Bundestag","Verbände und gesellschaftliche Konstellationen"], a:2, ex:"Das enge Verständnis umfasst nur die Verfassungsorgane. Das weite nimmt Verbände, Parteien und gesellschaftliche Bedingungen hinzu.",
  w:{0:"Die Regierung ist ein Verfassungsorgan und gehört schon zum engen Verständnis.",1:"Das Parlament ist der Kern des engen Verständnisses."}}
]},
{id:"se1-5", t:"Vier Zugänge: Struktur und Prozess", html:`
<p>Nach Schuppert (2003) haben sich vier systematische Zugänge zur Analyse des politischen Systems herausgebildet:</p>
${FIG_ZUGAENGE}
<h3>1. Struktur: ordnungspolitische und institutionelle Ansätze (polity)</h3>
<ul><li>In den <b>1960er Jahren</b> wollten <b>Hennis</b>, Guilleaume und Ellwein der Regierungslehre (bis dahin Verfassungs- und Demokratielehre) neuen Schwung geben: mehr Blick auf das <b>Regierungshandeln</b>.</li>
<li>Hennis fragte: <b>Welche Aufgaben muss der Leistungsstaat zwingend erfüllen?</b> Er kritisierte die einseitige Ausrichtung des Fachs auf Willensbildung und Partizipation.</li>
<li><b>Schwächen:</b> keine vollständige Operationalisierung, unsichere Quellen, Ablehnung empirischer Methoden. Das Handeln der Akteure blieb weitgehend ausgeblendet, ebenso die ökonomischen und sozialen Voraussetzungen.</li></ul>
<h3>2. Prozess: Politikmanagement und Governance (politics)</h3>
<p><b>Ende der 1960er</b> stieg der Planungsbedarf. Aus der Praxis kam der Anstoß für Regierungs- und Verwaltungsstudien (Mayntz/Scharpf 1973). Angelsächsische Theorien und empirische Methoden setzten sich durch.</p>
<ul><li><b>Systemtheorie</b> (Anfang 1970er): Das Zusammenwirken der Strukturen heißt nun politisches System. Leitfragen: Auf welche Einflüsse reagiert das Entscheidungszentrum? Welche Interessen greift es auf? Welche Rückwirkungen haben Entscheidungen? <i>Kritik:</i> bleibt bei der Auflistung von Faktoren, fragt nicht nach dem Sinn.</li>
<li><b>Seit den 1980ern:</b> technische Dimension des Regierens (Organisation, Instrumente, Personal), <b>formelle und informelle</b> Komponenten, politisches System als Kommunikationsraum.</li>
<li>Neue Schubkraft durch <b>Governance</b>, Verhandlungsdemokratie, Neo-Institutionalismus und Politikmanagement. Gemeinsames Thema: Steuerung unter <b>Souveränitätsverlusten</b> und wachsender <b>Informalität</b>.</li></ul>
<div class="merk"><b>Zwei Souveränitätsverluste</b><div class="mrows">
<div><span class="ml">Innere</span><span>immer mehr Mitspieler. Lehmbruch: Deutschland hat einen <b>Mischcharakter</b> aus konkurrenzdemokratischen (Parteienwettbewerb) und konkordanzdemokratischen (Aushandeln im Bundesstaat) Mechanismen. Steuerung braucht weichere Techniken: verhandeln, moderieren, koordinieren.</span></div>
<div><span class="ml">Äußere</span><span>durch europäische Integration und Globalisierung. Steuerung ist auf Kooperation in Netzwerken und Verhandlungssystemen angewiesen.</span></div></div></div>
<p>Aktuell im Zentrum der Regierungsforschung: <b>politische Führung</b> (Stile, Techniken, Instrumente), <b>politische Strategie</b> (Raschke/Tils) und die <b>Europäisierung</b> des Regierens (Sturm/Pehle).</p>`,
check:[
 {q:"Welche Frage stellte Wilhelm Hennis in den 1960er Jahren?", o:["Wie reagiert das politische System auf Inputs?","Welche Aufgaben hat der Leistungsstaat zwingend zu erfüllen?","Wie beeinflussen Medien die Agenda?"], a:1, ex:"Hennis wollte die Regierungslehre auf das Regierungshandeln und die Aufgaben des Staates lenken, ohne selbst von Policy zu sprechen.",
  w:{0:"Das ist eine Leitfrage der Systemtheorie, die ab den 1970ern den strukturellen Zugang ablöste.",2:"Das gehört zum Zugang über politische Kommunikation, der erst seit den 1990ern das Feld erweitert."}},
 {q:"Was meint Lehmbruch mit dem „Mischcharakter“ des deutschen Systems?", o:["Mischung aus parlamentarischem und präsidentiellem System","Mischung aus Konkurrenz (Parteienwettbewerb) und Konkordanz (Aushandeln im Bundesstaat)","Mischung aus Bundes- und EU-Recht"], a:1, ex:"Im Bundestag konkurrieren Regierung und Opposition, im Bundesrat und zwischen Bund und Ländern muss verhandelt werden.",
  w:{0:"Deutschland ist klar parlamentarisch. Das wäre eher Semi-Präsidentialismus, etwa Frankreich.",2:"EU-Recht gehört zum äußeren Souveränitätsverlust. Lehmbruchs Mischcharakter betrifft die innere Entscheidungslogik."}},
 {q:"Was verursacht nach Korte/Fröhlich den äußeren Souveränitätsverlust?", o:["Mehr Parteien im Bundestag","Europäische Integration und Globalisierung","Der Föderalismus"], a:1, ex:"Entscheidungen wandern nach außen. Steuerung braucht dann Kooperation in Netzwerken und Verhandlungssystemen.",
  w:{0:"Mehr Mitspieler im Inneren sind der innere Souveränitätsverlust.",2:"Föderalismus ist Teil der inneren Konstellation: Aushandeln im Bundesstaat."}}
]},
{id:"se1-6", t:"Vier Zugänge: Inhalte und Kommunikation", html:`
<h3>3. Inhalte: Politikfelder (policy)</h3>
<ul><li>Die <b>Politikfeldanalyse</b> wurde erst <b>seit Mitte der 1970er</b> ein eigenständiges Forschungsfeld. Sie überwindet die rein institutionelle oder prozessuale Sicht zugunsten der Inhalte, etwa in Sozial-, Umwelt- oder Arbeitsmarktpolitik.</li>
<li>Implementations- und Evaluationsforschung wollten auch <b>gesellschaftskritisch</b> wirken.</li>
<li><b>Leitfragen:</b> Was tun und lassen Regierungen? Wie organisieren sie ihre Tätigkeit? Welche Folgen hat das für Form, Prozess und Inhalt der Politik?</li>
<li><b>Befund:</b> Politik hat trotz objektiver Grenzen <b>erhebliche Autonomie</b> gegenüber Wirtschaft und Gesellschaft. Wie groß der <b>Handlungskorridor</b> ist, bleibt strittig und muss je Themenfeld neu vermessen werden.</li></ul>
<h3>4. Kommunikation: mediale Komponenten und Aufmerksamkeitsmanagement</h3>
<p>Seit den 1990ern (Sarcinelli) gilt Kommunikation nicht als Nebenschauplatz, sondern als <b>konstitutive Bedingung</b> für den Erfolg von Politik: <b>Legitimation erfolgt über Kommunikation.</b></p>
<div class="merk"><b>Kommunikative Macht ist nicht Medienmacht</b>Medienmacht ist oft eine <b>„als-ob-Macht“</b>: Entscheidend ist nicht, ob Medien wirklich entscheiden, sondern dass alle so handeln, als ob sie es täten. Politiker brauchen die Medien, um dosiert Aufmerksamkeit zu erzeugen: Aufmerksamkeit gegen Information. <b>Präsenz wird zur Machtwährung.</b></div>
<table class="kvq"><tr><th colspan="2">Wie Medien auf Politik wirken (nach Schmidt/Zohlnhöfer)</th></tr>
<tr><td><b>Direkt</b></td><td>Agenda-Setting, Stimmungen verstärken oder vergröbern, sichtbare Felder wie Verbraucherschutz als politisches Marketing</td></tr>
<tr><td><b>Indirekt</b></td><td>Politiker passen sich der <b>Selektionslogik</b> (Nachrichtenwerte, Aufmerksamkeit um jeden Preis) und der <b>Präsentationslogik</b> (Politainment) der Medien an</td></tr></table>
<p>Die Folge der indirekten Wirkung: Politik wird zur Unterhaltung, das Ergebnis ist <b>„politics without policy“</b>, nur noch Macht-, keine Sachfragen. <b>Darstellungspolitik ersetzt zunehmend Entscheidungspolitik.</b> Verstärkt wird das, weil die <b>Traditionsbindungen der Wähler</b> an Parteien schwächer werden. Situative Information über Medien gewinnt an Gewicht.</p>
<p class="small muted">Gut für deine Presseschau: Achte darauf, ob ein Artikel über eine Entscheidung (Entscheidungspolitik) oder über eine Inszenierung (Darstellungspolitik) berichtet.</p>`,
check:[
 {q:"Was meinen Korte/Fröhlich mit „als-ob-Macht“ der Medien?", o:["Medien haben gar keinen Einfluss","Alle Akteure verhalten sich so, als ob Medien Macht hätten, und genau das verleiht ihnen Einfluss","Medien geben vor, neutral zu sein"], a:1, ex:"Entscheidend ist die Annahme: Wird Medienmacht unterstellt, richten sich alle danach.",
  w:{0:"Doch: Sie beschreiben direkte und indirekte Einflüsse. Nur ist die Macht oft eine unterstellte.",2:"Um Neutralität geht es nicht, sondern um die Wirkung einer unterstellten Macht."}},
 {q:"„Politics without policy“ bezeichnet …", o:["Politik ohne Parteien","Machtfragen ohne Sachfragen, weil Politik sich der Medienlogik anpasst","Verwaltung ohne Gesetze"], a:1, ex:"Folge der indirekten Medienwirkung: Der Wettstreit wird entpolitisiert, es geht nur noch um Taktik.",
  w:{0:"Parteien bleiben, aber sie streiten nur noch taktisch um Macht.",2:"Verwaltung kommt in dieser Passage nicht vor. Es geht um das Verhältnis von Politik und Medien."}},
 {q:"Ein Minister lässt sich bei einer Werksbesichtigung filmen, statt einen schwierigen Gesetzentwurf voranzutreiben. Welcher Trend zeigt sich?", o:["Entscheidungspolitik verdrängt Darstellungspolitik","Darstellungspolitik verdrängt Entscheidungspolitik","Governance ersetzt Hierarchie"], a:1, ex:"Genau diesen Trend beschreiben Korte/Fröhlich für die Mediendemokratie.",
  w:{0:"Umgekehrt: Die Inszenierung gewinnt an Gewicht gegenüber dem Verfahren.",2:"Das ist ein anderer Wandel, der die Art der Koordination betrifft, nicht die Medien."}}
]},
{id:"se1-7", t:"Regierungssysteme typisieren", html:`${EMPF("Croissant (2010), Abschnitt 2")}
<p>Ein Regierungssystem im <b>engen Sinn</b> umfasst die obersten Staatsorgane: Staatsoberhaupt, Regierung, Parlament. Im <b>weiten Sinn</b> auch Gerichte, Verwaltung, Wahlsystem, Parteien, Verbände, Medien (Steffani).</p>
<h3>Steffani: parlamentarisch oder präsidentiell</h3>
<table class="kvq"><tr><th></th><th>parlamentarisch</th><th>präsidentiell</th></tr>
<tr><td><b>Primär</b></td><td><b>politische Abberufbarkeit</b> der Regierung</td><td>nur verfassungsrechtliche Abberufbarkeit</td></tr>
<tr><td>Amt und Mandat</td><td>vereinbar</td><td>inkompatibel</td></tr>
<tr><td>Rücktritt</td><td>der gesamten Regierung</td><td>keine Pflicht</td></tr>
<tr><td>Auflösungsrecht</td><td>Regierung kann Parlament auflösen</td><td>keins</td></tr>
<tr><td>Fraktionsdisziplin</td><td>stark</td><td>gering</td></tr></table>
<ul><li>Mischtypen gibt es bei Steffani nicht.</li>
<li>Gewaltenteilung: Im Präsidentialismus stehen Parlament und Regierung <b>unverbunden nebeneinander</b>. Im Parlamentarismus wird sie überlagert von <b>Regierungsmehrheit gegen Opposition</b>.</li>
<li>Parlamente haben im Parlamentarismus vor allem <b>Wahlfunktion</b>, im Präsidentialismus vor allem Gesetzgebungs- und Kontrollfunktion.</li>
<li><b>Kritik:</b> Wie der Regierungschef ins Amt kommt, bleibt offen (Decker). Die Schweiz müsste als präsidentiell gelten.</li></ul>
<h3>Semi-Präsidentialismus (Duverger 1980)</h3>
<p>Drei Merkmale: (1) direkt gewählter Präsident, (2) mit beträchtlichen Befugnissen, (3) daneben Premier und Regierung, die vom <b>Vertrauen des Parlaments</b> abhängen. Die Regierung ist also <b>doppelt abhängig</b>: von Parlament und Präsident.</p>
<h3>Shugart/Carey (1992): fünf Typen</h3>
<table class="kvq">
<tr><td><b>Präsidentiell</b></td><td>geschlossene Exekutive, feste Amtszeit (USA)</td></tr>
<tr><td><b>Präsident-parlamentarisch</b></td><td>Präsident ernennt Premier, der von Präsident und Parlament abhängt (Russland)</td></tr>
<tr><td><b>Premier-präsidentiell</b></td><td>Regierung nur dem Parlament verantwortlich (Frankreich)</td></tr>
<tr><td><b>Parlamentarisch</b></td><td>Staatsoberhaupt ohne Macht über die Regierung (Großbritannien)</td></tr>
<tr><td><b>Versammlungsunabhängig</b></td><td>vom Parlament bestellt, aber nicht abberufbar (Schweiz)</td></tr></table>
<h3>Sind präsidentielle Systeme gefährlicher?</h3>
<p><b>Linz</b> sah die „perils of presidentialism“: Rigidität bei <i>divided government</i>, zwei konkurrierende Legitimationen, Winner-takes-all-Logik. Neuere Forschung relativiert das: Es kommt auf Parteiensystem, Wahlsystem, Befugnisse des Präsidenten und Lernprozesse der Eliten an (etwa Cheibub 2007).</p>`,
check:[
 {q:"Was ist bei Steffani das primäre, allein entscheidende Merkmal?", o:["Ob der Präsident direkt gewählt wird","Ob das Parlament die Regierung aus politischen Gründen abberufen kann","Ob es eine doppelköpfige Exekutive gibt","Ob Minister zugleich Abgeordnete sein dürfen"], a:1, ex:"Alles andere sind nur supplementäre Merkmale, die einen Typ prägen, aber nicht definieren.",
  w:{0:"Die Direktwahl ist Duvergers Kriterium für den Semi-Präsidentialismus, nicht Steffanis.",2:"Die doppelköpfige Exekutive ist typisch für Parlamentarismus, aber laut Croissant ausdrücklich nicht definierend.",3:"Die Vereinbarkeit von Amt und Mandat ist ein supplementäres Merkmal."}},
 {q:"Frankreich gehört bei Shugart/Carey zum Typ …", o:["präsidentiell","präsident-parlamentarisch","premier-präsidentiell"], a:2, ex:"Der Präsident ist direkt gewählt und einflussreich, die Regierung ist aber nur dem Parlament verantwortlich.",
  w:{0:"Präsidentiell wären die USA mit geschlossener Exekutive.",1:"Präsident-parlamentarisch ist Russland: Dort hängt der Premier auch vom Präsidenten ab."}},
 {q:"Welche Funktion des Parlaments ist im parlamentarischen System besonders ausgeprägt?", o:["Wahlfunktion (Regierungsbestellung)","Kontrollfunktion gegenüber einer unabhängigen Exekutive","Rechtsprechung"], a:0, ex:"Weil das Parlament die Regierung abberufen kann, bestellt es sie politisch: Der Bundestag wählt den Kanzler.",
  w:{1:"Kontrolle spielt im Präsidentialismus eine größere Rolle, weil dort die Regierung nicht vom Parlament abhängt.",2:"Rechtsprechung ist keine Parlamentsfunktion."}}
]},
{id:"se1-8", t:"Demokratietypen und Vetospieler", html:`${EMPF("Croissant (2010), Abschnitte 3 und 4")}
<h3>Lijphart: Mehrheits- und Konsensdemokratie</h3>
<p><b>Mehrheitsdemokratie</b> (Westminster) konzentriert Macht und lässt Mehrheiten freie Bahn. <b>Konsensdemokratie</b> zielt auf Inklusion und Machtteilung, mit hohen Entscheidungshürden. Lijphart misst das an zehn Merkmalen in zwei Dimensionen:</p>
<table class="kvq"><tr><th colspan="2">Exekutive-Parteien-Dimension</th></tr>
<tr><td>Parteiensystem</td><td>Vielparteien- oder Zweiparteiensystem</td></tr>
<tr><td>Kabinette</td><td>Koalitionen oder Alleinregierung</td></tr>
<tr><td>Exekutive</td><td>Gleichgewicht oder Regierungsdominanz</td></tr>
<tr><td>Wahlsystem</td><td>Verhältniswahl oder Mehrheitswahl</td></tr>
<tr><td>Verbände</td><td>korporatistisch oder pluralistisch</td></tr>
<tr><th colspan="2">Föderalismus-Unitarismus-Dimension</th></tr>
<tr><td>Staatsaufbau</td><td>föderal oder zentralistisch</td></tr>
<tr><td>Zweite Kammer</td><td>starker Bikameralismus oder Einkammersystem</td></tr>
<tr><td>Verfassung</td><td>nur mit Supermehrheit oder einfach änderbar</td></tr>
<tr><td>Verfassungsgericht</td><td>starke oder keine judicial review</td></tr>
<tr><td>Zentralbank</td><td>autonom oder abhängig</td></tr></table>
<ul><li><b>Deutschland</b> ist in beiden Dimensionen konsensual: eine <b>föderale Konsensdemokratie</b>, in Lijpharts Tabelle neben Schweiz, Belgien, Niederlanden.</li>
<li>Nächst an den Idealtypen: Großbritannien und Neuseeland (Mehrheit), Schweiz (Konsens).</li>
<li>Der Demokratietyp liegt <b>quer zum Regierungssystem</b>: Großbritannien und Deutschland sind beide parlamentarisch, aber gegensätzliche Demokratietypen.</li>
<li>Lijphart hält Konsensdemokratien für „kinder and gentler“ und empfiehlt sie gespaltenen Gesellschaften und jungen Demokratien.</li>
<li><b>Kritik:</b> Konsistenzannahme nicht begründet, institutionelle und Verhaltensvariablen vermischt, Indikatoren teils nicht valide, Befunde stark von der Fallauswahl abhängig, Loblied auf die Konsensdemokratie fraglich, weil diese Gruppe fast nur reiche Länder enthält.</li></ul>
<h3>Tsebelis: Vetospieler</h3>
<p><b>Vetospieler</b> sind Akteure, deren Zustimmung für einen Politikwechsel nötig ist.</p>
<table class="kvq"><tr><td><b>Institutionelle</b></td><td>Einspruchsrecht steht in der Verfassung, etwa zweite Kammer oder Präsident</td></tr>
<tr><td><b>Parteipolitische</b></td><td>entstehen im politischen Prozess, etwa Koalitionsparteien</td></tr></table>
<p>Politikwechsel wird wahrscheinlicher, je <b>weniger</b> Vetospieler es gibt und je <b>näher</b> sie sich programmatisch sind. <b>Absorptionsregel:</b> Spieler mit gleicher Position zählen einfach, Spieler zwischen zwei anderen werden nicht gezählt. Entscheidend ist der Abstand der beiden am weitesten entfernten Spieler.</p>
<p>Damit lässt sich erklären, warum Reformen in Großbritannien oder Neuseeland größer ausfallen als in <b>Deutschland und der Schweiz</b>. Kritik: Verbände, Gewerkschaften oder Notenbanken mit faktischer Blockademacht fallen durch das Raster, und Parteien wollen nicht nur Policies, sondern auch Ämter und Stimmen.</p>`,
check:[
 {q:"Wie ordnet Lijphart Deutschland ein?", o:["Unitarische Mehrheitsdemokratie","Föderale Mehrheitsdemokratie","Föderale Konsensdemokratie","Unitarische Konsensdemokratie"], a:2, ex:"Koalitionen, Verhältniswahl, Föderalismus, starker Bundesrat, starkes Verfassungsgericht: konsensual in beiden Dimensionen.",
  w:{0:"Das wäre Großbritannien vor allem: Alleinregierung, Mehrheitswahl, zentralistisch.",1:"Das sind etwa die USA oder Kanada: föderal, aber in der Exekutive-Parteien-Dimension majoritär.",3:"Das sind Länder wie Schweden oder Dänemark: konsensual bei Parteien und Kabinetten, aber unitarisch."}},
 {q:"Nach Tsebelis wird ein Politikwechsel wahrscheinlicher, wenn …", o:["es viele Vetospieler mit großem Abstand gibt","es wenige Vetospieler gibt, die sich programmatisch nahe sind","das Parlament zwei Kammern hat"], a:1, ex:"Je weniger Zustimmungen nötig sind und je ähnlicher die Positionen, desto leichter lässt sich der Status quo ändern.",
  w:{0:"Das ist genau der Fall, in dem der Status quo am stabilsten ist.",2:"Eine starke zweite Kammer ist meist ein zusätzlicher institutioneller Vetospieler und erschwert Wechsel eher."}},
 {q:"Eine Koalition aus zwei Parteien ist bei Tsebelis ein Beispiel für …", o:["institutionelle Vetospieler","parteipolitische Vetospieler","Vetopunkte im Föderalismus"], a:1, ex:"Ihr Einspruchsrecht steht nicht in der Verfassung, es entsteht in der Verfassungswirklichkeit.",
  w:{0:"Institutionelle Vetospieler sind in der Verfassung verankert, etwa der Bundesrat.",2:"Der Föderalismus erzeugt institutionelle Vetopunkte, Koalitionen sind etwas anderes."}}
]},
{id:"se1-9", t:"Regimetypen: Demokratie, Autoritarismus, Totalitarismus", html:`${EMPF("Lauth (2010)")}
<p class="small muted">Vieles kennst du aus der Vorlesung (Sitzung 1, Lauth 2015). Hier nur, was für das Seminar dazukommt.</p>
<h3>Herrschaft, Regime, Regierungssystem</h3>
<ul><li><b>Herrschaft</b> nach Max Weber: die Chance, für einen Befehl bestimmten Inhalts bei angebbaren Personen Gehorsam zu finden.</li>
<li><b>Herrschaftsform</b> und <b>Regime</b> werden synonym verwendet: Zugang zur Herrschaft, Machtbeziehungen der Eliten, Verhältnis zu den Beherrschten (Merkel).</li>
<li>Davon zu trennen ist das <b>Regierungssystem</b>: institutionelle Muster innerhalb eines Regimetyps. Parlamentarisch und präsidentiell sind beides Demokratien.</li>
<li>Voraussetzung jedes Regimes ist ein <b>Staat mit Gewaltmonopol</b>. Ist die Staatlichkeit schwach, spricht Lauth von defizitären Regimen.</li></ul>
<h3>Realtypus oder Idealtypus</h3>
<p>Ein <b>Realtypus</b> nimmt einen historischen Fall als Muster (etwa NS-Deutschland für Totalitarismus). Problem: Welches Jahr gilt? Und Widersprüche im Fall werden Teil des Typs. Lauth bevorzugt den <b>Idealtypus</b> (Max Weber): eine Leitidee wird zugespitzt entfaltet, der reale Fall muss nicht deckungsgleich sein.</p>
<h3>Demokratie kategorial bestimmen</h3>
<table class="kvq"><tr><td><b>Fraenkel</b></td><td>vier Ebenen: Legitimation, Gesellschaftsstruktur, Regierungssystem, Rechtssystem. Lauths Einwand: Eine pluralistische Gesellschaft ist Voraussetzung, nicht Merkmal der Demokratie.</td></tr>
<tr><td><b>Merkel</b></td><td>sechs Ebenen, hervorgehoben Herrschaftszugang und Herrschaftsweise</td></tr>
<tr><td><b>Lauth</b></td><td>fünf Institutionen: Entscheidungsverfahren (Wahlen), öffentliche Kommunikation, intermediäre Vermittlung, Regelsetzung und -anwendung, Rechtsgarantie</td></tr></table>
<h3>Totalitär und autoritär</h3>
<ul><li>Gemeinsam ist allen Totalitarismustheorien die <b>Ideologie</b> mit Wahrheitsanspruch, Freund-Feind-Denken und dem Anspruch, die <b>gesamte Gesellschaft</b> umzuformen. <b>Arendt</b> betont den Terror, <b>Friedrich/Brzezinski</b> den technischen Charakter (sechs Merkmale, etwa Massenpartei, Geheimpolizei, Nachrichtenmonopol).</li>
<li>Autoritäre Regime nach <b>Linz</b>: begrenzter Pluralismus, Mentalitäten statt Ideologie, kaum Mobilisierung. Lauth zweifelt, ob Mobilisierung trennscharf ist.</li>
<li><b>Merkel</b> unterscheidet neun autoritäre Subtypen nach der Legitimation, etwa Militärregime, theokratische, sultanistische Regime.</li></ul>
<h3>Regime messen</h3>
<table class="kvq"><tr><td><b>Vanhanen</b></td><td>quantitativ: Wahlbeteiligung mal Wettbewerb (100 minus Stimmenanteil der stärksten Partei). Benachteiligt Zweiparteiensysteme und junge Bevölkerungen.</td></tr>
<tr><td><b>Polity</b></td><td>Wettbewerb und Regulierung der Partizipation, Offenheit der Rekrutierung, Begrenzung der Exekutive</td></tr>
<tr><td><b>Freedom House</b></td><td>politische Rechte und bürgerliche Freiheiten: free, partly free, not free. Wenig transparent.</td></tr>
<tr><td><b>Sartori</b></td><td>17 Kriterien, misst die Intensität totalitärer Herrschaft</td></tr></table>`,
check:[
 {q:"Wie unterscheidet Lauth Regime und Regierungssystem?", o:["Beide Begriffe sind gleichbedeutend","Das Regierungssystem ist ein institutionelles Muster innerhalb eines Regimetyps","Das Regime ist ein Teil des Regierungssystems"], a:1, ex:"Parlamentarisch und präsidentiell sind zwei Varianten desselben Regimetyps Demokratie.",
  w:{0:"Synonym sind bei Lauth Regime und Herrschaftsform, nicht Regime und Regierungssystem.",2:"Umgekehrt: Das Regime ist der Oberbegriff, das Regierungssystem eine Konkretisierung."}},
 {q:"Warum bevorzugt Lauth den Idealtypus?", o:["Weil er immer genau einem realen Land entspricht","Weil er eine Leitidee zuspitzt und nicht an die Widersprüche eines Einzelfalls gebunden ist","Weil er ohne Theorie auskommt"], a:1, ex:"Beim Realtypus müsste man festlegen, welches Jahr gilt, und Nischen oder Widersprüche würden Teil des Typs.",
  w:{0:"Genau das leistet er nicht und muss er nicht: Der reale Fall ist in der Regel nicht deckungsgleich.",2:"Im Gegenteil: Der Idealtypus wird aus einer Leitidee durch logische Deduktion entfaltet."}},
 {q:"Warum ist Vanhanens Demokratieindex umstritten?", o:["Er nutzt zu viele Indikatoren","Er benachteiligt Zweiparteiensysteme und Länder mit vielen jungen, nicht wahlberechtigten Menschen","Er misst nur totalitäre Regime"], a:1, ex:"Ein Wahlsieger mit hohem Stimmenanteil senkt den Wettbewerbswert, und die Partizipation wird an der Gesamtbevölkerung gemessen.",
  w:{0:"Das Gegenteil: Er braucht nur zwei Indikatoren. Das ist elegant, aber schmal.",2:"Das wäre Sartoris Prüfliste."}}
]},
{id:"se1-10", t:"Politische Kultur", html:`${EMPF("Pickel/Pickel (2016)")}
<p><b>Politische Kultur</b> ist die subjektive Seite der Politik: die auf politische Objekte gerichteten <b>Einstellungen und Wertorientierungen</b> der Bürger, als Kollektiv betrachtet. Der Begriff ist <b>analytisch, nicht wertend</b>. Jedes Land hat eine politische Kultur, die Frage ist nur, welche.</p>
<p class="small muted">Max Kaase spottete 1983, den Begriff zu fassen sei, als wolle man einen Pudding an die Wand nageln. Das gilt heute als überwunden.</p>
<div class="merk"><b>Kernannahme</b>Ein System ist stabil, wenn politische <b>Kultur und Struktur zueinander passen</b> (Kongruenz). Demokratische Institutionen brauchen eine demokratische Kultur. Faustregel nach Diamond: mindestens 75 Prozent Demokraten, keine größere Gruppe von etwa 15 Prozent dagegen.</div>
<h3>Almond und Verba: The Civic Culture (1963)</h3>
<p>Umfrage in fünf Ländern, darunter die Bundesrepublik. Drei Grundtypen:</p>
<table class="kvq"><tr><td><b>Parochial</b></td><td>kein Interesse, kein Wissen, keine Erwartungen (Stammes- und Feudalkulturen)</td></tr>
<tr><td><b>Subject</b> (Untertan)</td><td>bewertet System und Outputs, sieht sich selbst nicht als Akteur (Kaiserreich)</td></tr>
<tr><td><b>Participant</b></td><td>Wissen, Beteiligung, Bürger bringt sich ein</td></tr></table>
<p>Vorbild ist die <b>Civic Culture</b>, ein Mischtyp: stark partizipativ, aber mit Elementen der Untertanenkultur, die das System regierbar halten. Kritik: Ähnelt stark der amerikanischen Demokratie.</p>
<p>Passung schafft <b>allegiance</b> (Verbundenheit). Instabil machen <b>apathy</b> (Gleichgültigkeit) und <b>alienation</b> (Entfremdung).</p>
<h3>Lipset: Legitimität und Effektivität</h3>
<table class="kvq"><tr><th></th><th>effektiv</th><th>nicht effektiv</th></tr>
<tr><td><b>legitim</b></td><td>A: stabil</td><td>B: Effektivitätskrise, zehrt vom Legitimitätsvorschuss</td></tr>
<tr><td><b>nicht legitim</b></td><td>C: lebt von Leistung, instabil</td><td>D: instabil, vor dem Zusammenbruch</td></tr></table>
<p>Typischer Weg <b>C → A</b>: Die Bundesrepublik gewann Legitimität durch ihre wirtschaftlichen Erfolge nach dem Krieg. Ein langer Weg A → B → D führt in den Zusammenbruch.</p>
<h3>Easton: politische Unterstützung</h3>
<ul><li>Drei Objekte: <b>politische Gemeinschaft</b>, <b>Regime</b> (die Rollen, etwa das Amt des Bundespräsidenten), <b>Autoritäten</b> (die Personen).</li>
<li><b>Spezifische</b> Unterstützung: Zufriedenheit mit Outputs und Amtsträgern (wie Lipsets Effektivität).</li>
<li><b>Diffuse</b> Unterstützung: Zustimmung um ihrer selbst willen (wie Lipsets Legitimität), unterteilt in Legitimität und Vertrauen.</li></ul>
<p><b>Fuchs</b> ordnet hierarchisch: Werte der Demokratie, dann Struktur, dann Performanz. Befund: kaum Legitimitätskrise im Westen. Hohe Zustimmung zur Demokratie (70 bis 90 Prozent), aber wenig Vertrauen in Politiker und Parteien (10 bis 20 Prozent).</p>`,
check:[
 {q:"Was ist nach Almond/Verba das Vorbild für Demokratien?", o:["Die Participant Culture","Die Civic Culture als Mischtyp","Die Subject Culture"], a:1, ex:"Starke Beteiligung allein reicht nicht. Untertanenelemente sorgen für Folgebereitschaft und damit für Regierbarkeit.",
  w:{0:"Überraschend nicht: Die reine Participant Culture wird nicht zum Vorbild.",2:"Die Untertanenkultur allein fehlt die Beteiligung, sie ist nur ein Element der Civic Culture."}},
 {q:"Die junge Bundesrepublik gewann Legitimität durch wirtschaftlichen Erfolg. Welcher Weg in Lipsets Schema ist das?", o:["A → B","C → A","B → D"], a:1, ex:"Zuerst effektiv, aber noch nicht legitim (C). Dauerhafter Erfolg brachte Legitimität (A).",
  w:{0:"A → B wäre ein stabiles System, das in eine Effektivitätskrise gerät.",2:"B → D ist der Weg in den Zusammenbruch, wenn eine Krise zu lange dauert."}},
 {q:"Jemand ist mit der aktuellen Regierung unzufrieden, hält die Demokratie aber für die beste Staatsform. Was ist schwach, was stark?", o:["Diffuse Unterstützung schwach, spezifische stark","Spezifische Unterstützung schwach, diffuse stark","Beide schwach"], a:1, ex:"Spezifisch bezieht sich auf Leistungen und Personen, diffus auf das System an sich.",
  w:{0:"Genau umgekehrt: Die Kritik gilt den Autoritäten (spezifisch), die Bindung an die Demokratie ist diffus.",2:"Die Zustimmung zur Demokratie ist eine starke diffuse Unterstützung."}}
]},
{id:"se1-11", t:"Der Policy-Zyklus", html:`${EMPF("Schneider/Janning (2006), Abschnitt 2.1")}
<p>Gegenstand der Politikfeldanalyse ist die <b>inhaltliche Dimension</b>: Gesetze, Verordnungen, Programme, Einzelentscheidungen. Ausgangspunkt ist Eastons Input-Output-Schema. Daraus entsteht der <b>Policy-Zyklus</b>.</p>
${FIG_ZYKLUS}
<h3>1. Problemdefinition und Agenda-Setting</h3>
<ul><li>Ein Problem ist eine <b>Diskrepanz zwischen Ist und Soll</b> (Sjöblom). Es hat zwei Komponenten: <b>Norm und Faktizität</b>.</li>
<li>Es muss von Akteuren <b>wahrgenommen</b> werden. Umweltschäden gab es lange, bevor sie ein politisches Problem wurden.</li>
<li>Akteure handeln nur, wenn sie eine Änderung für denkbar halten, Mittel haben und Risiko eingehen. Probleme können auch verdrängt oder bewusst konserviert werden.</li>
<li>Aufmerksamkeit ist <b>knapp</b>: Themen konkurrieren um die Agenda.</li>
<li>Themenkarrieren: innerhalb der Regierung, von außen über Gruppen und Öffentlichkeit, beides verknüpft, oder durch <b>internationale Politikdiffusion</b>.</li>
<li>Ereignisse öffnen ein <b>policy window</b> (Kingdon): ein kurzes Gelegenheitsfenster. Wer es verpasst, muss warten. Was nie auf die Agenda kommt, ist eine <b>Nichtentscheidung</b> (Bachrach/Baratz).</li></ul>
<h3>2. Programmformulierung</h3>
<ul><li>Ein Programm legt Ziele, Adressaten, Träger und Mittel fest, meist als Gesetz oder Verordnung.</li>
<li>Kriterien: <b>effektiv</b> (löst das Problem), <b>effizient</b> (mit möglichst wenig Mitteln).</li>
<li>In der Praxis fehlen klare Ziele und Wissen. Darum entstehen eher <b>inkrementalistische</b> Schritte (Lindblom), „zufriedenstellende“ Lösungen (Simon) oder <b>Imitation</b> fremder Lösungen.</li>
<li>In Deutschland entstehen rund <b>80 Prozent</b> der Gesetzentwürfe in einem <b>Referat eines Bundesministeriums</b>. Das ist das strategische Stadium.</li></ul>
<h3>3. Implementation</h3>
<table class="kvq"><tr><th colspan="2">Programmtypen nach Mayntz</th></tr>
<tr><td><b>Regulativ</b></td><td>direkte Verhaltenssteuerung, hoher Kontrollaufwand, ruft Widerstand hervor</td></tr>
<tr><td><b>Anreiz</b></td><td>motiviert positiv, wirkt indirekt, Mitnahmeeffekte</td></tr>
<tr><td><b>Leistung</b></td><td>sichert ein Angebot, nicht dessen Nutzung, teuer</td></tr></table>
<p>Je mehr Stellen beteiligt sind, desto geringer die Chance auf Umsetzung (Pressman/Wildavsky). Sind die Adressaten private Akteure, braucht es Kooperation. Droht der Staat nur zu regulieren, regeln Verbände manchmal selbst: <b>private Interessenregierung</b> (Streeck/Schmitter).</p>
<h3>Evaluation und Terminierung</h3>
<p>Wirkt das Programm? Ist es effizient? Danach wird es fortgesetzt, verändert oder beendet. Die Autoren sehen darin eine <b>Rückkopplung</b>, keine eigene Phase.</p>
<div class="merk"><b>Kritik und Wert</b>Die Phasen überlappen, laufen parallel und auf mehreren Ebenen. Der Zyklus ist <b>kein Kausalmodell</b>, erklärt nicht, was den Prozess antreibt, und vernachlässigt Akteure und Lernen. Als <b>Heuristik</b> ist er aber unbestritten nützlich.</div>`,
check:[
 {q:"Was ist ein „policy window“ nach Kingdon?", o:["Ein dauerhaft offener Zugang von Verbänden zur Regierung","Ein kurzes Gelegenheitsfenster, in dem ein Problem Aufmerksamkeit bekommt","Die Phase der Evaluation"], a:1, ex:"Oft öffnet ein Ereignis wie ein Unfall oder eine Katastrophe das Fenster. Es bleibt nur kurz offen.",
  w:{0:"Dauerhafte Zugänge beschreiben eher Netzwerke. Das Policy-Fenster ist gerade kurz und selten.",2:"Evaluation kommt am Ende. Das Policy-Fenster gehört zum Agenda-Setting."}},
 {q:"Ein Staat zahlt eine Prämie für den Kauf von Elektroautos. Welcher Programmtyp ist das?", o:["Regulatives Programm","Anreizprogramm","Leistungsprogramm"], a:1, ex:"Positive Motivation, indirekte Wirkung. Typisches Vollzugsproblem: Mitnahmeeffekte, wer ohnehin gekauft hätte, nimmt die Prämie mit.",
  w:{0:"Regulativ wäre ein Verbot von Verbrennern: direkte Verhaltenssteuerung mit Sanktionen.",2:"Leistungsprogramm wäre etwa ein staatliches Angebot wie kostenloser Nahverkehr."}},
 {q:"Welche Kritik am Policy-Zyklus nennen Schneider/Janning?", o:["Er ist ein zu strenges Kausalmodell","Er ist kein Kausalmodell und erklärt nicht, was den Prozess von Phase zu Phase treibt","Er berücksichtigt nur das Parlament"], a:1, ex:"Deshalb taugt er als Heuristik, nicht als Theorie zum Testen von Hypothesen.",
  w:{0:"Gerade nicht: Man kann aus ihm keine prüfbaren Hypothesen ableiten.",2:"Kritisiert wird eine legalistische Sicht auf den Gesetzgeber, aber nicht eine Beschränkung auf das Parlament."}}
]},
{id:"se1-12", t:"Politikfelder, Akteure, Netzwerke", html:`${EMPF("Schneider/Janning (2006), Abschnitt 2.2")}
<p>Strukturell betrachtet ist ein Politikfeld ein <b>Problemverarbeitungszusammenhang</b> und zugleich eine <b>Konfliktstruktur</b>.</p>
<h3>Arten von Akteuren (Scharpf)</h3>
<table class="kvq">
<tr><td><b>Individuen</b></td><td>einzelne Personen</td></tr>
<tr><td><b>Handlungsaggregate</b></td><td>Gruppe handelt gleichgerichtet, weil sie ähnliche Präferenzen hat</td></tr>
<tr><td><b>Kollektive Akteure</b></td><td>Beteiligte handeln selbst, aber koordiniert: Allianzen, Clubs, Bewegungen, Verbände</td></tr>
<tr><td><b>Korporative Akteure</b></td><td>Ressourcen werden in eine eigene Organisation gelegt, die stellvertretend handelt: Parteien, Gewerkschaften, Parlament, Regierung</td></tr></table>
<p>Moderne Politik wird von <b>korporativen Akteuren</b> geprägt: Sie handeln dauerhaft, spezialisiert und arbeitsteilig. Sie entwickeln aber auch <b>Eigeninteressen</b>, etwa den Erhalt der Organisation. Individuen handeln meist als <b>Agenten</b> für Prinzipale.</p>
<h3>Wer wirkt wo mit?</h3>
<p><b>Almond</b> ordnete jeder Phase eine Hauptstruktur zu: Verbände artikulieren, Parteien bündeln, das Parlament formuliert, die Verwaltung setzt um. Das passt zu den USA, aber nicht zu Deutschland. Nach <b>Mayntz</b> wirken hier <b>Verbände</b> auch bei Zielen und Programmen mit, und <b>Regierung und Verwaltung</b> sind mehr als Vollzugsorgane.</p>
<h3>Konflikt, Netzwerk, Diskurs</h3>
<ul><li><b>Lowi:</b> Regulative, distributive und redistributive Politik erzeugen unterschiedliche Konfliktarenen.</li>
<li><b>Akteurkonstellation:</b> Positionen, Konflikte und Koalitionen der Akteure zueinander.</li>
<li><b>Politiknetzwerk:</b> enger, betont Beziehungen wie Kommunikation und Ressourcenaustausch.</li>
<li><b>Issue networks</b> (Heclo): Netzwerke öffnen Zugang für viele, auch für schwache Interessen, und liefern Sachverstand.</li>
<li><b>Diskursfeld:</b> Akteure folgen Weltbildern (belief systems). Was der eine als Lösung sieht, ist für den anderen ein Problem.</li></ul>
<p>Wichtig sind zudem <b>professionals</b> und Expertennetzwerke, etwa in Umwelt- und Gesundheitspolitik: Sie bringen Wissen über Organisationsgrenzen hinweg ein.</p>`,
check:[
 {q:"Eine Gewerkschaft ist nach Scharpf ein …", o:["Handlungsaggregat","korporativer Akteur","Individuum"], a:1, ex:"Mitglieder legen Ressourcen in eine Organisation, die mit eigenem Personal stellvertretend handelt.",
  w:{0:"Ein Aggregat wäre etwa eine Menge von Autofahrern, die alle gleich reagieren, ohne Organisation.",2:"Die Gewerkschaft ist eine Organisation, keine Einzelperson."}},
 {q:"Warum passt Almonds Stufenmodell schlecht zu Deutschland?", o:["Weil es in Deutschland keine Verbände gibt","Weil Verbände auch an Zielen und Programmen mitwirken und Regierung und Verwaltung mehr als Vollzug leisten","Weil Deutschland ein präsidentielles System ist"], a:1, ex:"So Mayntz: In Deutschland überlappen die Funktionen stark.",
  w:{0:"Deutschland hat starke Verbände. Gerade deshalb passt das Modell nicht.",2:"Deutschland ist parlamentarisch. Das Problem ist die Arbeitsteilung der Akteure, nicht der Systemtyp."}},
 {q:"Was betont das Konzept der „issue networks“ nach Heclo?", o:["Netzwerke schließen schwache Interessen aus","Netzwerke öffnen Zugang für viele Akteure und liefern Sachverstand","Netzwerke ersetzen das Parlament"], a:1, ex:"Die Zusammenarbeit von Politik und Gruppen führt nicht zur Abschottung, sondern zu mehr Beteiligten.",
  w:{0:"Heclo argumentiert das Gegenteil: Auch schwach organisierte Interessen gewinnen Einfluss.",2:"Davon ist keine Rede. Netzwerke ergänzen die formalen Entscheidungsorgane."}}
]}
];

CARDS[101]=[
 {id:"se1-c01", f:"Politikmanagement (Korte/Fröhlich)", b:"Verbindet die **Steuerbarkeit** des politischen Systems mit der **Steuerungsfähigkeit** der wichtigen Akteure.\nSach- und Machtfragen sind dabei immer verwoben."},
 {id:"se1-c02", f:"Kernthese von Korte/Fröhlich", b:"Der politische Prozess wird zunehmend **exekutivlastig**.\nDarum steht die Regierung im Mittelpunkt: keine Verfassungskunde, sondern die Funktionsweise des Regierens."},
 {id:"se1-c03", f:"Was ergänzt die formale Institutionenkunde?", b:"- informelle Entscheidungsprozesse\n- politische Kommunikation\n- personalisierte Regierungsstile\n- Strategien"},
 {id:"se1-c04", f:"Deutschland: Typ des Regierungssystems", b:"Repräsentatives, freiheitliches, **parlamentarisches** Regierungssystem.\nGrund: Der Bundestag wählt den Kanzler und kann ihn durch das konstruktive Misstrauensvotum abberufen (Steffani 1979)."},
 {id:"se1-c05", f:"Art. 20 GG: vier Strukturprinzipien", b:"1. Demokratie\n2. Bundesstaat\n3. Rechtsstaat\n4. Sozialstaat\n„Verfassung in Kurzform“"},
 {id:"se1-c06", f:"Freiheitliche demokratische Grundordnung (SRP-Urteil 1952)", b:"- Menschenrechte\n- Volkssouveränität\n- Gewaltenteilung\n- Verantwortlichkeit der Regierung\n- Gesetzmäßigkeit der Verwaltung\n- Unabhängigkeit der Gerichte\n- Mehrparteienprinzip, Chancengleichheit, Recht auf Opposition"},
 {id:"se1-c07", f:"Lückenlose Legitimationskette", b:"Volk wählt Parlament, Parlament wählt Regierungschef. So lässt sich jede hoheitliche Entscheidung auf den Willen des Volkes zurückführen (Dicke 2000)."},
 {id:"se1-c08", f:"Darstellungspolitik vs. Entscheidungspolitik", b:"Was: medienvermittelt, symbolisch, inszeniert / Verfahren, Gesetzgebung\nRegeln: Wettbewerb der medialen Öffentlichkeit / weitgehend unabhängig von Medien, Routine"},
 {id:"se1-c09", f:"Governance (Korte/Fröhlich)", b:"Art und Weise des Steuerns und Koordinierens, um Interdependenzen zwischen staatlichen und nichtstaatlichen Akteuren zu managen.\nVier Formen: Hierarchie, Netzwerk, Verhandlung, Wettbewerb."},
 {id:"se1-c10", f:"Polity, Politics, Policy: Ausrichtung (Lauth/Wagner)", b:"Polity: institutionenorientiert\nPolitics: inputorientiert\nPolicy: outputorientiert"},
 {id:"se1-c11", f:"Politische Macht nach Korte/Fröhlich", b:"- kein Attribut einzelner Akteure, angewiesen auf andere\n- nicht statisch, nicht aus Positionen ableitbar\n- muss täglich erarbeitet werden („Machtjongleur“)\n- vor allem über Kommunikation gesichert"},
 {id:"se1-c12", f:"Bezugsgrößen von Macht (Pfetsch)", b:"Besitzgröße: Potenziale\nBeziehungsgröße: sozialpsychologische Beziehungen\nRelationale Größe: Vergleich relativer Positionen"},
 {id:"se1-c13", f:"Enges vs. weites politisches System", b:"Umfang: Verfassungsorgane / dazu Parteien, Verbände, gesellschaftliche Konstellationen\nBlick: formal / auch ökonomische, soziale, kommunikative Bedingungen"},
 {id:"se1-c14", f:"Regieren (Korte/Fröhlich)", b:"Herbeiführung und Durchsetzung gesellschaftlich verbindlicher Entscheidungen.\nMischung aus Koordination und Steuerung, Leitung und Entscheidung, Durchsetzung."},
 {id:"se1-c15", f:"Regierung, Regierungshandeln, Regierungssteuerung", b:"Regierung: Exekutive, also Regierungschef und Kabinett\nRegierungshandeln: Tun und Lassen der Regierung\nRegierungssteuerung: strategisches Handeln für materielle Politikziele"},
 {id:"se1-c16", f:"Vier Zugänge der Regierungsforschung (Schuppert)", b:"1. Struktur (polity): institutionelle Ansätze\n2. Prozess (politics): Politikmanagement, Governance\n3. Inhalte (policy): Politikfelder\n4. Kommunikation: Medien, Aufmerksamkeitsmanagement"},
 {id:"se1-c17", f:"Struktureller Zugang der 1960er (Hennis)", b:"Leitfrage: Welche Aufgaben hat der Leistungsstaat zwingend zu erfüllen?\nSchwächen: keine Operationalisierung, keine empirischen Methoden, Akteure und soziale Voraussetzungen ausgeblendet."},
 {id:"se1-c18", f:"Systemtheorie in der Regierungsforschung: Leitfragen", b:"1. Auf welche Einflüsse reagiert das Entscheidungszentrum?\n2. Welche Interessen greift das System auf?\n3. Welche Rückwirkungen haben Entscheidungen?\nKritik: Auflistung von Faktoren, keine Sinnfrage."},
 {id:"se1-c19", f:"Innerer vs. äußerer Souveränitätsverlust", b:"Ursache: mehr Mitspieler im Inneren / europäische Integration, Globalisierung\nFolge: verhandeln, moderieren, koordinieren / Kooperation in Netzwerken und Verhandlungssystemen"},
 {id:"se1-c20", f:"Mischcharakter nach Lehmbruch", b:"Konkurrenzdemokratisch: Parteienwettbewerb\nKonkordanzdemokratisch: Aushandeln im Bundesstaat\nBeides prägt den Regierungsalltag."},
 {id:"se1-c21", f:"Leitfragen der Politikfeldanalyse", b:"1. Was tun und lassen Regierungen?\n2. Wie organisieren sie ihre Tätigkeiten?\n3. Welche Folgen hat das für Form, Prozess und Inhalt der Politik?"},
 {id:"se1-c22", f:"Kommunikative Macht vs. Medienmacht", b:"Kommunikative Macht: braucht der Akteur, um Mehrheiten zu sichern und Sach- und Machtfragen zu verbinden.\nMedienmacht: oft eine „als-ob-Macht“, wirkt, weil alle sie unterstellen."},
 {id:"se1-c23", f:"Direkte vs. indirekte Medieneinflüsse", b:"Direkt: Agenda-Setting, Stimmungen verstärken, politisches Marketing\nIndirekt: Politik passt sich Selektions- und Präsentationslogik an, Folge „politics without policy“"},
 {id:"se1-c24", f:"Steffani: Primär- und Sekundärmerkmale", b:"Primär: politische Abberufbarkeit der Regierung durch das Parlament\nSekundär: Amt und Mandat vereinbar, Rücktritt der ganzen Regierung, Auflösungsrecht, starke Fraktionsdisziplin"},
 {id:"se1-c25", f:"Semi-Präsidentialismus nach Duverger", b:"1. direkt gewählter Präsident\n2. mit beträchtlichen Befugnissen\n3. Premier und Regierung abhängig vom Vertrauen des Parlaments"},
 {id:"se1-c26", f:"Shugart/Carey: fünf Typen mit Beispiel", b:"Präsidentiell: USA\nPräsident-parlamentarisch: Russland\nPremier-präsidentiell: Frankreich\nParlamentarisch: Großbritannien\nVersammlungsunabhängig: Schweiz"},
 {id:"se1-c27", f:"Linz: Gefahren des Präsidentialismus", b:"1. Rigidität bei divided government\n2. zwei konkurrierende demokratische Legitimationen\n3. Winner-takes-all fördert Kooperationsfeindlichkeit\nNeuere Forschung relativiert das."},
 {id:"se1-c28", f:"Lijphart: zwei Dimensionen", b:"Exekutive-Parteien: Parteiensystem, Kabinette, Exekutivdominanz, Wahlsystem, Verbände\nFöderalismus-Unitarismus: Staatsaufbau, zweite Kammer, Verfassungsrigidität, judicial review, Zentralbank"},
 {id:"se1-c29", f:"Deutschland bei Lijphart", b:"**Föderale Konsensdemokratie**: konsensual in beiden Dimensionen.\nDer Demokratietyp liegt quer zum Regierungssystem: UK und Deutschland sind beide parlamentarisch, aber gegensätzlich."},
 {id:"se1-c30", f:"Vetospieler nach Tsebelis", b:"Akteure, deren Zustimmung für einen Politikwechsel nötig ist.\nInstitutionell: in der Verfassung (z. B. zweite Kammer)\nParteipolitisch: im Prozess (z. B. Koalitionspartner)"},
 {id:"se1-c31", f:"Wann ist Politikwechsel wahrscheinlich? (Tsebelis)", b:"- wenige Vetospieler\n- geringe programmatische Distanz\nAbsorptionsregel: entscheidend ist der Abstand der am weitesten entfernten Spieler."},
 {id:"se1-c32", f:"Realtypus vs. Idealtypus", b:"Bildung: historischer Fall als Muster / Leitidee zugespitzt entfaltet (Weber)\nProblem: Zeitpunkt, Widersprüche des Falls / Fall muss nicht deckungsgleich sein"},
 {id:"se1-c33", f:"Politische Kultur (Pickel/Pickel)", b:"Die auf politische Objekte gerichteten Einstellungen und Wertorientierungen der Bürger, als Kollektiv.\nAnalytisch, nicht wertend. Stabilität durch Kongruenz von Kultur und Struktur."},
 {id:"se1-c34", f:"Almond/Verba: Typen politischer Kultur", b:"Parochial: kein Bezug zum System\nSubject: bewertet Outputs, sieht sich nicht als Akteur\nParticipant: Wissen und Beteiligung\nCivic Culture: Mischtyp, Vorbild für Demokratien"},
 {id:"se1-c35", f:"Lipsets Raster", b:"A: legitim und effektiv, stabil\nB: legitim, nicht effektiv, Effektivitätskrise\nC: effektiv, nicht legitim, instabil\nD: weder noch, Zusammenbruch droht\nBRD nach 1945: C → A"},
 {id:"se1-c36", f:"Diffuse Unterstützung vs. spezifische Unterstützung", b:"Bezug: System um seiner selbst willen / Outputs und Amtsträger\nEntspricht bei Lipset: Legitimität / Effektivität\nStabilität: langfristig / schwankt kurzfristig"},
 {id:"se1-c37", f:"Phasen des Policy-Zyklus", b:"1. Problemdefinition und Agenda-Setting\n2. Programmformulierung\n3. Implementation\nDazu Evaluation und Terminierung als Rückkopplung."},
 {id:"se1-c38", f:"Programmtypen nach Mayntz", b:"Regulativ: direkte Steuerung, Widerstand, hoher Kontrollaufwand\nAnreiz: positiv, indirekt, Mitnahmeeffekte\nLeistung: Angebot gesichert, Nutzung nicht, teuer"},
 {id:"se1-c39", f:"Akteurstypen nach Scharpf", b:"Individuen\nHandlungsaggregate: gleichgerichtet ohne Organisation\nKollektive Akteure: koordiniert, Beteiligte handeln selbst\nKorporative Akteure: eigene Organisation handelt stellvertretend"}
];
Object.assign(CARD_CTX,{
 "se1-c01":"Schlüsselbegriff des Seminartexts","se1-c02":"Warum die Exekutive im Zentrum steht","se1-c03":"Regierungsforschung statt Verfassungskunde",
 "se1-c04":"Wie man das deutsche System einordnet","se1-c05":"Verfassung in Kurzform","se1-c06":"Was das BVerfG zur Kernordnung zählt","se1-c07":"Rückbindung an das Volk",
 "se1-c08":"Zwei Seiten der Politik","se1-c09":"Mehr als „Regieren“","se1-c10":"Die Dreiteilung mit Easton verknüpft",
 "se1-c11":"Macht ist Arbeit","se1-c12":"Worauf Macht beruhen kann","se1-c13":"Wie weit man das System fasst","se1-c14":"Definition aus dem Seminartext","se1-c15":"Drei Begriffe, die man leicht vermischt",
 "se1-c16":"Struktur des ganzen Kapitels","se1-c17":"Der erste Zugang","se1-c18":"Der Zugang der 1970er","se1-c19":"Warum Steuerung schwerer wird","se1-c20":"Deutschland zwischen zwei Logiken",
 "se1-c21":"Der dritte Zugang","se1-c22":"Oft verwechselt","se1-c23":"Wie Medien auf Politik wirken",
 "se1-c24":"Empfehlung Croissant","se1-c25":"Empfehlung Croissant","se1-c26":"Empfehlung Croissant","se1-c27":"Empfehlung Croissant","se1-c28":"Empfehlung Croissant","se1-c29":"Empfehlung Croissant","se1-c30":"Empfehlung Croissant","se1-c31":"Empfehlung Croissant",
 "se1-c32":"Empfehlung Lauth","se1-c33":"Empfehlung Pickel/Pickel","se1-c34":"Empfehlung Pickel/Pickel","se1-c35":"Empfehlung Pickel/Pickel","se1-c36":"Empfehlung Pickel/Pickel",
 "se1-c37":"Empfehlung Schneider/Janning","se1-c38":"Empfehlung Schneider/Janning","se1-c39":"Empfehlung Schneider/Janning"});
Object.assign(CARD_INFO,{
 "se1-c01":"Management: von lateinisch manus (Hand) und agere (handeln).",
 "se1-c04":"Konstruktives Misstrauensvotum: Der Bundestag kann den Kanzler nur abwählen, indem er zugleich einen Nachfolger wählt (Art. 67 GG).",
 "se1-c06":"SRP: Sozialistische Reichspartei, 1952 als Nachfolgeorganisation der NSDAP verboten.",
 "se1-c20":"Gerhard Lehmbruch: deutscher Politikwissenschaftler, prägte den Begriff Verhandlungsdemokratie.",
 "se1-c26":"Matthew Søberg Shugart und John Carey, „Presidents and Assemblies“ (1992).",
 "se1-c27":"Divided government: Präsident und Parlamentsmehrheit gehören verschiedenen Parteien an.",
 "se1-c33":"Max Kaase (1983): Den Begriff zu fassen sei wie einen Pudding an die Wand zu nageln."});

KREUZ.push(
 {id:"se1-x01", ch:101, stem:"Zu Korte/Fröhlich (2009) gilt:", s:[
  ["Das Buch versteht sich als Verfassungskunde des Grundgesetzes.", false, "Ausdrücklich <b>keine Verfassungskunde</b>, sondern eine Darstellung der Funktionsweise des Regierens."],
  ["Die Autoren wollen eine zunehmende Exekutivlastigkeit des politischen Prozesses nachweisen.", true, "Das ist ihre Grundthese, darum steht die Regierung im Mittelpunkt."],
  ["Politikmanagement verbindet die Steuerbarkeit des Systems mit der Steuerungsfähigkeit der Akteure.", true, "Sach- und Machtfragen sind dabei verwoben."]]},
 {id:"se1-x02", ch:101, stem:"Zur Einordnung des deutschen Systems gilt:", s:[
  ["Alle Bundesminister sind dem Bundestag unmittelbar parlamentarisch verantwortlich.", false, "Nur der <b>Bundeskanzler</b> ist unmittelbar parlamentarisch verantwortlich und legitimiert."],
  ["Art. 20 GG enthält die Prinzipien Demokratie, Bundesstaat, Rechtsstaat und Sozialstaat.", true, "Darum heißt er „Verfassung in Kurzform“."],
  ["Die freiheitliche demokratische Grundordnung wurde im SRP-Verbotsurteil präzisiert.", true, "Bundesverfassungsgericht, 23.10.1952."]]},
 {id:"se1-x03", ch:101, stem:"Zu den Grundbegriffen gilt:", s:[
  ["Entscheidungspolitik folgt vor allem den Regeln der medialen Öffentlichkeit.", false, "Das gilt für die <b>Darstellungspolitik</b>. Entscheidungspolitik ist meist Routine-Gesetzgebung, weitgehend unabhängig von Medien."],
  ["Governance kennt die Formen Hierarchie, Netzwerk, Verhandlung und Wettbewerb.", true, "Vier Formen der Koordination."],
  ["Policy ist in der Tabelle nach Lauth/Wagner outputorientiert.", true, "Politics ist inputorientiert, Polity institutionenorientiert."]]},
 {id:"se1-x04", ch:101, stem:"Zur politischen Macht nach Korte/Fröhlich gilt:", s:[
  ["Macht ergibt sich vor allem aus formalen Positionen wie dem Parteivorsitz.", false, "Positionen schaffen nur eine formale Ordnung. Macht muss <b>täglich erarbeitet</b> werden."],
  ["Kommunikative Macht ist zugleich politische Macht.", true, "Weil Macht zeitlich begrenzt ist und über Kommunikation gesichert wird."],
  ["Die relationale Machtgröße beruht auf einem Vergleich relativer Positionen.", true, "Neben Besitzgröße (Potenziale) und Beziehungsgröße."]]},
 {id:"se1-x05", ch:101, stem:"Zu den Zugängen der Regierungsforschung gilt:", s:[
  ["Die Politikfeldanalyse ist seit Mitte der 1970er ein eigenständiges Forschungsfeld.", true, "Davor wurden Inhalte zwar betont, aber nicht eigenständig erforscht."],
  ["Der Zugang über politische Kommunikation prägte das Fach bereits in den 1960er Jahren.", false, "Er erweiterte das Forschungsfeld erst <b>seit den 1990ern</b>. In den 1960ern dominierte der strukturelle Zugang (Hennis)."],
  ["Governance-Ansätze reagieren auf Souveränitätsverluste und wachsende Informalität.", true, "Innere und äußere Souveränitätsverluste."]]},
 {id:"se1-x06", ch:101, stem:"Zu Regierungssystemen (Croissant) gilt:", s:[
  ["Bei Steffani gibt es Mischtypen zwischen parlamentarisch und präsidentiell.", false, "Bei Steffani gibt es <b>keine Mischtypen</b>. Den Semi-Präsidentialismus führte Duverger ein."],
  ["Nach Steffani wäre die Schweiz ein präsidentielles System.", true, "Ein Beispiel für die Rigidität der Typologie."],
  ["Bei Shugart/Carey ist Russland präsident-parlamentarisch.", true, "Der Premier hängt von Präsident und Parlament ab."]]},
 {id:"se1-x07", ch:101, stem:"Zu Lijphart und Tsebelis gilt:", s:[
  ["Deutschland ist bei Lijphart eine föderale Konsensdemokratie.", true, "Konsensual in beiden Dimensionen."],
  ["Demokratietyp und Regierungssystem hängen eng zusammen: Parlamentarische Systeme sind immer Konsensdemokratien.", false, "Der Demokratietyp liegt <b>quer</b> zum Regierungssystem. Großbritannien ist parlamentarisch und eine Mehrheitsdemokratie."],
  ["Koalitionsparteien sind parteipolitische Vetospieler.", true, "Sie entstehen im politischen Prozess, nicht durch die Verfassung."]]},
 {id:"se1-x08", ch:101, stem:"Zur politischen Kultur (Pickel/Pickel) gilt:", s:[
  ["Politische Kultur ist ein wertender Begriff für guten Umgang in der Politik.", false, "In der Forschung ist er <b>analytisch und neutral</b>: gebündelte Einstellungen. Das Alltagsverständnis ist wertend."],
  ["Nach Almond/Verba ist die Civic Culture ein Mischtyp mit Elementen der Untertanenkultur.", true, "Die nicht-partizipativen Elemente sichern die Regierbarkeit."],
  ["Spezifische Unterstützung nach Easton entspricht ungefähr Lipsets Effektivität.", true, "Diffuse Unterstützung entspricht der Legitimität."]]},
 {id:"se1-x09", ch:101, stem:"Zum Policy-Zyklus (Schneider/Janning) gilt:", s:[
  ["Ein Problem entsteht, sobald ein objektiver Missstand vorliegt.", false, "Es muss auch <b>wahrgenommen</b> und als Abweichung von einer Norm gedeutet werden: Norm und Faktizität."],
  ["Rund 80 Prozent der Gesetzentwürfe werden in einem Referat eines Bundesministeriums ausgearbeitet.", true, "Das strategische Stadium eines Gesetzes."],
  ["Der Policy-Zyklus ist als Heuristik nützlich, aber kein Kausalmodell.", true, "Er erklärt nicht, was den Prozess von Phase zu Phase treibt."]]}
);

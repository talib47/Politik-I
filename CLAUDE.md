# Claude-Brücke: Lern-Apps von Talib Gündoğdu

Diese Datei liest jeder Claude-Chat, bevor er an einer der Lern-Apps arbeitet, egal aus welchem Projekt. Sie sorgt dafür, dass alle Apps nach denselben Regeln gebaut werden und jede App weiß, was in den anderen geändert wurde und warum.

Der Abschnitt **Gemeinsam** ist in allen vier Repos wortgleich. Der Abschnitt **Nur diese App** steht ganz unten.

<!-- GEMEINSAM:ANFANG -->
## Gemeinsam

### Die Apps

| App | Repo | Veranstaltungen (Hälften) | Prüfung |
|---|---|---|---|
| BiWi II | talib47/BiWi-II | Psychologie im Lehramt (Heine), vier Schwerpunkte | Klausur am PC, 17.02.2027 |
| Politik I | talib47/Politik-I | Vorlesung Schwanholz · Seminar Schwarz | Essay 60 Min. 04.02. 14 Uhr · Essayklausur 04.02. 8 Uhr |
| Wirtschaft II | talib47/Wirtschaft-II | Makroökonomik (Bank), alle 8 Kapitel fertig | Klausur, Termin offen: Stichtag 31.01.2027 angenommen |
| W&G I | talib47/Wirtschaft-und-Gesellschaft-I | Ökonomisches Denken (Becker) · Sozialstruktur (Erlinghagen) | 4 Moodle-Quizze (ab 16.11., 07.12., 25.01., 07.02., Abgabe bis 21.02.) · Klausur am PC (Single Choice), Termin offen: Stichtag 31.01.2027 angenommen |

Live jeweils unter `https://talib47.github.io/<Repo>/`.

### Regeln für jeden Chat

1. **Erst lesen:** diese Datei und das README des Repos. Bei Änderungen an mehreren Apps alle betroffenen Repos klonen.
2. **Ein Muster zuerst:** Neue Bausteine werden in einer App gebaut und Talib gezeigt. Erst nach seiner Bestätigung kommen sie in die anderen Apps. Das spart Kontingent und Wartezeit.
3. **Nach jeder Änderung die Brücke pflegen:**
   - einen Eintrag oben ins Logbuch (Datum · App · Projekt/Chat · was · warum),
   - die Tabelle „Bausteine“ aktualisieren,
   - den Abschnitt „Gemeinsam“ wortgleich in alle vier Repos kopieren und dort mit committen.
   Sonst weiß der nächste Chat nichts davon.
4. **Lernstand schützen:** IDs von Lektionen, Karten, Fragen und Begriffen nie ändern oder wiederverwenden. Zweig `fortschritt` nie anfassen. Beim Start nichts speichern. Neue Felder in `state` nur in `norm()` anlegen.
5. **Bauen und prüfen:** `python3 build.py` (W&G I: `python3 stamp.py`), `version.txt` immer mitcommitten. Vor dem Push `node --check`, doppelte IDs prüfen, Headless-Browser bei 360 px hell und dunkel ohne Fehler und ohne Überlauf. Commit als `Claude <noreply@anthropic.com>` auf `main`.
6. **Inhalte:** Grundlage sind nur Talibs Unterlagen (Folien, Texte, Moodle-Screenshots). Alles darüber hinaus wird markiert (`erg`/`ergbox`, Lektüre `lit`/`litbox`). Widerspricht etwas den Unterlagen, gilt die Unterlage.
7. **Hochgeladen-Übersicht pflegen:** Jede neu eingebaute Sitzung bzw. jeder Block bekommt einen `UPLOADS`-Eintrag mit Einzeldateien. `known:true` nur, wenn der Umfang aus Moodle-Screenshot, Verlaufsplan oder Folie bekannt ist.
8. **Prüfungstermine:** nur aus den Unterlagen (Folie, Verlaufsplan, Moodle). Steht ein Termin nicht sicher fest, gilt der **Stichtag 31.01.** des Semesters: Bis dahin soll alles sitzen. Die App zeigt das als Annahme („Stichtag“) und rechnet Abstände und Probeklausuren danach. Trägt Talib einen Termin ein, gilt seiner. Sobald ein Termin in Unterlagen auftaucht, als Standard eintragen und die Tabelle oben anpassen.
9. **Ton:** Deutsch, kurz, fürs Handy. Nachname immer „Gündoğdu“.
10. **Prüfauftrag:** Schreibt Talib „Prüfauftrag“ (mit App und Umfang), gilt `PRUEFAUFTRAG.md` im Repo, wortgleich in allen vier Repos.

### Aufbau jeder App (fester Platz für alles)

Damit nichts wandert: Jede Funktion hat in allen Apps denselben Platz. Wer etwas verschiebt, ändert es in allen Apps und trägt es hier ein.

**Reiter unten:** Lernpfad · Üben · Statistik. Ausnahme W&G I (älterer Einzeldatei-Aufbau): Übersicht · Üben · Karten · Quiz bzw. Klausur · Statistik.

**Umschalter oben** (nur Apps mit zwei Hälften, Politik I und W&G I): auf Lernpfad, Üben und Statistik. Alles, was je Hälfte gilt, folgt dem Umschalter.

**Lernpfad bzw. Übersicht, von oben nach unten:**
1. Umschalter (falls zwei Hälften)
2. Titel der Veranstaltung
3. Hochgeladen-Übersicht (eine Zeile, aufklappbar)
4. Heute: Lerneinheit
5. Nochmal anschauen (als unklar markiert)
6. Als Nächstes
7. Sitzungen bzw. Kapitel
8. So wird geprüft, danach Hinweise zum Prüfungsformat

**Üben:** Wiederholen (fällige Karten, Verständnisfragen, Zuordnen, Begriffe, Selbsttest), danach „Im Prüfungsformat“ (Probeklausur oder Probe-Essay).

**Statistik, von oben nach unten:**
1. Letzte 7 Tage mit Motivationssatz darunter
2. Erledigt? (Aufgaben neben dem Lernen)
3. Prüfung und Probeklausuren (Termin, Plan)
4. Deine Schwachstellen
5. Nach Sitzung bzw. Kapitel (und fachspezifische Zusätze wie Rechenaufgaben)
6. Claude-Brücke
7. Geräte-Abgleich (verbinden, abgleichen, trennen)
8. Fortschritt zurücksetzen

**Gestaltung („Die Reihe“):** Jede App ist ein Band einer Reihe, erkennbar an Bandfarbe und römischer Ziffer wie im App-Symbol.
- Gemeinsames Design in `src/design.css` (W&G I: `design.css` im Hauptordner), wortgleich in allen Apps, von `build.py` bzw. `stamp.py` eingesetzt. Schrift in `fonts/`, in `sw.js` im Offline-Speicher. Je App stehen in `head.html` nur `--accent`, `--accent-ink`, `--plate-top`, `--plate-bot`, `--numeral`, hell und dunkel.
- Kräftige Farbe nur auf der Platte „Heute“. Sonst ruhige Gruppen ohne Rahmen und ohne Schatten; erhöht sind nur Platte und Lernkarte (mit Stapel dahinter).
- Glas nur für Bedienleisten: Tableiste als schwebende Kapsel mit Symbolen (`NAV_ICONS` in `status.js`), daneben der runde Knopf „Aa“ für die Schriftgröße, Hinweise, Leiste der Tageseinheit. Nie Glas auf Inhalten.
- Titel, Kartenvorderseiten und Zitate in Newsreader (`fonts/`, SIL OFL, im Offline-Speicher), Text in der Systemschrift (SF Pro auf iPad und iPhone). Keine Etiketten in Großbuchstaben.
- Bewegung nur als Antwort auf Tippen (Seitenwechsel, Karte, Drücken), `prefers-reduced-motion` und `prefers-reduced-transparency` beachten.
- Neue Blöcke: Überschrift `h2` im `.block`, Nebeninfo `.small.muted`, aufklappbare Kurzinfos als `details.block.upl`, Knöpfe `.btn` (voll) bzw. `.btn.ghost` (getönt).
- Lernmodus: Beim Lernen (Karten, Fragen, Zuordnen, Selbsttest, Essays, Alles aufschreiben) und in der ganzen Tageseinheit verschwinden Tableiste und „Aa“. Oben steht eine Glasleiste mit Schließen (wie der Zurück-Link), Fortschrittsbalken und n/m; in der Tageseinheit die Leiste der Einheit mit Schritten. Lernansichten tragen sich in `APP.focus.views` ein.
- Abstände nach festem Raster (4 · 8 · 12 · 16 · 24 · 32 px, Block „Abstände“ in `design.css`): kleine Zeile über einem Titel 8 px, Titel zu Text 10–14 px, Zeile in Listen 14 px Innenabstand. Keine Abstände per `style=` im Code, sondern Regeln in `design.css`.
- Ändern: `design.css` in einer App anpassen, Talib zeigen, nach Freigabe wortgleich in alle Apps kopieren. Was nur eine App braucht, steht in deren eigener CSS (W&G I: Block „Anpassungen der älteren Einzeldatei“).

### Lernprinzipien (aus der Forschung, nicht ohne Grund ändern)

Stand der Recherche vom 03.11.2026. Jede App folgt diesen Regeln. Wer davon abweicht, begründet es im Logbuch.

1. **Abrufen statt Lesen:** Erst antworten, dann aufdecken. Abrufüben schlägt Wiederlesen deutlich, besonders mit Rückmeldung und bei echtem Erinnern statt Wiedererkennen (Rowland 2014: g ≈ 0,5 insgesamt, freies und gestütztes Erinnern mit Rückmeldung g ≈ 0,7–0,8, Wiedererkennen nur ≈ 0,36). Deshalb: bei Auswahlfragen erst selbst abrufen, dann „Auswahl zeigen“; zu jeder falschen Option eine Begründung.
2. **Abstände, an die Prüfung angepasst:** Grundplan 1, 3, 7, 16, 35 Tage. Der beste Abstand ist ein Bruchteil der Zeit bis zur Prüfung, bei 5 Wochen etwa ein Viertel, bei 10 Wochen etwa ein Sechstel; zu kurz schadet mehr als zu lang (Cepeda et al. 2008). Darum `spaceDays()`: höchstens ein Drittel der Resttage, ±10 % Streuung ab 3 Tagen. Gilt für Karten, Verständnisfragen und Kreuzaufgaben. Ist der Termin unbekannt, rechnet die App mit dem Stichtag 31.01. (Regel 8).
3. **Wiederholen, bis es einmal sitzt:** Nicht sichere Karten kommen in derselben Runde wieder (höchstens dreimal) und am nächsten Tag noch einmal. Das ist „successive relearning“ (Rawson, Dunlosky): einmal richtig je Runde, über mehrere Tage verteilt. Ergebnis in Studien: über 10 % bessere Klausuren und deutlich besseres Behalten.
4. **Neues jeden Tag ein wenig:** Die Tageseinheit nimmt 5 neue Karten dazu, solange weniger als 25 fällig sind. Sonst stauen sich ungesehene Karten bis kurz vor der Prüfung.
5. **Mischen mit Maß:** Gemischtes Üben hilft vor allem beim Unterscheiden ähnlicher Kategorien (Autoren, Typen, Denkschulen); für reine Texte zeigt die Meta-Analyse keinen sicheren Vorteil (Brunmair & Richter 2019). Darum mischen „Was gehört wohin?“ und die Tageseinheit, Lektionen bleiben in ihrer Reihenfolge. Keine übertriebenen Versprechen im Text.
6. **Essays aus dem Gedächtnis:** Kurze Texte ohne Hilfen bringen so viel wie lange mit offenem Buch. Darum „Alles aufschreiben“ (5 Minuten freies Abrufen, dann Abgleich mit den Kernpunkten) und Probe-Essays ohne Hilfen mit Timer.
7. **Schlaf zwischen zwei Runden:** Wer abends lernt und morgens wiederholt, braucht etwa halb so viel Wiederholung und behält länger (Mazza et al. 2016). Die App gibt diesen Hinweis nach abendlichen Einheiten.
8. **Prüfungsnah üben:** Format, Zeit und Gerät wie in der Prüfung. Politik und BiWi werden am PC geschrieben: Probe-Essays und offene Aufgaben mit Tastatur üben. Der Probe-Essay im Seminar zeigt das Tempo (Ziel gut 8 Wörter pro Minute).
9. **iPad:** Talib lernt meist am iPad, abends. Ab 768 px Breite ist die Schrift etwas größer (`--base`), Karten lassen sich mit Tastatur bedienen (Leertaste, ← →, Z). Tippflächen groß, nichts nur über Hover.

### Bausteine

✓ = eingebaut · ○ = offen · – = passt nicht

| Baustein | BiWi II | Politik I | Wirtschaft II | W&G I |
|---|---|---|---|---|
| Offline-Modus (sw.js) | ✓ | ✓ | ✓ | ✓ |
| Update-Check (version.txt) | ✓ | ✓ | ✓ | ✓ |
| Karten wischen, eine zurück | ✓ | ✓ | ✓ | ✓ |
| Geräte-Abgleich unter Statistik | ✓ | ✓ | ✓ | ✓ |
| Hochgeladen-Übersicht je Hälfte, nach Sitzung/Block | ✓ | ✓ | ✓ | ✓ |
| Erledigt-Liste unter Statistik | ✓ | ✓ | ✓ | ✓ |
| Motivationssatz unter der Wochenübersicht | ✓ | ✓ | ✓ | ✓ |
| Claude-Brücke (diese Datei + Block unter Statistik) | ✓ | ✓ | ✓ | ✓ |
| Statistik in der festen Reihenfolge | ✓ | ✓ | ✓ | ✓ |
| Abstände vor der Prüfung (`spaceDays`) | ✓ | ✓ | ✓ | ✓ |
| Nicht sichere Karten bis zu dreimal in derselben Runde | ✓ | ✓ | ✓ | ✓ |
| Tageseinheit: neue Karten auch bei fälligen | ✓ | ✓ | ✓ | – (eigene Tageseinheit) |
| Tastatur für Karten | ✓ | ✓ | ✓ | ✓ |
| Größere Schrift auf dem iPad | ✓ | ✓ | ✓ | ✓ |
| Hinweis Schlaf nach abendlicher Einheit | ✓ | ✓ | ✓ | ✓ |
| Alles aufschreiben (freies Abrufen) | ○ | ✓ | ○ | ○ |
| Tempo im Probe-Essay | – | ✓ | – | – |
| Design „Die Reihe“ (`design.css`, Newsreader, Glas-Tableiste mit Symbolen, Platte „Heute“, Knopf „Aa“) | ✓ | ✓ | ✓ | ✓ |
| Lernmodus ohne Ablenkung (Leiste weg, oben Schließen und Fortschritt, Esc; `focusBar` in `status.js`, `APP.focus` in `appcfg.js`) | ✓ | ✓ | ✓ | ✓ |
| Stichtag 31.01., wenn der Prüfungstermin unbekannt ist | – (Termin bekannt) | – (Termine bekannt) | ✓ | ✓ (Sozialstruktur) |

### Logbuch

Neueste oben. Format: `- JJJJ-MM-TT · App(s) · Chat · Was · Warum`. Der Block „Claude-Brücke“ in der App zeigt die letzten Einträge, die die App betreffen.

- 2026-11-03 · alle · Projekt Politik I · Prüfauftrag `PRUEFAUFTRAG.md` in allen Repos: Gesamtprüfung in acht Schritten (Inhalt gegen Unterlagen, Prüfungspassung, Lernwirksamkeit, Oberfläche, Technik, unabhängige Zweitprüfung, Umsetzen, Bericht) · Talib will die Apps regelmäßig von Grund auf prüfen lassen
- 2026-11-03 · alle · Projekt Politik I · Lernmodus in BiWi II, Wirtschaft II und W&G I übernommen (W&G I: Fragenrunde, Karten, Wer sagt das?, laufendes Quiz; Umschalter dort ausgeblendet) · Talib hat das Muster freigegeben
- 2026-11-03 · Politik I · Projekt Politik I · Lernmodus ohne Ablenkung als Muster: in Lernansichten und der Tageseinheit keine Tableiste, oben Schließen, Fortschritt und n/m, Esc schließt; Leiste der Tageseinheit mit Schritten · Talib hat ihn aus vier Vorschlägen gewählt; mehr Platz und keine Fehltipps beim Wischen
- 2026-11-03 · alle · Projekt Politik I · Abstände geprüft (automatische Messung in allen Ansichten) und nach festem Raster korrigiert: kleine Zeile über Titeln, Titel zu Text, Listen in Gruppen · Talib: kleine Sätze klebten an Titeln wie „Üben“
- 2026-11-03 · alle · Projekt Politik I · Design „Die Reihe“ in BiWi II (Pflaume, II), Wirtschaft II (Blau, II) und W&G I (Grün, I, fünf Reiter mit Symbolen) übernommen · Talib hat das Muster in Politik I freigegeben
- 2026-11-03 · Politik I · Projekt Politik I · Neues Design „Die Reihe“ als Muster: neutrale Flächen wie iOS, Bandfarbe nur auf der Platte „Heute“ (mit Ziffer I wie im Symbol), Titel in Newsreader, Tableiste als Glas-Kapsel mit Symbolen, Schriftgröße als ein Knopf „Aa“, Umschalter wie iOS, runde Häkchen, Lernkarte mit Stapel · Talib wünscht eine Optik wie aus dem App Store, ohne Funktionen zu verlieren; nach seiner Freigabe in die anderen Apps
- 2026-11-03 · alle · Projekt Politik I · Unbekannter Prüfungstermin: Stichtag 31.01.2027 (Wirtschaft II, Sozialstruktur in W&G I), als Annahme gekennzeichnet, eigener Termin geht vor; bekannte Termine bleiben (Politik 04.02., BiWi 17.02., Quizze laut Moodle) · Talib: Bis Ende Januar soll alles sitzen, sofern kein Termin feststeht
- 2026-11-03 · Politik I · Projekt Politik I · Neu: „Alles aufschreiben“ (5 Minuten freies Abrufen je Sitzung, Abgleich mit den Kernpunkten, auch in der Tageseinheit) und Tempo-Rückmeldung im Probe-Essay des Seminars · Freies Abrufen ist besonders wirksam und trainiert genau den Essay; die Klausur wird am PC geschrieben
- 2026-11-03 · alle · Projekt Politik I · Lernen nach Forschungsstand: Abstände passen sich der Prüfung an (höchstens ein Drittel der Resttage, Streuung), nicht sichere Karten bis zu dreimal in derselben Runde, täglich ein paar neue Karten, Tastatur für Karten, größere Schrift auf dem iPad, Hinweis zum Schlaf nach Abendeinheiten · Tiefenanalyse aller Apps; Regeln stehen unter „Lernprinzipien“
- 2026-11-03 · alle · Projekt Politik I · Hochgeladen-Übersicht, Erledigt-Liste, Motivationssatz und Brücken-Block in allen Apps; Statistik überall in der festen Reihenfolge; gemeinsamer Code in `status.js` (W&G I: angepasster Block in der index.html), Einstellungen je App in `appcfg.js` · Von Talib bestätigt, einheitlich in allen Apps
- 2026-11-03 · alle · Projekt Politik I · CLAUDE.md in alle vier Repos verteilt, fester Aufbau jeder App festgelegt (Reiter, Reihenfolge auf Lernpfad und Statistik) · Talib hat die Brücken-Anweisung in alle vier Projekte kopiert; Funktionen sollen nicht mehr zwischen den Apps an verschiedenen Stellen landen
- 2026-11-03 · Politik I · Projekt Politik I · Claude-Brücke eingeführt: gemeinsame Bauanleitung CLAUDE.md mit Logbuch und Bausteine-Tabelle, Block unter Statistik · Damit jeder Chat in jedem Projekt weiß, was in den anderen Apps geändert wurde und warum
- 2026-11-03 · Politik I · Projekt Politik I · Hochgeladen-Übersicht nach Sitzung/Block: Einzeldateien, Stand „vollständig“, „x von y“ oder „Umfang unbekannt“ · Talib will beim Öffnen sehen, wie weit die Unterlagen reichen und ob ein Block komplett ist
- 2026-11-03 · Politik I · Projekt Politik I · Erledigt-Liste (Presseschau, Bibliotheksschein, Anmeldung) und Motivationssatz unter der Wochenübersicht · Aufgaben neben dem Lernen abhaken, kleine Ermutigung je nach Lernpause
- 2026-10-29 · Politik I · Projekt Politik I · Seminar Schwarz: Sitzungsplan, Essayklausur (500 Wörter, drei Fragen, vier Kriterien), Presseschau, Block I · Erste Zoom-Sitzung, Verlaufsplan und Moodle-Kurs liegen vor
- 2026-10-29 · W&G I · Projekt W&G I · Geräte-Abgleich und Zurücksetzen unter Statistik · einheitlich mit den anderen Apps
- 2026-10-28 · alle · – · Offline-Modus mit eigenem Cache-Präfix je App · Apps sollen ohne Internet starten
- 2026-10-27 · W&G I · Projekt W&G I · Sozialstruktur: Single-Choice-Klausurfragen statt Schreibaufgaben, Probeklausur 70 Fragen in 60 Min. · Klausurformat
- 2026-10-26 · alle · – · Update-Check und Karten wie in BiWi II (tippen, wischen, eine zurück) · einheitliches Lernen in allen Apps
<!-- GEMEINSAM:ENDE -->

## Nur diese App: Politik I

- Zwei getrennt geprüfte Hälften, Umschalter oben: `vl` (Schwanholz, Kapitel 1–10) und `se` (Schwarz, Kapitel 101–109 = Block I–IX).
- Seminar ohne Folien: Textgrundlage ist der Kern, Literaturempfehlungen als „Empfehlung“ (`EMPF()`). Essays im Seminar etwa 500 Wörter, Bewertung nach den vier Kriterien von Schwarz.
- Neue Sitzung: `src/content_v<Nr>*.js` bzw. `src/content_s<Nr>*.js` anlegen, in `build.py` vor `start.js` eintragen, `UPLOADS` eintragen.
- Literaturliste aller Seminarblöcke ist aus den Moodle-Screenshots vom 29.10. bekannt (siehe Verlaufsplan `online_03.pdf` im claude.ai-Projekt).
- Projekt-PDFs dürfen nach dem Einbau gelöscht werden, die App enthält den Lernstoff.
- Gemeinsame Bausteine: `src/status.js` (wortgleich mit BiWi II und Wirtschaft II), Einstellungen in `src/appcfg.js`. „Alles aufschreiben“ in `src/dump.js` (Muster für die anderen Apps).
- Design-Muster: `src/design.css` und `fonts/` gehören zu allen Apps (beim Übertragen wortgleich kopieren, `sw.js` CORE um die Schrift ergänzen). Bandfarbe Politik I in `src/head.html`: Weinrot, Ziffer „I“.

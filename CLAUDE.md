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
| Wirtschaft II | talib47/Wirtschaft-II | Makroökonomik (Bank), alle 8 Kapitel fertig | Klausur, Termin offen |
| W&G I | talib47/Wirtschaft-und-Gesellschaft-I | Ökonomisches Denken (Becker) · Sozialstruktur (Erlinghagen) | 4 Moodle-Quizze · Klausur am PC (Single Choice) |

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
8. **Ton:** Deutsch, kurz, fürs Handy. Nachname immer „Gündoğdu“.

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

**Gestaltung:** Farben nur über die Tokens in `head.html`, hell und dunkel. Neue Blöcke dezent: Überschrift `h2` im `.block`, Nebeninfo `.small.muted`, aufklappbare Kurzinfos als `details.block.upl`. Jede App behält ihre Akzentfarbe.

### Bausteine

✓ = eingebaut · ○ = offen · – = passt nicht

| Baustein | BiWi II | Politik I | Wirtschaft II | W&G I |
|---|---|---|---|---|
| Offline-Modus (sw.js) | ✓ | ✓ | ✓ | ✓ |
| Update-Check (version.txt) | ✓ | ✓ | ✓ | ✓ |
| Karten wischen, eine zurück | ✓ | ✓ | ✓ | ✓ |
| Geräte-Abgleich unter Statistik | ✓ | ✓ | ✓ | ✓ |
| Hochgeladen-Übersicht je Hälfte, nach Sitzung/Block | ○ | ✓ | ○ | ○ |
| Erledigt-Liste unter Statistik | ○ | ✓ | ○ | ○ |
| Motivationssatz unter der Wochenübersicht | ○ | ✓ | ○ | ○ |
| Claude-Brücke (diese Datei + Block unter Statistik) | ○ | ✓ | ○ | ○ |
| Statistik in der festen Reihenfolge | ✓ | ✓ | ○ (Prüfung und Schwachstellen stehen nach „Nach Kapitel“) | ○ prüfen |

### Logbuch

Neueste oben. Format: `- JJJJ-MM-TT · App(s) · Chat · Was · Warum`. Der Block „Claude-Brücke“ in der App zeigt die letzten Einträge, die die App betreffen.

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

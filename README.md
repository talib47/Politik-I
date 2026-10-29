# Politik I – Lern-App (Vorlesung Schwanholz + Seminar Schwarz)

Live: https://talib47.github.io/Politik-I/

Modul Grundlagen Politik I (UDE, Lehramt GyGe), zwei getrennt geprüfte Veranstaltungen, oben in der App umschaltbar:

- **Vorlesung** „Politische Systeme im Vergleich“ (PD Dr. Julia Schwanholz, Do 14–16). Prüfung: Essay, 60 Min. am PC, unbenotet. 04.02.2027, Zweittermin 04.03.2027.
- **Seminar** „Das politische System Deutschlands und der EU“ (Dr. Oliver Schwarz, online, asynchron über Moodle). Prüfung: Essayklausur, etwa 500 Wörter zu einer von drei Fragen, 60 Min., 04.02.2027, 8–10 Uhr, PC-Hall Essen; bestanden, wenn keines der vier Kriterien (Aufbau und Struktur, Argumentation, Fachwissen, Anwendung) unzureichend ist. Studienleistung: Presseschau (10 Min., vertonte PPT als MP4) und Bibliotheksschein.

Eine Datei (`index.html`, Vanilla-JS, kein Framework), gebaut aus den Modulen in `src/`:

```
python3 build.py      # erzeugt index.html neu
```

## Aufbau von `src/`

Grundgerüst und Lernformen aus Wirtschaft II übernommen und auf zwei Veranstaltungen (Umschalter oben) angepasst.

| Datei | Inhalt |
|---|---|
| `head.html` | Kopf, Icons, Manifest, CSS aus Wirtschaft II (Farben als Tokens, Dunkelmodus, Akzent Weinrot) plus Politik-Klassen |
| `core.js` | Speicher (`localStorage`), Geräte-Abgleich über GitHub, Hilfsfunktionen |
| `content.js` | Veranstaltungen (`COURSES`), Sitzungsliste (`CHAPTERS`, `c` = vl/se, `no` = angezeigte Nummer) |
| `cardinfo.js` | Kontextzeile (Vorderseite) und i-Infos (Rückseite) je Karte |
| `format.js` | Textformat aus Wirtschaft II: Listen, Begriff: Erklärung, Gegenüberstellungen (auf dem Handy gestapelt), Klammern leiser |
| `views.js` | Lernpfad, Sitzung, Lektionen (Tabellen werden Listen bzw. Vergleiche), Karten mit drei Stufen und Schreibfeld, Üben, Statistik |
| `recall.js` | Verständnisfragen: erst abrufen, dann Auswahl (gemischte Reihenfolge), Begründung je falscher Wahl (`w`), Wiederholungsplan `state.qbox` |
| `who.js` | „Was gehört wohin?“: Zuordnung zu Autor, Regimetyp, Teilregime, Polity/Politics/Policy; Verwechslungen kommen öfter |
| `terms.js` | Begriffe und Abkürzungen: Karten in beide Richtungen (`b-`, `br-`) und Lexikon |
| `session.js` | Tägliche Einheit „Heute“ mit Schrittleiste, übt nur begonnene Sitzungen |
| `plan.js` | Prüfungstermin je Veranstaltung (Standard aus der Folie), Probe-Essay-Plan, Schwachstellen |
| `kreuz.js` | Selbsttest (drei Aussagen, wahr/falsch) |
| `essay.js` | Essay-Trainer, Probe-Essay mit 60-Min.-Timer, Gliederung in 10 Minuten. Seminar: Wortziel 500, vier Kriterien (gut/hinreichend/unzureichend), Probe-Essay mit drei Fragen zur Wahl |
| `content_v1.js`, `content_v1_lit.js` | Vorlesung Sitzung 1: Folien und Lektüre (Patzelt, Lauth, Merkel) |
| `content_v1_train.js` | Sitzung 1: Begründungen falscher Antworten, Zuordnungen, Begriffe |
| `content_s1.js` | Seminar Sitzung 1 (Kapitel 101): Lektionen mit Begründung je falscher Wahl (`w` direkt in der Frage), Karten, Selbsttests |
| `content_s1_train.js` | Seminar Sitzung 1: Essays (Musteressay etwa 500 Wörter), Zuordnungen (`se_…`-Sets), Begriffe |
| `start.js` | Start, Zoom, Token aus dem Link |

Herkunft der Inhalte: Folien unmarkiert, Lektüre mit `lit`/`litbox`, sonstige Ergänzungen mit `erg`/`ergbox`.
Seminar: keine Folien. Die Textgrundlage jeder Sitzung ist der Kern (unmarkiert), Literaturempfehlungen stehen als „Empfehlung“ (`EMPF()`, `litbox`), Ergänzungen wie gehabt.

Seminar-Kapitel: `n` 101–109 (= Sitzung I–IX laut Verlaufsplan), IDs `se<Nr>-…` (Lektion `se1-1`, Karte `se1-c01`, Selbsttest `se1-x01`, Essay `se1-e1`, Zuordnung `se1-w01`, Begriff `se-…`). Neue Sitzung: Datei `content_s<Nr>.js` und `content_s<Nr>_train.js` anlegen und in `build.py` vor `start.js` eintragen.

Lernstand: IDs von Lektionen, Karten, Fragen (`Lektions-ID#Nr`), Selbsttests, Essays, Zuordnungen und Begriffen nie umbenennen. Neue Felder werden beim Laden nur im Speicher angelegt, gespeichert wird erst bei einer Aktion.

## Geräte-Abgleich

- Fortschritt liegt als `fortschritt.json` im Zweig `fortschritt` dieses Repos.
- Gerät verbinden: `https://talib47.github.io/Politik-I/#t=<GitHub-Schlüssel>` einmal öffnen.
- Eigene Schlüssel: `p1-lernapp-v1`, `p1-gh-token`, `p1-zoom`.

## Stand der Inhalte

Vorlesung: Sitzung 1 (15.10.) mit Lektüre fertig: 14 Lektionen mit 39 Verständnisfragen, 50 Karten, 21 Begriffe, 37 Zuordnungen, 14 Selbsttests, 8 Essay-Fragen. Lektüretexte liegen aufbereitet im claude.ai-Projekt.
Seminar: Sitzung 1 (29.10.) mit Textgrundlage und allen vier Empfehlungen fertig: 12 Lektionen mit 36 Verständnisfragen, 39 Karten, 18 Begriffe, 42 Zuordnungen, 9 Selbsttests, 5 Essay-Fragen. Sitzungen 2–9 stehen mit Textgrundlage im Lernpfad.

## Updates

`build.py` schreibt neben `index.html` auch `version.txt` (Prüfsumme des Inhalts). Die App vergleicht beim Start und beim Zurückkehren ihre Version damit (`src/update.html`): beim Start lädt sie neu, mitten in einer Übung erscheint ein Hinweis zum Antippen. Deshalb immer über `build.py` bauen und `version.txt` mit hochladen.


## Offline

`sw.js` speichert die App-Dateien im Gerät, die App startet auch ohne Internet (Netz höchstens 3 Sekunden, sonst die gespeicherte Kopie). Registrierung am Ende von `src/start.js`. Alle Apps teilen sich `talib47.github.io`: Jede App löscht nur Caches mit eigenem Präfix. Der Lernstand liegt immer zuerst im Gerät und wird abgeglichen, sobald wieder Internet da ist (neuerer Stand gewinnt als Ganzes).

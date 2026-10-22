# Politik I – Lern-App (Vorlesung Schwanholz + Seminar Schwarz)

Live: https://talib47.github.io/Politik-I/

Modul Grundlagen Politik I (UDE, Lehramt GyGe), zwei getrennt geprüfte Veranstaltungen, oben in der App umschaltbar:

- **Vorlesung** „Politische Systeme im Vergleich“ (PD Dr. Julia Schwanholz, Do 14–16). Prüfung: Essay, 60 Min. am PC, unbenotet. 04.02.2027, Zweittermin 04.03.2027.
- **Seminar** „Politisches System Deutschlands und der EU“ (Schwarz, online, ab 29.10.). Prüfung: Klausur + Vortrag.

Eine Datei (`index.html`, Vanilla-JS, kein Framework), gebaut aus den Modulen in `src/`:

```
python3 build.py      # erzeugt index.html neu
```

## Aufbau von `src/`

| Datei | Inhalt |
|---|---|
| `head.html` | Kopf, Icons, Manifest, CSS (Farben als Tokens, Dunkelmodus, Akzent Weinrot), Zoom |
| `core.js` | Speicher (`localStorage`), Geräte-Abgleich über GitHub, Hilfsfunktionen |
| `content.js` | Veranstaltungen (`COURSES`), Sitzungsliste (`CHAPTERS`, `c` = vl/se, `no` = angezeigte Nummer) |
| `content_v1.js` | Vorlesung Sitzung 1 aus den Folien: Lektionen, Karten, Selbsttest, Essay-Fragen |
| `content_v1_lit.js` | Sitzung 1, Lektüre der Selbstlernphase (Patzelt, Lauth, Merkel): weitere Lektionen, Karten, Selbsttest, Essays, Reihenfolge der Lektionen |
| `cardinfo.js` | Kontextzeile (Vorderseite) und i-Infos (Rückseite) je Karte |
| `views.js` | Umschalter Vorlesung/Seminar, Lernpfad, Sitzung, Lektionen mit „Verstehe ich nicht“, Karten mit Wiederholungsplan, Üben, Statistik |
| `kreuz.js` | Selbsttest (drei Aussagen, wahr/falsch) |
| `essay.js` | Essay-Trainer (Gliederungshilfe, Erwartungshorizont, Musteressay, für Claude kopieren) und Probe-Essay mit 60-Min.-Timer |
| `start.js` | Start, Zoom, Token aus dem Link |

Herkunft der Inhalte: Folien unmarkiert, Lektüre mit `lit`/`litbox`, sonstige Ergänzungen mit `erg`/`ergbox`.

## Geräte-Abgleich

- Fortschritt liegt als `fortschritt.json` im Zweig `fortschritt` dieses Repos.
- Gerät verbinden: `https://talib47.github.io/Politik-I/#t=<GitHub-Schlüssel>` einmal öffnen.
- Eigene Schlüssel: `p1-lernapp-v1`, `p1-gh-token`, `p1-zoom`.

## Stand der Inhalte

Vorlesung: Sitzung 1 (15.10.) mit Lektüre fertig: 14 Lektionen, 50 Karten, 14 Selbsttests, 8 Essay-Fragen. Lektüretexte liegen aufbereitet im claude.ai-Projekt. Seminar: startet 29.10.

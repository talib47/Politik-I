# Prüfskripte (Muster in Politik I)

Server starten: `cd ~/repos && python3 -m http.server 8766`, dann im Repo:

| Skript | prüft | Aufruf |
|---|---|---|
| `inhalt.js` | Fragenqualität (Länge, Begründungen), doppelte IDs, fett gedruckte Begriffe ohne Übung | `node tools/pruefen/inhalt.js` |
| `oberflaeche.js` | alle Ansichten in iPhone, iPad hoch/quer, hell/dunkel, Schrift 80/180 %: Konsolenfehler, Überlauf, Kontrast AA, Tippflächen, fehlende Beschriftungen | `node tools/pruefen/oberflaeche.js Politik-I <ordner> noshots` |
| `tageseinheit.js` | Tageseinheit für neu, mittendrin, nach Pause, kurz vor der Prüfung | `node tools/pruefen/tageseinheit.js` |
| `lernplan.py` | Minuten bis zur Prüfung je Abend (Mengen der späteren Sitzungen geschätzt, im Skript anpassen) | `python3 tools/pruefen/lernplan.py` |

Für andere Apps: URL bzw. Ansichtsliste in `oberflaeche.js` anpassen.

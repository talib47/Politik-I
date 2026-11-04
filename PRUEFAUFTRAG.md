# Prüfauftrag (schlank)

Wortgleich in allen vier Repos. Aufruf im Chat, zum Beispiel:
„Prüfauftrag. App: Politik I. Umfang: Inhalt.“
App: Politik I, BiWi II, Wirtschaft II, W&G I. Umfang: Inhalt, Lernen, Oberfläche, Technik oder komplett. Ohne Umfang wird nur geprüft, was seit der letzten Prüfung neu ist (Logbuch in CLAUDE.md).

Es gelten alle Regeln aus CLAUDE.md: Lernstand schützen, IDs nie ändern, neue Bausteine erst als Muster in einer App, Brücke pflegen. Frag nur, wenn eine Entscheidung nicht rückgängig zu machen ist.

## Sparsam arbeiten (Kontingent)
- **Erst messen, dann lesen.** Die Prüfskripte in `tools/pruefen/` (Muster in Politik I, siehe `LIESMICH.md`) liefern die Fundliste. Gelesen und korrigiert wird nur, wo sie etwas finden oder wo Stoff neu ist.
- **Unterlagen gezielt lesen:** nur die neuen oder geänderten Sitzungen bzw. Blöcke, sonst eine Stichprobe von 20 Inhalten. Nie alle Texte auf einmal.
- **Keine parallelen Agenten.** Höchstens ein Agent für die Zweitprüfung und nur bei größeren Inhaltsänderungen. Agenten haben keinen Zugriff auf das claude.ai-Projekt, deshalb Quellen vorher als Datei ablegen.
- **Ein Bericht im Chat.** Ein Prüfbericht als Dokument entsteht nur beim Umfang „komplett“, und nur dort wird ein bestehender ergänzt.

## 1. Inhalt
- Fakten gegen die Unterlage: Namen, Jahreszahlen, Definitionen, Zitate mit Seite, Zuordnungen. Ergänzungen markiert, bei Widerspruch gilt die Unterlage.
- Jede prüfungsrelevante Kernaussage hat mindestens eine Übung, denn nur Geübtes wird besser behalten.
- Fragen: genau eine richtige Antwort, Begründung je falscher Option, die richtige Antwort nicht die längste (`inhalt.js`).

## 2. Prüfungspassung
- Je Hälfte einen Probe-Essay bzw. eine Probeklausur im echten Format durchspielen: Ist er in der Zeit schaffbar und nach den Kriterien der Lehrperson bewertbar?
- Zu jedem prüfungsrelevanten Thema gibt es eine Übung im Prüfungsformat.

## 3. Lernen
- Lernplan mit Zahlen gegen 20 bis 40 Minuten an Abenden unter der Woche (`lernplan.py`). Tageseinheit für neu, mittendrin, nach einer Woche Pause und kurz vor der Prüfung (`tageseinheit.js`).
- Forschung nur neu recherchieren, wenn die Lernprinzipien in CLAUDE.md älter als ein Semester sind.

## 4. Oberfläche
- `oberflaeche.js` misst alle Ansichten in diesen Einstellungen: iPhone 390 px, iPad hoch und quer, hell und dunkel, Schrift 80 % und 180 %. Es meldet Konsolenfehler, Überlauf, Kontrast nach WCAG AA, Tippflächen und fehlende Beschriftungen.
- Angesehen werden nur Screenshots der auffälligen Ansichten.

## 5. Technik
- Immer: `node --check`, doppelte IDs, Bauen ohne Warnung.
- Offline-Modus, Update-Check, `norm()` mit altem Stand, Geräte-Abgleich sowie Tageswechsel und Zeitumstellung: nur testen, wenn daran etwas geändert wurde.

## 6. Umsetzen und Bericht
- Kleine Fehler direkt beheben. Größere Umbauten nur als Vorschlag mit Aufwand und Nutzen.
- Bauen, testen (360 px hell und dunkel, iPad), Brücke pflegen, pushen.
- Bericht fürs Handy: Ampel je Bereich, die fünf wichtigsten Funde, was behoben ist, was offen ist und welche Entscheidungen bei Talib liegen.

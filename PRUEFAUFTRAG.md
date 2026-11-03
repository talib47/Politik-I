# Prüfauftrag: Gesamtprüfung einer Lern-App

Wortgleich in allen vier Repos. Aufruf im Chat, zum Beispiel:
„Führe den Prüfauftrag aus. App: Politik I. Umfang: komplett.“
App: Politik I, BiWi II, Wirtschaft II, W&G I oder alle. Umfang: komplett, Inhalt, Oberfläche oder Technik.

Arbeite gründlich und selbstständig und nimm dir die Zeit, die es braucht. Frag nur, wenn eine Entscheidung nicht rückgängig zu machen ist. Es gelten alle Regeln aus CLAUDE.md: Lernstand schützen, IDs nie ändern, neue Bausteine erst als Muster in einer App, Brücke pflegen. Für die Zweitprüfung in Schritt 6 und für unabhängige Teilprüfungen darfst du eigene Agenten einsetzen.

## 0. Vorbereitung
- CLAUDE.md, README und den gesamten Code der App lesen.
- Alle Unterlagen im claude.ai-Projekt sichten (Folien, Texte, Moodle-Screenshots, Verlaufsplan) und ein Inventar anlegen: Datei → Sitzung oder Block → in der App eingebaut ja oder nein.
- Prüfungsformat aus Unterlagen und Modulbeschreibung zusammenfassen: Form, Dauer, Punkte, Operatoren, Bewertungskriterien, Termin. Ohne sicheren Termin gilt der Stichtag 31.01.
- Eine Aufgabenliste mit allen Schritten anlegen.

## 1. Inhalt gegen die Unterlagen (wichtigster Teil)
- Abdeckungsmatrix: Jede Kernaussage, jeder Begriff, jedes Modell und jeder Autor aus den Unterlagen bekommt eine Fundstelle in der App (Lektion, Karte, Frage, Zuordnung, Essay). Markiere Lücken als „fehlt“ und Stoff, der nur gelesen, aber nie geübt wird, als „nicht geübt“.
- Jede Lektion, Karte, Frage, Begründung und Musterlösung mit der Quelle vergleichen: Namen, Jahreszahlen, Definitionen, Zitate mit Seitenzahl, Zuordnungen. Fehler sofort korrigieren, IDs bleiben.
- Alles, was nicht aus den Unterlagen stammt, ist als Ergänzung markiert. Bei Widerspruch gilt die Unterlage.
- Fragenqualität: genau eine eindeutig richtige Antwort, plausible Ablenker, eine Begründung je falscher Option, kein Verraten durch Länge oder Wortwahl, Anforderungsstufen (wiedergeben, erklären, anwenden, beurteilen) passend zu den Operatoren der Prüfung.
- Doppelungen und Widersprüche zwischen Lektion, Karte und Frage finden und auflösen.
- Sprache: korrektes Deutsch, kurz, fürs Handy, überall dieselben Fachbegriffe.

## 2. Passung zur Prüfung
- Die Probeklausur bzw. den Probe-Essay im echten Format und in echter Zeit selbst durchspielen. Stimmen Aufbau, Punkte, Zeit und Bewertungskriterien mit den Unterlagen überein?
- Musterlösungen und Erwartungshorizonte: vollständig, im Umfang in der Prüfungszeit schaffbar, nach den Kriterien der Lehrperson bewertbar.
- Zu jedem prüfungsrelevanten Thema gibt es mindestens eine Übung im Prüfungsformat. Fehlende ergänzen.

## 3. Lernwirksamkeit
- Aktuellen Forschungsstand recherchieren (2023 bis heute, Meta-Analysen bevorzugt): Abrufüben, verteiltes Lernen, successive relearning, Interleaving, Feedback, Elaboration, Selbsteinschätzung, Lernen durch Schreiben. Mit den Lernprinzipien in CLAUDE.md abgleichen und nur begründet nachschärfen.
- Lernplan mit Zahlen durchrechnen: Karten, Fragen und Lektionen mal Wiederholungen bis zum Termin, gegen realistische 20 bis 40 Minuten an Abenden unter der Woche. Ist das schaffbar? Wo staut es sich?
- Tageseinheit für verschiedene Lernstände simulieren: neu, mittendrin, nach einer Woche Pause, kurz vor der Prüfung. Stimmen Auswahl, Länge und Abwechslung?

## 4. Oberfläche und Bedienung
- Screenshots aller Ansichten und Zustände: iPhone (390 px), iPad hoch und quer, hell und dunkel, Schriftgröße 80 % und 180 %, erster Start, leere Zustände, viele fällige Karten, nach der Prüfung.
- Messen statt schätzen: Abstände, Überlauf, abgeschnittener Text, Kontrast nach WCAG AA, Tippflächen mindestens 44 px. Prüfen: Tastatur am iPad (Leertaste, Pfeile, Z, Esc), VoiceOver-Beschriftungen, reduzierte Bewegung und Transparenz.
- Gegen die Gestaltungsregeln in CLAUDE.md prüfen und alle vier Apps nebeneinander auf Einheitlichkeit vergleichen.
- Mikrotexte: Sagt jeder Knopf, was passiert? Helfen leere Zustände weiter?
- Ehrlich bewerten, was die App noch von einer sehr guten App aus dem App Store trennt. Verbesserungen umsetzen, die keine Funktion verschlechtern.

## 5. Technik und Robustheit
- Keine Konsolenfehler, `node --check` ohne Fehler, keine doppelten IDs, Bauen ohne Warnung.
- Offline: laden, Netz trennen, alle Ansichten öffnen. Update-Check mit einer neuen Version prüfen.
- Lernstand: Ein alter Stand wird über `norm()` sauber übernommen. Geräte-Abgleich mit zwei simulierten Geräten testen (Konflikt, leerer Stand, falscher Schlüssel). Tageswechsel um Mitternacht und Zeitumstellung prüfen.
- Leistung: Größe der index.html, Ladezeit, flüssiges Wischen.

## 6. Unabhängige Zweitprüfung
- Ein eigener Agent, der deine Arbeit nicht gesehen hat, prüft eine Zufallsstichprobe von mindestens 30 Inhalten gegen die Unterlagen und dazu alle deine Korrekturen. Abweichungen klären, bevor du abschließt.

## 7. Umsetzen und abschließen
- Kleine Fehler direkt beheben. Größere Umbauten nur als Vorschlag mit Aufwand und Nutzen; neue Bausteine erst als Muster in einer App.
- Bauen, testen (360 px hell und dunkel, iPad), Brücke pflegen (Logbuch, Bausteine, Abschnitt „Gemeinsam“ in alle Repos), pushen.

## 8. Bericht
- Kurzfassung im Chat, fürs Handy: Ampel je Bereich (Inhalt, Prüfungspassung, Lernwirksamkeit, Oberfläche, Technik), die fünf wichtigsten Funde, was behoben ist, was offen ist und welche Entscheidungen bei mir liegen.
- Ausführlicher Prüfbericht als Dokument zum Behalten: Abdeckungsmatrix, Fehlerliste (Fundstelle, vorher, nachher, Quelle), Messwerte der Oberfläche und die Quellen der Recherche.

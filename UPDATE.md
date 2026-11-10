# Update: neue Unterlagen einbauen

Wortgleich in allen vier Repos. Gilt, wenn Talib im Projekt eines Fachs „Update“ schreibt, auch über den Knopf „Unterlagen aktualisieren“ in der App. Keine Rückfrage, außer eine Entscheidung ist nicht rückgängig zu machen. Gründlich statt schnell: Lieber eine Sitzung sauber als drei halb.

## 1. Was ist neu?
- Dateien im claude.ai-Projekt (`project_info`) mit `UPLOADS` der App vergleichen.
- Bei einer wachsenden Datei (etwa dem Foliensatz in BiWi II) die neue Fassung mit dem eingebauten Stand vergleichen und nur die neuen Sitzungen nehmen.
- Moodle-Screenshots auswerten: Umfang (`known:true`), Termine, ausgefallene Sitzungen, Art der Unterlagen.
- Fehlt `APP.projectUrl`, die Adresse dieses Projekts eintragen. Die ID steht im Pfad des Projekt-Speichers `/projects/<id>/`, die Adresse ist dann `https://claude.ai/project/<id>`.

## 2. Ganz lesen
- Jede neue Datei vollständig lesen, nicht nur überfliegen. Folien mit Bildern als Seiten ansehen, wenn der Text allein nicht reicht.

## 3. Einbauen wie die bisherigen Sitzungen
- Aufbau, Umfang und Bausteine wie die vorhandenen Sitzungen dieser App: Lektionen, Karten, Verständnisfragen mit Begründung je falscher Option, Zuordnungen, Begriffe und Übungen im Prüfungsformat.
- Jede prüfungsrelevante Kernaussage bekommt mindestens eine Übung. Seitenangaben und Folienangaben gehören dazu.
- Ergänzungen sind markiert (`erg`, `lit`). Bei Widerspruch gilt die Unterlage.
- Nur neue IDs vergeben. Alte IDs nie ändern.

## 4. Prüfen
- `tools/pruefen/inhalt.js`, wo vorhanden: Die richtige Antwort darf nicht die längste sein, jede falsche Option braucht eine Begründung, keine doppelten IDs.
- Fünf neue Inhalte stichprobenartig gegen die Quelle lesen.
- Bauen, `node --check`, Test bei 360 px hell und dunkel.

## 5. Abschließen
- Neuer `UPLOADS`-Eintrag mit Einzeldateien und `added` (heutiges Datum).
- `APP.expect` prüfen: Stimmt das Muster noch? Was ein Screenshot geklärt hat, in `APP.expect` und „Nur diese App“ eintragen.
- Brücke pflegen (Logbuch, Bausteine, Abschnitt „Gemeinsam“ in alle Repos) und pushen.

## 6. Antwort fürs Handy
- Je neuer Sitzung eine Zeile mit dem Umfang, zum Beispiel: „Sitzung 3 Lernen II: 6 Lektionen, 24 Karten, 18 Fragen.“
- Dann, was laut Block „Unterlagen“ noch fehlt. Ist ein Muster unsicher, einmal um einen Moodle-Screenshot bitten.

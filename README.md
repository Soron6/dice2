# Iron Dice Roller

Iron Dice Roller ist eine Webanwendung für Tabletop-Rollenspiele, insbesondere für solche, die einen W6 (6-seitigen Würfel) und zwei W10 (10-seitige Würfel) für Aktions- und Herausforderungsauflösungen verwenden. Diese App ist speziell auf Systeme wie Ironsworn zugeschnitten, kann aber für ähnliche Spielmechaniken angepasst werden.

## Inhaltsverzeichnis

1. [Zweck](#zweck)
2. [Hauptfunktionen](#hauptfunktionen)
3. [Benutzeroberfläche](#benutzeroberfläche)
4. [Funktionalität](#funktionalität)
5. [Dateistruktur](#dateistruktur)
6. [Einrichtung und Verwendung](#einrichtung-und-verwendung)
7. [Mitwirken](#mitwirken)
8. [Lizenz](#lizenz)

## Zweck

Die App simuliert Würfelwürfe für Spielaktionen oder Herausforderungen, berechnet Ergebnisse basierend auf benutzerdefinierten Modifikatoren und zeigt das Ergebnis mit visueller und akustischer Rückmeldung an.

## Hauptfunktionen

- Umschalten zwischen "Aktion" und "Herausforderung" Modi
- Einstellbarer Modifikatorwert
- Optionale Themeneingabe für jeden Wurf
- Animierter Würfelwurf mit sich überlappenden Soundeffekten
- Ergebnisanzeige mit Erfolgstyp, Modifikator und einzelnen Würfelergebnissen
- Dunkelmodus-Umschaltung
- Ergebnishistorie mit erweiterbarer/zusammenklappbarer Ansicht
- Funktion zum Löschen der Ergebnisse
- Seitenleiste für Einstellungen und zusätzliche Funktionen
- Export und Import von Ergebnissen als CSV
- Sound-Umschaltungsoption
- Statistikanzeige mit Kreisdiagramm

## Benutzeroberfläche

- Logo: "IRON DICE ROLLER" in metallischem Text
- Aktion/Herausforderung Umschaltknopf
- Modifikator-Anpassung (+/-) Knöpfe und Eingabefeld
- Themeneingabefeld
- Würfelknopf
- Animierter Würfelanzeigebereich
- Ergebnishistoriebereich mit erweiterbarer/zusammenklappbarer Funktionalität
- Seitenleiste mit Einstellungen und zusätzlichen Funktionen (Dunkelmodus, Sound-Umschaltung, CSV-Export/Import, Ergebnisse löschen, Statistiken)

## Funktionalität

- Aktionswürfe verwenden 1W6 + 2W10 + Modifikator (begrenzt auf 10)
- Herausforderungswürfe verwenden 2W10 + Modifikator (begrenzt auf 10)
- Erfolgstypen: "Voller Erfolg", "Teilerfolg", "Fehlschlag"
- Epische Würfe treten auf, wenn beide W10 die gleiche Zahl zeigen
- Ergebnisse werden im lokalen Speicher gespeichert und können gelöscht werden
- Dunkelmodus- und Soundeinstellungen bleiben über Sitzungen hinweg erhalten
- Ergebnisse können als CSV-Dateien exportiert und importiert werden
- Statistiken können in einem Popup mit Kreisdiagramm angezeigt werden

## Dateistruktur

```
iron-dice-roller/
│
├── index.html
├── css/
│   ├── main.css
│   ├── cards.css
│   ├── inputs.css
│   ├── results.css
│   ├── animations.css
│   ├── side-panel.css
│   ├── responsive.css
│   └── dark-mode.css
│
├── js/
│   ├── config.js
│   ├── storageManager.js
│   ├── resultManager.js
│   ├── diceRoller.js
│   ├── uiManager.js
│   ├── eventListeners.js
│   ├── sidePanelManager.js
│   ├── messageManager.js
│   ├── exportImport.js
│   ├── statisticsManager.js
│   ├── statisticsUI.js
│   ├── soundManager.js
│   ├── diceAnimator.js
│   ├── settingsStorage.js
│   ├── resultStorage.js
│   ├── uiHelper.js
│   └── script.js
│
├── assets/
│   ├── header_text.png
│   ├── roll.mp3
│   ├── de/VollerErfolg.mp3
│   ├── de/Teilerfolg.mp3
│   ├── de/Fehlschlag.mp3
│   ├── de/episch.mp3
│   ├── d6.png
│   ├── d10.png
│   ├── vollerErfolg.png
│   ├── Teilerforg.png
│   ├── Fehlschlag.png
│   ├── episch.png
│   ├── arrow_down.png
│   └── arrow_up.png
```

### Dateibeschreibungen:

1. `index.html`: Enthält die Grundstruktur der App und lädt alle notwendigen CSS- und JavaScript-Dateien.

2. CSS-Dateien:
   - `main.css`: Allgemeine Stile und Layout
   - `cards.css`: Stile für Eingabe- und Ergebniskarten
   - `inputs.css`: Stile für Eingabeelemente
   - `results.css`: Stile für die Ergebnisanzeige
   - `animations.css`: Definiert Würfelwurf-Animationen
   - `side-panel.css`: Stile für die Seitenleiste
   - `responsive.css`: Media Queries für Responsivität
   - `dark-mode.css`: Spezifische Stile für den Dunkelmodus

3. JavaScript-Dateien:
   - `config.js`: Enthält anfängliche Konfigurationseinstellungen und globale Variablen
   - `storageManager.js`: Zentraler Punkt für Import und Export speicherbezogener Funktionen
   - `resultManager.js`: Verwaltet Erstellung und Anzeige von Ergebniskarten
   - `diceRoller.js`: Handhabt Würfellogik, Ergebnisberechnung und -anzeige
   - `uiManager.js`: Zentraler Punkt für Import und Export UI-bezogener Funktionen
   - `eventListeners.js`: Richtet Event-Listener für verschiedene UI-Elemente ein
   - `sidePanelManager.js`: Verwaltet die Funktionalität der Seitenleiste
   - `messageManager.js`: Handhabt die Anzeige von Nachrichten und Bestätigungen
   - `exportImport.js`: Verwaltet CSV-Export- und Importfunktionalität
   - `statisticsManager.js`: Berechnet und verwaltet Statistiken
   - `statisticsUI.js`: Handhabt die Anzeige von Statistiken, einschließlich des Kreisdiagramms
   - `soundManager.js`: Verwaltet Soundeffekte und -einstellungen
   - `diceAnimator.js`: Handhabt die Animation von Würfelwürfen
   - `settingsStorage.js`: Handhabt das Speichern und Laden von App-Einstellungen
   - `resultStorage.js`: Verwaltet das Speichern und Laden von Wurfergebnissen
   - `uiHelper.js`: Enthält Hilfsfunktionen für UI-bezogene Aufgaben
   - `script.js`: Haupt-JavaScript-Datei, die die App initialisiert und andere Module koordiniert

4. Assets:
   - `header_text.png`: Logo-Bild
   - `roll.mp3`: Soundeffekt für Würfelwurf
   - `de/VollerErfolg.mp3`: Sound für vollen Erfolg (Deutsch)
   - `de/Teilerfolg.mp3`: Sound für Teilerfolg (Deutsch)
   - `de/Fehlschlag.mp3`: Sound für Fehlschlag (Deutsch)
   - `de/episch.mp3`: Sound für epischen Wurf (Deutsch)
   - `d6.png`, `d10.png`: Würfelbilder für Animation
   - `vollerErfolg.png`, `Teilerforg.png`, `Fehlschlag.png`: Ergebnissymbole
   - `episch.png`: Symbol für epische Würfe
   - `arrow_down.png`, `arrow_up.png`: Symbole für erweiterbare/zusammenklappbare Ergebnisse

## Einrichtung und Verwendung

1. Klonen Sie das Repository oder laden Sie den Quellcode herunter.
2. Öffnen Sie die `index.html`-Datei in einem modernen Webbrowser.
3. Die App wird geladen und initialisiert alle notwendigen Komponenten:
   - Die HTML-Struktur wird gerendert
   - CSS-Dateien werden geladen und Stile progressiv angewendet
   - JavaScript-Dateien werden geladen und ausgeführt, um die Funktionalität der App einzurichten
4. Verwenden Sie die Benutzeroberfläche, um Ihren Modifikator einzustellen, zwischen Aktions- und Herausforderungsmodus zu wählen und die Würfel zu werfen.
5. Erkunden Sie zusätzliche Funktionen wie Dunkelmodus, Soundeinstellungen und Statistiken in der Seitenleiste.

## Mitwirken

Beiträge zum Iron Dice Roller sind willkommen! Bitte zögern Sie nicht, Pull-Requests einzureichen, Issues zu erstellen oder die Anwendung weiterzuempfehlen.

## Lizenz

[MIT-Lizenz](LICENSE)
# SingAPu-Bildertransfer
Dieses JavaScript-basierte Skript für Adobe Photoshop automatisiert den Import, die Farbmodus-Konvertierung, die intelligente Skalierung und den Export von Bilddateien für Web-Workflows. Es ist darauf optimiert, große Mengen an Dateien (inklusive EPS und SVG) effizient zu verarbeiten und dabei spezifische Qualitäts- und Größenrichtlinien einzuhalten.

## Funktionsumfang
Das Skript führt vollautomatisch folgende Schritte aus:
- Multi-Format Import: Unterstützt den Import von Standardformaten (`.psd`, `.tif`, `.png`, `.jpg`, `.webp`) sowie Vektorgrafiken (`.eps`, `.svg`) mit vordefinierten Raster-Optionen (300 dpi, RGB).
- Farbmodus-Korrektur: Konvertiert Dokumente automatisch in den RGB-Modus. Bitmap-Dateien werden dabei über den Graustufen-Modus zwischenkonvertiert, um Verluste zu minimieren.
- Intelligente Skalierung:
  - Bilder mit einer Auflösung über 2 Millionen Pixeln werden automatisch auf eine Zielgröße skaliert, die knapp unter der 2-Millionen-Pixel-Grenze liegt (ca. 1,99 Mio. Pixel), um Speicherplatz zu optimieren.
  - Das Seitenverhältnis bleibt dabei strikt erhalten.
- Automatisierter Export:
  - Bilder zwischen 1,4 und 2 Mio. Pixeln werden mit einer JPEG-Qualität von 50% exportiert.
  - Kleinere Bilder werden mit einer Qualität von 70% exportiert.
  - Alle Dateien erhalten das Suffix `.tif_fmt1.jpg`.
- Stellt die ursprünglichen Photoshop-Einheiten (Lineale, Einheiten) nach dem Durchlauf wieder her.

## Installation und Einrichtung
1. Neueste Skript-Version herunterladen: https://github.com/mschuetze/SingAPu-Bildertransfer/releases
2. Heruntergeladenes ZIP entpacken
3. .jsx-Datei in den Photoshop-Skripte-Ordner deines Systems kopieren:
  - **macOS**: `/Programme/Adobe Photoshop [Version]/Presets/Scripts`
  - **Windows**: `C:\Programme\Adobe\Adobe Photoshop [Version]\Presets\Scripts`
4. Photoshop neu starten

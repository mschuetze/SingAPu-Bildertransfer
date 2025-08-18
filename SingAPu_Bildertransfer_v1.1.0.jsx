// SingAPu_Bildertransfer_v1.1.0.jsx

// Photoshop-Voreinstellungen speichern - werden später wieder benötigt
startRulerUnits = app.preferences.rulerUnits
startTypeUnits = app.preferences.typeUnits
startDisplayDialogs = app.displayDialogs

// neue Photoshop-Voreinstellungen erstellen - überschreiben die ursprünglichen Voreinstellungen
app.preferences.rulerUnits = Units.PIXELS
app.preferences.typeUnits = TypeUnits.POINTS
app.preferences.pointSize = PointType.POSTSCRIPT
app.displayDialogs = DialogModes.NO

// EPS-Importoptionen festlegen
var EPSOpenOptions = new EPSOpenOptions
EPSOpenOptions.antiAlias = true
EPSOpenOptions.mode = OpenDocumentMode.RGB
EPSOpenOptions.resolution = 300
EPSOpenOptions.constrainProportions = true

// Quellordner auswählen
var myInputFolder = Folder.selectDialog ("Ordner mit Ausgangsdateien wählen.");
if(myInputFolder!=null){
	// alle Bilddateien, außer EPS + SVG öffnen - wird separat behandelt
	var myFiles = myInputFolder.getFiles(/.(psd|tif|tiff|png|jpg|jpeg|svg|bmp|webp)$/i);
	for(var fileIndex=0;fileIndex<myFiles.length;fileIndex++){
		var tempDoc = app.open(myFiles[fileIndex]);
	}
	// alle EPS + SVG Dateien zusätzlich öffnen
	var myFiles = myInputFolder.getFiles(/.(eps)$/i);
	for(var fileIndex=0;fileIndex<myFiles.length;fileIndex++){
		var tempDoc = app.open(myFiles[fileIndex], EPSOpenOptions);
	}
	// Zielordner auswählen
	var destFolder = (myInputFolder + "/../output");
	if(destFolder!=null){
		while(app.documents.length > 0) {
			for (i=0; i < app.documents.length; i++) {
				doc = app.documents[i];
				app.activeDocument = doc;
				// define total pixel count.    
				var OutputResolution = doc.width*doc.height;
				// get name of the file.    
				var Name = doc.name.replace(/\.[^\.]+$/, '');
				// set the JPG-export-options for scaled down (big) images.
				var options1 = new ExportOptionsSaveForWeb();
				options1.quality = 50;   // Start with highest quality (biggest file).
				options1.format = SaveDocumentType.JPEG;   // Or it'll default to GIF. 
				// set the JPG-export-options for small images.
				var options2 = new ExportOptionsSaveForWeb();
				options2.quality = 70;   // Start with highest quality (biggest file).
				options2.format = SaveDocumentType.JPEG;   // Or it'll default to GIF. 
				// change the color mode to RGB.
				// check if mode is BITMAP –> needs to be changed to GRAYSCALE first
				if (doc.mode == DocumentMode.BITMAP) {
					doc.changeMode(ChangeMode.GRAYSCALE);
				}
				doc.changeMode(ChangeMode.RGB);
				// check if image has more than 1.4 but less than 2 million pixels.
				if (OutputResolution > 1400000 && OutputResolution < 2000000) {
					// save with quality 50%.
					doc.exportDocument(new File(destFolder + "/" + Name + ".tif_fmt1" + ".jpg"), ExportType.SAVEFORWEB, options1);
					// close (original file) without saving.
					doc.close(SaveOptions.DONOTSAVECHANGES);
				}
				// check if image has more than 2 million pixels.
				else if (OutputResolution > 2000000) {
					var OutputHeight = Math.sqrt(1990000/(doc.width/doc.height));
					doc.resizeImage(null,OutputHeight,72,ResampleMethod.BICUBICSHARPER);
					// save.
					doc.exportDocument(new File(destFolder + "/" + Name + ".tif_fmt1" + ".jpg"), ExportType.SAVEFORWEB, options1);
					// close (original file) without saving.
					doc.close(SaveOptions.DONOTSAVECHANGES);
				}
				else {
					// save with quality 70%.
					doc.exportDocument(new File(destFolder + "/" + Name + ".tif_fmt1" + ".jpg"), ExportType.SAVEFORWEB, options2);
					// close (original file) without saving.
					doc.close(SaveOptions.DONOTSAVECHANGES);
				}
			}
		}
	}
	else {
		alert("Abbruch durch Nutzer. Bitte Skript neu starten.");
		while (documents.length > 0) {
			activeDocument.close(SaveOptions.DONOTSAVECHANGES);
		}
	}
}

else {
    alert("Abbruch durch Nutzer. Bitte Skript neu starten.");
}

// Ursprüngliche Photoshop-Voreinstellungen wieder herstellen
app.preferences.rulerunits = startRulerUnits
app.preferences.typeunits = startTypeUnits
app.displayDialogs = startDisplayDialogs
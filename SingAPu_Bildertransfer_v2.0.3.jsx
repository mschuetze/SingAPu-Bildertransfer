// SingAPu_Bildertransfer_v2.0.3.jsx

// 1. Voreinstellungen sichern
var startRulerUnits = app.preferences.rulerUnits;
var startTypeUnits = app.preferences.typeUnits;
var startDisplayDialogs = app.displayDialogs;

app.preferences.rulerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.POINTS;
app.displayDialogs = DialogModes.NO;

// 2. Hauptprozess
var myInputFolder = Folder.selectDialog("Ordner mit Ausgangsdateien wählen.");

if (myInputFolder != null) {
    
    // 🔧 FIX: robuster Datei-Filter
    var myFiles = myInputFolder.getFiles(function(f) {
        return f instanceof File && 
               f.name.match(/\.(psd|tif|tiff|png|jpg|jpeg|bmp|webp)$/i) &&
               !f.name.match(/^(\._|\.DS_Store)/);
    });

    for (var i = 0; i < myFiles.length; i++) {
        app.open(myFiles[i]);
    }
    
    // EPS + SVG separat behandeln
    var mySpecialFiles = myInputFolder.getFiles(function(f) {
    return f instanceof File &&
           f.name.match(/\.(eps|svg)$/i) &&
           !f.name.match(/^(\._|\.DS_Store)/);
    });

    for (var j = 0; j < mySpecialFiles.length; j++) {
        try {
            var epsOptions = new EPSOpenOptions(); 
            epsOptions.antiAlias = true;
            epsOptions.mode = OpenDocumentMode.RGB;
            epsOptions.resolution = 300;
            app.open(mySpecialFiles[j], epsOptions);
        } catch (e) {
            app.open(mySpecialFiles[j]);
        }
    }

    var destFolder = new Folder(myInputFolder.parent + "/output");
    if (!destFolder.exists) destFolder.create();

    while (app.documents.length > 0) {
        var doc = app.activeDocument;
        
        var w = doc.width.as("px");
        var h = doc.height.as("px");
        var outputRes = w * h;
        var fileName = doc.name.replace(/\.[^\.]+$/, '');
        
        var opt = new ExportOptionsSaveForWeb();
        opt.format = SaveDocumentType.JPEG;
        opt.quality = (outputRes > 1400000) ? 50 : 70;

        if (doc.mode == DocumentMode.BITMAP) doc.changeMode(ChangeMode.GRAYSCALE);
        doc.changeMode(ChangeMode.RGB);

        if (outputRes > 2000000) {
            var ratio = w / h;
            var newHeight = Math.sqrt(1990000 / ratio);
            doc.resizeImage(null, UnitValue(newHeight, "px"), 72, ResampleMethod.BICUBICSHARPER);
        }

        var saveFile = new File(destFolder + "/" + fileName + ".tif_fmt1.jpg");
        doc.exportDocument(saveFile, ExportType.SAVEFORWEB, opt);
        doc.close(SaveOptions.DONOTSAVECHANGES);
    }
} else {
    alert("Abbruch durch Nutzer.");
}

// 3. Reset
app.preferences.rulerUnits = startRulerUnits;
app.preferences.typeUnits = startTypeUnits;
app.displayDialogs = startDisplayDialogs;
app.bringToFront();
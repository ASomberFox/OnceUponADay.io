var images = {};

function preloadImage(key, url) {
    const img = new Image();
    img.src = url;
    images[key] = img;
}



var story = [];

function loadStoryData(url) {
    
}

function csvToJSON(csv) {
    var lines = csv.split("\n");
    var result = [];
    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
        var obj = {};
        if (lines[i].trim() === "") continue; // Skip empty lines
        var currentline = lines[i].split(",");
        for (var j = 0; j < headers.length; j++) {
            obj[headers[j].trim()] = currentline[j];
        }
        result.push(obj);
    }
    console.log(result);
    return result;
}

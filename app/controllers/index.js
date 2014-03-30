var XHR = require('xhr');
Alloy.Globals.xhr = new XHR();

var d = function(obj) {
    Ti.API.info(obj);
}

var url = 'http://api.tiqav.com/search.json?q=%E3%82%B8%E3%83%A7%E3%82%B8%E3%83%A7';
var data = [];

function onSuccessCallback (e) {
    var images = JSON.parse(e.data);

    _.each(images, function(image, index) {
        var url = String.format('http://img.tiqav.com/%s.%s', image.id, image.ext);
        data.push({
            id : index,
            small : url
        });
    });

    $.imageGrid.init(data);
}
function onErrorCallback () {
}
Alloy.Globals.xhr.get(url, onSuccessCallback, onErrorCallback);

$.index.open();




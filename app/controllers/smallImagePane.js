exports.init = function (images, word) {
    $.smallImagePane.removeAllChildren();

    var images = images || [];
    var word = word || 'ドラえもん';
    var URI_SEARCH = 'http://api.tiqav.com/search.json?q=' + word;

    Alloy.Globals.xhr.get(URI_SEARCH, onSuccessCallback, onErrorCallback);

    function onSuccessCallback(e) {
        var res = JSON.parse(e.data);

        _.each(res, function (image, index) {
            var url = String.format('http://img.tiqav.com/%s.%s', image.id, image.ext);
            image.url = url;
            $.smallImagePane.add(Alloy.createController('smallImage', image).getView());
        });
    }

    function onErrorCallback(e) {
        // On Error
    }

};

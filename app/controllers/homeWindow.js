var args = arguments[0] || {};

refresh();

$.searchBar.addEventListener('return', function (e) {
    refresh([], e.value);
    $.searchBar.blur();
    $.maskView.visible = false;
});
$.searchBar.addEventListener('focus', function(e) {
    $.maskView.visible = true;
});
$.searchBar.addEventListener('blur', function(e) {
    $.maskView.visible = false;
});

$.maskView.addEventListener('singletap', function(e) {
    $.searchBar.blur();
    $.maskView.visible = false;
});

function refresh(images, word) {
    var images = images || [];
    var URI_SEARCH = 'http://api.tiqav.com/';
    URI_SEARCH += (word) ? 'search.json?q=' + word : 'search/newest.json';

    Alloy.Globals.xhr.get(URI_SEARCH, onSuccessCallback, onErrorCallback);

    function onSuccessCallback(e) {
        var res = JSON.parse(e.data);
        var images = Alloy.createCollection('Image');

        _.each(res, function (value, index) {
            var image = Alloy.createModel('Image', {
                image_id: value.id,
                source_url: value.source_url,
                ext: value.ext
            });
            images.add(image);
        });
        $.smallImagePane.setImages(images);
    }
    function onErrorCallback(e) {
        // On Error
    }
}

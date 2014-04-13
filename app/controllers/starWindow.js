var args = arguments[0] || {};

var starList = Ti.App.Properties.getObject('starList') || {};
//$.smallImagePane.setImages(starList);

$.maskView.addEventListener('singletap', function(e) {
    $.maskView.visible = false;
});


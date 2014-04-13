var args = arguments[0] || {};

var image = args.image;

// Display the activity indicator
$.indicator.show();

var animation = require('alloy/animation');

$.smallImage.addEventListener('singletap', function (e) {
    var imageDetail = Alloy.createController('imageDetail', {image: image}).getView();
    imageDetail.open();
});

// Fetch the small image and cache it for ttl minutes
Alloy.Globals.xhr.get(
        image.get('url'), 
        onImageSuccess, 
        onImageFail,
        {
            ttl: Alloy.CFG.xhr_ttl,
            contentType: "image/*" 
        }
);

// When the image fetching succeeds
function onImageSuccess(e) {
    // Assign the blob to the image
    var imgView = Ti.UI.createImageView({image: e.data});
    var blob = imgView.toBlob();
    var range = Math.min(blob.width, blob.height);
    var dimension = {x: 0, y: 0, height: range, width: range};
    $.smallImage.image = blob.imageAsCropped(dimension);

    // Do a "fade in" of the image
    animation.popIn($.smallImage);

    // Hide the indicator
    $.indicator.hide();
};

function onImageFail(e) {
    Ti.API.info(e);
};


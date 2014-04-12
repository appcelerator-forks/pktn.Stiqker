var args = arguments[0] || {};

// Display the activity indicator
$.indicator.show();

var animation = require('alloy/animation');

// Apply the arguments to the image
$.smallImage.applyProperties({
    imageId: args.id,
    url: args.url,
    isStar : args.isStar
});

$.smallImage.addEventListener('singletap', function (e) {
    var imageDetail = Alloy.createController('imageDetail', e.source).getView();
    imageDetail.open();
    return;
});

// Fetch the small image and cache it for 10 minutes
Alloy.Globals.xhr.get(
        args.url, 
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
    // $.smallImage.image = e.data;
    var imgView = Ti.UI.createImageView({image: e.data});


    //var blob = $.smallImage.toBlob();
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


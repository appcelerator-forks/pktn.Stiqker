var args = arguments[0] || {};

// Display the activity indicator
$.indicator.show();

// Init the XHR module
var XHR = require("/xhr");
var animation = require('alloy/animation');

// Apply the arguments to the image
$.image.applyProperties({
    imageId: args.id,
    urlLarge: args.large,
    urlSmall: args.small
});

$.image.addEventListener('singletap', function (e) {
    var Pb = require('jp.hsj.ticustompasteboard');
    Pb.setImageToLine($.image.image);
    Ti.API.info(1);
});

// Fetch the small image and cache it for 10 minutes
new XHR().get(args.small, onImageSuccess, onImageFail, { ttl: 0, contentType: "image/*" });

// When the image fetching succeeds
function onImageSuccess(e) {
    // Assign the blob to the image
    $.image.image = e.data;

    var blob = $.image.toBlob();
    var range = Math.min(blob.width, blob.height);
    var dimension = {x: 0, y: 0, height: range, width: range};
    $.image.image = blob.imageAsCropped(dimension);

    // Do a "fade in" of the image
    animation.popIn($.image);

    // Hide the indicator
    $.indicator.hide();
};

function onImageFail(e) {
    Titanium.API.info(e);
};


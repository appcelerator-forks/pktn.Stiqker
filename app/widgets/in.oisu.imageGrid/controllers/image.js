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
		var scrollView = Ti.UI.createScrollView({
				contentWidth: 'auto',
				contentHeight: 'auto',
				showVerticalScrollIndicator: true,
				showHorizontalScrollIndicator: true,
				maxZoomScale: 10,
				minZoomScale: 0.5
		});
		var imgView = Ti.UI.createImageView({
				width: Ti.Platform.displayCaps.platformWidth,
				image: urlLarge,
				preventDefaultImage: true
		});
		scrollView.add(imgView);

		var view = Ti.UI.createView({
				backgroundColor: "#000",
				opacity: 0.8
		});
		var win = Ti.UI.createWindow({
		});
		win.addEventListener('singletap', function() {
				win.close();
		});
		win.add(view);
		win.add(scrollView);
		win.open();
		return;

    //var Pb = require('jp.hsj.ticustompasteboard');
    //Pb.setImageToLine($.image.image);
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


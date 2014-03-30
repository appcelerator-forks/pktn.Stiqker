/**
 * Attempt to instantiate the XHR module, this is required to use
 * widget so let's display a nice informative error message if the
 * user doesn't have it installed. But, who doesn't? :)
 */
try {
    var XHR = require("/xhr");
} catch (e) {
    throw "Please download the module located at http://github.com/raulriera/XHR and drop it into your /app/lib folder before continuing to use this widget";
}

/**
 * @method init
 * This will accept the initial configuration of the widget
 * pass the images you wish to display and the default gutter
 * size between them
 * @param {Array} images array of objects.
 */
exports.init = function (images) {
    // For every image passed
    _.each(images, function (image, index) {
        $.container.add(Widget.createController('image', image).getView());
    });
};

// Append images to the scrollview
exports.appendImages = function (images) {

};

// Clean all expired cached images
new XHR().clean();

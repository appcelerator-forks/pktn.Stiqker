exports.setImages = function(images) {
    $.smallImagePane.removeAllChildren();

    images.map(function (image) {
        var imageId = image.get('image_id');
        var ext = image.get('ext');
        var url = String.format('http://img.tiqav.com/%s.%s', imageId, ext);
        image.set({url : url});

        var smallImage = Alloy.createController('smallImage', {image: image}).getView();
        $.smallImagePane.add(smallImage);
    });
};

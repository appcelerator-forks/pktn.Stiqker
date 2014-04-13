var args = arguments[0] || {};

var image = args.image;
var imageId = image.get('image_id');
var url = image.get('url');
$.bigImage.image = url;

// fetch images
var images = Alloy.createCollection('Image');
images.fetch();

// set starImage
var isStar= images.where({
    image_id : imageId,
    is_star : 1
}).length;
setStarImage(isStar);

// close window
$.bigImage.addEventListener('singletap', function(e) {
    $.imageDetail.close();
});

// controlBar - star
$.controlBar.starBtn.addEventListener('singletap', function(e) {
    isStar = !isStar;
    setStarImage(isStar);

    var is_star = (isStar) ? 1 : 0;
});
// controlBar - line
$.controlBar.lineBtn.addEventListener('singletap', function(e) {
    var line = 'line://msg/text/';
    if (Ti.Platform.canOpenURL(line)) {
        Alloy.Globals.pb.setImageToLine($.bigImage.toBlob());
    } else {
        var dialog = Ti.UI.createAlertDialog({ok: 'OK', title: '', message: 'LINEに画像を送ることができません。'});
        dialog.show();
    }
});
// controlBar - export
$.controlBar.exportBtn.addEventListener('singletap', function(e) {
    Alloy.Globals.social.activityView({
        image: url,
        removeIcons:"print,contact"
    },[
    {
        title:"Safariで開く",
        type:"open.safari",
        image:"global.png",
        callback: function(e) {
            var tiqavUrl = String.format('http://tiqav.com/%s', imageId);
            Ti.Platform.openURL(tiqavUrl);
        }
    }
    ]);
});

function setStarImage(isStar) {
    $.controlBar.starBtnImage.image = (isStar) ? 'star_blight.png' : 'star.png';
}

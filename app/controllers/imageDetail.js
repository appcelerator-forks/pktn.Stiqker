var args = arguments[0] || {};

$.bigImage.image = args.url;

var starList = Ti.App.Properties.getObject('starList') || {};
var isStar = args.imageId in starList;
setStarImage(isStar);

$.imageDetail.addEventListener('singletap', function(e) {
    $.imageDetail.close();
});

$.controlBar.starBtn.addEventListener('singletap', function(e) {
    isStar = !isStar;
    setStarImage(isStar);

    if (args.imageId in starList) {
        delete starList[args.imageId];
    } else {
        starList[args.imageId] = {
            imageId: args.imageId,
            url : args.url
        };
    }
    Ti.App.Properties.setObject('starList', starList);
});

$.controlBar.exportBtn.addEventListener('singletap', function(e) {
    Alloy.Globals.social.activityView({
        image: args.url,
        removeIcons:"print,contact"
    },[
    {
        title:"Safariで開く",
        type:"open.safari",
        image:"global.png",
        callback: function(e) {
            var tiqavUrl = String.format('http://tiqav.com/%s', args.imageId);
            Ti.Platform.openURL(tiqavUrl);
        }
    }
    ]);
});

function setStarImage(isStar) {
    $.controlBar.starBtnImage.image = (isStar) ? 'star_blight.png' : 'star.png';
}

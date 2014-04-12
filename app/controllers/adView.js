var args = arguments[0] || {};

var nend = require('net.nend');
var adView = nend.createView({
    backgroundColor: 'transparent',
    spotId: Alloy.CFG.nend_spotId,
    apiKey: Alloy.CFG.nend_apikey,
    width: Ti.Platform.displayCaps.platformWidth,
    height: 50,
    top : 0,
    bottom : 0
});

$.container.add(adView);

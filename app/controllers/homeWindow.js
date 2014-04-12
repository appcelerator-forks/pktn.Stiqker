var args = arguments[0] || {};

$.searchBar.addEventListener('return', function (e) {
    $.smallImagePane.init([], e.value);
    $.searchBar.blur();
    $.maskView.visible = false;
});
$.searchBar.addEventListener('focus', function(e) {
    $.maskView.visible = true;
});
$.searchBar.addEventListener('blur', function(e) {
    $.maskView.visible = false;
});

$.maskView.addEventListener('singletap', function(e) {
    $.searchBar.blur();
    $.maskView.visible = false;
});

$.smallImagePane.init();


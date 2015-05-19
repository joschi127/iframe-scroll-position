// Use this script in the page that is hosting the iframe.
// It will send the scroll position of the parent frame to the iframe content window.
// Use `iframeScrollPosition.contentWindow.js` in the page contained within your iframe to receive the scroll position.
$(document).ready(function() {
    var iframes = $("iframe");
    iframes.each(function(index, iframeElem) {
        var iframe = $(iframeElem);
        var sendScrollPosition = function () {
            var data = {
                left: $(window).scrollLeft(),
                top: $(window).scrollTop(),
                offsetLeft: $(window).scrollLeft() - iframe.offset().left,
                offsetTop: $(window).scrollTop() - iframe.offset().top
            };
            iframeElem.contentWindow.postMessage("parentScrollPosition:" + JSON.stringify(data), "*");
        };
        iframe.on('load', sendScrollPosition);
        $(window).scroll(sendScrollPosition);
    });
});

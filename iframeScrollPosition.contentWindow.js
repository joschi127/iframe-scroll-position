// Use this script in the page contained within your iframe.
// It will fire a custom event `parent-scroll` when the parent frame has loaded the `iframeScrollPosition.js`.
// Listen to the event by using something like:
//      $(document).on("parent-scroll", function(event, data) {
//          console.log("Received parent-scroll event: ", data);
//      });
(function($) {
    if (window.parent) {
        var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
        var eventer = window[eventMethod];
        var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
        eventer(messageEvent, function(e) {
            if (e.data && e.data.indexOf('parentScrollPosition:') == 0) {
                var dataString = e.data.substr((new String('parentScrollPosition:')).length);
                var data = $.parseJSON(dataString);
                if (data) {
                    $(document).trigger("parent-scroll", [data]);
                }
            }
        }, false);
    }
})(jQuery);

// Author: Marko
// Date: 29.3.2012
// Comment: current above busy() plugin appends spinner in body el. so it can't be used in float/moving elements such as app windows etc.
// so I've adopted my old mootools om.showLoader() plugin to work with jQuery. It's much simplier...
(function($) {
  // Helper object factory
  function Loader(options) {
    this.options = $.extend({}, Loader.defaults, options);
  };

  Loader.prototype.hide = function(targets) {
    targets.each(function() {
      var loaderImg = $.data(this, "loader");
      if (loaderImg)
        loaderImg.remove();

      $.data(this, "loader", null);

    });
  };

  Loader.prototype.show = function(targets) {
    var that = this;

    targets.each(function() {

        if ($.data(this, "loader"))
            return;

        var showtext = (showtext ? showtext : "Loading...");
        var loaderdiv = $("<div style='width:100%; text-align:center;' class='loader' ></div> ");

	    loaderdiv.html("<div style='margin:5px auto;'><div class=\"loading\" style=\"margin:0 auto;width:16px;height:16px\" alt='"+showtext+"'></div></div>" );

        var target = $(this);

	    loaderdiv.appendTo(target);

        $.data(this, "loader", loaderdiv);
        //Loader.instances.push({ target : this, options : that.options });
    });
  };

    $.fn.loader = function(options, defaults) {
        if ($.inArray(options, ["clear", "hide", "remove"]) != -1) {
            // Hide loader image(s)
            new Loader(options).hide($(this));
            return $(this);
        }
        else {
            // Show loader image(s)
            new Loader(options).show($(this));
            return $(this);
        }
    };
})(window.jQuery || giscloud.exposeJQuery());


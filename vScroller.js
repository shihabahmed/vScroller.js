;(function ($) {

	var _privateMethods = {
		scrollUp: function(_scrollable, _options, intervalID) {
			intervalID = setInterval(function () {
				if (parseInt($(_scrollable[0]).css("top")) < parseInt($(_scrollable[1]).css("top"))) {
					// if the first element is visible
					if (($(_scrollable[0]).height() + parseInt($(_scrollable[0]).css("top"))) > 0) {
						$(_scrollable[0]).css("top", (parseInt($(_scrollable[0]).css("top")) - 1));
						$(_scrollable[1]).css("top", (parseInt($(_scrollable[1]).css("top")) - 1));
					} else {
						$(_scrollable[0]).css("top", $(_scrollable[0]).height());
					}
				} else {
					// if the second element is visible
					if (($(_scrollable[1]).height() + parseInt($(_scrollable[1]).css("top"))) > 0) {
						$(_scrollable[1]).css("top", (parseInt($(_scrollable[1]).css("top")) - 1));
						$(_scrollable[0]).css("top", (parseInt($(_scrollable[0]).css("top")) - 1));
					} else {
						$(_scrollable[1]).css("top", $(_scrollable[1]).height());
					}
				}
			}, _options.interval);

			return intervalID;
		},

		scrollDown: function(_scrollable, _options, intervalID) {
			intervalID = setInterval(function () {
				if (parseInt($(_scrollable[0]).css("bottom")) < parseInt($(_scrollable[1]).css("bottom"))) {
					// if the first element is visible
					if ((parseInt($(_scrollable[0]).css("bottom")) + $(_scrollable[0]).height()) < 0) {
						$(_scrollable[0]).css("bottom", (parseInt($(_scrollable[1]).css("bottom")) + $(_scrollable[1]).height()));
					} else {
						$(_scrollable[0]).css("bottom", (parseInt($(_scrollable[0]).css("bottom")) - 1));
						$(_scrollable[1]).css("bottom", (parseInt($(_scrollable[1]).css("bottom")) - 1));
					}
				} else {
					// if the second element is visible
					if ((parseInt($(_scrollable[1]).css("bottom")) + $(_scrollable[1]).height()) < 0) {
						$(_scrollable[1]).css("bottom", (parseInt($(_scrollable[0]).css("bottom")) + $(_scrollable[0]).height()));
					} else {
						$(_scrollable[1]).css("bottom", (parseInt($(_scrollable[1]).css("bottom")) - 1));
						$(_scrollable[0]).css("bottom", (parseInt($(_scrollable[0]).css("bottom")) - 1));
					}
				}
			}, _options.interval);

			return intervalID;
		}
	};

	$.fn.extend({

		vscroller: function (options) {

			return this.each(function() {
				var el = $(this),
					parent = el.parent().css('overflow', 'hidden'),
					scrollable,
					newElement,
					intervalID = new Object();

				var defaultOptions = {
					interval: 35,
					direction: "up",
					pauseOnHover: true
				};

				if (options) {
					defaultOptions = $.extend(defaultOptions, options);
				}

				if (el.height() > parent.innerHeight()) {
					if (defaultOptions.pauseOnHover == true) {
						parent.bind("mouseenter", function () {
							clearInterval(intervalID);
						}).bind("mouseleave", function () {
							if (defaultOptions.direction == "up") {
								intervalID = _privateMethods.scrollUp(scrollable, defaultOptions, intervalID);
							} else if (defaultOptions.direction == "down") {
								intervalID = _privateMethods.scrollDown(scrollable, defaultOptions, intervalID);
							}
						});
					}

					el.addClass("_scrollable_obj");
					parent.css("position", "relative");
					el.css("position", "absolute");

					newElement = $(document.createElement(el.get(0).tagName));
					newElement.attr("class", el.attr("class"));
					newElement.html(el.html());
					newElement.css("position", "absolute");

					//newElement = el.clone();
					parent.append(newElement);

					scrollable = parent.children('._scrollable_obj');
					if (defaultOptions.direction == "up") {
						$(scrollable).css("bottom", null);
						$(scrollable[0]).css("top", 0);
						$(scrollable[1]).css("top", $(scrollable[0]).height());

						intervalID = _privateMethods.scrollUp(scrollable, defaultOptions, intervalID);
					} else if (defaultOptions.direction == "down") {
						$(scrollable).css("top", null);
						$(scrollable[1]).css("bottom", 0);
						$(scrollable[0]).css("bottom", (parseInt($(scrollable[1]).css("bottom")) + $(scrollable[1]).height()));

						intervalID = _privateMethods.scrollDown(scrollable, defaultOptions, intervalID);
					}
				}
			});
		}
	});
})(jQuery);

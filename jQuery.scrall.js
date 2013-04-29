/*
 * scrall.js
 *
 * Copyright 2013, Per Mafrost, per@dohi.se, http://dohi.se
 * Released under the MIT Licence
 * http://opensource.org/licenses/MIT
 *
 * Github:  http://github.com/mafrost/scrall/
 * Version: 1.0.0
 */

var SCRALL = (function() {

	var $window = $(window), 

		calls = [], 

		extendDefaults = function (params) {
			var call = $.extend({
				elem : null,
				top : 0,
				bot : 0,
				offsetTop : 0,
				offsetBot : 0,
				onEnter : false,
				onLeave : false,
				onBoth : false,
				isIn : false
			}, params);
			
			return call;
		},
		
		// send in a elem field if needed
		addCall = function (callObj) { 
			if (callObj.selector) {
				$(callObj.selector).each(function(index) {
					var call = extendDefaults (callObj);
					if (!callObj.top) {
						call.top = $(this).offset().top;
					} else {
						call.top = 0;
					}
		
					if (!callObj.bot) {
						call.bot = call.top + $(this).outerHeight();
					} else {
						call.bot = 0;
					}
		
					call.top -= call.offsetTop;
					call.bot -= call.offsetBot;
					call.elem = this;
					calls.push(call);
				});
			} else {
				calls.push(extendDefaults (callObj));
			}
			
			return this;
		}, 
		
		checkScroll = function () {
			var i, 
				numOfCalls = calls.length,
				pos = $window.scrollTop();
			
			for (i = 0 ; i < numOfCalls ; i++) {
				var oldIn = calls[i].isIn, 
					param = {
						isUp : pos <= calls[i].top,
						isDown : pos >= calls[i].bot,
						isIn : false
					};
		
				calls[i].isIn = param.isIn = !param.isUp && !param.isDown;
		
				if (oldIn !== calls[i].isIn) {
					if (calls[i].isIn) {
						if (calls[i].onEnter) {
							if(calls[i].elem) {
								calls[i].onEnter(calls[i].elem);
							} else {
								calls[i].onEnter();
							}
						}
					} else {
						if (calls[i].onLeave) {
							if(calls[i].elem) {
								calls[i].onLeave(calls[i].elem);
							} else {
								calls[i].onLeave();
							}
						}
					}
					if (calls[i].onBoth) {
						if(calls[i].elem) {
							calls[i].onBoth(calls[i].elem);
						} else {
							calls[i].onBoth();
						}
					}
				}	
			}
		};
		
	$window.scroll(checkScroll);

	return {
		addCall : addCall
	};
}());  
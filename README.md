Scrall
==================

Scrall (Scroll function call) is a jQuery plugin for binding functions to the window scroll position. 

There is an example with the code where calls to functions are made every time an article is in view. They are marked as read and active when in view. When leaving view they are still read but not active. Try it out and you'll understand. 

[Demo](http://htmlpreview.github.io/?http://github.com/mafrost/scrall/blob/master/index.html)

Basically you just add a scroll position where the function should be called. You can also use jQuery selectors to select multiple object (or single objects) and thereby avoiding the need to manually entering a top and bottom value. 

	
	Scrall.addCall({
	    selector : 'article',
	    onEnter : function(elem) {
	        $(elem).addClass("active");
	        $(elem).addClass("read");
	    },
	    onBoth : function(elem) {
	        $(elem).css({
	            fontSize : Math.floor((Math.random() * 10) + 10)
	        });
	    },
	    onLeave : function(elem) {
	        $(elem).removeClass("active");
	    }
	}).addCall({
	    top : 500,
	    bot : 700,
	    onEnter : function() {
	        alert("You entered section 500-700");
	    }
	}); 

As you can see, you can chain calls.

These are the different option you can use when adding calls and the default values.

	Scrall.addCall({
	    selector : null,
	    top : 0,
	    bot : 0,
	    offsetTop : 0,
	    offsetBot : 0,
	    onEnter : null,
	    onLeave : null,
	    onBoth : null
	}); 

Where selector is a CSS3 selector (".class", "#id", "name[thename]" etc), top is the scroll position of the topmost part of the "area", bot is the bottom scroll position, offsets are offsets, the onXxxx are functions that are called on the actions. 

If you have ideas or suggestions, please fork, comment, or whatever.
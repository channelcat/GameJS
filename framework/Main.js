// +----------------------------------------------------------------------+ 
// | Copyright (c) 2010                                                   | 
// +----------------------------------------------------------------------+ 
// | This source file is bound by United States copyright law.            | 
// +----------------------------------------------------------------------+ 
// | Author: Michael Hill <channelcat@gmail.com>                          | 
// +----------------------------------------------------------------------+ 


function _require( url ) { 

	var script = document.createElement('script');
		script.setAttribute('language', 'javascript');
		script.setAttribute('type', 'text/javascript');
		script.setAttribute('src', url + '.js?' + Math.random());
        script.onerror = function () {
            alert ("Failed to load required script '" + url + "'");
        };
	document.getElementsByTagName('head').item(0).appendChild( script );
	
	return script;
}

function require() { 
	var callback = null;
	var scripts = [];
	for ( var i=0; i < arguments.length; ++i ) {
		// If the input is a string, it is a script
		if ( typeof arguments[i] == 'string' ) {
			scripts.push( _require( arguments[i] ) );
		// If the input is a function, use it as a callback function onload
		} else if ( typeof arguments[i] == 'function' ) {
			callback = arguments[i];
		}
	}
	
	if ( callback != null ) {
		
		var loaded = 0;
		var scriptCallback = function() {
			++loaded;
			if ( loaded == scripts.length ) {
				callback();
			}
		};
		for ( var i=0; i < scripts.length; ++i ) {
			scripts[i].onload = scriptCallback;
		}
	}
}

var Class = function(methods)
{
	var _class = function(){ this.initialize.apply(this, arguments); };
	_class.implement = function(object){ for(_name in object) _class.prototype[_name] = object[_name]; };

	// If the class has a parent
	if (typeof methods.Extends != 'undefined') {
		_class.prototype.parent = methods.Extends.prototype.initialize;
		
		_class.implement(methods.Extends.prototype);
		
		delete methods.Extends;
	}
	
	_class.implement(methods);
	
	return _class;
};

Object.merge = function( original )
{
	// Unlimited merging of all arguments
	for (var i = 1, l = arguments.length; i < l; i++){
		var object = arguments[i];
		
		for (var key in object) {
			original[key] = object[key];
		}
	}
	return original;
};


// ---------------------------------------------- //
// Load game framework
// ---------------------------------------------- //
require('framework/Game');

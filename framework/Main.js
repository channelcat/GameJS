// +----------------------------------------------------------------------+ 
// | Copyright (c) 2010                                                   | 
// +----------------------------------------------------------------------+ 
// | This source file is bound by United States copyright law.            | 
// +----------------------------------------------------------------------+ 
// | Author: Michael Hill <channelcat@gmail.com>                          | 
// +----------------------------------------------------------------------+ 


// ------------------------------------- Start Prerequisite  ------------------------------------- //

function _require( url ) { 

	var script = document.createElement('script');
		script.setAttribute('language', 'javascript');
		script.setAttribute('type', 'text/javascript');
		script.setAttribute('src', url + '.js?' + Math.random());
        script.onerror = function () {
            alert ("Failed to load required script '" + url + "'");
        }
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
		}
		for ( var i=0; i < scripts.length; ++i ) {
			scripts[i].onload = scriptCallback;
		}
	}
}

var Class = function(methods)
{
	var _class = function(){ this.initialize.apply(this, arguments); };
	_class.implement = function(object){ for(_name in object) _class.prototype[_name] = object[_name] };
	
	// If the class has a parent
	if (typeof methods.Extends != 'undefined') {
		_class.prototype.parent = methods.Extends.prototype.initialize;
		
		_class.implement(methods.Extends.prototype);
		
		delete methods.Extends;
	}
	
	_class.implement(methods);
	
	return _class;
}

Object.merge = function( original, derp )
{
	// Unlimited merging of all arguments
	for (var i = 1, l = arguments.length; i < l; i++){
		var object = arguments[i];
		
		for (var key in object) {
			original[key] = object[key];
		}
	}
	return original;
}

// ------------------------------------- End Prerequisites ------------------------------------- //

var Game = {};
require(
	'framework/Asset/Base',
	'framework/assets/SpriteAsset',
	'framework/assets/SpriteSheetAsset',
	'framework/assets/SoundAsset',
	'framework/Input',
	'framework/Sprite',
	'framework/State',
	'framework/states/loading'
);

Game.load = function( gameId, canvas )
{
	var directory = gameId.toLowerCase();
	require( 
		directory + '/' + gameId,
		directory + '/config',
		directory + '/assets',
		function () {
			var gameClass = eval(gameId);
			var game = new gameClass( canvas );
			
			canvas.width = game.config.width;
			canvas.height = game.config.height;
			canvas.bgColor = game.config.background;
		}
	);
};
Game.Main = new Class({
	// Configuration settings
	_config: {
		width: 640,
		height: 480,
		background: '#bbbbee',
		fps: 30,
		paths: {
			assets: 'assets'
		}
	},
	// Placeholder to be filled with states
	_states: {},
	
	// Member containers
	displayObjects: [],
	
	// Placeholder variables
	_buffer: null,
	canvas: null,
	stage: null,
	state: null,
	
	// Buffer
	_bufferElement: document.createElement("canvas"),
	
	initialize: function ( canvas )
	{
		// Link canvas and game objects as member variables
		this.canvas = canvas;
		this.stage = this.canvas.getContext("2d");
		this._buffer = this._bufferElement.getContext("2d");
		this._buffer.save();
		this.config = Object.merge( this._config, this.config );
		
		// Merge the states together
		this.states = Object.merge( this._states, this.states );
		
		// Preload all assets
		for ( a in this.assets ) {
			var asset = this.assets[a];
			asset.load( this.config.paths.assets );
		}
		
		// Start update and draw functions
		this.setState( this.states.loading );
		this.updateInterval 	= setInterval( this.update.bind(this), 1000 / this.config.fps );
		this.drawInterval 		= setInterval( this.draw.bind(this), 1000 / this.config.fps );
	},
	
	setState: function ( state )
	{
		if ( typeof state == "undefined" )
			return this.state;
	
		// If a state is currently loaded, destruct it
		if ( this.state != null ) {
			this.state.stop();
		}
		
		this.state = new state( this );
		this.state.start();
	},
	
	addChild: function ( displayObject )
	{
		this.displayObjects.push( displayObject );
	},
	
	getBuffer: function ( width, height )
	{
		//this.buffer.restore();
		this._bufferElement.width = width;
		this._bufferElement.height = height;
		return this._buffer;
	},
	
	update: function ( e )
	{
		// Allow state update functions
		this.state.update();
	},
	
	draw: function ( e )
	{
		// Clear the stage
		//this.stage.clearRect( 0, 0, this.canvas.width, this.canvas.height );
		
		// Fill the BG
		this.stage.fillStyle = this.config.background;  
		this.stage.fillRect ( 0, 0, this.canvas.width, this.canvas.height );  
		
		// Draw all objects
		for ( var d=0; d < this.displayObjects.length; ++d ) {
			var displayObject = this.displayObjects[d];
			
			// Display a sprite sheet
			if ( displayObject.asset.type == Game.Asset.TYPE_SPRITE_SHEET ) {
				
				var frameRect = displayObject.asset.getFrameRect( displayObject.frame );
				
				if ( displayObject.rotation != 0 ) {
				/*
					//this.stage.rotate( displayObject.rotation );
					
					var objectW = frameRect.width * displayObject.scale;
					var objectH = frameRect.height * displayObject.scale;
					var spacing = Math.sqrt( objectW * objectW + objectH * objectH );
					var objectX = (spacing - objectW) / 2;
					var objectY = (spacing - objectH) / 2;
					
					var buffer = this.getBuffer( spacing, spacing );
					
					buffer.translate( buffer.canvas.width/2, buffer.canvas.height/2 );
					buffer.rotate( displayObject.rotation );
					buffer.drawImage(
						displayObject.asset.element, 			// Source
						frameRect.x, 		// Source X
						frameRect.y,  		// Source Y
						frameRect.width,  	// Source Width
						frameRect.height,  	// Source Height
						-buffer.canvas.width/2 + objectX,	// Destination X
						-buffer.canvas.height/2 + objectY,	// Destination Y
						frameRect.width * displayObject.scale,  	// Destination Width
						frameRect.height * displayObject.scale 	// Destination Height
					);
					
					var data = buffer.getImageData( 0, 0, buffer.canvas.width, buffer.canvas.height );
					this.stage.putImageData( data, displayObject.x - objectX, displayObject.y - objectY );
				*/
					
					this.stage.save();
					this.stage.translate( displayObject.x, displayObject.y );
					this.stage.rotate( displayObject.rotation );
					this.stage.drawImage(
						displayObject.asset.element, 			// Source
						frameRect.x, 		// Source X
						frameRect.y,  		// Source Y
						frameRect.width,  	// Source Width
						frameRect.height,  	// Source Height
						0,					// Destination X
						0,					// Destination Y
						frameRect.width * displayObject.scale,  	// Destination Width
						frameRect.height * displayObject.scale 	// Destination Height
					);
					this.stage.restore();
				} else {
					this.stage.drawImage(
						displayObject.asset.element, 			// Source
						frameRect.x, 		// Source X
						frameRect.y,  		// Source Y
						frameRect.width,  	// Source Width
						frameRect.height,  	// Source Height
						displayObject.x,	// Destination X
						displayObject.y,	// Destination Y
						frameRect.width * displayObject.scale,  	// Destination Width
						frameRect.height * displayObject.scale 	// Destination Height
					);
				}
				
			}
			
			// Advance the frame
			if ( displayObject.playing ) {
				++ displayObject.frame;
				if ( displayObject.frame > displayObject.frames )
					displayObject.frame = 1;
			}
		}
		
		// Allow state drawing method
		this.state.draw();
	}
});

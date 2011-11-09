// +----------------------------------------------------------------------+ 
// | Copyright (c) 2010                                                   | 
// +----------------------------------------------------------------------+ 
// | This source file is bound by United States copyright law.            | 
// +----------------------------------------------------------------------+ 
// | Author: Michael Hill <channelcat@gmail.com>                          | 
// +----------------------------------------------------------------------+ 

Game.Sprite = new Class({
	
	x: 0,
	y: 0,
	frame: 1,
	frames: 0,
	scale: 1,
	rotation: 0,
	playing: true,
	
	initialize: function( asset, config )
	{
		this.asset = asset;
		this.frames = asset.frames;
		
		for ( _key in config )
			this[_key] = config[_key];
	},
	
	play: function()
	{
		this.playing = true;
	},
	stop: function()
	{
		this.playing = false;
	},
	gotoAndPlay: function( frame )
	{
		this.frame = frame;
		this.playing = true;
	},
	gotoAndStop: function( frame )
	{
		this.frame = frame;
		this.playing = false;
	},
	hitTest: function( x, y, subpixel )
	{
		var frameRect = this.asset.getFrameRect( this.frame );
		
		// Test
		if ( subpixel ) {			
			var bufferE = document.createElement("canvas");
			bufferE.width = 1;
			bufferE.height = 1;
			var buffer = bufferE.getContext("2d");
			
			buffer.drawImage(
				this.asset.element, 			// Source
				frameRect.x, 		// Source X
				frameRect.y,  		// Source Y
				frameRect.width,  	// Source Width
				frameRect.height,  	// Source Height
				-(x - this.x),	// Destination X
				-(y - this.y),	// Destination Y
				frameRect.width * this.scale,  	// Destination Width
				frameRect.height * this.scale 	// Destination Height
			);
			var imageData = buffer.getImageData( 0, 0, 1, 1 );
			return (imageData.data[3] != 0);
		} else {
			
			return ( x > this.x && x < this.x + frameRect.width * this.scale &&
					 y > this.y && y < this.y + frameRect.height * this.scale );
		}
	}
});
// +----------------------------------------------------------------------+ 
// | Copyright (c) 2010                                                   | 
// +----------------------------------------------------------------------+ 
// | This source file is bound by United States copyright law.            | 
// +----------------------------------------------------------------------+ 
// | Author: Michael Hill <channelcat@gmail.com>                          | 
// +----------------------------------------------------------------------+ 

GameFrame.Sprite = new Class({
	
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
	}
});
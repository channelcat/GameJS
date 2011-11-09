// +----------------------------------------------------------------------+ 
// | Copyright (c) 2010                                                   | 
// +----------------------------------------------------------------------+ 
// | This source file is bound by United States copyright law.            | 
// +----------------------------------------------------------------------+ 
// | Author: Michael Hill <channelcat@gmail.com>                          | 
// +----------------------------------------------------------------------+ 

Game.Asset.Base = new Class({
	source: null,
	element: null,
	loaded: false,
	
	initialize: function( config )
	{
		Object.merge( this, config );
	},
	
	load: function( path )
	{
		this.loading = true;
		this.element.src = path + "/" + this.source;
		this.element.addEventListener('load', 			this.onload.bind(this), false);
		this.element.addEventListener('canplaythrough', this.onload.bind(this), false);
	},
	
	onload: function()
	{
		this.loaded = true;
	}
});

// Static Constants
Object.merge( Game.Asset, {
	TYPE_SPRITE_SHEET: 1,
	TYPE_IMAGE: 2,
	TYPE_SOUND: 3
});
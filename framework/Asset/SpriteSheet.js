// +----------------------------------------------------------------------+ 
// | Copyright (c) 2010                                                   | 
// +----------------------------------------------------------------------+ 
// | This source file is bound by United States copyright law.            | 
// +----------------------------------------------------------------------+ 
// | Author: Michael Hill <channelcat@gmail.com>                          | 
// +----------------------------------------------------------------------+ 

Game.Asset.SpriteSheet = new Class({
	Extends: Game.Asset.Base,
	
	type: Game.Asset.TYPE_SPRITE_SHEET,
	_frameRects: [],
	
	initialize: function( config )
	{
		this.parent( config );
		this.element = new Image();
	},
	
	onload: function()
	{
		this.loaded = true;
		
		this.columnWidth = this.element.width / this.columns;
		this.rowHeight = this.element.height / this.rows;
	},
	
	_c_getFrameRect: function( frame )
	{
		if (!( frame in this._frameRects ))
			this._frameRects[ frame ] = this._getFrameRect( frame );
		
		return this._frameRects[ frame ];
	},
	
	getFrameRect: function( frame )
	{
		var row = Math.ceil(frame / this.columns);
		var column = (frame - 1) % this.columns + 1;
		
		return {
			x: (column - 1) * this.columnWidth,
			y: (row - 1) * this.rowHeight,
			width: this.columnWidth,
			height: this.rowHeight
		};
	}
});
// +----------------------------------------------------------------------+ 
// | Copyright (c) 2010                                                   | 
// +----------------------------------------------------------------------+ 
// | This source file is bound by United States copyright law.            | 
// +----------------------------------------------------------------------+ 
// | Author: Michael Hill <channelcat@gmail.com>                          | 
// +----------------------------------------------------------------------+ 

Game.Asset.Sound = new Class({
	Extends: Game.Asset.Base,
	
	type: Game.Asset.TYPE_SOUND,
	
	initialize: function( config )
	{
		this.parent( config );
		this.element = new Audio();
		this.element.preload = "load";
	}
});
// +----------------------------------------------------------------------+ 
// | Copyright (c) 2010                                                   | 
// +----------------------------------------------------------------------+ 
// | This source file is bound by United States copyright law.            | 
// +----------------------------------------------------------------------+ 
// | Author: Michael Hill <channelcat@gmail.com>                          | 
// +----------------------------------------------------------------------+ 

GameFrame.SoundAsset = new Class({
	Extends: GameFrame.Asset,
	
	type: GameFrame.Asset.TYPE_SOUND,
	
	initialize: function( config )
	{
		this.parent( config );
		this.element = new Audio();
		this.element.preload = "load";
	}
});
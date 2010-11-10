// +----------------------------------------------------------------------+ 
// | Copyright (c) 2010                                                   | 
// +----------------------------------------------------------------------+ 
// | This source file is bound by United States copyright law.            | 
// +----------------------------------------------------------------------+ 
// | Author: Michael Hill <channelcat@gmail.com>                          | 
// +----------------------------------------------------------------------+ 

GameFrame.State = new Class({
	game: null,

	initialize: function( game )
	{
		this.game = game;
	},

	// Placeholder Draw and Update
	draw: function(){},
	update: function(){},
	
	// Abstract method notifiers - missing start and stop functions
	start: function()
	{
		console.log("State start function missing!");
	},
	stop: function()
	{
		console.log("State stop function missing!");
	}
});
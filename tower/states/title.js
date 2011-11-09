// +----------------------------------------------------------------------+ 
// | Copyright (c) 2010                                                   | 
// +----------------------------------------------------------------------+ 
// | This source file is bound by United States copyright law.            | 
// +----------------------------------------------------------------------+ 
// | Author: Michael Hill <channelcat@gmail.com>                          | 
// +----------------------------------------------------------------------+ 

Tower.prototype.states.title = new Class({
	Extends: Game.State,
		
	start: function()
	{
		// Bind Input
		var clickListener = this.inputClick.bind(this);
		this.input = new Game.Input( this.game, 
			Game.Input.METHOD_MOUSE | 
			Game.Input.METHOD_KEYBOARD, 
			{
				click: 	{ triggers: [ Game.Input.MouseInput.LEFT_CLICK ], listener: clickListener }
			} 
		);
		
		this.sploshun = new Game.Sprite( this.game.assets.explosion );
		this.game.addChild( this.sploshun );
		
		//this.game.assets.shotgun.element.play();
	},
	
	inputClick: function( event )
	{
		console.log( event.x, event.y );
		this.sploshun.x = event.x;
		this.sploshun.y = event.y;
	},

	
	stop: function()
	{
		
	},
	
	update: function()
	{
		
		
	}
	
});

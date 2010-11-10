// +----------------------------------------------------------------------+ 
// | Copyright (c) 2010                                                   | 
// +----------------------------------------------------------------------+ 
// | This source file is bound by United States copyright law.            | 
// +----------------------------------------------------------------------+ 
// | Author: Michael Hill <channelcat@gmail.com>                          | 
// +----------------------------------------------------------------------+ 

// Ugly, but implements and object extend do not work
GameFrame.Game.prototype._states.loading = new Class({
	Extends: GameFrame.State,
	
	total: null,
	loaded: null,
	
	start: function()
	{
		this.total = 0;
		for ( t in this.game.assets ) 
			++this.total;
	},
	
	stop: function()
	{
		
	},
	
	update: function()
	{
		this.loaded = 0;
		
		for ( a in this.game.assets ) 
			if ( this.game.assets[a].loaded ) 
				++this.loaded;
		
		if ( this.loaded == this.total ) {
			this.game.setState( this.game.states.title );
		}
	},
	
	draw: function() 
	{
		if ( this.loaded != this.total ) {
			this.game.stage.fillText( "Loaded " + this.loaded + "/" + this.total , this.game.config.width / 2, this.game.config.height / 2 );
		} else {
			this.game.stage.fillText( "Complete", this.game.config.width / 2, this.game.config.height / 2 );
		}
	}
});
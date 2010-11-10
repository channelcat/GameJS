// +----------------------------------------------------------------------+ 
// | Copyright (c) 2010                                                   | 
// +----------------------------------------------------------------------+ 
// | This source file is bound by United States copyright law.            | 
// +----------------------------------------------------------------------+ 
// | Author: Michael Hill <channelcat@gmail.com>                          | 
// +----------------------------------------------------------------------+ 

Example.prototype.states.title = new Class({
	Extends: GameFrame.State,
		
	start: function()
	{
		// Bind Input
		var moveListener = this.inputMove.bind(this);
		var fireListener = this.inputFire.bind(this);
		this.input = new GameFrame.Input( this, 
			GameFrame.Input.METHOD_MOUSE | 
			GameFrame.Input.METHOD_KEYBOARD, 
			{
				left: 	{ triggers: [ GameFrame.Input.KeyInput.A, GameFrame.Input.KeyInput.LEFT ], listener: moveListener },
				right: 	{ triggers: [ GameFrame.Input.KeyInput.D, GameFrame.Input.KeyInput.RIGHT ], listener: moveListener },
				up: 	{ triggers: [ GameFrame.Input.KeyInput.W, GameFrame.Input.KeyInput.UP ], listener: moveListener },
				down: 	{ triggers: [ GameFrame.Input.KeyInput.S, GameFrame.Input.KeyInput.DOWN ], listener: moveListener },
				fire: 	{ triggers: [ GameFrame.Input.KeyInput.SPACE ], listener: fireListener }
			} 
		);
		
		this.bee = new GameFrame.Sprite( this.game.assets.bee );
		this.bee.velocity = { x: 0, y: 0 };
		this.bee.accel = { x: 0, y: 0 };
		this.game.addDisplayObject( this.bee );
		
		//this.game.assets.shotgun.element.play();
	},
	
	inputMove: function( event )
	{
		var accel;
		if (event.active) {
			accel = this.game.config.bee.accel;
		} else {
			accel = -this.game.config.bee.accel;
		}
		
		switch ( event.name ) {
			case 'left':
				this.bee.accel.x -= accel; break;
			case 'right':
				this.bee.accel.x += accel; break;
			case 'up':
				this.bee.accel.y -= accel; break;
			case 'down':
				this.bee.accel.y += accel; break;
		}
	},
	
	inputFire: function( event )
	{
		if ( !event.active )
			return;

		var shot = new GameFrame.Sprite( this.game.assets.explosion );
		shot.x = this.bee.x;
		shot.y = this.bee.y;
		this.game.addDisplayObject( shot );
	},

	
	stop: function()
	{
		
	},
	
	update: function()
	{
		if ( this.bee.accel.x == 0 ) {
			this.bee.velocity.x *= this.game.config.bee.decel;
		} else {
			if ( this.bee.accel.x > 0 && this.bee.velocity.x < this.game.config.bee.maxSpeed ||
				 this.bee.accel.x < 0 && this.bee.velocity.x > -this.game.config.bee.maxSpeed) {
				this.bee.velocity.x += this.bee.accel.x;
			}			
		}
		
		if ( this.bee.accel.y == 0 ) {
			this.bee.velocity.y *= this.game.config.bee.decel;
		} else {
			if ( this.bee.accel.y > 0 && this.bee.velocity.y < this.game.config.bee.maxSpeed ||
				 this.bee.accel.y < 0 && this.bee.velocity.y > -this.game.config.bee.maxSpeed) {
				this.bee.velocity.y += this.bee.accel.y;
			}
		}
	
		this.bee.x += this.bee.velocity.x;
		this.bee.y += this.bee.velocity.y;
		
		this.bee.rotation+= .1;
	}
	
});

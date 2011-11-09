// +----------------------------------------------------------------------+ 
// | Copyright (c) 2010                                                   | 
// +----------------------------------------------------------------------+ 
// | This source file is bound by United States copyright law.            | 
// +----------------------------------------------------------------------+ 
// | Author: Michael Hill <channelcat@gmail.com>                          | 
// +----------------------------------------------------------------------+ 


var Tower = new Class(
{
	Extends: Game.Main,
	
	states: {},
	
	initialize: function( canvas )
	{
		var self = this;
		require(
			'tower/states/title',
			function(){
				self.parent( canvas );
			}
		);
	},
}
);
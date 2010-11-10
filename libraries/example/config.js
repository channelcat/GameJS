// +----------------------------------------------------------------------+ 
// | Copyright (c) 2010                                                   | 
// +----------------------------------------------------------------------+ 
// | This source file is bound by United States copyright law.            | 
// +----------------------------------------------------------------------+ 
// | Author: Michael Hill <channelcat@gmail.com>                          | 
// +----------------------------------------------------------------------+ 

Example.implement({ config : 
{
	width: 640,
	height: 480,
	background: '#bbbbee',
	fps: 30,
	
	paths: {
		assets: 'assets'
	},
	bee: {
		accel: .5,
		maxSpeed: 10,
		decel: .9
	}
}
});
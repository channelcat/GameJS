// +----------------------------------------------------------------------+ 
// | Copyright (c) 2010                                                   | 
// +----------------------------------------------------------------------+ 
// | This source file is bound by United States copyright law.            | 
// +----------------------------------------------------------------------+ 
// | Author: Michael Hill <channelcat@gmail.com>                          | 
// +----------------------------------------------------------------------+ 

Example.implement({ assets : 
{
	explosion: new GameFrame.SpriteSheetAsset({ source: 'test.png', columns: 5, rows: 5, frames: 25 }),
	bee: new GameFrame.SpriteSheetAsset({ source: 'bee.png', columns: 6, rows: 6, frames: 31 })
	//shotgun: new GameFrame.SoundAsset({ source: 'test.mp3' })
}
});
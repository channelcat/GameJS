// +----------------------------------------------------------------------+ 
// | Copyright (c) 2010                                                   | 
// +----------------------------------------------------------------------+ 
// | This source file is bound by United States copyright law.            | 
// +----------------------------------------------------------------------+ 
// | Author: Michael Hill <channelcat@gmail.com>                          | 
// +----------------------------------------------------------------------+ 

Game.Input = new Class({
	// Input method (can be multiple)
	game: null,
	method: null,
	triggers: null,
	
	// Reverse trigger lookup for any input
	inputTriggers: [],
	// Key and mouse states
	states: [],
	
	initialize: function( game, method, triggers )
	{
		this.game = game;
		this.method = method;
		this.triggers = triggers;
		
		if ( this.method & Game.Input.METHOD_KEYBOARD ) {
			console.log("Attaching Keyboard");
			window.addEventListener( "keydown", this._eventKeyDown.bind(this), false );
			window.addEventListener( "keyup", this._eventKeyUp.bind(this), false );
		}
		if ( this.method & Game.Input.METHOD_MOUSE ) {
			console.log("Attaching Mouse");
			window.addEventListener( "click", this._eventMouseClick.bind(this), false );
		}
		
		// Add the reverse lookup for triggers
		for ( _name in this.triggers ) {
			var _triggers = this.triggers[_name].triggers;
			for ( var t=0; t < _triggers.length ; ++t ) {
				if ( !(_triggers[t] in this.inputTriggers) ) {
					this.inputTriggers[_triggers[t]] = [];
				}
				
				this.inputTriggers[_triggers[t]].push(_name);
			}
		}
	},
	
	// Tells if an input item is down/active ( keys, mouse )
	isActive: function( code )
	{
		if ( code in states )
			return states[code];
		
		return false;
	},
	
	_triggerEvent: function( code, eventData ) {
		// Define event code of input
		eventData.code = code;
	
		// If there are triggers defined for this input method
		if ( code in this.inputTriggers ) {
			for ( var t=0; t < this.inputTriggers[code].length ; ++t ) {
				var _name = this.inputTriggers[code][t];
				//console.log("Trigger " + _name);
				
				// If there is a listener, fire the event
				if ( "listener" in this.triggers[_name] ) {
					eventData.name = _name;
					this.triggers[_name].listener( eventData );
				}
			}
		}
	},
	
	_eventMouseClick: function( e )
	{
		this._triggerEvent( Game.Input.MouseInput.LEFT_CLICK, { 
			type: Game.Input.METHOD_MOUSE,
			x: e.x - this.game.canvas.offsetLeft, 
			y: e.y - this.game.canvas.offsetTop, 
			active: true 
		});
		//console.log( "Mouse " + e.x + "," + e.y );
	},
	_eventKeyDown: function( e )
	{
		// If the key is still down, do not refire
		if ( this.states[ e.keyCode ] )
			return;
		
		this._triggerEvent( e.keyCode, { 
			type: Game.Input.METHOD_KEYBOARD, 
			//key: Game.Input.KeyNames[e.keyCode], 
			active: true 
		});
		
		this.states[ e.keyCode ] = true;
		//console.log( "Key Down " + e.keyCode );
	},
	_eventKeyUp: function( e )
	{
		this._triggerEvent( e.keyCode, { 
			type: Game.Input.METHOD_KEYBOARD, 
			//key: Game.Input.KeyNames[e.keyCode], 
			active: false 
		});
		
		this.states[ e.keyCode ] = false;
		//console.log( "Key Up " + e.keyCode );
	}
});

Object.merge( Game.Input, {

	// Input method constants
	METHOD_KEYBOARD: 1,
	METHOD_MOUSE: 2,
	METHOD_VIRTUAL_KEYBOARD: 4,
	METHOD_TOUCH: 8,
	METHOD_ACCELEROMETER: 16,
	METHOD_LOCATION: 32,
	
	MouseInput: {
		'LEFT_CLICK': -1,
		'RIGHT_CLICK': -3,
		'WHEEL_UP': -4,
		'WHEEL_DOWN': -5,
	},
	KeyInput: {
		'BACKSPACE': 8,
		'TAB': 9,
		'ENTER': 13,
		'PAUSE': 19,
		'CAPS': 20,
		'ESC': 27,
		'SPACE': 32,
		'PAGE_UP': 33,
		'PAGE_DOWN': 34,
		'END': 35,
		'HOME': 36,
		'LEFT': 37,
		'UP': 38,
		'RIGHT': 39,
		'DOWN': 40,
		'INSERT': 45,
		'DELETE': 46,
		'0': 48,
		'1': 49,
		'2': 50,
		'3': 51,
		'4': 52,
		'5': 53,
		'6': 54,
		'7': 55,
		'8': 56,
		'9': 57,
		'A': 65,
		'B': 66,
		'C': 67,
		'D': 68,
		'E': 69,
		'F': 70,
		'G': 71,
		'H': 72,
		'I': 73,
		'J': 74,
		'K': 75,
		'L': 76,
		'M': 77,
		'N': 78,
		'O': 79,
		'P': 80,
		'Q': 81,
		'R': 82,
		'S': 83,
		'T': 84,
		'U': 85,
		'V': 86,
		'W': 87,
		'X': 88,
		'Y': 89,
		'Z': 90,
		'NUMPAD_0': 96,
		'NUMPAD_1': 97,
		'NUMPAD_2': 98,
		'NUMPAD_3': 99,
		'NUMPAD_4': 100,
		'NUMPAD_5': 101,
		'NUMPAD_6': 102,
		'NUMPAD_7': 103,
		'NUMPAD_8': 104,
		'NUMPAD_9': 105,
		'MULTIPLY': 106,
		'ADD': 107,
		'SUBSTRACT': 109,
		'DECIMAL': 110,
		'DIVIDE': 111,
		'F1': 112,
		'F2': 113,
		'F3': 114,
		'F4': 115,
		'F5': 116,
		'F6': 117,
		'F7': 118,
		'F8': 119,
		'F9': 120,
		'F10': 121,
		'F11': 122,
		'F12': 123,
		'SHIFT': 16,
		'CTRL': 17,
		'ALT': 18,
		'PLUS': 187,
		'COMMA': 188,
		'MINUS': 189,
		'PERIOD': 190,
	}
});

// Create reverse input names
Game.Input.InputNames = [];
for ( _key in Game.Input.KeyInput ) {
	Game.Input.InputNames[ Game.Input.KeyInput[_key] ] = _key;
}
for ( _key in Game.Input.MouseInput ) {
	Game.Input.InputNames[ Game.Input.MouseInput[_key] ] = _key;
}

Game.KeyMap = new Game.Class({
	initialize: function(maps){
	this.map = {};
	this.keyEvents = {};
	this.initilize(maps);
	this._pressed = {};
	},

	initilize: function(maps){
		this.setup = {};
		Game.Util.extend(this.setup,maps);		
		for(var map in maps){
			this.map[map] = this.key_bind(map);
		}
	},
	
	key_bind : function(map){
		this.keyEvents[this.setup[map].key_code] = map;
		return this.setup[map];		
	},
	
	add_to_engine : function(engine){
		engine.keymap = this;
		this.engine = engine;
	},
	
	listen_for_key_event : function(){
		
		window.addEventListener('keyup', function(event) { this.onKeyup(event); }.bind(this), false);
		window.addEventListener('keydown', function(event) { this.onKeydown(event); }.bind(this), false);
		
	},
	
	isDown: function(keyCode) {
    	return this._pressed[keyCode];
  	},
  
  	onKeydown: function(event) {
    	this._pressed[event.keyCode] = true;
  	},
  
  	onKeyup: function(event) {
    	delete this._pressed[event.keyCode];
  	}
});

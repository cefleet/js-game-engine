Game.Event = new Game.Class({
	initialize : function(options){
		Game.Util.extend(this,options);
		
		this.action = this.action || function(){
			console.log('no action')
		}
		
		//Duration is the wrong term here.
		//1 = "do action once" This is good for toggle triggers
		//0 = "keep doing it"
		//2-xx - run this function for x frames
		this.duration = this.duration || 1;
		this._tick = 0;
		//active or inactive 
		this.status = 0;
	},
	
	add_to_engine : function(engine){
		this.engine = engine;
		engine.events.push(this);
	},
	
	//TODO of course there needs to be more logic here
	run_event : function(){
		if(this._tick < this.duration || this.duration == 0){
			this.add_tick();
			var action = this.action;
			action();
		}
	},
	
	//is this nesessary?
	add_tick : function(){
		this._tick = this._tick+1;
	},
	
	reset_tick : function(){
		this._tick = 1;
	}
});

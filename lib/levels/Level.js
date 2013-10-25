Game.Level = new Game.Class({
	initialize: function(options){
		
		Game.Util.extend(this,options);
		this.id = this.id || $uid();
		this.name = this.name || this.id;
		this.structures = this.structures || [];
		this.actors = this.actors || [];
		this.events = this.events || [];	
	},
	
	load : function(){
		this.engine.stop_loop();
		//TODO all of these items should simple reside in the level and if it is the same thing
		//then it needs to 
		if(!this.engine.hasOwnProperty('store')){
			this.engine.store = {};
		}
		//store all structures,actors,backgrounds,events,text,and triggers
		
		this.engine.store.structures = this.engine.structures;
		this.engine.structures = [];
		this.engine.store.actors = this.engine.actors;
		this.engine.actors = [];
		this.engine.store.backgrounds = this.engine.backgrounds;
		this.engine.backgrounds = [];
		this.engine.store.events = this.engine.events;
		this.engine.events = [];
		this.engine.store.texts = this.engine.texts;
		this.engine.texts = [];
		this.engine.store.triggers = this.engine.triggers;
		this.engine.triggers = [];
		
		this.load_objects();
		this.load_player();		
		this.setup();
		
		this.start();
	},
	
	start: function(){
		console.log('starting '+this.name);
		this.engine.game_loop();
	},
	
	add_to_engine : function(engine){
		if(!engine.hasOwnProperty('levels')){
			engine.levels = [];
		}
		engine.levels.push(this);
		this.engine = engine;
	},
	
	load_objects: function(){
		//TODO for each of the object types run add_to_level for each item
		//TODO for now it is doing the old add_to_engine
		
		this.actors.forEach(function(actor){
			actor.add_to_engine(this.engine);
		}.bind(this));
		
		this.structures.forEach(function(structure){
			structure.add_to_engine(this.engine);
		}.bind(this));
		
		this.backgrounds.forEach(function(background){
			background.add_to_engine(this.engine);
		}.bind(this));
		
		this.events.forEach(function(aEvent){
			aEvent.add_to_engine(this.engine);
		}.bind(this));
		
		this.texts.forEach(function(texts){
			texts.add_to_engine(this.engine);
		}.bind(this));		
	},
	
	load_player: function(){
		if(this.engine.hasOwnProperty('player')){
			//it adds player as an actor
			this.engine.player.move_to(this.player.start_position.x,this.player.start_position.y)
			this.engine.player.add_to_engine(this.engine);
		};
	},
	
	setup: function(){
		console.log('setting up');
		this.backgrounds[0].set_background();
	}
	
});

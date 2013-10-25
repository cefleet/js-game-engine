//This is not a structure at all....but a lot of the parts of the structures are needed for this.
//TODO possible make a super class for structures and this called.. something like "spatial objects.."
Game.Structure.EventTrigger = new Game.Class(Game.Structure,{
	initialize: function(options){
				
		Game.Structure.prototype.initialize.apply(this,[options]);
		
		//options should be contact,contact_top, left etc, inside
		this.trigger = this.trigger || 'collision';
		this.status = this.status || 'active';
		this.events = this.events || [];
		
	},
	
	trigger_event: function(){		
		this.events.forEach(function(f){
			if(f instanceof Game.Event){
				//Events are better because they have options like duration. otherwise a function will just continue to run
				f.run_event();
			} else {
				f();
			}
		}.bind(this));
	},
	
	add_event_to_trigger : function(e){
		//e should be an object of type Game.Event		
		this.events.push(e);
	},
	
	add_to_engine: function(engine){
		if(!engine.hasOwnProperty('triggers')){
			engine.triggers = [];
		}
		engine.triggers.push(this);
		this.engine = engine;
	}
	
});

Game.Gravity  = new Game.Class({
	
	initialize: function(f){
		this.accel = f || 9.8;
	},
	//Every object that gravity applies to gets this force pulled down on it
	apply : function(obj, oV){
		oV = oV || 0;
		obj.y = obj.y+(this.accel-oV);
	},
	
	apply_to_actor : function(actor){
		this.apply(actor.location,actor.physics.yVelocity);
	},
	
	apply_to_structure : function(structure){
		this.apply(structure.structure,structure.structure._yVelocity);
	}	
});
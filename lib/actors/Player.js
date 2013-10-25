Game.Actor.Player = new Game.Class(Game.Actor,{
	
	initialize: function(options){
		
		Game.Actor.prototype.initialize.apply(this,[options]);
		
		this.physics.jump_force = this.physics.jump_force || 350;
		this.physics.jump_range = this.physics.jump_range || 10;
		this.physics.can_jump = false;
	},
	
	jump: function(id){
		
 		this.physics.jump_force = this.physics.jump_force || 1700; //initial force
		this.physics.jump_range = this.physics.jump_range || 60; //duration
		
		if (this.physics.jump == null){
			this.physics.can_jump = false;
			this.physics.yVelocity = -10;
			this.physics.yAccel = (this.physics.jump_force/this.physics.mass);
			this.physics.jump = 1;
		} else if(this.physics.jump >= this.physics.jump_range){		
			this.physics.jump = null;
			this.remove_from_on(id);
		}		
	
		if(this.physics.jump != null){
			this._jump_cycle(id);
		}		
	},
	
	_jump_cycle: function(id){
		this.physics.jump = this.physics.jump+1;		
				
		this.physics.yAccel -= (this.engine.gravity.accel*(this.physics.jump));
		this.physics.yVelocity = this.physics.yVelocity + this.physics.yAccel;
		
		//TODO this is "supposed" emulate spring.. it doesnt work... at all really
		if(this.physics.jump < 5){
			this.physics.yVelocity = this.physics.yVelocity - (5/this.physics.jump)*10
		}

		if(this.physics.yAccel < 0){
			this.physics.yAccel = 0;
			this.physics.yVelocity = 0;
		}		
	},
	
	_stop_jump: function(){
		this.physics.jump = this.physics.jump_range+1;
		this.physics.yAccel = 0;
		this.physics.yVelocity = 0;
	}
});

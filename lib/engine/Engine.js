	/*TODO organizes these items better
	 * this.physics,this.rendering
	 */ 
	 
Game.GameEngine = new Game.Class({
	
	initialize: function(name,options){
		this.name = name;
		Game.Util.extend(this,options);	
		
		this.config = this.config || {}
		this.config.apply_gravity = this.config.apply_gravity || true;
		this.config.height = this.config.height || 400;
		this.config.width = this.config.width || 400;
		this.config.gravity = this.config.gravity || 2;
		this.key_frame_number = this.key_frame_number || 6;
			
		this.canvas = this.canvas || $nE('canvas', {id:"game"});
		this.canvas.width = this.config.width;
		this.canvas.height = this.config.height;
		
		this.gravity = new Game.Gravity(this.config.gravity);
		this.collider = new Game.Collision(); 
		this.apply_gravity = this.config.apply_gravity; //false may be error here

		this.backgrounds = this.backgrounds || [];
		this.actors = this.actors || [];
		this.structures = this.structures || [];
		this.events = this.events || [];
		this.texts = this.texts || [];
		//JUst stuff dealing with slowing down the animation
		this.lUT = 0;
		this.frame = 0;
		this.acD = 0;
		//17 ~= 60 fps (1/(FPS)*1000
		this.msPerFrame = this.msPerFrame || 17;	
	},
	
	init : function(){				
		this.ctx = this.canvas.getContext('2d');
		$aC(document.body,[this.canvas]);
		this.game_loop();		
	},

	/*
	 * Function: pre_render
	 * Runs before Every Frame. 
	 * Clears the screen, then applies gravity to the objects
	 */	
	pre_render: function(){
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		
		//add backgrounds
		this.backgrounds.forEach(function(bg){
			//TODO we could actually offset and move backgrounds at differnet levels if we wanted to
			this.ctx.drawImage(bg.background.image,0,0,this.canvas.width,this.canvas.height);
		}.bind(this));
		
		this.actors.forEach(function(actor){					
			//apply gravity
			
			if(this.apply_gravity === true && actor.physics.apply_gravity === true){
				this.gravity.apply_to_actor(actor);
			}
			
			//actor.collides_with_structures();
			
			//actor.adjust_position_to_structures();
		//	actor.collides_with_actors();
			
		}.bind(this));
		
		this.structures.forEach(function(structure){
			if(this.apply_gravity && structure.apply_gravity){
				this.gravity.apply_to_structure(structure);
			}
		}.bind(this));
		
	},
	
	/*
	 * Function: post_render
	 * Runs after the render function
	 * Draws The structures then the actors
	 * //TODO make this get "layer Level" to draw
	 *  
	 */
	post_render: function(){
		
		//This is questionable
		this.triggers.forEach(function(trigger){
			trigger.draw();
		});
		
		//post render needs just to draw		
		this.structures.forEach(function(structure){
			structure.draw(this.ctx);
			structure._location.x = structure.location.x;
			structure._location.y = structure.location.y;

		}.bind(this));
		
		//redraws the elements
		this.actors.forEach(function(actor){			
			actor.draw(this.ctx);
			actor._location.x = actor.location.x;
			actor._location.y = actor.location.y;
			
		}.bind(this));
		
		
		
		this.texts.forEach(function(text){	
			if(text._show){
				text.draw();
			}		
		}.bind(this));
		
	},
	
	/*
	 * Function: render
	 * Runs the actions for the frame. This can be overwitten
	 * //TODO make a "extend_render" function to extend render
	 */
	render : function(){
		
		this.actors.forEach(function(actor){
			//preform the actors actions
			actor.on();
						
		}.bind(this));		
	},
	
	/*
	 * Function: game_loop
	 * Runs the game loop
	 * //TODO have "keyframe" options
	 */
	
	game_loop: function(){
		 
		this.requestAnim = requestAnimFrame(this.game_loop.bind(this));
		
		 var delta = Date.now() - this.lUT;
		 if(this.acD > this.msPerFrame){
		 	this.acD = 0;
		 	//renders the screen
		   this.pre_render(); 
		   this.render();
		   this.post_render();
		   //don't know if i need this
         this.frame++;
         if(this.frame >= this.key_frame_number) this.frame = 0
       } else {
         this.acD += delta;
       };
       this.lUT = Date.now();
	},
	
	stop_loop : function(){
		cancelRequestAnimFrame(this.requestAnim);
	}
});

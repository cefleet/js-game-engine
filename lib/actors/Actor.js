Game.Actor = new Game.Class({
	
	initialize: function(options){
		this.physics = {};
		this.size = {};
		this.location = {};
		this.sprite = {};	
		this.actions = {};
		this.collisions = {};
		Game.Util.extend(this, options);
		
		this.id = this.id || $uid();
		this.size.w = this.size.w || 50;
		this.size.h = this.size.h || 50;
		
		this.location.x = this.location.x || 0;
		this.location.y = this.location.y || 0;
		
		//this is the previous location
		this._location = {};
		this._heading = {};
		
		this.physics.speed = this.physics.speed || 8;

		//TODO here is something funny... The false results in a false so it goes to the default
		this.physics.apply_gravity = this.physics.apply_gravity;
		if(this.physics.apply_gravity === null || typeof this.physics.apply_gravity === 'undefined'){
			this.physics.apply_gravity = true;
		}
		this.physics.yAccel = 0;
		this.physics.yVelocity = 0;
		
		this.bbox_padding = this.bbox_padding || 6;
		
		//TODO this is all wrong now
		this.sprite.type = this.sprite.type || 'box';
		this.sprite.fill = this.sprite.fill || '#000000';
		this.sprite.size = this.sprite.size || this.size;
		this.sprite.sprite_pos = this.sprite.sprite_pos || {
			x:0,
			y:0
		}
		this.intersects = {
			structures: {},
			actors: {}
		}
		this.calculate_boxes();
	},
	
	calculate_boxes : function(){
		
		//TODO this can get more complex .. like legs, head, chest etc
		var boxes = {

			left : {x:this.location.x-this.bbox_padding, y:this.location.y, w:this.size.w/2, h:this.size.h},
			right: {x:this.location.x+(this.size.w/2)+this.bbox_padding, y:this.location.y, w:this.size.w/2, h:this.size.h},
			top: {x:this.location.x, y:this.location.y-this.bbox_padding, w:this.size.w, h:this.size.h/2},
			bottom: {x:this.location.x, y:this.location.y+(this.size.h/2)+this.bbox_padding,w:this.size.w,h:this.size.h/2},
			fullBox: {x:this.location.x-this.bbox_padding,y:this.location.y-this.bbox_padding,w:this.size.w+(this.bbox_padding*2),h:this.size.h+(this.bbox_padding*2)}			
		}
		
		this.boxes = boxes;
	},
	
	calculate_heading: function(){
		this._heading.line = {
			s:[this._location.x,this._location.y],
			e:[this.location.x,this.location.y]
		}
		if(this.location.x == this._location.x){
			this._heading.x = 'still';
		} else if(this.location.x > this._location.x){
			this._heading.x = 'right';	
		} else {
			this._heading.x = 'left';
		}
		
		if(this.location.y == this._location.y){
			this._heading.y = 'still';
		} else if(this.location.y > this._location.y){
			this._heading.y = 'down';	
		} else {
			this._heading.y = 'up';
		}
	},
	
	//TODO this will be replaced with rendor and actually merged
	draw : function(ctx){
		if(this.sprite.type == 'box'){
			ctx.fillStyle = this.sprite.fill;
  			ctx.fillRect(this.location.x, this.location.y, this.size.w, this.size.h);
  		} else if(this.sprite.type == 'sprite') {
  			this.render();	
  		}
  		//calculate boxes every time is draws!
  		this.calculate_boxes();
	},
	
	render: function(){
		//TODO straighten this up some
		if(this.sprite.resource.image != ''){
			this.engine.ctx.drawImage(this.sprite.resource.image,this.sprite.sprite_pos.x,this.sprite.sprite_pos.y,this.sprite.size.w,this.sprite.size.h,this.location.x, this.location.y, this.size.w, this.size.h);
		}
	},
	
	move_to:function(x,y){
		x = x || this.location.x;
		y = y || this.location.y;
		this.location.x = x;
		this.location.y = y;
	},
	
	move : function(x,y){
		x = x || 0;
		y = y || 0;
		this.location.x = this.location.x+x;
		this.location.y = this.location.y+y;
	},
	
	resize: function(w,h){
		w = w || 0;
		h = h || 0;
		this.size.w = this.size.w+w;
		this.size.h = this.size.h+h;
	},
	
	colorize: function(color){
		color = color || '#AAAAAA';
		this.sprite.fill = color;
	},
	
	add_to_engine: function(engine){
		engine.actors.push(this);
		this.engine = engine;
	},
	
	on: function(){
		for(var id in this.actions){

			if(typeof this.actions[id] === 'function'){
				this.actions[id](id);
			}
		}
	}, 
	add_to_on : function(F){
		var id = $uid();
		this.actions[id] = F.bind(this);
		return id;
	},
	
	remove_from_on : function(id){
		delete this.actions[id];
	},
	
	move_left : function(id){
		//TODO this needs to be tied to speed
		this.move(-(this.physics.speed),0);
		if(this.sprite.type == 'sprite'){
			if(this.sprite.positions.hasOwnProperty('left')){
				this.sprite.sprite_pos = this.sprite.positions.left;
			}
		}
		this.remove_from_on(id);
	},
	
	move_right: function(id){
		this.move(this.physics.speed,0);
		if(this.sprite.type == 'sprite'){
			if(this.sprite.positions.hasOwnProperty('right')){
				this.sprite.sprite_pos = this.sprite.positions.right;
			}
		}
		this.remove_from_on(id);
	},
	
	//can be an object or string + object or id
	collides_with:function(object){		
		var colLoc = {};
		if(this.engine.collider.any_contact(this.boxes.fullBox, object.boxes.fullBox)){
			//TODO learn mappping functions to speed this up
			for(box in this.boxes){
				if(box != 'fullBox'){
					for(oBox in object.boxes){
						if(oBox != 'fullBox'){
							if(this.engine.collider.any_contact(this.boxes[box],object.boxes[oBox])){
								if(!colLoc.hasOwnProperty(box)){
									colLoc[box] = [];	
								}
								colLoc[box].push(oBox);
							}
						}
					}					
				}
			}	
								
			return colLoc;
		} else {
			return false;
		};
	},


	//TODO this is currently wrong	
	collides_with_actors : function(){
		var collides = {};
		this.engine.actors.forEach(function(actor){
			if(actor.id != this.id){
				var results = this.collides_with(actor);
				if(results){
					collides[actor.id] = results;
				}
			}
		}.bind(this));
		this.collisions.actors = collides;
	},
	
	collides_with_triggers : function(){
		var collides = {};
		this.engine.triggers.forEach(function(trigger){
			var results = this.collides_with(trigger);
			if(results){
				//TODO don't call this right here.. instead tell the trigger it has been called...
				//even better don't even use this function allow the triggers to check the actors if they have been collided with them
				trigger.trigger_event();
			}
		}.bind(this));
		this.collisions.structures = collides;
		//return collides;
	},
	
	collides_with_structures : function(){
		var collides = {};
		this.engine.structures.forEach(function(structure){
			var results = this.collides_with(structure);
			if(results){
				collides[structure.id] = results;
				collides[structure.id].structure = structure;
			}
		}.bind(this));
		this.collisions.structures = collides;
		//return collides;
	},
	
	intersects_structures_line_borders : function(){
		var intersects = {};
		this.engine.structures.forEach(function(structure){
			for(var lineName in structure.borders_lines){
				if(this.engine.collider.line_contact(structure.borders_lines[lineName],this._heading.line)){
					if(!intersects.hasOwnProperty(structure.id)){
						intersects[structure.id] = {
							structure : structure
						}	
					}
					intersects[structure.id][lineName] = true;
				}
			}	
		}.bind(this));
		this.intersects.structures =intersects;
	},
	
	//TODO REFRACTOR THE MESS OUT IF THIS NONSENSE
	/*This is also more of a placeholder to help Holton a more thorough method is needed This is very very buggy but works well enough for now
	 * This needs to be called after check for collisions
	 */
	adjust_position_to_structures : function(){
		
		//if(this._heading.x != 'still' || this._heading.y != 'still'){
			
			var borders = this.intersects.structures;
			for(var s in borders){
				var item = borders[s];
				
				if(!item.structure.passable){
				if(this._heading.y == 'down'){
					if(item.hasOwnProperty('top')){
						console.
						this._collide_bottom(thisStruct);										
					}
				}
			
				if(this._heading.y == 'up'){
					if(item.hasOwnProperty('bottom')){
						//this._collide_top(thisStruct);
						this.move_to(null,item.structure.location.y+item.structure.size.h+6);	
						this._stop_jump();			
					}
				}
				}
			}
			
		var structures = this.collisions.structures;
			
		
		for(var struct in structures){			
			var thisStruct = structures[struct];
			
			if(!thisStruct.structure.passable){
			if(this._heading.y == 'down'){
				if(thisStruct.hasOwnProperty('bottom')){
					this._collide_bottom(thisStruct);										
				}
			}
			
			if(this._heading.y == 'up'){
				if(thisStruct.hasOwnProperty('top')){
					this._collide_top(thisStruct);					
				}
			}
			
			if(this._heading.x == 'left'){
				if(thisStruct.hasOwnProperty('left')){
					this._collide_left(thisStruct);
				}
			}
			
			if(this._heading.x == 'right'){
				if(thisStruct.hasOwnProperty('right')){
					this._collide_right(thisStruct);
				}
			}
			
			/*
			//do it over again for the ones that may not have been checked
			if(thisStruct.hasOwnProperty('bottom')){
				this._collide_bottom(thisStruct);			
			}
			
			if(thisStruct.hasOwnProperty('top')){
				this._collide_top(thisStruct);
			}
			
			if(structures[struct].hasOwnProperty('left')){
				this._collide_left(thisStruct);
			}
			
			if(structures[struct].hasOwnProperty('right')){	
				this._collide_right(thisStruct);
			}
			*/	
		//}
		}		
		};
	},
	_collide_top : function(thisStruct){
		if(thisStruct.top.indexOf('bottom') > -1){		
			this.move_to(null,thisStruct.structure.location.y+thisStruct.structure.size.h);
			this._stop_jump();
		}
	},
	
	_collide_bottom : function(thisStruct){
		if(thisStruct.bottom.indexOf('top') > -1){
			if([1,2,3,4].indexOf(this.physics.jump) < 0){
				this.move_to(null,thisStruct.structure.location.y-this.size.h);
				this.physics.can_jump = true;			
			}
		}
	},
	_collide_left : function(thisStruct){
		if(thisStruct.left.indexOf('right') > -1){	
			this.move_to(thisStruct.structure.location.x+thisStruct.structure.size.w,null);
		}
	},
	_collide_right : function(thisStruct){
		if(thisStruct.right.indexOf('left') > -1){
			this.move_to(thisStruct.structure.location.x-this.size.h,null);
		}
	}
});
Game.Structure = new Game.Class({
		
	initialize: function(options){
		this.structure = {};
		this.id = $uid();
		this.location = {};
		this.size = {};
		Game.Util.extend(this, options);
		this.apply_gravity  = this.apply_gravity || false;
		this.location = this.location || {
			x:0,
			y:0
		},
		this.size = this.size || {
			w:10,
			h:10
		},
		
		this.structure.draw_type = this.structure.draw_type || 'fill';
		/*this.passable can also be an object {
			top: {
				from_top:false,
				from_bottom:true,
			},
			left: {
				from_left:false,
				from_right:true
			}
			etc
		}
		*/
		this.structure.size = this.structure.size || this.size;
		this.structure.fill = this.structure.fill || '#000000';
		
		this.passable = this.passable || false;
		this.bbox_padding = this.bbox_padding || 0;
		this._location = {};
		this.calculate_boxes();	
		this.calculate_border_lines();
	},
	
	calculate_border_lines : function(){
		this.borders_lines = { 
			top:{
				s:[this.location.x,this.location.y], 
				e:[this.location.x+this.size.w,this.location.y]
			},
			bottom:{
				s:[this.location.x,this.location.y+this.size.h],
				e:[this.location.x+this.size.w,this.location.y+this.size.h]
			},
			left:{
				s:[this.location.x,this.location.y],
				e:[this.location.x,this.location.y+this.size.h]
			},
			right: {
				s:[this.location.x+this.size.w,this.location.y],
				e:[this.location.x+this.size.w, this.location.y+this.size.h]	
			}
		}
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
	
	
	draw : function(ctx){
	if(this.structure.draw_type === 'sprite'){
		this.engine.ctx.drawImage(
			this.structure.sprite.image,
			//this.structure.sprite.sprite_pos.x,
			//this.structure.sprite.sprite_pos.y,
			0,
			0,
			this.structure.size.w,
			this.structure.size.h,
			this.location.x, 
			this.location.y, 
			this.size.w, 
			this.size.h
		);	
  	} else {
		this.engine.ctx.fillStyle = this.structure.fill;
  		this.engine.ctx.fillRect(this.location.x, this.location.y, this.size.w, this.size.h);
  	}	
  		this.calculate_boxes();
  	
	},
	
	
	add_to_engine: function(engine){
		engine.structures.push(this);
		this.engine = engine;
	}
});
Game.Text = new Game.Class({
	initialize: function(options){
		Game.Util.extend(this, options);
		this.id = this.id || $uid();
		this.text = this.text || '';
		this.location = this.location || {x:10,y:10};
		this.font = this.font || '20px Georgia';
		this.fill = this.fill || '#000000';
		this.actions = this.actions || {};
		this._frames = 0;
		this._show = false;
		this._show_range = this._show_range || 60; 
		this._show_count = 0;
		//todo could be more
	},
	
	add_to_engine: function(engine){
		this.engine = engine;
		engine.texts.push(this);
	},
	
	draw : function(){
		this.engine.ctx.font = this.font;
		this.engine.ctx.fillStyle = this.fill;
		this.engine.ctx.fillText(this.text, this.location.x,this.location.y);
	},
	
	show: function(id){
		if(this._show_count < this._show_range){
			if(!this._show){
				this.turn_on();	
			}
			this._show_cycle();			
		} else {
			this._show_count = 0;
			this.turn_off();
			this.remove_from_on(id);
		}
	},
	
	_show_cycle : function(){
		console.log(this._show_count);
		this._show_count = this._show_count+1;
	},
	
	turn_on : function(){
		this._show = true;
	},
	
	turn_off: function(){
		this._show = false;
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
	
});

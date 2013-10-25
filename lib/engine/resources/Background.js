Game.Resource.Image.Background = new Game.Class(Game.Resource.Image,{
	
	initialize: function(options){
		Game.Resource.Image.prototype.initialize.apply(this,[options]);
		
		this.type = options.type || 'background';
		this.layer = this.layer || 0;
	},
	
	set_background : function(){
		if(typeof this.engine !== 'undefined'){
			//TODO this does not work correctly
			this.engine.backgrounds.push({level:this.level, background:this});
			this.sort_background();
		}
	},
	
	sort_background : function(){
		this.engine.backgrounds.sort(function(a,b){
			if(a.level > b.level)
				return 1;
			if(a.level < b.level)
				return -1;
				
			return 0;
		});
	},
		
	remove_background : function(){
		//TODO do this
	}
});
//Game.Image = function Image(options){
	//this.image = '';
//}

//Game.Image.prototype = new Game.Resource;

//Game.Util.extend(Game.Image.prototype, {
Game.Resource.Image = new Game.Class(Game.Resource,{
	initialize: function(options){
		Game.Resource.prototype.initialize.apply(this,[options]);
		//this.load();
	},
		
	load: function(){
        
        var img = new Image();
     	img.onload = function() {
			//add to engine
			this.image = img;
			
        }.bind(this);
        
        img.src = this.url;
	},
	
});
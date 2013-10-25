//TODO this actually should just be an object Much like Util and does not need to be included as a property of the Engine Class
Game.Collision = new Game.Class({
	initialize: function(){
		
	},
	
	any_contact : function(rect1,rect2){
		//c is collision
		var c = false;
		if(rect1.x < rect2.x + rect2.w && 
		   rect1.x + rect1.w > rect2.x && 
		   rect1.y < rect2.y + rect2.h && 
		   rect1.y + rect1.h > rect2.y) 
		{
		   	c = true;
		}
		return c;
	},
	
	//l1 = {s:['x','y'], e:['x',y']};
	//l2 = {s:['x','y'], e:['x',y']};
	//http://jsfiddle.net/justin_c_rounds/Gd2S2/
	line_contact : function(l1,l2){
		var line1StartX, line1StartY, line1EndX, line1EndY, line2StartX, 
		line2StartY, line2EndX, line2EndY, denominator, a, b, numerator1, 
		numerator2, result = false;
    	
    	line1StartX = l1.s[0];
    	line1StartY = l1.s[1];
    	line1EndX = l1.e[0];
    	line1EndY = l1.e[1];
    	
    	line2StartX = l2.s[0];
    	line2StartY = l2.s[1];
    	line2EndX = l2.e[0];
    	line2EndY = l2.e[1];
    	
    	denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - 
    					((line2EndX - line2StartX) * (line1EndY - line1StartY));
    	if (denominator == 0) {
        	return result;
    	}
    	a = line1StartY - line2StartY;
    	b = line1StartX - line2StartX;
    	numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
    	numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
    	a = numerator1 / denominator;
    	b = numerator2 / denominator;

    	// if line1 is a segment and line2 is infinite, they intersect if:
    	if (a > 0 && a < 1 && b > 0 && b < 1) {
    	    result = true;
    	}
    	return result;
	}

});

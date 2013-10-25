/*
 * Adapted from: http://jlongster.com/Making-Sprite-based-Games-with-Canvas
 */
Game.Resource = new Game.Class({
	
	initialize: function(options){	
		Game.Util.extend(this, options);
		this.id = this.id || $uid();
		this.name = this.name || this.id;
		this.type = this.type || 'general';
		this.load();
		
	},
	
	load: function(){
		//This get overwritten
	},
	
	add_to_engine: function(engine){
		if(!engine.hasOwnProperty('resources')){
			engine.resources = {}
		}
		if(typeof engine.resources[this.type] === 'undefined'){
			engine.resources[this.type] = {};
		}
		engine.resources[this.type][this.id] = this;
	
		this.engine = engine;
	}	
});

/*
    // Load an image url or an array of image urls
    function load(urlOrArr) {
        if(urlOrArr instanceof Array) {
            urlOrArr.forEach(function(url) {
                _load(url);
            });
        }
        else {
            _load(urlOrArr);
        }
    }

    function _load(url) {
        if(resourceCache[url]) {
            return resourceCache[url];
        }
        else {
            var img = new Image();
            img.onload = function() {
                resourceCache[url] = img;

                if(isReady()) {
                    readyCallbacks.forEach(function(func) { func(); });
                }
            };
            resourceCache[url] = false;
            img.src = url;
        }
    }

    function get(url) {
        return resourceCache[url];
    }

    function isReady() {
        var ready = true;
        for(var k in resourceCache) {
            if(resourceCache.hasOwnProperty(k) &&
               !resourceCache[k]) {
                ready = false;
            }
        }
        return ready;
    }

    function onReady(func) {
        readyCallbacks.push(func);
    }

    window.resources = { 
        load: load,
        get: get,
        onReady: onReady,
        isReady: isReady
    };
}
*/
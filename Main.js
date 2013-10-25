var Game = {};
//When the program is compiled this will not be needed
var libFiles = [
	"tools/Util.js",
	"tools/Class.js",
	"engine/Engine.js",
	"engine/KeyMap.js",
	"engine/Event.js",
	"engine/Text.js",
	"engine/resources/Resource.js",
	"engine/resources/Image.js",
	"engine/resources/Sprite.js",
	"engine/resources/Background.js",
	"engine/resources/Sound.js",
	"engine/physics/Gravity.js",
	"engine/physics/Collision.js",
	"levels/Level.js",
	"actors/Actor.js",
	"actors/Player.js",
	"structures/Structure.js",
	"structures/EventTrigger.js"
];

for (var i=0, len=libFiles.length; i<len; i++) {
	document.write("<script src='engine/lib/" + libFiles[i] + "'></script>");
}
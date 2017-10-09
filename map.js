var render = require ('./renderSwardley');

var mapScript = {"title":"test map","elements":[{"id":"59d5cb9745b4871b5ab47d8a","name":"user need","visibility":0.7455497382198952,"maturity":0.6870561594202899},{"id":"59d5cbcc45b4871b5ab47d8e","name":"subsystem","visibility":0.5225130890052356,"maturity":0.6151721014492754},{"id":"59d5cdb845b4871b5ab47daa","name":"to be deleted","visibility":0.2994764397905759,"maturity":0.3972010869565218},{"id":"59d5f1ba45b4871b5ab47dbf","name":"vgg","visibility":0.5256544502617801,"maturity":0.35256340579710144},{"id":"59d5f25845b4871b5ab47dc0","name":"Search","visibility":0.768586387434555,"maturity":0.35246376811594204}],"links":[{"start":"user need","end":"vgg"},{"start":"user need","end":"subsystem"},{"start":"vgg","end":"to be deleted"},{"start":"Search","end":"vgg"}]};

//Write a simple html wrapper to stdout
var htmlHeader = 
	'<!DOCTYPE html>' +
	'<html>' +
	'<body>';
var htmlFooter = 
	'</body>' +
	'</html>';

var mapWidth = 600;
var mapHeight = 400;


console.log(htmlHeader);
console.log('<h1>'+mapScript.title+'</h1>');
console.log(render(mapScript,mapWidth,mapHeight));
console.log(htmlFooter);
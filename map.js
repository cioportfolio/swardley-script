var render = require ('./renderSwardley');

var mapScript = {
	title: "Example Map",
	elements: [
		{
			id: 1,
			name: "Customer",
			visibility: 1.0,
			maturity: 0.4
		},
		{
			id: 2,
			name: "Online image maniputation",
			visibility: 0.95,
			maturity: 0.3
		},
		{
			id: 3,
			name: "Online photo storage",
			visibility: 0.8,
			maturity: 0.375
		},
		{
			id: 4,
			name: "Print",
			visibility: 0.8,
			maturity: 0.625
		},
		{
			id: 5,
			name: "Web site",
			visibility: 0.7,
			maturity: 0.65
		},
		{
			id: 6,
			name: "CRM",
			visibility: 0.6,
			maturity: 0.7
		},
		{
			id: 7,
			name: "Platform",
			visibility: 0.45,
			maturity: 0.575
		},
		{
			id: 8,
			name: "Compute",
			visibility: 0.2,
			maturity: 0.725
		},
		{
			id: 9,
			name: "Data Centre",
			visibility: 0.15,
			maturity: 0.58
		},
		{
			id: 10,
			name: "Power",
			visibility: 0.1,
			maturity: 0.9
		}
	],
	links: [
		{
			start: "Customer",
			end: "Online image maniputation"
		},
		{
			start: "Customer",
			end: "Online photo storage"
		},
		{
			start: "Customer",
			end: "Web site"
		},		
		{
			start: "Customer",
			end: "Print"
		},		
		{
			start: "Online image maniputation",
			end: "Online photo storage"
		},		
		{
			start: "Online photo storage",
			end: "Web site"
		},		
		{
			start: "Print",
			end: "Web site"
		},		
		{
			start: "Web site",
			end: "Platform"
		},		
		{
			start: "Web site",
			end: "CRM"
		},		
		{
			start: "Platform",
			end: "Compute"
		},		
		{
			start: "CRM",
			end: "Compute"
		},		
		{
			start: "Compute",
			end: "Data Centre"
		},		
		{
			start: "Compute",
			end: "Power"
		},		
		{
			start: "Data Centre",
			end: "Power"
		}
	]
};

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
/* Format of map script
var mapScript = {
	title: "Example Map",
	elements: [
		{
			id: "1",
			name: "Element 1",
			visibility: 0.25,
			maturity: 0.75
		},
		{
			id: "2",
			name: "Element 2",
			visibility: 0.75,
			maturity: 0.25
		}
	],
	links: [
		{
			start: "1",
			end: "2"
		}
	]
}; */

var padding = 20;

var visToY = function (visibility, mapHeight) {
	return (1-visibility)*mapHeight;
};

var matToX = function (maturity, mapWidth) {
	return maturity*mapWidth;
};

var renderLink = function(startElement, endElement, mapWidth, mapHeight) {
	var x1 = matToX(startElement.maturity, mapWidth);
	var x2 = matToX(endElement.maturity, mapWidth);
	var y1 = visToY(startElement.visibility, mapHeight);
	var y2 = visToY(endElement.visibility, mapHeight);

	return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="grey" />';

};

var getElementById = function(elements, id) {
	var hasId = function(element) {
		return element.id === id;
	};
	return elements.find(hasId);
};

var renderLinks = function(mapScript, mapWidth, mapHeight) {
	var mapLink = function(link) {
		return renderLink(getElementById(mapScript.elements,link.start), getElementById(mapScript.elements,link.end), mapWidth, mapHeight);
	};
	return mapScript.links.map(mapLink).join('');
};

var renderElement = function(element, mapWidth, mapHeight) {
	var x = matToX(element.maturity, mapWidth);
	var y = visToY(element.visibility, mapHeight);

	var elementSvg =
		'<g id="'+element.name+'" transform="translate('+x+','+y+')">' +
          '<circle cx="0" cy="0" r="5" stroke="black" fill="white" />' +
          '<text x="10" y="-5" text-anchor="start">' +
          	element.name +
          '</text>  ' +
        '</g>';

    return elementSvg;
};

var renderElements = function(mapScript, mapWidth, mapHeight){
	var mapElement = function (element) {
		return renderElement(element, mapWidth, mapHeight);
	};
	return mapScript.elements.map(mapElement).join('');
};

var renderMap = function(mapScript, mapWidth, mapHeight) {

	var mapSvg =
      	'<g id="map">' +
	      '<g id="links">' +
	      	renderLinks(mapScript, mapWidth, mapHeight) +
	      '</g>' +
	      '<g id="elements">' +
	      	renderElements(mapScript, mapWidth, mapHeight) +
	      '</g>' +
	   	'</g>';

	return mapSvg;
};

var renderSvg = function(mapScript, mapWidth, mapHeight) {
	var svgWidth = mapWidth+2*padding;
	var svgHeight = mapHeight+4*padding;
	var vbWidth = mapWidth+padding;
	var vbHeight = mapHeight+padding;
	var custMark = mapWidth/4;
	var prodMark = mapWidth/2;
	var commMark = mapWidth/4*3;
	var visMark = mapHeight/2;
	var svgHeader =
		'<svg width="'+svgWidth+'" height="'+svgHeight+'" viewbox="-'+padding+' 0 '+vbWidth+' '+vbHeight+'" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
			'<g id="grid">' +
				'<g id="value chain" transform="translate(0,'+mapHeight+') rotate(270)">' +
					'<line x1="0" y1="0" x2="'+mapHeight+'" y2="0" stroke="black"/>' +
					'<line x1="-2em" y1="'+custMark+'" x2="'+mapHeight+'" y2="'+custMark+'" stroke="black" stroke-dasharray="5,5"/>' +
					'<line x1="-2em" y1="'+prodMark+'" x2="'+mapHeight+'" y2="'+prodMark+'" stroke="black" stroke-dasharray="5,5"/>' +
					'<line x1="-2em" y1="'+commMark+'" x2="'+mapHeight+'" y2="'+commMark+'" stroke="black" stroke-dasharray="5,5"/>' +
					'<text x="0" y="-0.2em" text-anchor="start">' +
						'Invisible' +
					'</text>' +
					'<text x="'+visMark+'" y="-0.2em" text-anchor="middle" font-weight="bold">' +
						'Value Chain' +
					'</text>' +
					'<text x="'+mapHeight+'" y="-0.2em" text-anchor="end">' +
						'Visible' +
					'</text>' +
				'</g>' +
				'<g id="Evolution" transform="translate(0,'+mapHeight+')">' +
					'<line x1="0" y1="0" x2="'+mapWidth+'" y2="0" stroke="black"/>' +
					'<text x="0" y="1em" text-anchor="start">' +
						'Genesis' +
					'</text>' +
					'<text x="'+custMark+'" y="1em" text-anchor="start">' +
						'&nbsp;Custom' +
					'</text>' +
					'<text x="'+custMark+'" y="2em" text-anchor="start">' +
						'&nbsp;built' +
					'</text>' +
					'<text x="'+prodMark+'" y="1em" text-anchor="start">' +
						'&nbsp;Product' +
					'</text>' +
					'<text x="'+prodMark+'" y="2em" text-anchor="start">' +
						'&nbsp;(+ rental)' +
					'</text>' +
					'<text x="'+commMark+'" y="1em" text-anchor="start">' +
						'&nbsp;Commodity' +
					'</text>' +
					'<text x="'+commMark+'" y="2em" text-anchor="start">' +
						'&nbsp;(+ utility)' +
					'</text>' +
					'<text x="'+mapWidth+'" y="1.5em" text-anchor="end" font-weight="bold">' +
						'Evolution' +
					'</text>' +
				'</g>' +
			'</g>';

	var svgFooter =
			'</g>' +
		'</svg> ';

	return svgHeader + renderMap(mapScript, mapWidth, mapHeight) + svgFooter;
};

function draw() {
	var svg = renderSvg(mapScript, mapWidth, mapHeight);
	var newSvg = document.getElementById('wardley-map');
	newSvg.outerHTML += svg;
}

window.onload = draw;

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

var renderSwardley = {
    selectedElement: null,
    visToY: function (visibility, mapHeight) {
	return (1-visibility)*mapHeight;
    },

    matToX: function (maturity, mapWidth) {
	return maturity*mapWidth;
    },

    yToVis: function (y, mapHeight) {
	return 1-(y/mapHeight);
    },

    xToMat: function (x, mapWidth) {
	return x/mapWidth;
    },


    renderLink: function(startElement, endElement, mapWidth, mapHeight) {
	var x1 = this.matToX(startElement.maturity, mapWidth);
	var x2 = this.matToX(endElement.maturity, mapWidth);
	var y1 = this.visToY(startElement.visibility, mapHeight);
	var y2 = this.visToY(endElement.visibility, mapHeight);

	return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" myns:startId="'+ startElement.id + '" myns:endId="' + endElement.id + '" stroke="grey" />';

    },

    getElementById: function(elements, id) {
	var hasId = function(element) {
	    return element.id === id;
	};
	return elements.find(hasId);
    },

    renderLinks: function(mapScript, mapWidth, mapHeight) {
        var that = this;
	var mapLink = function(link) {
	    return that.renderLink(that.getElementById(mapScript.elements,link.start), that.getElementById(mapScript.elements,link.end), mapWidth, mapHeight);
	};
	return mapScript.links.map(mapLink).join('');
    },

    renderElement: function(element, mapWidth, mapHeight) {
	var x = this.matToX(element.maturity, mapWidth);
	var y = this.visToY(element.visibility, mapHeight);
        var textAnchor = 'start';
        var textX = '10';
        var textY = '-5';
        var circleSvg = '<circle cx="0" cy="0" r="5" stroke="black" fill="white" />';

        if ('anchor' in element){
            if (element.anchor == 'end') {
                textAnchor = 'end';
                textX = '-10';
                textY = '-5';
            }
            if (element.anchor == 'middle') {
                textAnchor = 'middle';
                textX = '0';
                textY = '0';
            }
        }
        if ('customer' in element) {
            if (element.customer === true) {
                circleSvg = '';
            }
        }
        var elementSvg =
	    '<g id="'+element.id+'" transform="translate('+x+','+y+')" class="element">' +
            '<text x="' + textX + '" y="' + textY + '" text-anchor="' + textAnchor + '">' +
            element.name +
            '</text>  ' +
            circleSvg +
            '</g>';

        return elementSvg;
    },

    renderElements: function(mapScript, mapWidth, mapHeight){
        var that = this;
        return mapScript.elements.map(function (element, index) {
	    return that.renderElement(element, mapWidth, mapHeight);
        }).join('');
    },

    renderMap: function(mapScript, mapWidth, mapHeight) {
	var mapSvg =
      	    '<g id="map">' +
    	    '<g id="links">' +
	    this.renderLinks(mapScript, mapWidth, mapHeight) +
	    '</g>' +
	    '<g id="elements">' +
	    this.renderElements(mapScript, mapWidth, mapHeight) +
	    '</g>' +
	    '</g>';
	return mapSvg;
    },

    findGParent: function(node) {
        if(node.nodeName == "svg") {
            return null;
        }
        if(node.nodeName == "g") {
            return node;
        }
        return renderSwardley.findGParent(node.parentNode);
    },

    findSVGParent: function(node) {
        if(node.nodeName == "BODY") {
            return null;
        }
        if(node.nodeName == "svg") {
            return node;
        }
        return renderSwardley.findSVGParent(node.parentNode);
    },

    findLinks: function(svg) {
        var map = null;
        for (let child in svg.children) {
            if(svg.children[child].id == "map") {
                map = svg.children[child];
            }
        }
        if (map == null) {
            return null;
        }
        var links = null;
        for (let child in map.children) {
            if (map.children[child].id == "links") {
                return map.children[child].children;
            }
        }
        return null;
    },

    findLinksToNode: function(node) {
        var svg = renderSwardley.findSVGParent(node);
        var allLinks = renderSwardley.findLinks(svg);
        renderSwardley.links = allLinks;
        var linksToNode = [];
        for (let link of allLinks) {
            if(link.attributes['myns:startid'].value == node.id || link.attributes['myns:endid'].value == node.id){
                linksToNode.push(link);
            }
        }
        return linksToNode;
    },

    startDrag: function(event) {
        renderSwardley.selectedElement = renderSwardley.findGParent(event.target);
        renderSwardley.linksToSelectedElement = renderSwardley.findLinksToNode(renderSwardley.selectedElement);
        renderSwardley.xOffset = renderSwardley.selectedElement.transform.baseVal[0].matrix.e - event.clientX;
        renderSwardley.yOffset = renderSwardley.selectedElement.transform.baseVal[0].matrix.f - event.clientY;
    },

    updateLinksToElement: function(element, links) {
        for(link of links) {
            if (link.attributes['myns:startid'].value == element.id) {
                link.x1.baseVal.value = element.transform.baseVal[0].matrix.e;
                link.y1.baseVal.value = element.transform.baseVal[0].matrix.f;
            }
            else if (link.attributes['myns:endid'].value == element.id) {
                link.x2.baseVal.value = element.transform.baseVal[0].matrix.e;
                link.y2.baseVal.value = element.transform.baseVal[0].matrix.f;
            }
        }
    },

    drag: function(event) {
        if (renderSwardley.selectedElement != null) {
            event.preventDefault();
            renderSwardley.selectedElement.transform.baseVal.getItem(0).setTranslate(event.clientX + renderSwardley.xOffset, event.clientY + renderSwardley.yOffset);
            renderSwardley.updateLinksToElement(renderSwardley.selectedElement, renderSwardley.linksToSelectedElement);
        }
    },



    endDrag: function(event) {
        if (renderSwardley.selectedElement != null) {
            var maturity = renderSwardley.xToMat(renderSwardley.selectedElement.transform.baseVal[0].matrix.e, renderSwardley.mapWidth);
            var visibility = renderSwardley.yToVis(renderSwardley.selectedElement.transform.baseVal[0].matrix.f, renderSwardley.mapHeight);
            var element = renderSwardley.getElementById(renderSwardley.mapScript['elements'],  renderSwardley.selectedElement.id);
            element.maturity = maturity;
            element.visibility = visibility;
            document.getElementById('textarea').value = JSON.stringify(renderSwardley.mapScript, undefined, 2);
            renderSwardley.selectedElement = null;
        }

    },


    enableDragging: function(event) {
        renderSwardley.enableDraggingOnSvg(event.target);
    },

    enableDraggingOnSvg: function(svg) {
        svg.addEventListener('mousedown', this.startDrag);
        svg.addEventListener('mousemove',  this.drag);
        svg.addEventListener('mouseup', this.endDrag);
        svg.addEventListener('mouseleave', this.endDrag);
    },

    mapButtonClick: function(svgId) {
        var svg = document.getElementById(svgId);
        var mapScript = JSON.parse(document.getElementById('textarea').value);
        svg.parentElement.innerHTML = renderSvg(mapScript, renderSwardley.mapWidth, renderSwardley.mapHeight);

        if('mode' in mapScript && mapScript['mode'] == 'editable'){
            var newSvg = document.getElementsByTagName('svg')[0];
            renderSwardley.enableDraggingOnSvg(newSvg);
        }
    }
};

var renderSvg = function(mapScript, mapWidth, mapHeight) {
    renderSwardley.mapScript = mapScript;
    renderSwardley.mapWidth = mapWidth;
    renderSwardley.mapHeight = mapHeight;
    var padding = 20;
    var svgWidth = mapWidth+2*padding;
    var svgHeight = mapHeight+4*padding;
    var vbWidth = mapWidth+padding;
    var vbHeight = mapHeight+padding;
    var custMark = mapWidth/4;
    var prodMark = mapWidth/2;
    var commMark = mapWidth/4*3;
    var visMark = mapHeight/2;
    var svgId = Math.random();
    var mode = 'display';
    if ('mode' in mapScript) {
        mode = mapScript['mode'];
    }
    var enableDraggingOnLoad = '';
    if (mode == 'editable') {
        enableDraggingOnLoad = 'onload="renderSwardley.enableDragging(event)"';
    }

    var svgHeader =
		'<svg id="' + svgId + '" style="float: left; " width="'+svgWidth+'" height="'+svgHeight+'" viewbox="-'+padding+' 0 '+vbWidth+' '+vbHeight+'" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:myns="swardley"' + enableDraggingOnLoad + '>' +
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

    var svgFooter = '</g>' +
        '</svg> ';
        var textArea = '';
        if (mode == 'editable') {
            textArea = '<textarea id="textarea" style="float: left; height: 350px; width: 425px;">' + JSON.stringify(mapScript, undefined, 2) + '</textarea><button onclick="renderSwardley.mapButtonClick(\'' + svgId  + '\')">Map</button>';
        }
	return svgHeader + renderSwardley.renderMap(mapScript, mapWidth, mapHeight) + svgFooter + textArea;
};


if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
	module.exports = renderSvg;
}

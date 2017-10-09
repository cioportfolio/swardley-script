var mapScript = {
	title: "Example Map",
	elements: [
		{
			id: "1",
			name: "Customer",
			visibility: 1.0,
			maturity: 0.4
		},
		{
			id: "2",
			name: "Online image maniputation",
			visibility: 0.95,
			maturity: 0.3
		},
		{
			id: "3",
			name: "Online photo storage",
			visibility: 0.8,
			maturity: 0.375
		},
		{
			id: "4",
			name: "Print",
			visibility: 0.8,
			maturity: 0.625
		},
		{
			id: "5",
			name: "Web site",
			visibility: 0.7,
			maturity: 0.65
		},
		{
			id: "6",
			name: "CRM",
			visibility: 0.6,
			maturity: 0.7
		},
		{
			id: "7",
			name: "Platform",
			visibility: 0.45,
			maturity: 0.575
		},
		{
			id: "8",
			name: "Compute",
			visibility: 0.2,
			maturity: 0.725
		},
		{
			id: "9",
			name: "Data Centre",
			visibility: 0.15,
			maturity: 0.58
		},
		{
			id: "10",
			name: "Power",
			visibility: 0.1,
			maturity: 0.9
		}
	],
	links: [
		{
			start: "1",
			end: "2"
		},
		{
			start: "1",
			end: "3"
		},
		{
			start: "1",
			end: "5"
		},		
		{
			start: "1",
			end: "4"
		},		
		{
			start: "2",
			end: "3"
		},		
		{
			start: "3",
			end: "5"
		},		
		{
			start: "4",
			end: "5"
		},		
		{
			start: "5",
			end: "7"
		},		
		{
			start: "5",
			end: "6"
		},		
		{
			start: "7",
			end: "8"
		},		
		{
			start: "6",
			end: "8"
		},		
		{
			start: "8",
			end: "9"
		},		
		{
			start: "8",
			end: "Power"
		},		
		{
			start: "9",
			end: "10"
		}
	]
};
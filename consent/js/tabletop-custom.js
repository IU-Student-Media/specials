$(function() { init() });

			var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1IwB2aWyrGkYG-uE5UaX8RY4u68Q1c6pKBy7CMKHnflY/pubhtml?gid=0&single=true';

			// once tabletop is ready, call the function showInfo
			function init() {
				Tabletop.init( { 
					key: public_spreadsheet_url,
				    callback: showInfo,
				    simpleSheet: true } )
			}
			

			// showInfo understands that data comes from the key we set up in Tabletop.init
			function showInfo(data, tabletop) {
				var source   = $("#table-template").html();
				var template = Handlebars.compile(source);

				// these are for the individual lines
				document.getElementById("simple-table").innerHTML = "<strong>Months:</strong> " + [ data[0].Name, data[1].Name, data[2].Name ].join(", ") 
		        + "<br> <strong>Weather: </strong>" + [ data[0].Weather, data[1].Weather, data[2].Weather ].join(", ")
		        + "<br> <strong>Average: </strong>" + [ data[0].Average, data[1].Average, data[2].Average ].join(", ");
		        console.log(data);
				
				$("#live-table").append("<tr class='hidden-header'><th><b>Month</b></th><b>" + "<th>Weather</th>" + "<th>Average</th> <th>Sunlight</th></tr>");

				$.each(tabletop.sheets("tabletopTest").all(), function(i, element) {
					var html = template(element);
					$("#live-table").append(html);
				});


		        

				
			}



// document.write("The published spreadsheet is located at <a target='_new' href='" + public_spreadsheet_url + "'>" + public_spreadsheet_url + "</a>");  


// Full table tabletop w/handlebars
// When the document is ready, initialize tabletop.js

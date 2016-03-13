var map = L.map('map').setView([39.167147, -86.534151], 16)
				L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
					attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
				}).addTo(map);

				L.marker([39.167147, -86.534151]).addTo(map)
					.bindPopup("<b>This is a point</b><br />pointing to Bloomington<br />WOAAAAH").openPopup();
					var popup = L.popup();

				function onMapClick(e) {
					popup
						.setLatLng(e.latlng)
						.setContent("You clicked the map at " + e.latlng.toString())
						.openOn(map);
				}

				map.on('click', onMapClick);
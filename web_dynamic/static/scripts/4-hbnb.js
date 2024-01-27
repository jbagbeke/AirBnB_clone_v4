
$(document).ready(function () {

	var searchDict = {};

	$.ajax({
		url: 'http://127.0.0.1:5001/api/v1/status/',
		method: 'GET',
		dataType: 'json',
		success: function(data) {
			if (data['status'] === 'OK') {
				$('#api_status').addClass('available');
			} else {
				$('#api_status').removeClass('available');
			}
		},
		error: function(xhr, status, error) {
			console.error(status, error);
		}
	});


	 $('.filters h4').css('height', '35px');
	 $('.filters h4').css('white-space', 'nowrap');
	 $('.filters h4').css('margin-bottom', '0');
	 $('.filters h4').css('max-width', '20px');

	$('li input[type="checkbox"]').change(function () {		
		let checkName = $(this).data('name');
		let searchBar;

		if (this.checked) {
			searchDict[checkName] = $(this).data('id');
		} else {
			delete searchDict[checkName];
		}

		if (Object.keys(searchDict).length > 2) {
			searchBar = Object.keys(searchDict).sort()[0] + ', ' + Object.keys(searchDict).sort()[1] + '...';
			$('.amenities h4').text(searchBar);
		} else {
			$('.amenities h4').text(Object.keys(searchDict).sort().join(', '));
		}

	});			

	var filterData = {};

	function searchPostRequest(filterData) {
		$.ajax({
		url: 'http://127.0.0.1:5001/api/v1/places_search/',
		method: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(filterData),
		success: function(response) {

			let placeValues = response;

			$('section.places').empty();

			for (let i = 0; i < placeValues.length; i++) {
				let place = placeValues[i];

				$('section.places').append(
					"<article>"
					+ "<div class='title_box'>"
					+ "<h2>" + place.name + "</h2>"
					+ "<div class='price_by_night'>$" + place.price_by_night + "</div>"
					+ "</div>"
					+ "<div class='information'>"
					+ "<div class='max_guest'>" + place.max_guest + " Guest" + (place.max_guest !== 1 ? "s" : "") + "</div>"
					+ "<div class='number_rooms'>" + place.number_rooms + " Bedroom" + (place.number_rooms !== 1 ? "s" : "") + "</div>"
					+ "<div class='number_bathrooms'>" + place.number_bathrooms + " Bathroom" + (place.number_bathrooms !== 1 ? "s" : "") + "</div>"
					+ "</div>"
					+ "<div class='description'>" + place.description + "</div>"
					+ "</article>"
				);
				
			}
		},
		error: function(xhr, status, error) {
			console.error(status, error);
		}
		});
	
	}

	searchPostRequest(filterData);

	$('.search_button').click(function() {
				
				filterData['amenities'] = Object.values(searchDict);
				searchPostRequest(filterData)
			});
	

	

});

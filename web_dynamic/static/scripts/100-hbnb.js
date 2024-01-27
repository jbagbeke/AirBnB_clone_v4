
$(document).ready(function () {

	var amenityDict = {};
	var stateDict = {};
	var cityDict = {};

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
		let tmpDict = {};

		if (this.checked) {
			if ($(this).data('unique') === 1) {
				stateDict[checkName] = $(this).data('id');
				tmpDict = stateDict;
			} else if ($(this).data('unique') === 2) {
				cityDict[checkName] = $(this).data('id');
				tmpDict = cityDict;
			} else if ($(this).data('unique') === 3) {
				amenityDict[checkName] = $(this).data('id');
				tmpDict = amenityDict;
			}
		} else {
			if ($(this).data('unique') === 1) {
				delete stateDict[checkName];
				tmpDict = stateDict;
			} else if ($(this).data('unique') === 2) {
				delete cityDict[checkName];
				tmpDict = cityDict;
			} else if ($(this).data('unique') === 3) {
				delete amenityDict[checkName];
				tmpDict = amenityDict;
			}
		}

		if (Object.keys(tmpDict).length > 2) {
			if ($(this).data('unique') === 1) {
				searchBar = Object.keys(stateDict).sort()[0] + ', ' + Object.keys(stateDict).sort()[1] + '...';
				$('.locations h4').text(searchBar);
			} else if ($(this).data('unique') === 3){
				searchBar = Object.keys(amenityDict).sort()[0] + ', ' + Object.keys(amenityDict).sort()[1] + '...';
				$('.amenities h4').text(searchBar);
			}
		} else {
			if ($(this).data('unique') === 1) {
				$('.locations h4').text(Object.keys(stateDict).sort().join(', '));
			} else if ($(this).data('unique') === 3){
				$('.amenities h4').text(Object.keys(amenityDict).sort().join(', '));
			}
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
		// if (Object.values(amenityDict).length > 0) {
		// 	filterData['amenities'] = Object.values(amenityDict);
		// } else if (Object.values(stateDict).length > 0) {
		// 	filterData['states'] = Object.values(stateDict);
		// } else if (Object.values(cityDict).length > 0) {
		// 	filterData['cities'] = Object.values(cityDict);
		// }

		filterData['amenities'] = Object.values(amenityDict);
		filterData['states'] = Object.values(stateDict);
		filterData['cities'] = Object.values(cityDict);

		searchPostRequest(filterData)
	});

});

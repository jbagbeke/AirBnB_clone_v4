
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


$(document).ready(function () {
	let searchDict = {};
	 $('.filters h4').css('height', '35px');
	 $('.filters h4').css('white-space', 'nowrap');
	 $('.filters h4').css('margin-bottom', '0');
	 $('.filters h4').css('max-width', '20px');

	$('li input[type="checkbox"]').change(function () {		
	let checkName = $(this).data('name');
	let searchBar;

	if (this.checked) {
		searchDict[checkName] = $(this).data('id');
		console.log(searchDict);
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

	
});

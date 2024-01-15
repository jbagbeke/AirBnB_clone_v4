
$(document).ready(function () {
	$('.amenities.popover ul li input[type="checkbox"]').change(function () {
	
	let searchList = [];
	let checkName = $(this).data('name');

	if ($(this).is(':checked')) {
		search_list.push(checkName);
	} else {
		searchList.filter(name => name !== checkName);
	}

	$('.amenities h4').text('Hello');

	});

});

(function($){
	// Sidebar Tabs:
	if ($().tabs) {
		$("#side-tabs").tabs();
	}

	// Clear search form value on focus:
	$('#search input').focus(function () {
		if (this.value == this.defaultValue) {
			this.value = '';
		}
		if (this.value != this.defaultValue) {
			this.select();
		}
	}).blur(function () {
		if ($.trim(this.value) == '') {
			this.value = (this.defaultValue ? this.defaultValue : '');
		}
	});


	//Clear Form on Submit
	$.fn.clearForm = function () {
		return this.each(function () {
			var type = this.type,
				tag = this.tagName.toLowerCase();
			if (tag == 'form') return $(':input', this).clearForm();
			if (type == 'text' || tag == 'textarea') this.value = '';
		});
	};	
})(jQuery);

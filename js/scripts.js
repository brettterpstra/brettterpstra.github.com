(function($){
	// Sidebar Tabs:
	
	$("#side-tabs").tabs();
	
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
	
	if ($('#accordion').length) {
		$("#accordion div.slide").find('ul').slideUp();
	  $("#accordion div.slide h4").click(function(e){
			if (e.target.tagName == 'A')
				return true;
			var parent = $(this).parent('div');
			var targetul = parent.find('ul');
			$('div.slide ul').not(targetul).slideUp('fast',function(){
				targetul.slideDown();
			});
		});
	}

})(jQuery);

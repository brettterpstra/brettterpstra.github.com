(function($){
	// Clear Form on Submit
	$.fn.clearForm = function () {
		return this.each(function () {
			var type = this.type,
				tag = this.tagName.toLowerCase();
			if (tag === 'form') return $(':input', this).clearForm();
			if (type === 'text' || tag === 'textarea') this.value = '';
		});
	};

	$('form#contact-form').submit(function () {

		// Remove error messages and classes
		$('form#contact-form label span.alert, div.error').remove();
		$('form#contact-form input, form#contact-form textarea').removeClass('error');

		// Variables
		var hasError = false;
		var emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

		// Validate Name
		if ($.trim($('#name').val()) == '') {
			$('#name').parent().find('label').append(' <span class="alert">You forgot to enter your name.</span>');
			$('#name').addClass('error');
			hasError = true;
		}
		// Validate Email
		if ($.trim($('#email').val()) == '') {
			$('#email').parent().find('label').append(' <span class="alert">You forgot to enter your email address.</span>');
			$('#email').addClass('error');
			hasError = true;
		} else if (!emailRegex.test($.trim($('#email').val()))) {
			$('#email').parent().find('label').append(' <span class="alert">You entered an invalid email address.</span>');
			$('#email').addClass('error');
			hasError = true;
		}
		// Validate Subject 
		if ($.trim($('#subject').val()) == '') {
			$('#subject').parent().find('label').append(' <span class="alert">You forgot to enter a subject.</span>');
			$('#subject').addClass('error');
			hasError = true;
		}
		// Validate Message
		if ($.trim($('#message').val()) == '') {
			$('#message').parent().find('label').append(' <span class="alert">You forgot to enter your message.</span>');
			$('#message').addClass('error');
			hasError = true;
		}

		if (!hasError) {

			//Show the ajax loader  	
			$(this).find('li.loader').slideUp(200).html('<img class="ajaxloader" src="images/ajax_loader.gif" alt="Loading&hellip;" />').delay(200).animate({
				opacity: 'show',
				height: 'show'
			}, 200).end().find('li.buttons')
			// Fade and disable Submit button
			.animate({
				opacity: '0.3'
			}, 200).end().find('#submit').attr('disabled', 'disabled');


			// AJAX Submit				
			$.ajax({
				url: $(this).attr('action'),
				type: 'post',
				data: $(this).serialize(),
				cache: false,
				error: function () {
					console.log("Failed to submit");
				},
				success: function (data) {
					// Show success message
					$('form#contact-form').find('li.loader').html('<img src="images/icons/ico_check.png" alt="" /> Message sent successfully.').end().find('li.buttons')
					// Fade in the buttons
					.animate({
						opacity: '1'
					}, 200).find('#submit')
					// Renable the Submit button and clear the form
					.attr('disabled', '');
					$('form#contact-form').clearForm();
				}
			});

		} // end if no errors
		return false;

	}); // end if submitted
})(jQuery);
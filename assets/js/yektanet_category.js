const api_data_mapping = {
	server: {
		category_api: {
			url: 'https://cg-admin.yektanet.com/api/v1/democategory',
		},
		scrapper_api: {
			url: 'https://cg-sc.yektanet.com/api/v1/url/category',
		},
	},
};

jQuery(document).ready(function() {
	let $cat_input = jQuery('#catfeature__demo-input');
	const $cat_btn = jQuery('#catfeature__demo-submit');
	const $cat_btn_chooser = jQuery('.catfeature__demo-button');
	let _data = {};
	let _ch = 'url';

	function show_loader() {
		jQuery('#chart').html('<i class="fa fa-spinner fa-spin fa-2x"></i>');
		jQuery('#chart').fadeIn();
	}

	$cat_btn_chooser.on('click', function() {
		if (jQuery(this).hasClass('current')) return false;

		jQuery('.catfeature__demo-button.current').removeClass('current');
		jQuery(this).addClass('current');

		const ch = jQuery(this).attr('data-choose');
		if (ch == 'url') {
			jQuery('#catfeature__demo-text-section').fadeOut('fast', function () {
				jQuery('.catfeature__demo-title').html(
					'لطفاً برای تشخیص موضوع، آدرس اینترنتی مقاله خود را وارد کنید'
				);
				$cat_input = jQuery('#catfeature__demo-input-url');
				$cat_input.val('');
				jQuery('#catfeature__demo-url-section').fadeIn();
				jQuery('#chart').fadeOut().html('');
			});
		} else {
			jQuery('#catfeature__demo-url-section').fadeOut('fast', function () {
			jQuery('.catfeature__demo-title').html(
				'لطفاً برای تشخیص موضوع، یک متن نسبتاً طولانی از مقاله خود را وارد کنید'
			);
			$cat_input = jQuery('#catfeature__demo-input');
			$cat_input.val('');
			jQuery('#chart').fadeOut().html('');
			jQuery('#catfeature__demo-text-section').fadeIn();
            });
		}
		_ch = ch;

		return false;
	});
	function getCategory(content) {
		jQuery.ajax({
			method: 'POST',
			url: api_data_mapping.server.category_api.url,
			data: content || _data,
			crossDomain: true,
			beforeSend: function(xhr) {
				xhr.setRequestHeader(
					'Authorization',
					api_data_mapping.server.category_api.headers
				);
				xhr.withCredentials = true;
			},
			success: function(response) {
				if (response.status === 'success') {
						const result = response.result;
						let result_text = '';
						if (result.length) {
							const first_category = result[0];
							const first_category_title = first_category[0];
							const first_category_prob = first_category[1];
							if (
								first_category_prob >= 0.5 ||
								result.length === 1
							) {
								result_text = `
									موضوع تشخیص داده شده برای مقاله شما
									<strong>
									«
									${first_category_title}
									»
									</strong>
									است	
									`;
							} else {
								const second_category = result[1];
								const second_category_title =
									second_category[0];
								result_text =
									`
									موضوع تشخیص داده شده برای مقاله شما نزدیک به دسته‌بندی‌های
									<strong>
									«${first_category_title}»
									و
									«${second_category_title}»
									</strong>
									است
`;							}
						} else {
							result_text =
								'متاسفانه قادر به تشخیص موضوع متن یا URL شما نبودیم لطفا متن یا URL دیگری انتخاب کنید و مجدداً تلاش کنید.';
						}
						jQuery('#chart').html(result_text);
						jQuery('#chart').fadeIn();
				} else {
                        var result_text =
                            'متاسفانه قادر به تشخیص موضوع متن یا URL شما نبودیم لطفا متن یا URL دیگری انتخاب کنید و مجدداً تلاش کنید.';
                    jQuery('#chart').html(result_text);
                    jQuery('#chart').fadeIn();

				}
			},
			error: function(error) {
                        var result_text =
                            'متاسفانه قادر به تشخیص موضوع متن یا URL شما نبودیم لطفا متن یا URL دیگری انتخاب کنید و مجدداً تلاش کنید.';
						jQuery('#chart').html(result_text);
						jQuery('#chart').fadeIn();

			},
		});
	}

	jQuery("#catfeature__demo-input-url").bind('paste', function(e) {
	setTimeout(function() {
		 	jQuery('.catfeature__demo-submit').click()
    }, 500);

	});
	jQuery("#catfeature__demo-input-url").keypress(function(event){
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == '13'){
			jQuery('.catfeature__demo-submit').click();
		}
	});
	function getContent() {
		jQuery.ajax({
			method: 'GET',
			url: api_data_mapping.server.scrapper_api.url,
			data: _data,
			crossDomain: true,
			beforeSend: function(xhr) {
				xhr.setRequestHeader(
					'Authorization',
					api_data_mapping.server.scrapper_api.headers
				);
				xhr.withCredentials = true;
			},
			success: function(response) {
				if (response.status === 'success') {
					// getCategory({ "content": response.content })
						var result = response.result;
						let result_text = '';
						if (result.length) {
							const first_category = result[0];
							const first_category_title = first_category[0];
							const first_category_prob = first_category[1];
							if (
								first_category_prob >= 0.5 ||
								result.length === 1
							) {
								result_text = `
									موضوع تشخیص داده شده برای مقاله شما
									<strong>
									«
									${first_category_title}
									»
									</strong>
									است	
									`;
							} else {
								const second_category = result[1];
								const second_category_title = second_category[0];
								result_text =
									`
									موضوع تشخیص داده شده برای مقاله شما نزدیک به دسته‌بندی‌های
									<strong>
									«${first_category_title}»
									و
									«${second_category_title}»
									</strong>
									است
`;
							}
						} else {
							result_text =
								'متاسفانه قادر به تشخیص موضوع متن یا URL شما نبودیم لطفا متن یا URL دیگری انتخاب کنید و مجدداً تلاش کنید.';
						}
						jQuery('#chart').html(result_text);
						jQuery('#chart').fadeIn();
				} else {
                        var result_text =
                            'متاسفانه قادر به تشخیص موضوع متن یا URL شما نبودیم لطفا متن یا URL دیگری انتخاب کنید و مجدداً تلاش کنید.';
                    	jQuery('#chart').html(result_text);
                    	jQuery('#chart').fadeIn();

				}
			},
			error: function(error) {
                        var result_text =
                            'متاسفانه قادر به تشخیص موضوع متن یا URL شما نبودیم لطفا متن یا URL دیگری انتخاب کنید و مجدداً تلاش کنید.';
                    jQuery('#chart').html(result_text);
                    jQuery('#chart').fadeIn();

			},
		});
	}

	jQuery('.catfeature__demo-submit').click(function(e) {
		e.preventDefault();
		if (_ch == 'url') {
			$cat_input = jQuery('#catfeature__demo-input-url');
		} else {
			$cat_input = jQuery('#catfeature__demo-input');
		}
		if (!$cat_input.val().length) return false;

		if (_ch == 'url') {
			if (
				$cat_input.val().indexOf('http') != 0 &&
				$cat_input.val().indexOf('https') != 0
			)
				$cat_input.val(`http://${$cat_input.val()}`);
			_data = { url: $cat_input.val() };
		} else _data = { content: $cat_input.val() };

		jQuery('.catfeature__loader-error').css({
			opacity: '0',
			visibility: 'hidden',
		});
		jQuery('.highcharts-container').fadeOut(500);
		show_loader();
		if (_ch == 'url') {
			getContent();
		} else {
			getCategory();
		}

		return false;
	});
});

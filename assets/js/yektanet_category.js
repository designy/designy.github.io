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
	const $form = jQuery('#catfeature__demo-form');
	let $cat_input = jQuery('#catfeature__demo-input');
	const $cat_btn = jQuery('#catfeature__demo-submit');
	const $cat_btn_chooser = jQuery('.catfeature__demo-button');
	let _data = {};
	let _ch = 'url';

	function show_loader() {
		jQuery('#chart').html('<i class="fa fa-spinner fa-spin fa-2x"></i>');
	}

	function hide_loader() {
		window.setTimeout(function() {
			jQuery('#chart').html('');
		}, 1000);
	}

	$cat_btn_chooser.on('click', function() {
		if (jQuery(this).hasClass('current')) return false;

		jQuery('.catfeature__demo-button.current').removeClass('current');
		jQuery(this).addClass('current');

		const ch = jQuery(this).attr('data-choose');
		if (ch == 'url') {
			jQuery('#catfeature__demo-input').fadeOut();
			$cat_input = jQuery('#catfeature__demo-input-url').fadeIn();
			$cat_input.val('');
		} else {
			jQuery('#catfeature__demo-input-url').fadeOut();
			$cat_input = jQuery('#catfeature__demo-input').fadeIn();
			$cat_input.val('');
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
					hide_loader();
					window.setTimeout(function() {
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
								result_text =
									`${'موضوع تشخیص داده شده برای مقاله شما' +
										'»'}${first_category_title}»` + `است.`;
							} else {
								const second_category = result[1];
								const second_category_title =
									second_category[1];
								result_text =
									`${'موضوع تشخیص داده شده برای مقاله شما نزدیک به دسته‌بندی‌های' +
										'»'}${first_category_title} و ${+second_category_title}»` +
									`است.`;
							}
						} else {
							result_text =
								'متاسفانه قادر به تشخیص موضوع متن یا URL شما نبودیم لطفا متن یا URL دیگری انتخاب کنید و مجدداً تلاش کنید.';
						}
						jQuery('#chart').html(result_text);
					}, 1500);
				} else {
					jQuery('.catfeature__loader-error').css({
						opacity: '1',
						visibility: 'visible',
					});
				}
			},
			error: function(error) {
				jQuery('.catfeature__loader-error').css({
					opacity: '1',
					visibility: 'visible',
				});
			},
		});
	}

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
					hide_loader();
					window.setTimeout(function() {
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
								result_text =
									`${'موضوع تشخیص داده شده برای مقاله شما' +
										'»'}${first_category_title}»` + `است.`;
							} else {
								const second_category = result[1];
								const second_category_title =
									second_category[1];
								result_text =
									`${'موضوع تشخیص داده شده برای مقاله شما نزدیک به دسته‌بندی‌های' +
										'»'}${first_category_title} و ${+second_category_title}»` +
									`است.`;
							}
						} else {
							result_text =
								'متاسفانه قادر به تشخیص موضوع متن یا URL شما نبودیم لطفا متن یا URL دیگری انتخاب کنید و مجدداً تلاش کنید.';
						}
						jQuery('#chart').html(result_text);
					}, 1500);
				} else {
					jQuery('.catfeature__loader-error').css({
						opacity: '1',
						visibility: 'visible',
					});
				}
			},
			error: function(error) {
				jQuery('.catfeature__loader-error').css({
					opacity: '1',
					visibility: 'visible',
				});
			},
		});
	}

	jQuery('#catfeature__demo-submit').click(function(e) {
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

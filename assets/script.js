const api = {
  url: 'https://cba.yektanet.com/api/v4/keywords/similar/',
  scrape: 'https://scrape.yektanet.com/api/v1/scrape/',
  demo: 'https://cba.yektanet.com/api/v1/keywords/demo/',
};
const $ = jQuery;
$(document).ready(function () {
  let $keyword_input = $('#keywords_demo_input');
  $keyword_input.tagsinput({
    confirmKeys: [13],
  });

  function show_loader() {
    $('#result').html(
      '<div style="text-align:center;"><i class="fa fa-spinner fa-spin fa-2x"></i></div>'
    );
    $('#result').fadeIn();
  }

  function getKeywords() {
    const keywords = $keyword_input.tagsinput('items');
    if (!keywords.length) {
      $('#result').html(
        'لطفا کلیدواژه‌های مورد‌نظر را با زدن دکمه‌ی Enter و یا دکمه‌ی «افزودن کلیدواژه» وارد نمایید.'
      );
      $('.bootstrap-tagsinput input').attr('placeholder', `مثال: بورس`);
      $('#result').fadeIn();
      return;
    }

    show_loader();

    $.ajax({
      method: 'POST',
      url: api.url,
      data: JSON.stringify({ keywords, count: 12 }),
      crossDomain: true,
      contentType: 'application/json',
      success: function (response) {
        if (response.selected_capacity_percent && response.selected_capacity) {
          $('#result').html(
            `<h2>ظرفیت: 
          ${persianNumberHumanize(
            response.selected_capacity
          )} نمایش روزانه (${engToPerDigits(
              response.selected_capacity_percent.toFixed(4)
            )}٪ از کل ظرفیت نمایش کلیدواژه‌ای)</h2>`
          );
        }
        let result_text = '';

        const suggestions = (response.suggestions || []).filter(
          (record) => record.capacity_percent > 0.001
        );

        if (suggestions.length) {
          $('#result').append(
            '<h3 class="keywords_title">کلیدواژه‌های مرتبط:<small> (با کلیک بر روی کلیدواژه‌های مرتبط آن‌ها را اضافه کنید.)</small></h3>'
          );

          const ul = $('<ul class="keywords_list"></ul>');

          suggestions.map((suggestion) => {
            const txt = $("<li class='keywords_demo_tooltip'></li>").text(
              suggestion.keyword
            );

            txt.click(function () {
              addKeyword(suggestion.keyword);
            });

            txt.append(` <small>
                      (${engToPerDigits(
                        suggestion.capacity_percent.toFixed(3)
                      )}٪)
                      </small>`);

            txt.append(
              `<span class="tooltiptext">
                ${persianNumberHumanize(suggestion.capacity)} نمایش
              </span>`
            );

            ul.append(txt);
          });

          result_text = ul;

          $('#result').append(result_text);

          $('.bootstrap-tagsinput input').attr(
            'placeholder',
            `مثال: ${suggestions[0].keyword}`
          );

          //******** */
          showGettingLandingUrl(keywords);
          //******** */
        } else {
          $('.bootstrap-tagsinput input').attr('placeholder', `مثال: بورس`);
          result_text = 'کلیدواژه مرتبطی با موارد انتخابی شما یافت نشد.';
          $('#result').html(result_text);
        }

        $('#result').append('<hr />');
        if (response.webpages && response.webpages.length) {
          const webpages = response.webpages.slice(0, 6);

          const ul = $('<div class="urls_list"></div>');
          ul.append(
            `<h2 class="text-center">نمونه صفحات حاوی کلیدواژه‌ی درخواستی شما<br />
              <small>(برای مشاهده تبلیغات خود در این صفحات روی لینکهای زیر کلیک کنید)</small>
            </h2>`
          );
          webpages.map((webpage) => {
            const txtUrl = $(
              `<div class="url_result">
                  <a href="${webpage.url}" target="_blank">
                    <h3>${webpage.title}</h3>
                  </a>
                  <p>${webpage.description}</p>
              </div>`
            );

            ul.append(txtUrl);
          });
          $('#result').append(ul);
        } else {
          result_text = 'مقاله‌ی مرتبطی با موارد انتخابی شما یافت نشد.';
          $('#result').append(result_text);
        }

        $('#result').fadeIn();
      },
      error: function (error) {
        $('.bootstrap-tagsinput input').attr('placeholder', `مثال: بورس`);
        var result_text = 'دریافت لیست کلیدواژه‌های مرتبط با خطا مواجه شد!';
        $('#result').html(result_text);
        $('#result').fadeIn();
      },
    });
  }

  $keyword_input.on('itemAdded', function (e) {
    getKeywords();
  });

  $keyword_input.on('itemRemoved', function (e) {
    getKeywords();
  });

  function addKeyword(keyword) {
    if ($keyword_input.tagsinput('items').includes(keyword)) {
      return;
    }
    $keyword_input.tagsinput('add', keyword);
  }

  function showGettingLandingUrl(keywords) {
    $('#result').append('<hr />');
    $('#result').append('<div>لینک لندینگ / وب‌سایت خود را وارد کنید:</div>');
    const scraperForm = $(`
          <div class="keywords_demo_url_form">
            <input class="keywords_demo_url_input" type="text" placeholder="https://" />
          </div>`);

    const scraperFormBtn = $(
      `<input
              class="keywords_demo_url_submit"
              type="submit"
              value="ثبت لینک"
            />`
    );

    scraperFormBtn.click(function () {
      createItem(keywords);
    });

    const scraperFormState = $(`<span class="keywords_demo_url_state"></span>`);

    scraperForm.append(scraperFormBtn);

    scraperForm.append(scraperFormState);

    $('#result').append(scraperForm);
  }

  function createItem(keywords) {
    const $landingUrlInput = $('.keywords_demo_url_input');
    if (!$landingUrlInput.val()) {
      return;
    }

    if (!/^https?/.test($landingUrlInput.val())) {
      $('.keywords_demo_url_input').val(`http://${$landingUrlInput.val()}`);
    }

    $('.keywords_demo_url_state').html('<i class="fa fa-spinner fa-spin" />');
    $('.keywords_demo_url_submit').attr('disabled', true);

    $.ajax({
      method: 'GET',
      url: api.scrape,
      data: {
        image_sizes: '225x150',
        url: $landingUrlInput.val(),
      },
      crossDomain: true,
      contentType: 'application/json',
      success: function (response) {
        if (response.result) {
          var title = response.result.title;
          var image = response.result.image;
          var mapedKeywords = keywords.map((k) => ({ keyword: k }));
          createDemo(title, image, $landingUrlInput.val(), mapedKeywords);
        } else {
          $('.keywords_demo_url_state').html(
            'ثبت لینک با خطا مواجه شد، دوباره امتحان کنید.'
          );
          $('.keywords_demo_url_submit').attr('disabled', false);
        }
      },
      error: function (error) {
        $('.keywords_demo_url_state').html(
          'ثبت لینک با خطا مواجه شد، دوباره امتحان کنید.'
        );
        $('.keywords_demo_url_submit').attr('disabled', false);
      },
    });
  }

  function createDemo(title, image, url, keywords) {
    $.ajax({
      method: 'POST',
      url: api.demo,
      data: JSON.stringify({
        title,
        image,
        url,
        keywords,
      }),
      crossDomain: true,
      contentType: 'application/json',
      success: function (response) {
        $('.keywords_demo_url_state').html('لینک شما با موفقیت ثبت شد.');
        $('.keywords_demo_url_submit').attr('disabled', false);
      },
      error: function (error) {
        $('.keywords_demo_url_state').html(
          'ثبت لینک با خطا مواجه شد، دوباره امتحان کنید.'
        );
        $('.keywords_demo_url_submit').attr('disabled', false);
      },
    });
  }

  function numberHumanize(num) {
    try {
      const humanize = num
        .toString()
        .replace(/[^-\d.]/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      if (humanize.length < num.toString().length) {
        return num;
      }
      return humanize;
    } catch (err) {
      return num;
    }
  }

  function persianNumberHumanize(num) {
    return engToPerDigits(numberHumanize(num));
  }

  const engToPerMap = '۰۱۲۳۴۵۶۷۸۹';
  function engToPerDigits(num) {
    try {
      return num
        .toString()
        .replace(/[0-9]/g, (match) => engToPerMap[parseInt(match)]);
    } catch (e) {
      return num;
    }
  }
});

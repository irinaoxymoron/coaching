$(document).ready(function () {
    //Filter
    var objects = $('.objects__card');

    $('.objects__filter-item').click(function (event) {
        event.preventDefault();
        var customType = $(this).data('objects');

        $('.objects__filter-item').removeClass('objects__filter-item--active');
        $(this).addClass('objects__filter-item--active');

        if (customType === 'all') {
            if (!$('.objects__show-more').hasClass('objects__show-more--clicked')) {
                $('.objects__show-more').css('display', 'block');
                objects.detach().appendTo('.objects__cards').css('display', 'none');
                $('.objects__card:nth-child(-n + 4)').css('display', 'block');
            } else {
                objects.detach().appendTo('.objects__cards').css('display', 'block');
            }
        } else {
            $('.objects__show-more').css('display', 'none');

            objects.detach()
                .filter(function () {
                    return $(this).data('type') === customType;
                })
                .appendTo('.objects__cards').css('display', 'block');
        }
    });

    $('.objects__show-more').on('click', function (event) {
        event.preventDefault();
        $('.objects__card').css('display', 'block');
        $(this).addClass('objects__show-more--clicked').css('display', 'none');
    });

    //Custom select

    $('.branches-select').select2({
        placeholder: "Выберите свой регион",
        minimumResultsForSearch: Infinity
    });

    //Fix for viewport

    (function () {
        if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
            var msViewportStyle = document.createElement("style");
            msViewportStyle.appendChild(
                document.createTextNode("@-ms-viewport{width:auto!important}")
            );
            document.getElementsByTagName("head")[0].appendChild(msViewportStyle);
        }
    })();

    // Smooth scroll

    $('.page-nav__link').on('click', function (e) {
        e.preventDefault();
        var target_scroll = $($(this).attr('href')).offset().top;
        $('body,html').animate({'scrollTop': target_scroll}, 1000);
    });

    if ($('#defaultOpenTab').lenght) {
        document.getElementById("defaultOpenTab").click();
    }

    // Visible text

    $('.features__header').on('click', function (e) {
        e.preventDefault();
        $(this).next().slideToggle();
        $(this).find('.features__item-last-word').toggleClass('features__item-last-word--opened');
    });

    //Mask
    $('.field-phone').inputmask({"mask": "+7 (999) 999-9999"});

    //Validation

    $.validator.addMethod("minlenghtphone", function (value, element) {
        return value.replace(/\D+/g, '').length > 10;
    });

    $.validator.addMethod("requiredphone", function (value, element) {
        return value.replace(/\D+/g, '').length > 1;
    });


    function getWordCount(wordString) {
        var words = wordString.split(" ");
        words = words.filter(function (words) {
            return words.length > 0
        }).length;
        return words;
    }

    $.validator.addMethod("wordCount",
        function (value, element, params) {
            var count = getWordCount(value);
            if (count <= params[0]) {
                return true;
            }
        }
    );

    $('#callback-form').validate({
        rules: {
            name: "required",
            phone: {
                requiredphone: true,
                minlenghtphone: true
            },
            privacy: "required"
        },
        errorPlacement: function (error, element) {
            element.attr("placeholder", error.text());
        },
        messages: {
            name: "Представьтесь, пожалуйста",
            phone: "Введите номер телефона"
        },
        submitHandler: function (form, event) {
            event.preventDefault();
            sendRequest(form);
        }
    });

    // Forms

    function sendRequest(form) {
        var form = $(form);
        var data = new FormData();

        form.find('input, select').each(function () {
            if ($(this).attr('type') === 'checkbox') {
                data.append($(this).attr('name'), $(this).is(':checked'));
            } else {
                data.append($(this).attr('name'), $(this).val());
            }
        });

        $.ajax({
            method: 'POST',
            url: '/api/send-request',
            data: data,
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            success: function (response, textStatus, code) {
                form.trigger('reset');
                $('#form-wrapper').hide();
                $('#success-message').show();
            }
        });
    }
});
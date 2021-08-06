//Import jQuery module (npm i jquery)
import $, { event } from 'jquery'
window.jQuery = $
window.$ = $

import gsap from 'gsap'
import aos from 'aos'
import IMask from 'imask'
// Import vendor jQuery plugin example (not module)
//?require('~/app/libs/mmenu/dist/mmenu.js')
require('~/app/libs/cookie/cookie.js')
require('~/app/libs/wow/dist/wow.min.js')

$(document).ready(function() {
    aos.init();

    //
    // const shopLinks = document.querySelectorAll('.shop_link');

    // $(".shop_link").on("mouseover ", function() {
    //     //быстро изменяем стиль display
    //     $(".shop_text").css('color', 'orange');
    // });
    // $(".shop_link").on("mouseout", function() {
    //     //быстро изменяем стиль display
    //     $(".shop_text").css('color', 'white');
    // });

    const checkReg = (str = `+7(___)___-__-__`, regex = /_/gm) => {
        let m;
        while ((m = regex.exec(str)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
                return true;
            }

            // The result can be accessed through the `m`-variable.
            m.forEach((match, groupIndex) => {
                return false;
            });
        }
    };
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', event => {
            event.preventDefault();
            const fields = form.querySelectorAll('input');
            fields.forEach(field => {
                if (field.value === '') {
                    field.setAttribute('required');
                } else {
                    const fieldPhone = form.querySelector('.phone-mask');
                    if (!checkReg(fieldPhone.value)) {
                        field.setAttribute('require');
                    };
                };
            });

        })
    })
    const selector = document.querySelectorAll('.phone-mask');
    selector.forEach(element => {
        var maskOptions = {
            mask: '+{7}(000)000-00-00',
            lazy: false
        };
        let mask = IMask(element, maskOptions);
    });


    //анимация стрелочки
    gsap.to(".header_arrow-arrow", { y: 5, duration: 1, repeat: -1 });


    const checkAdult = () => {
        var statusGlobal;
        var cookieTest = $.cookie('statusPopUp');
        var timeOfLife = 'session';

        var addPopUp = () => {
            var popup = document.querySelector('.alert');

            //Проверяю статус куки и если он 0, то задаю вопрос
            //Иначе просто удалю PopUp из DOM


            if (popup) {
                popup.classList.add('.display_fixed');

                var yes = document.querySelector('.alert_button');


                yes.addEventListener('click', () => {
                    //Щадящее удаление
                    popup.classList.remove('.display_fixed');
                    popup.classList.add('.display_none');
                    console.log('Удаление');

                    $.cookie('statusPopUp', 1);

                    //Кардинальное удаление из DOM
                    if (timeOfLife === 'session') {
                        $.cookie('statusPopUp', 1);
                    } else {
                        $.cookie('statusPopUp', 1, {
                            'max-age': timeOfLife
                        });
                    }

                    popup.remove();

                })
            } else {
                popup.classList.remove('.display_fixed');
                popup.classList.add('.display_none');
            }

            return status;

        }

        var setCookieForUserStart = () => {
            $.cookie('statusPopUp', 0);

        }

        //Установка куки в зависимости от состояния PopUp
        var checkCookieForUser = (status) => {
            if (!status) {
                console.log(status);
                addPopUp();
                return true;
            }


        }


        checkCookieForUser(cookieTest);
        setCookieForUserStart();
    }

    $(window).on("scroll", function() {
        if ($(window).scrollTop() > 250) {
            $('.sticky-top').addClass('header_scroll');
            $('.fix-button_arrow').removeClass('display_none');
        }
        if ($(window).scrollTop() < 250) {
            $('.sticky-top').removeClass('header_scroll');
            $('.fix-button_arrow').addClass('display_none');
        }
    });

});
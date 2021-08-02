//Import jQuery module (npm i jquery)
import $ from 'jquery'
window.jQuery = $
window.$ = $

import cookie from 'jquery.cookie'
import gsap from 'gsap'

// Import vendor jQuery plugin example (not module)
//?require('~/app/libs/mmenu/dist/mmenu.js')
require('~/app/libs/cookie/cookie.js')
$(document).ready(function() {
    //анимация стрелочки
    gsap.to(".header_arrow-arrow", { y: 5, duration: 5, repeat: -1 });

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

    // checkAdult();



    // testGsap.to(".header_arrow-arrow", { y: 100, duration: 1 });

    const maskPhone = (selector, masked = "+7 (___) ___-__-__") => {
            const elems = document.querySelectorAll(selector);

            function mask(event) {
                const keyCode = event.keyCode;
                const template = masked,
                    def = template.replace(/\D/g, ""),
                    val = this.value.replace(/\D/g, "");

                let i = 0,
                    newValue = template.replace(/[_\d]/g, a =>
                        (i < val.length ? val.charAt(i++) || def.charAt(i) : a)
                    );
                i = newValue.indexOf("_");
                if (i != -1) {
                    newValue = newValue.slice(0, i);
                }
                let reg = template
                    .substr(0, this.value.length)
                    .replace(/_+/g, a => "\\d{1," + a.length + "}")
                    .replace(/[+()]/g, "\\$&");
                reg = new RegExp("^" + reg + "$");
                if (!reg.test(this.value) ||
                    this.value.length < 5 ||
                    (keyCode > 47 && keyCode < 58)
                ) {
                    this.value = newValue;
                }
                if (event.type == "blur" && this.value.length < 5) {
                    this.value = "";
                }
            }

            for (const elem of elems) {
                elem.addEventListener("input", mask);
                elem.addEventListener("focus", mask);
                elem.addEventListener("blur", mask);
            }
        }
        //maskPhone('.form_phone', "+7 (___) ___-__-__");
        // use maskPhone('селектор элементов', 'маска, если маску не передать то будет работать стандартная +7 (___) ___-__-__');

    $(window).on("scroll", function() {
        if ($(window).scrollTop() > 300) $('.sticky-top').addClass('header_scroll');
        if ($(window).scrollTop() < 300) $('.sticky-top').removeClass('header_scroll');
    });


})
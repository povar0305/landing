//Import jQuery module (npm i jquery)
import $ from 'jquery'
window.jQuery = $
window.$ = $

 // Import vendor jQuery plugin example (not module)
// require('~/app/libs/mmenu/dist/mmenu.js')
$(document).ready(function(){

    /**
     * ! Всегда пиши отдельными функциями и документируй входные и
     * ! выходные параметры. 
     * 
     * ! Так же необходимо писать комментарии к коду, который с первого взгляда
     * ! другого разработчика будет непонятным и потребует анализа
     */
    // создаем переменную и добавляем в нее размер экрана пользователя
        var windowInnerWidth = window.innerWidth;
        // если размер меньше 640, то тогда убираем 2 блока с товарами и показываем карусель
        if(windowInnerWidth<640){
            $("#header_btn").show();
            $('#header_btn').on("click", function(){ 
                $("#header_close").show();
            });
        }
    
 })

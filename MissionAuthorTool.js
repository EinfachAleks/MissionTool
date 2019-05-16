// ==UserScript==
// @name         Mission View Changer
// @version      0.2
// @description  Restyle the View of Mission Creator Tool and add new Features
// @author       EinfachAleks
// @homepageURL  https://github.com/EinfachAleks/MissionTool
// @match        https://mission-author-dot-betaspike.appspot.com/
// @match        http://localhost:63342/MissionTool/index.html?_ijt=ec8d6sql37vmq4fnc751106t6v
// @issues       https://github.com/EinfachAleks/MissionTool/issues
// @icon         https://raw.githubusercontent.com/EinfachAleks/MissionTool/master/image/specops.ico
// @grant        unsafeWindow
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @downloadURL  https://raw.githubusercontent.com/EinfachAleks/MissionTool/master/MissionAuthorTool.js
// @updateURL    https://raw.githubusercontent.com/EinfachAleks/MissionTool/master/style.css
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.0/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/tinysort/3.2.5/tinysort.min.js
// @resource     mainCss https://raw.githubusercontent.com/EinfachAleks/MissionTool/master/style.css
// ==/UserScript==



let mainCss = GM_getResourceText("mainCss");
GM_addStyle(mainCss);

(function ($) {
    "use strict";

    // function screenLoader() {
    //     $('body').append($('' +
    //         '<div class="load">' +
    //         '<div class="loader"</div>' +
    //         '</div>')
    //     );
    // }

    // Call init function
    $(function () {
        // screenLoader();
        setTimeout(function () {
            init();
            // $('.load').hide();
        }, 1000);
    });

    function init() {
        nameFinder();
        editorButton();
        missionSorter();
    }

    // find Name of listed Missions
    function nameFinder() {
        let $namePublished = $('span.mission-title-published');
        let $nameSubmitted = $('span.mission-title-submitted');
        let $nameSubmittedPublished = $('span.mission-title-submitted_and_published');
        let $nameDrafts = $('span.mission-title-draft_of_published_mission');
        // let mockMissionNames = [
        //     'Cipolletti #1-12',
        //     'Monumento San Martín 4-24',
        //     'California resistance 15 of 18',
        //     'Sunset IV/XXIV',
        //     'Anubis, Dios de la Muerte 02-48',
        //     'Terra Green-Blue 01',
        //     'Monumento San Martín 1-24',
        //     'Starry Night（08/12)',
        //     'Komonec 5/6',
        //     '7 of 30 * Magnolia *',
        //     'Terra Green-Blue 12',
        //     'Starry Night（01/12)',
        //     'Terra Green-Blue 02',
        //     'Anubis, Dios de la Muerte 01-48',
        //     'Cipolletti #2-12',
        //     'Anubis, Dios de la Muerte 23-48',
        //     '【SATURN】SPACE ROMANCE #1',
        //     '【SATURN】SPACE ROMANCE #3',
        //     'OLD SAC AT DAWN LIGHT 7-18',
        //     '1 of 30 * Magnolia *',
        //     'California resistance 2 of 18',
        //     'Sunset XXIV/XXIV',
        //     '2 of 30 * Magnolia *',
        //     'Komonec 4/6',
        //     '【SATURN】SPACE ROMANCE #2',
        //     'California resistance 1 of 18',
        //     'OLD SAC AT DAWN LIGHT 1-18',
        //     'Starry Night（12/12)',
        //     'Cipolletti #5-12',
        //     'Sunset XIII/XXIV',
        //     'Monumento San Martín 2-24',
        //     'OLD SAC AT DAWN LIGHT 3-18',
        //     'Komonec 2/6'
        // ];
        // let mockObj = Object.setPrototypeOf(mockMissionNames, Object.prototype);

        let $splitName = [];
        let $nameArray = [].concat(...$namePublished, ...$nameSubmitted, ...$nameSubmittedPublished, ...$nameDrafts);
        $.each($nameArray, function (index, value) {
            let obj = value;
            let name = $(value).text().trim();
            let newName = romanToArabic(name);
            console.log(typeof newName);

            // console.log("newName", newName);

            romanToArabic(name);
            // $splitName = [].concat(...$splitName, name);
        });
        // $splitName = [].concat(...$splitName, mockObj);
        // $splitName = [].concat(...$splitName);

        // console.log($splitName);

        $.each($splitName, function (index, value) {
            // console.log(value);
            // romanToArabic(value);
        });
    }

    function missionSorter() {
        let $list = $('.missions-list .mission');
        let $missionSorter = $('.mission-sortieren');

        $missionSorter.on('click', function () {
            tinysort($list, {order: 'desc', natural: true});
        });
    }

    // Roman Number Converter
    function romanToArabic(value) {
        let nameObj = value;
        const regex = /\bM{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})\b/g;
        let message;
        let newNumber;

        while ((message = regex.exec(value)) !== null && undefined !== (message = regex.exec(value))) {
            // console.log("message", message);
            if (message.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            // console.log("message", message);
            $.each(message, function (index, value) {
                newNumber = romanNumbConverter(value);
                // console.log("newNumber", newNumber);
                if (newNumber >= 1 && undefined !== newNumber ){
                    console.log("newNumber", newNumber);
                    // return romanNumbConverter(this);
                }

            });
        }
    }
    function romanNumbConverter(value) {
        let number = value;
        if(number == null) return -1;
        let num = char_to_int(number.charAt(0)), pre, curr;

        for(let i = 1; i < number.length; i++){
            curr = char_to_int(number.charAt(i));
            pre = char_to_int(number.charAt(i-1));
            if(curr <= pre){
                num += curr;
            } else {
                num = num - pre*2 + curr;
            }
        }

        function char_to_int(c){
            switch (c){
                case 'I': return 1;
                case 'V': return 5;
                case 'X': return 10;
                case 'L': return 50;
                case 'C': return 100;
                case 'D': return 500;
                case 'M': return 1000;
                default: return -1;
            }
        }
        return num;
    }

    // Editor Button
    function editorButton() {
        let $createMissionButton = $('.create-mission-button');
        let $editorButtonRaw = "<button class='visibilitty-mission-button'>Hide Editor Information</button>";
        let $missionSorterRaw = "<button class='mission-sortieren'>Sortieren</button>";


        // crate new Editor Button
        $createMissionButton.parents('.list .ng-scope').append($missionSorterRaw, $editorButtonRaw);

        setTimeout(function () {
            let $actionButton = $('.actions');
            let $detailsInfo = $('.details .info');
            let $editorButton = $('.visibilitty-mission-button');

            //set Visibility to hide per default
            // $detailsInfo.addClass('hide');
            // $actionButton.addClass('hide');
            // $editorButton.html('Show Editor Information');

            // Visibility of Modification Buttons
            $editorButton.on('click', function () {
                if ($actionButton.hasClass('hide') !== true) {
                    $detailsInfo.addClass('hide');
                    $actionButton.addClass('hide');
                    $editorButton.html('Show Editor Information');
                } else if ($actionButton.hasClass('hide') !== false) {
                    $detailsInfo.removeClass('hide');
                    $actionButton.removeClass('hide');
                    $editorButton.html('Hide Editor Information');
                } else {
                    $detailsInfo.addClass('hide');
                    $actionButton.addClass('hide');
                    $editorButton.html('Show Editor Information');
                }
            });
        }, 500);
    }

})(jQuery);

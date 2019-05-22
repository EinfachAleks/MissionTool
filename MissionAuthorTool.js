// ==UserScript==
// @name                Mission View Changer
// @version             0.4.1
// @description         Restyle the View of Mission Creator Tool and add new Features
// @author              EinfachAleks, https://t.me/EinfachAleks
// @license             MIT
// @homepageURL         https://github.com/EinfachAleks/MissionTool
// @contributionURL     https://github.com/EinfachAleks/MissionTool
// @match               https://mission-author-dot-betaspike.appspot.com/
// @icon                https://raw.githubusercontent.com/EinfachAleks/MissionTool/master/image/specops.ico
// @downloadURL         https://raw.githubusercontent.com/EinfachAleks/MissionTool/master/MissionAuthorTool.js
// @updateURL           https://raw.githubusercontent.com/EinfachAleks/MissionTool/master/MissionAuthorTool.js
// @issues              https://github.com/EinfachAleks/MissionTool/issues
// @require             https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.0/jquery.min.js
// @require             https://cdnjs.cloudflare.com/ajax/libs/tinysort/3.2.5/tinysort.min.js
// @resource            mainCss https://raw.githubusercontent.com/EinfachAleks/MissionTool/master/style.css
// @grant               unsafeWindow
// @grant               GM_addStyle
// @grant               GM_getResourceText
// ==/UserScript==

(function ($) {
    "use strict";
    /**
     * @name Init
     * @description call the Init Function
     */
    $(function () {
        setTimeout(function () {
            nameFinder();
            editorButton();
            missionStatusSetter();
            missionSorter();
        }, 1000);
    });

    /**
     * @name nameFinder
     * @description find all Mission names
     */
    function nameFinder() {
        let $namePublished = $('span.mission-title-published');
        let $nameSubmitted = $('span.mission-title-submitted');
        let $nameDrafts = $('span.mission-title-draft_of_published_mission');
        let $nameSubmittedPublished = $('span.mission-title-submitted_and_published');
        let $splitName = [];
        let $nameArray = [].concat(...$namePublished, ...$nameSubmitted, ...$nameSubmittedPublished, ...$nameDrafts);
        $.each($nameArray, function (index, value) {
            let name = $(value).text().trim();
            $splitName = [].concat(...$splitName, name);
        });
        $splitName = [].concat(...$splitName);
        $.each($splitName, function (index, value) {
            romanToArabic(value);
        });
    }

    /**
     * @name romanToArabic
     * @description converting Roman Numbers to Arabic Numbers
     */
    function romanToArabic(value) {
        let regEx = /\bM{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})\b/gsm;
        let newValue = "";
        let newNumber;
        let $splittedArray = value.match(regEx);

        function fromRoman(value) {
            let result = 0;
            let decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
            let roman = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
            for (let i = 0; i <= decimal.length; i++) {
                while (value.indexOf(roman[i]) === 0) {
                    result += decimal[i];
                    value = value.replace(roman[i], '');
                }
            }
            return result;
        }

        $.each($splittedArray, function (index, value) {
            if ("" !== value) {
                newNumber = fromRoman(value);
                newValue = value.replace(regEx, newNumber);
                let newValueLength = newValue.toString().length;
                newValue = newValue.slice(0,  newValueLength/ 2);
            }
        });
    }

    /**
     * @name missionStatusSetter
     * @description set the Mission Status on a data attr
     */
    function missionStatusSetter() {
        let $list = $('.missions-list .mission');
        let statusOne = $list.find('.info span.mission-title-published').attr('ng-class', 'mission-title-draft_of_published_mission'),
            statusTwo = $list.find('.info span.mission-title-submitted').attr('ng-class', 'mission-title-submitted'),
            statusThree = $list.find('.info span.mission-title-submitted_and_published').attr('ng-class', 'mission-title-submitted_and_published'),
            statusFour = $list.find('.info span.mission-title-draft_of_published_mission').attr('ng-class', 'mission-title-draft_of_published_mission');

        $.each(statusOne, function (index, value) {
            let statusBox = $(value).parents('.details').find('.statusBox');
            statusBox.attr('data-status', 'submitted');
        });
        $.each(statusTwo, function (index, value) {
            let statusBox = $(value).parents('.details').find('.statusBox');
            statusBox.attr('data-status', 'published');
        });
        $.each(statusThree, function (index, value) {
            let statusBox = $(value).parents('.details').find('.statusBox');
            statusBox.attr('data-status', 'submitted_and_published');
        });
        $.each(statusFour, function (index, value) {
            let statusBox = $(value).parents('.details').find('.statusBox');
            statusBox.attr('data-status', 'draft');
        });
    }

    /**
     * @name missionSorter
     * @description sorting the Mission on the View
     */
    function missionSorter() {
        let $list = $('.missions-list .mission');
        let $missionSorter = $('.mission-sortieren');
        $missionSorter.on('change', function () {
            let sortingvalue = $(this).val();
            if ('status_asc' === sortingvalue){
                tinysort($list, {selector: '.statusBox', attr: 'data-status'}, {order: 'asc', natural: true});
            } else if ('status_desc' === sortingvalue) {
                tinysort($list, {selector: '.statusBox', attr: 'data-status'}, {order: 'desc', natural: true});
            } else if ('name_asc' === sortingvalue) {
                tinysort($list, {order: 'asc', natural: true});
            } else if ('name_desc' === sortingvalue) {
                tinysort($list, {order: 'desc', natural: true});
            }
        });
    }

    /**
     * @name editorButton
     * @description add new Buttons
     */
    function editorButton() {
        let $createMissionButton = $('.create-mission-button'),
            $statusBoxRaw = "<div class='statusBox' data-status=''></div>",
            $missionSorterRaw = "\n" +
                "<select class='mission-sortieren' id='sorting' name='title'>\n" +
                " <option value=''>Please choose</option>\n" +
                " <option value='status_asc'>Status ASC</option>\n" +
                " <option value='status_desc'>Status DESC</option>\n" +
                " <option value='name_asc'>Name ASC</option>\n" +
                " <option value='name_desc'>Name DESC</option>\n" +
                "</select>",
            $editorButtonRaw = "<button class='visibilitty-mission-button'>Hide Editor Information</button>";

        // append new Editor Button
        $createMissionButton.parents('.list .ng-scope').append($missionSorterRaw, $editorButtonRaw);
        $('.col-sm-6.details').append($statusBoxRaw);

        setTimeout(function () {
            let $actionButton = $('.actions');
            let $detailsInfo = $('.details .info');
            let $editorButton = $('.visibilitty-mission-button');

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

let mainCss = GM_getResourceText("mainCss");
GM_addStyle(mainCss);

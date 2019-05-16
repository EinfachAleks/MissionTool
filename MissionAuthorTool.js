// ==UserScript==
// @name         Mission View Changer
// @version      0.2
// @description  Restyle the View of Mission Creator Tool and add new Features
// @author       EinfachAleks
// @homepageURL  https://github.com/EinfachAleks/MissionTool
// @match        https://mission-author-dot-betaspike.appspot.com/
// @issues       https://github.com/EinfachAleks/MissionTool/issues
// @icon         https://raw.githubusercontent.com/EinfachAleks/MissionTool/master/image/specops.ico
// @grant        unsafeWindow
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @downloadURL  https://raw.githubusercontent.com/EinfachAleks/MissionTool/master/MissionAuthorTool.js
// @updateURL    https://raw.githubusercontent.com/EinfachAleks/MissionTool/master/MissionAuthorTool.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.0/jquery.min.js
// @resource     mainCss https://raw.githubusercontent.com/EinfachAleks/MissionTool/master/style.css
// ==/UserScript==

let mainCss = GM_getResourceText("mainCss");
GM_addStyle(mainCss);

(function ($) {
    "use strict";

    // Call init function
    $(function () {
        setTimeout(function () {
            init();
        }, 1000);
    });

    function init() {
        editorButton();
    }

    // Editor Button
    function editorButton() {
        let $createMissionButton = $('.create-mission-button');
        let $editorButtonRaw = "<button class='visibilitty-mission-button'>Hide Editor Information</button>";

        // crate new Editor Button
        $createMissionButton.parents('.list .ng-scope').append($editorButtonRaw);

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

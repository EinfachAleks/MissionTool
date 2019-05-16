// ==UserScript==
// @name         Mission View Changer
// @version      0.1
// @description  Restyle the View of Mission Creator Tool and add new Features
// @author       EinfachAleks
// @homepageURL  https://github.com/EinfachAleks/MissionTool
// @match        https://mission-author-dot-betaspike.appspot.com/
// @issues       https://github.com/EinfachAleks/MissionTool/issues
// @icon         https://github.com/EinfachAleks/MissionTool/image/specops.ico
// @grant        unsafeWindow
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @downloadURL  https://raw.githubusercontent.com/EinfachAleks/MissionTool/master/MissionAuthorTool.js
// @updateURL    https://raw.githubusercontent.com/EinfachAleks/MissionTool/master/MissionAuthorTool.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.0/jquery.min.js
// ==/UserScript==

GM_addStyle(':root {\n' +
    '    --White: #F5F5F5;\n' +
    '    --Red: #f44336;\n' +
    '    --Pink: #E91E63;\n' +
    '    --Blue: #2196F3;\n' +
    '    --Lirple: #9C27B0;\n' +
    '    --Blght-Blue: #03A9F4;\n' +
    '    --Green: #4CAF50;\n' +
    '    --Light-Green: #8BC34A;\n' +
    '    --Yellow: #FFEB3B;\n' +
    '    --Orange: #FF9800;\n' +
    '    --Dark-Orange: #FF5722;\n' +
    '    --Gray: #9E9E9E;\n' +
    '    --Black: #212121;\n' +
    '}\n' +
    '\n' +
    '/*Global overriting*/\n' +
    '@media only screen and (min-width: 320px) {\n' +
    '    .missions-list {\n' +
    '        grid-template-columns: auto;\n' +
    '    }\n' +
    '\n' +
    '    .list .mission .actions .buttons {\n' +
    '        float: left;\n' +
    '        display: flex;\n' +
    '        justify-content: center;\n' +
    '        width: 100%;\n' +
    '    }\n' +
    '}\n' +
    '\n' +
    '@media only screen and (min-width: 640px) {\n' +
    '    .missions-list {\n' +
    '        grid-template-columns: auto auto;\n' +
    '    }\n' +
    '}\n' +
    '\n' +
    '@media only screen and (min-width: 992px) {\n' +
    '    .list .mission .actions .buttons {\n' +
    '        float: none;\n' +
    '        display: block;\n' +
    '    }\n' +
    '\n' +
    '    .missions-list {\n' +
    '        grid-template-columns: auto auto auto auto auto auto;\n' +
    '    }\n' +
    '}\n' +
    '\n' +
    '.missions-list {\n' +
    '    display: grid;\n' +
    '    grid-gap: 15px;\n' +
    '}\n' +
    '\n' +
    '.missions-list .row {\n' +
    '    margin-left: 0;\n' +
    '    margin-right: 0;\n' +
    '}\n' +
    '\n' +
    '.list .mission {\n' +
    '    padding: 5px;\n' +
    '    margin-bottom: 0;\n' +
    '    display: block;\n' +
    '    align-items: normal;\n' +
    '}\n' +
    '\n' +
    '.list .mission .details, .list .mission .actions {\n' +
    '    width: 100%;\n' +
    '    padding-right: 0;\n' +
    '    padding-left: 0;\n' +
    '}\n' +
    '\n' +
    '.list .mission .name {\n' +
    '    font-size: 18px;\n' +
    '}\n' +
    '\n' +
    '.list .mission .mission-time-published {\n' +
    '    font-size: 14px;\n' +
    '}\n' +
    '\n' +
    '.list .mission .info {\n' +
    '    display: inline-block;\n' +
    '    float: left;\n' +
    '    margin-left: unset;\n' +
    '    max-width: unset;\n' +
    '    width: 100%;\n' +
    '    padding: 5px;\n' +
    '}\n' +
    '\n' +
    '.list .mission .mission-image {\n' +
    '    margin-top: 0;\n' +
    '    margin: 0 auto;\n' +
    '    width: 100%;\n' +
    '    max-width: 256px;\n' +
    '    height: auto;\n' +
    '    justify-content: center;\n' +
    '    float: none;\n' +
    '    display: block;\n' +
    '}\n' +
    '\n' +
    '.list .mission .mission-time-published {\n' +
    '    font-size: 10px;\n' +
    '}\n' +
    '\n' +
    '.list .mission .stats {\n' +
    '    margin-left: 0px;\n' +
    '    float: none;\n' +
    '    display: grid;\n' +
    '    grid-template-columns: auto auto;\n' +
    '    justify-content: space-between;\n' +
    '    width: 100%;\n' +
    '}\n' +
    '\n' +
    '.ng-binding {\n' +
    '    width: 100%;\n' +
    '    display: block;\n' +
    '}\n' +
    '\n' +
    '.list .mission .actions .buttons .button-group {\n' +
    '    display: flex;\n' +
    '    justify-content: center;\n' +
    '}\n' +
    '\n' +
    '/*Hide unused Text*/\n' +
    '.list .mission .actions .buttons .button-group .button-description {\n' +
    '    display: none;\n' +
    '}\n' +
    '\n' +
    '.name.ng-binding.mission-title-suffix-published {\n' +
    '    display: none;\n' +
    '}\n' +
    '\n' +
    '.list .mission .actions .buttons .action-button-hr-div {\n' +
    '    display: none;\n' +
    '}\n' +
    '\n' +
    '/* Formation Editor Button */\n' +
    '.list .mission-sortieren,\n' +
    '.list .visibilitty-mission-button {\n' +
    '    float: right !important;\n' +
    '    display: block;\n' +
    '    margin-top: 40px;\n' +
    '    padding: 9px 30px;\n' +
    '    background-image: none;\n' +
    '    background-color: var(--Green);\n' +
    '    border: none;\n' +
    '    color: var(--Black)\n' +
    '}\n' +
    '\n' +
    '.list button.create-mission-button {\n' +
    '    background-image: none;\n' +
    '    background-color: var(--Green);\n' +
    '    border: 1px solid var(--Black);\n' +
    '    color: var(--Black)\n' +
    '}\n' +
    '\n' +
    '/*remove unused Backgrounds*/\n' +
    '.mission-list-item-published, .mission-list-item-submitted {\n' +
    '    background-image: none;\n' +
    '}\n' +
    '\n' +
    '.mission-list-item-submitted_and_published {\n' +
    '    background: none;\n' +
    '}\n' +
    '\n' +
    '.mission-list-item-published {\n' +
    '    background: none\n' +
    '}\n' +
    '\n' +
    '.mission-list-item-submitted {\n' +
    '    background: none\n' +
    '}\n');

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



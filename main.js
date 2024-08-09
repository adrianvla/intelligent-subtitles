let getCardUrl = "http://127.0.0.1:8000/getCard";
let tokeniserUrl = "http://127.0.0.1:8000/tokenize";
let getTranslationUrl = "http://127.0.0.1:8000/translate";

const style = `body{position:relative}.subtitle_word{position:relative}#contextMenu,.subtitle_hover{position:absolute;left:0;width:max-content;height:max-content;background-color:rgba(255,255,255,0.75);backdrop-filter: blur(10px);color:black;align-items:center;font-size:20px;display:flex;flex-direction:column;font-family:sans-serif;box-shadow:0 0 10px 0 rgba(0,0,0,0.5);padding:10px;border-radius:10px;max-height:300px;max-width:300px;overflow-y:auto;text-shadow:0 1px 0 rgba(255, 255, 255, 0.4) !important}#contextMenu{max-width:none;padding:0}#contextMenu .row.colour-row label,#contextMenu .row.in label{border-right:1px solid;width:250px;padding:10px}#contextMenu .row.in input{width:90px;height:32px;border:0;background:0;font-size:1.5rem}#contextMenu.dark .row.in input{color:white}#contextMenu .row.in input:focus{outline:none}#contextMenu .sep{border-bottom:1px solid}.subtitle_hover .hover_reading *,.subtitle_hover .hover_translation *{color:black !important}.subtitle_hover.dark .hover_reading *,.subtitle_hover.dark .hover_translation *{color:#f3efef !important}.subtitle_hover.known{box-shadow:rgba(100, 66, 66, 0.16) 0 1px 4px, rgb(24, 197, 20) 0 0 0 3px}#contextMenu.dark,.subtitle_hover.dark{background-color:rgba(80, 82, 87, 0.83);color:#f3efef;text-shadow:none !important}hr{margin-top:20px;margin-bottom:20px;border:0;border-top:2px solid rgba(0,0,0,0.3);width:100%}#contextMenu.dark hr,.subtitle_hover.dark hr{border-top:1px solid rgba(185, 185, 185, 0.1)}.asbplayer-subtitles-container-top{position:absolute}#contextMenu #settingsForm{display:flex;flex-direction:column}#contextMenu input[type="button"],#contextMenu input[type="submit"]{margin:10px;padding:5px;border-radius:5px;border:none;background-color:#9DD997;color:black;cursor:pointer;width:calc(100% - 20px) !important}#contextMenu #settingsForm .row{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid;padding-inline:10px}#contextMenu #settingsForm .colour-row{padding-left:20px}#contextMenu #settingsForm input{}.hover_reading{display:flex;flex-direction:column;justify-content:center;align-items:center}.hover_ease{margin-top:25px;color:#9DD997 !important}.subtitle_hover{gap:10px}.subtitle_hover.dark .pitch{filter:invert(1)}.subtitle_hover[data-pos]::before{position:absolute;bottom:0;right:0;content:attr(data-pos);font-size:1em;z-index:-1;padding:5px;border-top-left-radius:5px;background-color:rgba(255,0,0, 0.72)}.checkbox-wrapper-47{margin-top:10px;margin-bottom:10px}.checkbox-wrapper-47 input[type="checkbox"]{display:none;visibility:hidden}.checkbox-wrapper-47 label{position:relative;padding-left:2em;padding-right:1em;line-height:2;cursor:pointer;display:inline-flex}.checkbox-wrapper-47 label:before{box-sizing:border-box;content:" ";position:absolute;top:0.3em;left:0;display:block;width:1.4em;height:1.4em;border:2px solid #9098A9;border-radius:6px;z-index:-1}.checkbox-wrapper-47 input[type=checkbox]:checked + label{padding-left:1em;color:#0f5229}.checkbox-wrapper-47 input[type=checkbox]:checked + label:before{top:0;width:100%;height:2em;background:#b7e6c9;border-color:#2cbc63}.checkbox-wrapper-47 label,.checkbox-wrapper-47 label::before{transition:0.25s all ease}.hidden{display:none !important}`;

const DEFAULT_SETTINGS = {
    "known_ease_threshold": 1500,
    "blur_words": false,
    "blur_known_subtitles": false,
    "blur_amount":5,
    "colour_known":"#cceec9",
    "do_colour_known":true,
    "do_colour_codes":true,
    "colour_codes":{
        "名詞":"#ebccfd",
        "動詞":"#d6cefd",
        "助詞":"#f5d7b8",
        "助動詞":"#ffefd1",
        "形状詞":"#def6ff",
        "副詞": "#b8cdf5",
    },
    "dark_mode":false,
    "hover_known_get_from_dictionary":false,
    "show_pos":true
}

let settings = DEFAULT_SETTINGS;

const saveSettings = () => {
    //localstorage
    localStorage.setItem('settings', JSON.stringify(settings));
};

const loadSettings = () => {
    let loadedSettings = JSON.parse(localStorage.getItem('settings'));
    if(loadedSettings){
        console.log("Loaded settings")
        settings = loadedSettings;
    }else{
        settings = DEFAULT_SETTINGS;
    }
};


function tokenise(text){
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('error', () => reject('failed to issue request'));
        xhr.addEventListener('load', () => {
            try {
                const response = JSON.parse(xhr.responseText);
                resolve(response.tokens);
            } catch (e) {
                reject(e);
            }
        });

        xhr.open('POST', tokeniserUrl);
        //send json
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({"text":text}));
    });
}
function getCards(text){
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('error', () => reject('failed to issue request'));
        xhr.addEventListener('load', () => {
            try {
                const response = JSON.parse(xhr.responseText);
                resolve(response);
            } catch (e) {
                reject(e);
            }
        });

        xhr.open('POST', getCardUrl);
        //send json
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({"word":text}));
    });
}

function getTranslation(text){
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('error', () => reject('failed to issue request'));
        xhr.addEventListener('load', () => {
            try {
                const response = JSON.parse(xhr.responseText);
                resolve(response);
            } catch (e) {
                reject(e);
            }
        });

        xhr.open('POST', getTranslationUrl);
        //send json
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({"word":text}));
    });
}
// download and run jquery
function loadJquery(){
    return new Promise((resolve, reject) => {
        if(window.jQuery){
            resolve();
            return;
        }
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js';
        script.onload = () => {
            resolve();
        };
        script.onerror = () => {
            reject();
        };
        document.head.appendChild(script);
    });
}

const TRANSLATABLE = ["名詞","動詞","助詞","形状詞","副詞", "副詞節"];

let lastSubTranslationElements = [];

const randomUUID = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

let SERVER_ONLINE = true;

const ping = () => {
    return new Promise((resolve, reject) => {
        //POST to /control req.function = "ping"
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://127.0.0.1:8000/control', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                const response = JSON.parse(xhr.responseText);
                if(response.status == "error") {
                    SERVER_ONLINE = false;
                }else{
                    SERVER_ONLINE = true;
                }
                resolve();
            }
        }
        const data = JSON.stringify({ "function": "ping" });
        xhr.send(data);
    });
};

const modify_sub = async () => {

    ping();

    // get the text of the subtitle
    if($(".asbplayer-subtitles-container-top > .asbplayer-subtitles").hasClass("isBeingProcessed")) return;

    let subElement = $('.asbplayer-subtitles-container-top > .asbplayer-subtitles > span');
    let subtitle = subElement.text();
    $(".asbplayer-subtitles-container-top > .asbplayer-subtitles").addClass("isBeingProcessed");
    if(subtitle == "") return;

    let tokens = await tokenise(subtitle);
    //create spans
    $(".asbplayer-subtitles-container-top > .asbplayer-subtitles").html("");
    let show_subtitle = false;
    for(let token of tokens){
        let word = token[0];
        let pos = token[1];
        let uuid = randomUUID();
        let newEl = $(`<span class="subtitle_word word_${uuid}" style="color: #ffffff !important;font-size: 36px !important;font-weight: 700 !important;text-shadow: 0 0 3px #000000, 0 0 3px #000000, 0 0 3px #000000, 0 0 3px #000000 !important">${word}</span>`);
        let hoverEl = $(`<div class="subtitle_hover hover_${uuid} ${settings.dark_mode ? 'dark' : ''}" style="display:none"></div>`);
        let hoverEl_html = "";
        let doAppend = false;
        let doAppendHoverLazy = false;
        let hasFurigana = false;

        if(TRANSLATABLE.includes(pos) && !(pos=="助詞"&&(word.length==1))){
            console.log("REQUESTING: "+word);
            //check if word is already known by the user
            let card_data = await getCards(word);
            console.log("card_data.poor: ",card_data.poor);
            if(card_data.poor){ //card not found
                show_subtitle = true;
                doAppendHoverLazy=true;
            }else{
                //compare ease
                let current_card = card_data.cards[0];
                if(current_card.factor < settings.known_ease_threshold){
                    show_subtitle = true;
                    doAppend = true;
                    //translate the word
                    let translation_html = current_card.fields.Meaning.value;
                    let reading_html = current_card.fields.Reading.value;
                    hoverEl_html += `<div class="hover_translation">${translation_html}</div>`;
                    hoverEl_html += `<div class="hover_reading">${reading_html}</div>`;
                    newEl.attr("known","false");
                    //furigana
                    let reading_text = reading_html;
                    // remove when see <!-- accent_start -->
                    let accent_start = reading_text.indexOf("<!-- accent_start -->");
                    if(accent_start != -1){
                        reading_text = reading_text.substring(0,accent_start);
                    }
                    newEl.html(`<ruby>${word}<rt>${reading_text}</rt></ruby>`);
                    hasFurigana = true;
                }else{
                    newEl.attr("known","true");
                    if(settings.hover_known_get_from_dictionary){
                        doAppendHoverLazy=true;
                    }else{
                        doAppend = true;
                        //translate the word
                        let translation_html = current_card.fields.Meaning.value;
                        let reading_html = current_card.fields.Reading.value;
                        hoverEl_html += `<div class="hover_translation">${translation_html}</div>`;
                        hoverEl_html += `<div class="hover_reading">${reading_html}</div>`;
                        hoverEl_html += `<div class="hover_ease">You know this, ease: ${current_card.factor}</div>`;
                        hoverEl.addClass("known");
                    }
                }
            }
        }
        hoverEl.html(hoverEl_html);
        if(doAppendHoverLazy){
            newEl.append(hoverEl);
            hoverEl.text("Loading...");
            let hasBeenLoaded = false;
            let timeout;
            newEl.hover(async function(){
                $(`.hover_${uuid}`).css("display","flex");
                if(hasBeenLoaded) return;
                let translation_data = await getTranslation(word);
                translation_data.data.forEach((meaning)=>{
                    let reading_html = meaning.japanese[0].reading;
                    let translation_html = meaning.senses[0].english_definitions.join(", ");
                    hoverEl_html += `<div class="hover_translation">${translation_html}</div>`;
                    hoverEl_html += `<div class="hover_reading">${reading_html}</div>`;
                });
                if(translation_data.data.length==0) hoverEl_html = "No translation found";
                hoverEl.html(hoverEl_html);
                hasBeenLoaded = true;

                $(`.hover_${uuid}`).ready(()=>{
                    let hover_top = -$(`.hover_${uuid}`).height()-20;
                    if(hasFurigana) hover_top -= 20;
                    $(`.hover_${uuid}`).css("top",`${hover_top}px`);
                    let hover_left = -($(`.hover_${uuid}`).width()-$(`.word_${uuid}`).width())/2;
                    $(`.hover_${uuid}`).css("left",`${hover_left}px`);

                });
            },async function(){
                timeout = setTimeout(()=>{
                    $(`.hover_${uuid}`).css("display","none");
                },500);
            });

            hoverEl.hover(function(){
                clearTimeout(timeout);
            }, function(){
                $(`.hover_${uuid}`).css("display","none");
            });
        }
        if(doAppend){
            if(settings.colour_codes[pos])
                hoverEl.css("box-shadow",`rgba(100, 66, 66, 0.16) 0px 1px 4px, ${settings.colour_codes[pos]} 0px 0px 0px 3px`);
            if(settings.show_pos){
                hoverEl.attr("data-pos",pos);
                hoverEl.css("padding-bottom","35px");
            }else{
                hoverEl.css("padding-bottom","10px");
            }

            newEl.append(hoverEl);
            //calculate height
            newEl.hover(function(){
                $(`.hover_${uuid}`).css("display","flex");

                $(`.hover_${uuid}`).ready(()=>{
                    let hover_top = -$(`.hover_${uuid}`).height()-50;
                    $(`.hover_${uuid}`).css("top",`${hover_top}px`);
                    let hover_left = -($(`.hover_${uuid}`).width()-$(`.word_${uuid}`).width())/2;
                    $(`.hover_${uuid}`).css("left",`${hover_left}px`);

                });
            },function(){
                $(`.hover_${uuid}`).css("display","none");
            });
        }else{
            if(settings.blur_words){
                newEl.css("filter",`blur(${settings.blur_amount}px)`);
                newEl.hover(function(){
                    // newEl.css("filter",`blur(0px)`);
                   newEl.animate({filter: "blur(0px)"});
                },function(){
                    // newEl.css("filter",`blur(${settings.blur_amount}px)`);
                   newEl.animate({filter: `blur(${settings.blur_amount}px)`});
                });
            }
            if(settings.do_colour_known){
                newEl.css("color",settings.colour_known);
            }
        }
        if(settings.do_colour_codes)
        if(settings.colour_codes[pos]){
            console.log("COLOURING: "+pos)
            newEl.css("color",settings.colour_codes[pos]);
        }
        newEl.attr("grammar",pos);
        $(".asbplayer-subtitles-container-top > .asbplayer-subtitles").append(newEl);
        // $(".asbplayer-subtitles-container-top > .asbplayer-subtitles").removeClass("isBeingProcessed");
    }

    console.log("finished_displaying_subs");
    if(!show_subtitle && settings.blur_known_subtitles){
        //blur the subtitle
        $(".asbplayer-subtitles-container-top > .asbplayer-subtitles").css("filter",`blur(${settings.blur_amount}px)`);
    }

};

const create_context_menu = () => {
    // Create context menu
    let contextMenu = $(`
        <div id="contextMenu" class="${settings.dark_mode ? 'dark' : ''}" style="display:none">
            <form id="settingsForm">
                <div class="row in">
                    <label for="known_ease_threshold">Known Ease Threshold: </label>
                    <input type="number" id="known_ease_threshold" name="known_ease_threshold" value="${settings.known_ease_threshold}">
                </div>
                <div class="row">
                    <div class="checkbox-wrapper-47">
                        <input type="checkbox" id="blur_words" name="blur_words" ${settings.blur_words ? 'checked' : ''}>
                        <label for="blur_words">Blur Words </label>
                    </div>
                </div>
                <div class="row">
                    <div class="checkbox-wrapper-47">
                        <input type="checkbox" id="blur_known_subtitles" name="blur_known_subtitles" ${settings.blur_known_subtitles ? 'checked' : ''}>
                        <label for="blur_known_subtitles">Blur Known Subtitles </label>
                    </div>
                </div>
                <div class="row in ${settings.blur_known_subtitles || settings.blur_words ? '' : 'hidden'}">
                    <label for="blur_amount">Blur Amount: </label>
                    <input type="number" id="blur_amount" name="blur_amount" value="${settings.blur_amount}">
                </div>
                <div class="row">
                    <div class="checkbox-wrapper-47">
                        <input type="checkbox" id="do_colour_known" name="do_colour_known" ${settings.do_colour_known ? 'checked' : ''}>
                        <label for="do_colour_known">Colour Known Words</label>
                    </div>
                </div>
                <div class="row in ${settings.do_colour_known ? '' : 'hidden'}">
                    <label for="colour_known">Known Word Colour: </label>
                    <input type="color" id="colour_known" name="colour_known" value="${settings.colour_known}">
                </div>
                <div class="row">
                    <div class="checkbox-wrapper-47">
                        <input type="checkbox" id="do_colour_codes" name="do_colour_codes" ${settings.do_colour_codes ? 'checked' : ''}>
                        <label for="do_colour_codes">Do Colour Codes </label>
                    </div>
                </div>
                <div class="row">
                    <div class="checkbox-wrapper-47">
                        <input type="checkbox" id="show_pos" name="show_pos" ${settings.show_pos ? 'checked' : ''}>
                        <label for="show_pos">Show word type </label>
                    </div>
                </div>
                <div class="row">
                    <div class="checkbox-wrapper-47">
                        <input type="checkbox" id="hover_known_get_from_dictionary" name="hover_known_get_from_dictionary" ${settings.hover_known_get_from_dictionary ? 'checked' : ''}>
                        <label for="hover_known_get_from_dictionary">Find new definitions for known words </label>
                    </div>
                </div>
                <div class="row">
                    <div class="checkbox-wrapper-47">
                        <input type="checkbox" id="dark_mode" name="dark_mode" ${settings.dark_mode ? 'checked' : ''}>
                        <label for="dark_mode">Dark Mode </label>
                    </div>
                </div>
                <input type="submit" value="Save">
                <div class="sep"></div>
            </form>
        </div>
    `);
    $('body').append(contextMenu);
    for (let code in settings.colour_codes) {
        $('#settingsForm').append(`
            <div class="row colour-row in ${settings.do_colour_codes ? '' : 'hidden'} controls-colour-codes">
                <label for="${code}">${code}: </label>
                <input type="color" id="${code}" name="${code}" value="${settings.colour_codes[code]}">
            </div>
        `);
    }
    // Add a button to the form in the context menu
    $('#settingsForm').append('<input type="button" id="restoreDefaults" value="Restore Defaults">');
    $('#blur_known_subtitles, #blur_words').on('change', function() {
        if ($('#blur_known_subtitles').is(':checked') || $('#blur_words').is(':checked')) {
            $('#blur_amount').parent().removeClass('hidden');
        } else {
            $('#blur_amount').parent().addClass('hidden');
        }
    });

    $('#do_colour_known').on('change', function() {
        if ($('#do_colour_known').is(':checked')) {
            $('#colour_known').parent().removeClass('hidden');
        } else {
            $('#colour_known').parent().addClass('hidden');
        }
    });
    $('#do_colour_codes').on('change', function() {
        if ($('#do_colour_codes').is(':checked')) {
            $('.controls-colour-codes').removeClass('hidden');
        } else {
            $('.controls-colour-codes').addClass('hidden');
        }
    });
    // Add an event listener to the button
    $('#restoreDefaults').on('click', function() {
        settings = DEFAULT_SETTINGS;
        saveSettings();
        $('#contextMenu').hide();
    });

    // Show context menu on right click
    $('.asbplayer-subtitles-container-top').on('contextmenu', function(e) {
        e.preventDefault();
        $('#contextMenu').css({top: e.pageY, left: e.pageX}).show();
    });

    // Hide context menu on left click
    $(document).on('click', function() {
        $('#contextMenu').hide();
    });
    $('#contextMenu').on('click', function(e) {
        e.stopPropagation();
    });

    // Update settings on form submit
    $('#settingsForm').on('submit', function(e) {
        e.preventDefault();
        $('#contextMenu').hide();
        settings.known_ease_threshold = Number($('#known_ease_threshold').val());
        settings.blur_words = $('#blur_words').is(':checked');
        settings.blur_known_subtitles = $('#blur_known_subtitles').is(':checked');
        settings.blur_amount = Number($('#blur_amount').val());
        settings.colour_known = $('#colour_known').val();
        settings.do_colour_known = $('#do_colour_known').is(':checked');
        settings.do_colour_codes = $('#do_colour_codes').is(':checked');
        settings.hover_known_get_from_dictionary = $('#hover_known_get_from_dictionary').is(':checked');
        settings.dark_mode = $('#dark_mode').is(':checked');
        settings.show_pos = $('#show_pos').is(':checked');

        for (let code in settings.colour_codes) {
            settings.colour_codes[code] = $(`#${code}`).val();
        }
        saveSettings();
    });
};

(async function() {
    if(window.loaded_intelligent_subs) return;
    await loadJquery();
    window.loaded_intelligent_subs = true;
    // add style
    let styleElement = document.createElement('style');
    styleElement.innerHTML = style;
    document.head.appendChild(styleElement);
    loadSettings();
    create_context_menu();
    modify_sub();
    await ping();
    if(!SERVER_ONLINE){
        console.log("Server is offline");
    }
    // when .asbplayer-subtitles-container-top changes
    $(document).on('DOMSubtreeModified', '.asbplayer-subtitles-container-top', modify_sub);
    // let observer = new MutationObserver(modify_sub);
    // let targetNode = document.querySelector('.asbplayer-subtitles-container-top');
    // observer.observe(targetNode, { childList: true, subtree: true });
})();
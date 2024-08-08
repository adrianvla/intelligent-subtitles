let getCardUrl = "http://127.0.0.1:8000/getCard";
let tokeniserUrl = "http://127.0.0.1:8000/tokenize";
let getTranslationUrl = "http://127.0.0.1:8000/translate";

const style = `body{position:relative}.subtitle_word{position:relative}#contextMenu,.subtitle_hover{position:absolute;left:0;width:max-content;height:max-content;background-color:rgba(255,255,255,0.75);backdrop-filter: blur(10px);color:black;align-items:center;font-size:20px;display:flex;flex-direction:column;font-family:sans-serif;box-shadow:0 0 10px 0 rgba(0,0,0,0.5);padding:10px;border-radius:10px;max-height:300px;max-width:300px;overflow-y:auto;text-shadow:0 1px 0 rgba(255, 255, 255, 0.4) !important}#contextMenu.dark,.subtitle_hover.dark{background-color:rgba(53, 55, 68, 0.75);color:#f3efef;text-shadow:0 1px 0 rgba(53, 55, 68, 0.4) !important}hr{margin-top:20px;margin-bottom:20px;border:0;border-top:1px solid rgba(0,0,0,0.1)}.asbplayer-subtitles-container-top{position:absolute}#contextMenu #settingsForm{display:flex;flex-direction:column;gap:10px}#contextMenu #settingsForm .row{padding:5px;display:flex;justify-content:space-between;align-items:center}#contextMenu #settingsForm .colour-row{margin-left:20px}#contextMenu #settingsForm input{width:75px}`;


let settings = {
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
    "dark_mode":true
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
                    doAppendHoverLazy=true;
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
                    newEl.css("filter",`blur(0px)`);
                },function(){
                    newEl.css("filter",`blur(${settings.blur_amount}px)`);
                });
            }
            if(settings.do_colour_known){
                newEl.css("color",settings.colour_known);
            }
        }
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
                <div class="row">
                    <label for="known_ease_threshold">Known Ease Threshold: </label>
                    <input type="number" id="known_ease_threshold" name="known_ease_threshold" value="${settings.known_ease_threshold}">
                </div>
                <div class="row">
                    <label for="blur_words">Blur Words: </label>
                    <input type="checkbox" id="blur_words" name="blur_words" ${settings.blur_words ? 'checked' : ''}>
                </div>
                <div class="row">
                    <label for="blur_known_subtitles">Blur Known Subtitles: </label>
                    <input type="checkbox" id="blur_known_subtitles" name="blur_known_subtitles" ${settings.blur_known_subtitles ? 'checked' : ''}>
                </div>
                <div class="row">
                    <label for="blur_amount">Blur Amount: </label>
                    <input type="number" id="blur_amount" name="blur_amount" value="${settings.blur_amount}">
                </div>
                <div class="row">
                    <label for="colour_known">Colour Known: </label>
                    <input type="color" id="colour_known" name="colour_known" value="${settings.colour_known}">
                </div>
                <div class="row">
                    <label for="do_colour_known">Do Colour Known: </label>
                    <input type="checkbox" id="do_colour_known" name="do_colour_known" ${settings.do_colour_known ? 'checked' : ''}>
                </div>
                <div class="row">
                    <label for="do_colour_codes">Do Colour Codes: </label>
                    <input type="checkbox" id="do_colour_codes" name="do_colour_codes" ${settings.do_colour_codes ? 'checked' : ''}>
                </div>
                <input type="submit" value="Save">
            </form>
        </div>
    `);
    $('body').append(contextMenu);
    for (let code in settings.colour_codes) {
        $('#settingsForm').append(`
            <div class="row colour-row">
                <label for="${code}">${code}: </label>
                <input type="color" id="${code}" name="${code}" value="${settings.colour_codes[code]}">
            </div>
        `);
    }

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

        for (let code in settings.colour_codes) {
            settings.colour_codes[code] = $(`#${code}`).val();
        }

    });
};

(async function() {
    await loadJquery();
    create_context_menu();
    // add style
    let styleElement = document.createElement('style');
    styleElement.innerHTML = style;
    document.head.appendChild(styleElement);
    modify_sub();
    await ping();
    if(!SERVER_ONLINE){
        console.log("Server is offline");
    }
    // when .asbplayer-subtitles-container-top changes
    // $(document).on('DOMSubtreeModified', '.asbplayer-subtitles-container-top', modify_sub);
    let observer = new MutationObserver(modify_sub);
    let targetNode = document.querySelector('.asbplayer-subtitles-container-top');
    observer.observe(targetNode, { childList: true, subtree: true });
})();
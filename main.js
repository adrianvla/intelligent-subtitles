let getCardUrl = "http://127.0.0.1:8000/getCard";
let tokeniserUrl = "http://127.0.0.1:8000/tokenize";
let getTranslationUrl = "http://127.0.0.1:8000/translate";
let ankiUrl = "http://127.0.0.1:8000/fwd-to-anki";

const style = `body{position:relative;margin:0}.subtitle_word{position:relative}#contextMenu,.subtitle_hover{position:absolute;width:max-content;height:max-content;background-color:rgba(255,255,255,0.75);backdrop-filter: blur(10px);color:black;align-items:center;font-size:20px;display:flex;flex-direction:column;font-family:sans-serif;box-shadow:0 0 10px 0 rgba(0,0,0,0.5);padding:10px;border-radius:10px;max-height:300px;max-width:300px;overflow-y:auto;text-shadow:0 1px 0 rgba(255, 255, 255, 0.4) !important}#contextMenu{max-width:none;padding:0;top:75px;right:0;height:calc(100vh - 75px);max-height:none;border-top-right-radius:0;border-bottom-right-radius:0}#contextMenu .row.colour-row label,#contextMenu .row.in label{border-right:1px solid;width:250px;padding:10px}#contextMenu .row.in input{width:90px;height:32px;border:0;background:0;font-size:1.5rem}#contextMenu .row.in select{width:90px;height:32px;border:0;background:0;font-size:1rem}#contextMenu.dark .row.in input,#contextMenu.dark .row.in select{color:white}#contextMenu .row.in input:focus{outline:none}#contextMenu .sep{border-bottom:1px solid}.subtitle_hover .hover_reading *,.subtitle_hover .hover_translation *{color:black !important}.subtitle_hover.dark .hover_reading *,.subtitle_hover.dark .hover_translation *{color:#f3efef !important}.subtitle_hover.known{box-shadow:rgba(100, 66, 66, 0.16) 0 1px 4px, rgb(24, 197, 20) 0 0 0 3px}#contextMenu.dark,.subtitle_hover.dark{background-color:rgba(80, 82, 87, 0.83);color:#f3efef;text-shadow:none !important}hr{margin-top:20px;margin-bottom:20px;border:0;border-top:2px solid rgba(0,0,0,0.3);width:100%}#contextMenu.dark hr,.subtitle_hover.dark hr{border-top:1px solid rgba(185, 185, 185, 0.1)}.asbplayer-subtitles-container-top{position:absolute}#contextMenu #settingsForm{display:flex;flex-direction:column}#contextMenu input[type="button"],#contextMenu input[type="submit"]{margin:10px;padding:5px;border-radius:5px;border:none;background-color:#9DD997;color:black;cursor:pointer;width:calc(100% - 20px) !important}#contextMenu #settingsForm .row{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid;padding-inline:10px}#contextMenu #settingsForm .colour-row{padding-left:20px}#contextMenu #settingsForm input{}.hover_reading{display:flex;flex-direction:column;justify-content:center;align-items:center}.hover_ease{margin-top:25px;color:#9DD997 !important}.subtitle_hover{gap:10px}.subtitle_hover.dark .pitch{filter:invert(1)}.subtitle_hover[data-pos]::before{position:absolute;bottom:0;right:0;content:attr(data-pos);font-size:1em;z-index:-1;padding:5px;border-top-left-radius:5px;background-color:rgba(255,0,0, 0.72)}.create_flashcard{position:absolute;top:0;right:0;font-size:1em;padding:5px;border-bottom-left-radius:5px;background-color:rgba(115, 255, 0, 0.72);border:0;z-index:-1}.checkbox-wrapper-47{margin-top:10px;margin-bottom:10px}.checkbox-wrapper-47 input[type="checkbox"]{display:none;visibility:hidden}.checkbox-wrapper-47 label{position:relative;padding-left:2em;padding-right:1em;line-height:2;cursor:pointer;display:inline-flex}.checkbox-wrapper-47 label:before{box-sizing:border-box;content:" ";position:absolute;top:0.3em;left:0;display:block;width:1.4em;height:1.4em;border:2px solid #9098A9;border-radius:6px;z-index:-1}.checkbox-wrapper-47 input[type=checkbox]:checked + label{padding-left:1em;color:#0f5229}.checkbox-wrapper-47 input[type=checkbox]:checked + label:before{top:0;width:100%;height:2em;background:#b7e6c9;border-color:#2cbc63}.checkbox-wrapper-47 label,.checkbox-wrapper-47 label::before{transition:0.25s all ease}.hidden{display:none !important}.flashcard-preview-c{position:absolute;top:0;left:0;width:100%;height:100%;min-height:100vh;display:flex;justify-content:center;align-items:center;background-color:rgba(0, 0, 0, 0.5);z-index:2147483646}.flashcard-preview{background-color:white;padding:20px;border-radius:10px;box-shadow:0 0 10px 0 rgba(0,0,0,0.5);display:flex;flex-direction:column;align-items:center;min-width:50%;min-height:50%;position:relative;color:black}.flashcard-preview-c.dark .flashcard-preview{background-color:#333;color:white}.flashcard-preview button{padding:10px;border-radius:5px;border:none;background-color:#9DD997;color:black;cursor:pointer;width:calc(100% - 20px) !important;position:absolute;bottom:10px}.flashcard-preview{font-family:sans-serif}.flashcard-preview .close-btn{position:absolute;top:10px;left:10px;font-size:1.5em;cursor:pointer;width:50px;height:50px;border:1px solid #333;border-radius:5px;display:flex;justify-content:center;align-items:center}.flashcard-preview-c.dark .flashcard-preview .close-btn{border:1px solid #ccc}.flashcard-preview-c.dark .flashcard-preview .plus,.flashcard-preview-c.dark .flashcard-preview .plus:after{background:#ccc}.flashcard-preview .plus{background:#333;height:50px;position:relative;width:8px;transform:rotate(-45deg)}.flashcard-preview .plus:after{background:#333;content:"";height:8px;left:-21px;position:absolute;top:21px;width:50px}.flashcard-preview .content{overflow:auto;margin-bottom:30px}.settings-btn{position:absolute;top:10px;right:10px;font-size:1.5em;cursor:pointer;width:50px;height:50px;border:1px solid #333;border-radius:5px;display:flex;justify-content:center;align-items:center}.settings-btn svg{fill:#333;transform:scale(1.7)}.settings-btn.dark{border:1px solid #ccc}.settings-btn.dark svg{fill:#ccc}.custom-notification{position:fixed;top:10px;right:10px;background-color:#333;color:white;padding:10px;border-radius:5px;box-shadow:0 0 10px 0 rgba(0,0,0,0.5);display:flex;font-family:sans-serif}`;
const supported_languages = ["ja","de"];

const lang_data = {
    "ja":{
        "name":"Japanese",
        "translatable":["名詞","動詞","助詞","形状詞","副詞", "副詞節"],
        "name_translated":"日本語",
        "colour_codes":{
            "名詞":"#ebccfd",
            "動詞":"#d6cefd",
            "助詞":"#f5d7b8",
            "助動詞":"#ffefd1",
            "形状詞":"#def6ff",
            "副詞": "#b8cdf5"
        },
        "fixed_settings":{}
    },
    "de":{
        "name":"German",
        "translatable":["NOUN","VERB","ADJ","ADV"],
        "name_translated":"Deutsch",
        "colour_codes":{
            "NOUN":"#ebccfd",
            "PROPN":"#ebccfd",
            "PRON":"#fdccd3",
            "VERB":"#ffefd1",
            "SCONJ":"#f5d7b8",
            "PART":"#f5d7b8",
            "DET":"#cef5b8",
            "ADP":"#b8f5de",
            "AUX":"#ffefd1",
            "ADJ":"#def6ff",
            "ADV": "#b8cdf5",
            "PUNCT": "#ffffff"
        },
        "fixed_settings":{
            "use_anki":false,
            "furigana":false
        }
    }
};

const DEFAULT_SETTINGS = {
    "known_ease_threshold": 1500,
    "blur_words": false,
    "blur_known_subtitles": false,
    "blur_amount":5,
    "colour_known":"#cceec9",
    "do_colour_known":true,
    "do_colour_codes":true,
    "colour_codes":{},
    "dark_mode":false,
    "hover_known_get_from_dictionary":false,
    "show_pos":true,
    "language":"ja",
    "use_anki":true,
    "furigana":true,
    "enable_flashcard_creation":true,
    "flashcard_deck":null,
    "flashcards_add_picture":true
};

const show_notification = (m) => {
    let notification = $(`<div class="custom-notification"><span>${m}</span></div>`);
    notification.css("right","-100%");
    $("body").append(notification);
    //animate
    notification.animate({right: 10});
    setTimeout(()=>{
        notification.animate({right: "-100%"},()=>{notification.remove()});
    },5000);
};

let settings = DEFAULT_SETTINGS;

const load_lang_data = () => {
    TRANSLATABLE = lang_data[settings.language].translatable;
    settings.colour_codes = lang_data[settings.language].colour_codes;
};

const checkSettings = () => {
    //check if every setting is present
    for(let key in DEFAULT_SETTINGS){
        if(!(key in settings)){
            settings[key] = DEFAULT_SETTINGS[key];
        }
    }
    //fix settings
    for(let key in lang_data[settings.language].fixed_settings){
        settings[key] = lang_data[settings.language].fixed_settings[key];
    }
    saveSettings();
};

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

function sendRawToAnki(data){
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

        xhr.open('POST', ankiUrl);
        //send json
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
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

var TRANSLATABLE;

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
let already_added = {};
const modify_sub = async () => {

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
        // console.log("POS: "+pos, TRANSLATABLE.includes(pos),word,word.length, word.length==1,  TRANSLATABLE.includes(pos) && (!word.length==1));

        if(TRANSLATABLE.includes(pos) && (!(word.length==1))){
            console.log("REQUESTING: "+word);
            //check if word is already known by the user
            let card_data = {};
            // let card_data = await getCards(word);
            if(settings.use_anki)
                try{card_data = await getCards(word);}catch(e){card_data.poor = true;}
            else
                card_data.poor = true;

            if(card_data.poor){ //card not found
                show_subtitle = true;
                doAppendHoverLazy = true;
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
                    if(settings.furigana){
                        let reading_text = reading_html;
                        // remove when see <!-- accent_start -->
                        let accent_start = reading_text.indexOf("<!-- accent_start -->");
                        if(accent_start != -1){
                            reading_text = reading_text.substring(0,accent_start);
                        }
                        newEl.html(`<ruby>${word}<rt>${reading_text}</rt></ruby>`);
                        hasFurigana = true;
                    }
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
            let processing = false;
            newEl.hover(async function(){
                $(`.hover_${uuid}`).css("display","flex");
                if(processing) return;
                if(hasBeenLoaded) return;
                processing = true;
                let translation_data = await getTranslation(word);
                let raw_flashcard_html = "";
                translation_data.data.forEach((meaning)=>{
                    // let reading_html = meaning.japanese[0].reading;
                    // let translation_html = meaning.senses[0].english_definitions.join(", ");
                    let reading_html = meaning.reading;
                    let translation_html = meaning.definitions;
                    hoverEl_html += `<div class="hover_translation">${translation_html}</div>`;
                    hoverEl_html += `<div class="hover_reading">${reading_html}</div>`;
                    raw_flashcard_html += `<p>${translation_html}</p>`;
                    raw_flashcard_html += `<p>${reading_html}</p>`;

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

                if(settings.enable_flashcard_creation && (translation_data.data.length!=0) && (!already_added[word])){
                    let card_creation_data = {
                        "note": {
                            "deckName": settings.flashcard_deck,
                            "modelName": "Basic",
                            "fields": {
                                "Front": word,
                                "Back": raw_flashcard_html
                            },
                            "options": {
                                "allowDuplicate": false,
                                "duplicateScope": "deck",
                                "duplicateScopeOptions": {
                                    "deckName": "Default",
                                    "checkChildren": false,
                                    "checkAllModels": false
                                }
                            },
                            "tags": [
                                "intelligent-subtitles"
                            ]
                        }
                    };
                    if(settings.flashcards_add_picture){
                        try{
                            let picture_data_url = "";
                            let video = $("video").get(0);
                            if(!video) throw "No video found";
                            let canvas = document.createElement("canvas");
                            let ctx = canvas.getContext("2d");
                            let width = 480;
                            let height = video.videoHeight * (width / video.videoWidth);
                            canvas.width = width;
                            canvas.height = height;
                            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                            picture_data_url = canvas.toDataURL("image/png");
                            card_creation_data.note.picture = [{
                                "url": picture_data_url,
                                "filename": randomUUID()+".png",
                                "fields": [
                                    "Back"
                                ]
                            }];
                        }catch(e){console.log(e)}
                    }
                    hoverEl_html += `<button class="create_flashcard">+ Anki</button>`;
                    hoverEl.html(hoverEl_html);
                    hoverEl.find(".create_flashcard").click(async function(){
                        if(already_added[word]) return;

                        //preview
                        let preview_element = $(`<div class="flashcard-preview-c ${settings.dark_mode ? 'dark' : ''}"><div class="flashcard-preview"><div class="close-btn"><div class="plus"></div></div><h1>Flashcard Preview</h1><div class="content" contenteditable="true"></div><button>Create Flashcard</button></div></div>`);
                        preview_element.find(".content").html(raw_flashcard_html);
                        preview_element.find(".close-btn").click(()=>{preview_element.remove()});
                        preview_element.find("button").click(async function(){
                            card_creation_data.note.fields.Back = preview_element.find(".content").html();
                            let response = await sendRawToAnki({"action":"addNote","version":6,"params":card_creation_data});
                            if(!response.error){
                                hoverEl.find(".create_flashcard").html("Success");
                                already_added[word] = true;
                                hoverEl.find(".create_flashcard").attr("disabled",true);
                                preview_element.find(".content").html("");
                                preview_element.find("h1").html("Flashcard Created Successfully");
                                preview_element.find("button").remove();
                                setTimeout(()=>{
                                    preview_element.remove();
                                },1000);
                            }else{
                                alert("Failed to create flashcard, check console for details");
                                throw response;
                            }
                        });
                        $("body").append(preview_element);
                    });
                }
            },async function(){
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
    const flashcard_decks = async function() {
        if ($('#enable_flashcard_creation').is(':checked')) {
            $('.flashcard_deck').removeClass('hidden');
            //show flashcards_add_picture
            $('#flashcards_add_picture').parent().parent().removeClass('hidden');
            //get flashcard decks
            $('#flashcard_deck').html('<option value="Loading...">Loading...</option>');
            let flashcard_decks = await sendRawToAnki({"action":"deckNamesAndIds","version":6});
            $('#flashcard_deck').html('');
            for(let deck of Object.keys(flashcard_decks.result)){
                $('#flashcard_deck').append(`<option value="${deck}" ${deck==settings.flashcard_deck ? 'selected' : ''}>${deck}</option>`);
            }
        } else {
            $('.flashcard_deck').addClass('hidden');
            $('#flashcards_add_picture').parent().parent().addClass('hidden');
        }
    };
    $("#contextMenu").remove();
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
                <div class="row">
                    <div class="checkbox-wrapper-47">
                        <input type="checkbox" id="use_anki" name="use_anki" ${settings.use_anki ? 'checked' : ''}>
                        <label for="use_anki">Use Anki </label>
                    </div>
                </div>
                <div class="row">
                    <div class="checkbox-wrapper-47">
                        <input type="checkbox" id="furigana" name="furigana" ${settings.furigana ? 'checked' : ''}>
                        <label for="furigana">Furigana </label>
                    </div>
                </div>
                <div class="row">
                    <div class="checkbox-wrapper-47">
                        <input type="checkbox" id="enable_flashcard_creation" name="enable_flashcard_creation" ${settings.enable_flashcard_creation ? 'checked' : ''}>
                        <label for="enable_flashcard_creation">Enable flashcard creations </label>
                    </div>
                </div>
                <div class="row ${settings.enable_flashcard_creation ? '' : 'hidden'}">
                    <div class="checkbox-wrapper-47">
                        <input type="checkbox" id="flashcards_add_picture" name="flashcards_add_picture" ${settings.flashcards_add_picture ? 'checked' : ''}>
                        <label for="flashcards_add_picture">Add image to flashcards </label>
                    </div>
                </div>
                <div class="row in flashcard_deck">
                    <label for="language">Flashcard Deck: </label>
                    <select id="flashcard_deck" name="flashcard_deck">
                        <option value="Loading...">Loading...</option>
                    </select>
                </div>
                <div class="row in">
                    <label for="language">Subtitle Language: </label>
                    <select id="language" name="language">
                        ${supported_languages.map((lang)=>{
                            return `<option value="${lang}" ${settings.language==lang ? 'selected' : ''}>${lang_data[lang].name_translated}</option>`;
                        })}
                    </select>
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
    flashcard_decks();
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
    $('#enable_flashcard_creation').on('change', flashcard_decks);
    // Add an event listener to the button
    $('#restoreDefaults').on('click', function() {
        settings = DEFAULT_SETTINGS;
        saveSettings();
        $('#contextMenu').hide();
    });

    // Show context menu on right click
    // $('.asbplayer-subtitles-container-top').on('contextmenu', function(e) {
    //     e.preventDefault();
    //     $('#contextMenu').css({top: e.pageY, left: e.pageX}).show();
    // });
    //
    // // Hide context menu on left click
    // $(document).on('click', function() {
    //     $('#contextMenu').hide();
    // });
    // $('#contextMenu').on('click', function(e) {
    //     e.stopPropagation();
    // });

    let settings_btn = $(`<div class="settings-btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m2.344 15.271 2 3.46a1 1 0 0 0 1.366.365l1.396-.806c.58.457 1.221.832 1.895 1.112V21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1.598a8.094 8.094 0 0 0 1.895-1.112l1.396.806c.477.275 1.091.11 1.366-.365l2-3.46a1.004 1.004 0 0 0-.365-1.366l-1.372-.793a7.683 7.683 0 0 0-.002-2.224l1.372-.793c.476-.275.641-.89.365-1.366l-2-3.46a1 1 0 0 0-1.366-.365l-1.396.806A8.034 8.034 0 0 0 15 4.598V3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1.598A8.094 8.094 0 0 0 7.105 5.71L5.71 4.904a.999.999 0 0 0-1.366.365l-2 3.46a1.004 1.004 0 0 0 .365 1.366l1.372.793a7.683 7.683 0 0 0 0 2.224l-1.372.793c-.476.275-.641.89-.365 1.366zM12 8c2.206 0 4 1.794 4 4s-1.794 4-4 4-4-1.794-4-4 1.794-4 4-4z"></path></svg></div>`);
    $('body').append(settings_btn);

    if(settings.dark_mode) $(".settings-btn").addClass("dark");
    $(".settings-btn").css("opacity","0");
    $(document).on("mousemove",e=> {
        let btn = $('.settings-btn');
        let btnOffset = btn.offset();
        let btnCenterX = btnOffset.left + btn.width() / 2;
        let btnCenterY = btnOffset.top + btn.height() / 2;
        let mouseX = e.pageX;
        let mouseY = e.pageY;
        let distX = Math.abs(mouseX - btnCenterX);
        let distY = Math.abs(mouseY - btnCenterY);
        let dist = Math.sqrt(distX * distX + distY * distY);
        let maxDist = 150;  // Maximum distance for fade-in effect
        let opacity = Math.max(0, Math.min(1, 1 - dist / maxDist));
        btn.css('opacity', opacity);
    });

    let settingsShown = false;

    $(".settings-btn").on("click",()=>{
        settingsShown = !settingsShown;
        if(settingsShown){
            $('#contextMenu').show();
        }else{
            $('#contextMenu').hide();
        }
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
        settings.language = $('#language').val();
        settings.use_anki = $('#use_anki').is(':checked');
        settings.furigana = $('#furigana').is(':checked');
        settings.enable_flashcard_creation = $('#enable_flashcard_creation').is(':checked');
        settings.flashcard_deck = $('#flashcard_deck').val();
        settings.flashcards_add_picture = $('#flashcards_add_picture').is(':checked');

        for (let code in settings.colour_codes) {
            settings.colour_codes[code] = $(`#${code}`).val();
        }
        checkSettings();
        saveSettings();
        create_context_menu();
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
    checkSettings();
    load_lang_data();
    create_context_menu();
    modify_sub();
    await ping();
    if(!SERVER_ONLINE){
        alert("Intelligent-Subtitles: Server is offline");
    }
    // when .asbplayer-subtitles-container-top changes
    $(document).on('DOMSubtreeModified', '.asbplayer-subtitles-container-top', modify_sub);
    show_notification("Intelligent Subtitles Loaded");
    // let observer = new MutationObserver(modify_sub);
    // let targetNode = document.querySelector('.asbplayer-subtitles-container-top');
    // observer.observe(targetNode, { childList: true, subtree: true });
})();
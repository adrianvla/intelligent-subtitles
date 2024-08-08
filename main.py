import nagisa
import uvicorn
from typing import List, Tuple
import json
import urllib.request
from urllib.parse import quote


# rest api
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

ANKICONNECTURL = "http://127.0.0.1:8765";


def request(action, **params):
    return {'action': action, 'params': params, 'version': 6}


def invoke(action, **params):
    requestJson = json.dumps(request(action, **params)).encode('utf-8')
    response = json.load(urllib.request.urlopen(urllib.request.Request(ANKICONNECTURL, requestJson)))
    if len(response) != 2:
        raise Exception('response has an unexpected number of fields')
    if 'error' not in response:
        raise Exception('response is missing required error field')
    if 'result' not in response:
        raise Exception('response is missing required result field')
    if response['error'] is not None:
        raise Exception(response['error'])
    return response['result']


all_cards = []

cards_per_id = {}

words_ids = {}

who_contain = {}


def get_all_cards():
    global all_cards
    global cards_per_id
    global words_ids
    global who_contain

    print("Loading all card ids")

    card_ids = invoke('findCards', query='deck:current')
    print("Loaded all card ids")
    print("Loading all cards")
    all_cards = invoke('cardsInfo', cards=card_ids)
    print("Recieved all cards")
    # print(all_cards[0]['fields']['Expression']['value'])
    for card in all_cards:
        words = card['fields']['Expression']['value']
        # trim everything that's ascii
        words = ''.join([i for i in words if ord(i) > 128])
        words_ids[words] = card['cardId']

        cards_per_id[card['cardId']] = card
    print("Loaded all cards")

    # generate who_contain

    no_duplicates = {}

    for card in all_cards:
        characters = card['fields']['Expression']['value']
        characters = ''.join([i for i in characters if ord(i) > 128])
        for character in list(characters):
            if character in who_contain:
                if characters in no_duplicates[character]:
                    continue
                no_duplicates[character].add(characters)
                who_contain[character].append((characters, card['cardId']))
            else:
                no_duplicates[character] = set([characters])
                who_contain[character] = [(characters, card['cardId'])]

    print("Loaded who_contain")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.on_event("startup")
async def startup_event():
    get_all_cards()

# Request Body
class TokenizeRequest(BaseModel):
    text: str


class TokenizeResponse(BaseModel):
    tokens: List[Tuple[str, str]]

class GetCardRequest(BaseModel):
    word: str

class GetCardResponse(BaseModel):
    cards: List
    error: bool
    poor: bool

@app.post("/tokenize", response_model=TokenizeResponse)
def tokenize(req: TokenizeRequest):
    print("requested tokenization: ", req.text)
    text = nagisa.tagging(req.text)
    tokens = list(zip(text.words, text.postags))
    return {"tokens": tokens}

getCardCache = {}

@app.post("/getCard", response_model=GetCardResponse)
def get_card(req: GetCardRequest):
    global who_contain
    global all_cards
    global cards_per_id
    global words_ids
    print("requested card: ", req.word)
    if req.word in getCardCache:
        return getCardCache[req.word]
    # get all cards that contain the word
    word = req.word
    matched = []
    max_score = 0
    for character in word:
        if character in who_contain:
            cards = who_contain[character]
            # print("Testing: ", cards)
            # compute closest match
            for card in cards:
                #see how many characters match
                score = 0
                for c in word:
                    if c in card[0]:
                        score += 0.5
                # try to see if the word is a substring of the card
                if word in card[0]:
                    score = len(word)
                # remove score for each character that is not in the word
                for c in card[0]:
                    if c not in word:
                        score -= 1
                if score > max_score:
                    max_score = score
                matched.append((score, card[1]))
    #filter out cards that have the same id
    matched = list(set(matched))
    matched.sort(reverse=True)
    matched = matched[:5]
    # #get ease of the cards
    # eases = invoke('getEaseFactors', cards=[match[1] for match in matched])
    # for i, match in enumerate(matched):
    #     matched[i] = (match[0], match[1], eases[i])
    result = []
    for match in matched:
        current_card = cards_per_id[match[1]]
        # current_card['ease'] = match[2]
        result.append(current_card)
    if len(result) == 0:
        getCardCache[req.word] = {"cards": ["No cards found"], "error": True}
        return {"cards": ["No cards found"], "error": True}

    getCardCache[req.word] = {"cards": result, "error": False, "poor": max_score < len(req.word)}
    return {"cards": result, "error": False, "poor": max_score < len(req.word)}



getTranslationUrl = "https://jisho.org/api/v1/search/words?keyword="

class TranslationRequest(BaseModel):
    word: str

class TranslationResponse(BaseModel):
    data: List

JishoCache = {}

@app.post("/translate", response_model=TranslationResponse)
def get_translation(req: TranslationRequest):
    global getTranslationUrl
    global JishoCache
    print("requested translation: ", req.word)
    if req.word in JishoCache:
        return JishoCache[req.word]
    # send request to jisho
    encoded_word = quote(req.word)
    url = getTranslationUrl + encoded_word
    response = urllib.request.urlopen(url)
    data = json.load(response)
    JishoCache[req.word] = {"data": data['data']}
    return {"data": data['data']}

class ControlRequest(BaseModel):
    function: str

@app.post("/control")
def control(req: ControlRequest):
    if req.function == "ping":
        return {"response": "pong"}
    elif req.function == "reload":
        get_all_cards()
        return {"response": "Reloaded"}
    else:
        return {"response": "Unknown function"}





if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, log_level="debug")

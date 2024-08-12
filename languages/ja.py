import nagisa
from typing import List, Tuple
import json
import urllib.request
from urllib.parse import quote

def LANGUAGE_TOKENIZE(text):
    tokens = nagisa.tagging(text)
    return list(zip(tokens.words, tokens.postags))

getTranslationUrl = "https://jisho.org/api/v1/search/words?keyword="

TranslationCache = {}

def LANGUAGE_TRANSLATE(word):
    global TranslationCache
    global getTranslationUrl
    if word in TranslationCache:
        return TranslationCache[word]
    # send request to jisho
    encoded_word = quote(word)
    url = getTranslationUrl + encoded_word
    response = urllib.request.urlopen(url)
    data = json.load(response)
    to_return = []
    print(data['data'])
    for result in data['data']:
        try:
            asdf = {'reading': result['japanese'][0]['reading'],
                    'definitions': ', '.join(result['senses'][0]['english_definitions'])}
            to_return.append(asdf)
        except:
            pass
    data['data'] = to_return
    TranslationCache[word] = {"data": data['data']}
    return {"data": data['data']}

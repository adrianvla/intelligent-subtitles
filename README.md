# intelligent-subtitles
An addon for ASB player that modifies subtitles based on your registered Anki knowledge

![image](https://github.com/user-attachments/assets/9af2dd26-a1c5-4d66-89cb-8094739b5c1a)

<img width="390" alt="Screenshot 2024-08-09 at 16 27 28" src="https://github.com/user-attachments/assets/bc564d48-94cd-409e-a523-3076570c9e9d"> 

#### Supports Dark Mode

<img width="431" alt="Screenshot 2024-08-13 at 13 42 02" src="https://github.com/user-attachments/assets/6a0ec690-5b9d-4108-b9dd-dd982598d964">

#### Settings Menu

<img width="580" alt="Screenshot 2024-08-09 at 02 08 32" src="https://github.com/user-attachments/assets/c582d750-d830-446b-a608-98c7b432c0e4"> 

#### Dictionnary Lookup

<img width="591" alt="Screenshot 2024-08-12 at 23 52 26" src="https://github.com/user-attachments/assets/5ae3dd1d-5e47-448d-a1c2-57d412f23949">

#### Create flashcard

# Features
- ### Supports multiple languages
- ### Create Anki cards from unknown words
- ### Copy-paste the contents main.min.js into the console of a video streaming website to activate
- ### Gramatically-analyses subtitles on the fly and colorizes them
- ### Displays furigana on unknown words
- ### Adjustable difficulty (you can change the minimum Anki ease required for a card to be recognised as "known")
- ### Blurs known words
- ### Shows definitions on hover taken directly from your Anki deck (if not found, then from jisho.org)
- ### Every single one of these settings are configurable
- ### Dark Mode
- ### Shows the grammatical type of a word

# Setup
Install the [ASB Player browser extension](https://github.com/killergerbah/asbplayer)
Install [Python](https://www.python.org/downloads/)
Download this repository
Install the [AnkiConnect](https://ankiweb.net/shared/info/2055492159) plugin in Anki
```sh
pip install uvicorn
pip install fastapi
pip install pydantic
```
If you'll use this for German, you'll also have to install `spacy` by doing `pip install spacy`
If you'll use this for your Japanese studies, you'll also have to install `nagisa` by running `pip install nagisa`
# Running
#### ! Anki must be opened with AnkiConnect running, or else the following command will crash
Change the following settings in main.py to choose a language:
```py
# MODIFY THIS
LANGUAGE = "ja" # "ja" for Japanese, "de" for German
FETCH_ANKI = True # if enabled, will search for already present flashcards to determine if you already know a word or not
ANKI_CONNECT_URL = "http://127.0.0.1:8765"

# DO NOT MODIFY BELOW
...
```
Run
```sh
python main.py
```

Open your favourite website supported by ASB player, then copy the code located in the file main.min.js and paste it in the console (you can open it using right click-> inspect or just press F12).

#### Experimental:

Go to [https://subs.morisinc.net/install.html](https://subs.morisinc.net/install.html) and follow the on-screen instructions. This will lead to the creation of a bookmarklet. 

Enjoy

# How To Use

The app should automatically modify the subtitles on the fly. 
To modify settings, move your mouse to the top right corner of the page; a cog button will appear. Clicking on it will open the settings menu. 
The settings are saved on each website separately. Changing streaming websites will lead to loss of settings.

# Troubleshooting
The python script may crash with the following message: `No valid cards found, maybe you have selected the wrong deck?`. To resolve this problem, you may want to select the correct flashcard deck in anki (the selected deck will automatically be highlighted). The japanese variant of `intelligent-subtitles` only supports Core 2K/6K for now (tested deck: `Core 2k/6k Optimized JP Vocab (JouzuJuls)`). 
The python script may crash unexpectedly on startup; if so, check if you have already opened Anki and that AnkiConnect is running.

The definitions may take a really long time to load if you have a poor connection.

# TODO
- Stats

# Currently Supported languages

- Japanese
- German

# Adding a new language
In the /languages folder, you'll find examples like de.py and ja.py
Each of these files must contain a `LANGUAGE_TOKENIZE` function which will be called to tokenize a phrase and will return pairs of words and their respective POS (i.e. Noun, Adjective...).
They also must contain `LANGUAGE_TRANSLATE` that will fetch a dictionnary of your choice for the language and return the definition.

# License
```
MIT License

Copyright (c) 2024 Adrian Vlasov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

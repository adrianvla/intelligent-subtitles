# intelligent-subtitles
An addon for ASB player that modifies subtitles based on your registered Anki knowledge

![image](https://github.com/user-attachments/assets/9af2dd26-a1c5-4d66-89cb-8094739b5c1a)

<img width="390" alt="Screenshot 2024-08-09 at 16 27 28" src="https://github.com/user-attachments/assets/bc564d48-94cd-409e-a523-3076570c9e9d"> 

#### Supports Dark Mode

<img width="418" alt="Screenshot 2024-08-09 at 16 27 41" src="https://github.com/user-attachments/assets/e03125d4-6ca0-4f7e-989a-ffbd7b6fbbfb"> 

#### Settings Menu

<img width="580" alt="Screenshot 2024-08-09 at 02 08 32" src="https://github.com/user-attachments/assets/c582d750-d830-446b-a608-98c7b432c0e4"> 

#### Dictionnary Lookup


# Features
### Copy-paste the contents main.min.js into the console of a video streaming website to activate
### Gramatically-analyses subtitles on the fly and colorizes them
### Displays furigana on unknown words
### Adjustable difficulty (you can change the minimum Anki ease required for a card to be recognised as "known")
### Blurs known words
### Shows definitions on hover taken directly from your Anki deck (if not found, then from jisho.org)
### Every single one of these settings are configurable
### Dark Mode
### Shows the grammatical type of a word

# Setup
Install the [AnkiConnect](https://ankiweb.net/shared/info/2055492159) plugin in Anki
```sh
pip install nagisa
pip install uvicorn
pip install fastapi
pip install pydantic
```
# Running
#### ! Anki must be opened with AnkiConnect running, or else the following command will crash
Run
```sh
python main.py
```

Open your favourite website supported by ASB player, then copy the code located in the file main.min.js and paste it in the console (you can open it using right click-> inspect or just press F12).

Enjoy

# How To Use

The app should automatically modify the subtitles on the fly. To modify settings, right-click on the subtitles to open a context menu.

# TODO

- Add unknown words to your Anki deck
- Stats
- Support for other languages

# Currently Supported languages

- Japanese

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

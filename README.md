# intelligent-subtitles
An addon for ASB player that modifies subtitles based on your registered Anki knowledge

![image](https://github.com/user-attachments/assets/9af2dd26-a1c5-4d66-89cb-8094739b5c1a)

# Features
### Copy-paste the contents main.min.js into the console of a video streaming website to activate
### Gramatically-analyses japanese subtitles on the fly and colorizes them
### Displays furigana on not known words
### Variable difficulty (you can change the minimum Anki ease required for a card to be recognised as "known")
### Can blur known words
### Shows definitions on hover taken directly from your Anki deck (if not found, then from jisho.org)
### Every single one of these settings are configurable

# Setup
Install the [AnkiConnect](https://ankiweb.net/shared/info/2055492159) plugin in Anki
```sh
pip install nagisa
pip install uvicorn
pip install fastapi
pip install pydantic
```
# Running
#### ! Anki must be opened
Run
```sh
python main.py
```

Open your favourite website supported by ASB player, then copy the code located in the file main.min.js and paste it in the console (you can open it using right click-> inspect or just press F12).

Enjoy

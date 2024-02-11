from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pathlib import Path
from googletrans import Translator
from googletrans import LANGUAGES


app = FastAPI()

app.mount(
    "/static",
    StaticFiles(directory=Path(__file__).parent.absolute() / "static"),
    name="static",
)

BASE_DIR = Path(__file__).resolve().parent
templates = Jinja2Templates(directory=str(Path(BASE_DIR, 'templates')))

def translate_text(text, dest_language):
    translator = Translator()
    translation = translator.translate(text, dest=dest_language)
    # print(translation)
    return translation.text

# for code, name in LANGUAGES.items():
#     print(f"Code: {code}, Language: {name}")

@app.get('/', response_class=HTMLResponse)
def get_form(request: Request):
    # print(LANGUAGES)
    return templates.TemplateResponse("index.html", {"request": request, "languages": LANGUAGES})
    # return {'lang' : LANGUAGES}

@app.post('/', response_class=HTMLResponse)
async def handle_form(request: Request):
    form_data = await request.form()
    english_text = form_data.get('text')
    dest_language = form_data.get('language')
    if english_text and dest_language:
        translated_text = translate_text(english_text, dest_language)
        return templates.TemplateResponse("index.html", {"request": request, "translation": translated_text, "languages": LANGUAGES})
    else:
        return templates.TemplateResponse("index.html", {"request": request, "error": "Please enter text and select a language.", "languages": LANGUAGES})


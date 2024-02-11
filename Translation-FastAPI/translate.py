from googletrans import Translator

def translate_to_spanish(text):
    translator = Translator()
    translation = translator.translate(text, dest='es')
    return translation.text

if __name__ == "__main__":
    # Get English text input from the user
    english_text = input("Enter English text to translate to Spanish: ")

    # Translate to Spanish  
    spanish_text = translate_to_spanish(english_text)

    # Display the result
    print(f"\nTranslated to Spanish: {spanish_text}")

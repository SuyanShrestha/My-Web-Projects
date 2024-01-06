const form = document.querySelector('form');
const resultDiv = document.querySelector('.result');


const getWordInfo = async (word) => {
    try{
        resultDiv.innerHTML = 'Fetching data, please wait...'
        // alert('Word: ' + word);
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();

        let definitions = data[0].meanings[0].definitions[0];
        // let audio = data[0].phonetics[0].audio;

        resultDiv.innerHTML = `
            <h2><strong>Word: </strong>${data[0].word}</h2>
            <p class="partOfSpeech">${data[0].meanings[0].partOfSpeech}</p>
            <p><strong>Meaning: </strong>${definitions.definition === undefined ? 'Not Found' : definitions.definition}</p>
            <p><strong>Example: </strong>${definitions.example === undefined ? 'Not Found' : definitions.example}</p>
            <p><strong>Antonyms: </strong></p>
        `;

        // Fetching antonyms
        if(definitions.antonyms.length === 0){
            resultDiv.innerHTML += `<span>Not Found </span>`;
        }
        else{
            for(let i=0; i<definitions.antonyms.length; i++){
                resultDiv.innerHTML += `<li>${definitions.antonyms[i]}</li>`
            }
        }

        resultDiv.innerHTML += `<p><strong>Synonyms: </strong></p>`
        // Fetching synonyms
        if(definitions.synonyms.length === 0){
            resultDiv.innerHTML += `<span>Not Found </span>`;
        }
        else{
            for(let i=0; i<definitions.synonyms.length; i++){
                resultDiv.innerHTML += `<li>${definitions.synonyms[i]}</li>`
            }
        }

        // // adding sound button
        // resultDiv.innerHTML +=`<button class="sound"><i class="fa-solid fa-volume-high"></i></button>`;
        // let sound = document.querySelector(".sound");
        // sound.addEventListener('click', (audio)=>{
        //     audio.play;
        // });

        // adding readmore button
        resultDiv.innerHTML += `<div class='read-more'><a href="${data[0].sourceUrls}" target="_blank">Read more</a></div>`
        console.log(data);
    }
    catch(error){
        resultDiv.innerHTML = `<p>Sorry, the word you entered couldnot be found.</p>`
    }
}

//e.preventDefault le chahi form auto-submit huna ni rokxa, plus each time search garda page ni reload hunivayena
form.addEventListener('submit', (e)=> {
    e.preventDefault();
    getWordInfo(form.elements[0].value);            // form ko children vanya input ra button ho , so select first child

});



// DARK THEME
let icon = document.getElementById('icon');
icon.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    if(document.body.classList.contains('dark-theme')){
        icon.src = 'images/sun.png';
    }
    else{
        icon.src = 'images/moon.png';
    }
});
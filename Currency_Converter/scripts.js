const BASE_URL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies';

const dropdowns = document.querySelectorAll('.dropdown select');
const btn = document.querySelector('form button');
const fromCurr = document.querySelector('.from select');
const toCurr = document.querySelector('.to select');
const msg = document.querySelector('.msg');
const help = document.querySelector('.question');
const helpDiv = document.querySelector('.help');


// for (code in countryList){
//     console.log(code, countryList[code]);
// }

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement('option');
        // newOption.style.fontWeight = 700;
        newOption.innerText = currCode;
        newOption.value = currCode;
        // select.append(newOption);
    

        if(select.name === 'from' && currCode === 'USD'){
            newOption.selected = 'selected';
        }
        else if(select.name === 'to' && currCode === 'NPR'){
            newOption.selected = 'selected';
        }
        select.append(newOption);
    }

    select.addEventListener('change', (evt)=>{
        updateFlag(evt.target);
    });
}


const updateExchangeRate = async () => {
    let amount = document.querySelector('.amount input');
    let amtVal = amount.value;
    // console.log(amtVal);
    if(amtVal==='' || amtVal<1){
        amtVal = '1';
    }
    // console.log(fromCurr.value, toCurr.value);
    // console.log(fromCurr.value.toLowerCase(), toCurr.value.toLowerCase());
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    // console.log(data);
    // console.log(response);
    let rate = data[toCurr.value.toLowerCase()];
    console.log(rate);

    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

const updateFlag = (element) => {
    console.log('This is el',element);
    console.log(element.parentElement);
    // let ele = element.parentElement;
    // let img = document.querySelector(ele)
    let currCode = element.value;
     
    console.log(currCode);
    let countryCode = countryList[currCode];
    console.log(countryCode);
    // let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelectorAll('img');
    img[0].setAttribute('src',`https://flagsapi.com/${countryCode}/flat/64.png`)
    // console.log(img)    
    // console.log(img, img.src);
    // img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
    // console.log('this  is img src', img.src);

//     img.srcset = `https://flagcdn.com/96x72/${countryCode}.png 2x, https://flagcdn.com/144x108/${countryCode}.png 3x`;
//     img.alt = countryCode;
};


btn.addEventListener('click', (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});


window.addEventListener('load', () => {
    updateExchangeRate();
});

help.style.cursor = 'pointer';

const slideDiv = () => {
    helpDiv.style.left = '53rem';
    setTimeout(() => {
        helpDiv.style.left = '35rem';
    }, 4000);
}

help.onclick = slideDiv;


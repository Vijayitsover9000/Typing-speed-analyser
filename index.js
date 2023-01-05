const apiurl= 'https://api.quotable.io/random';
const quoteDisplayElement = document.getElementById('sample');
const quoteInputElement = document.getElementById('input');
let first = true;
let timerInterval;
let startTime ;
let correct;

let speed; //average words per minute
let accuracy; // percentage
let totalCountCharacters; 
let totalTime; //inseconds
let mistakes;


quoteInputElement.addEventListener('input' , () => {
    
    const arrayQuote = quoteDisplayElement.querySelectorAll('span');
    const arrayValue = quoteInputElement.value.split(''); 
    correct = true;
    arrayQuote.forEach((charSpan,index) => {
        const character = arrayValue[index];
        if(character == null)
        {
            charSpan.classList.remove('incorrect');
            charSpan.classList.remove('correct');
            correct = false;
        }
        else if(character === charSpan.innerText)
        {
            charSpan.classList.add('correct');
            charSpan.classList.remove('incorrect');
        }
        else{
            charSpan.classList.add('incorrect');
            charSpan.classList.remove('correct');
            correct = false;
            mistakes++;
        }
    });
    if(first)
    {
        mistakes = 0;
        startTimer();
        first = false;
    }

    if(correct){
        clearInterval(timerInterval);
        totalTime = Number(document.getElementById('counter').innerText);
        speed = Math.round((totalCountCharacters/(5*totalTime))*60);
        if(mistakes >totalCountCharacters)
            accuracy = 0;
        else
            accuracy = 100 - (mistakes/totalCountCharacters)*100;
        accuracy = accuracy.toFixed(2);
        // renderNewQuote();
        ShowResult();
    }
})


const getQuote = ()=>{
    return fetch(apiurl)
        .then(resp =>resp.json())
        .then(data => data.content);
}
const renderNewQuote = async () => {
    clearInterval(timerInterval);
    const quote = await getQuote();
    quoteDisplayElement.innerHTML = '';
    totalCountCharacters = 0;
    quote.split('').forEach(character =>{
        const charSpan = document.createElement('span');
        charSpan.innerText = character;
        quoteDisplayElement.appendChild(charSpan);
        totalCountCharacters++;
    })
    quoteInputElement.value = null;
    $('.content').show(500);
    document.getElementById('counter').innerText = 0;
    first = true;
    document.getElementById('input').focus();
}

const startTimer = ()=>{
    const timerElement = document.getElementById('counter');
    startTime = new Date();
    timerInterval = setInterval(() =>{
        timerElement.innerText = getTimerTime();
    }, 50);
}
const getTimerTime = ()=>{
   return parseFloat((new Date() - startTime)/1000).toFixed(1);
}
document.getElementById('new-sample-text').addEventListener('click',() => {
    $('.content').hide(500);
    renderNewQuote();
});

const ShowResult = () => {
    $('.content').hide(500);
    console.log("Woooo");
    document.getElementById('speed').innerText = speed;
    document.getElementById('accuracy').innerText = accuracy;
};

renderNewQuote();

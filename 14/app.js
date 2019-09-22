const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

const greetings =['Im good you little peace of programmer','Doing good homeboi','leaveme alone'];
const Hello = ['Leave me Aloneeeee','NOT GOOD','EY FUCK OFF','WHAT THE HELL IS WRONG WITH YOU','YOU NEED THERAPY BOI','do not talk to me']

const weather = ['weather is fine','GO OUT MADDARYACKAR'];

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();


recognition.onstart = function() {
    console.log('voice is activated , you can speak to microphoneeee');
};

recognition.onresult = function(event){
    const current = event.resultIndex;

    const transcript = event.results[current][0].transcript;
    content.textContent = transcript;

    readOutLoud(transcript);
}

//add the Listener to the btn

btn.addEventListener('click',() =>{
    recognition.start();
});

function readOutLoud(message){
    const speech = new SpeechSynthesisUtterance();
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    speech.text = 'i dont know what you said dude!';

    if(message.includes('how are you')){
        const finalText = greetings[Math.floor(Math.random() * greetings.length)];
        speech.text = finalText;
    }
    else if (message.includes('hello')){
        const finalText = Hello[Math.floor(Math.random() * Hello.length)];
        speech.text = finalText;
    }
    else if (message.includes('you are a browser')){
        const finalText = 'NO YOU ARE A BROWSER LEAVE ME ALONE AND GO STUDY HOW TO PROGRAM ME MORE BEAUTIFULLY AND NICEERR GO NOW !';
        speech.text = finalText;
    }
    else if (message.includes('oh really')){
        const finalText = 'YES IT IS !';
        speech.text = finalText;
    }
    else if (message.includes('weather')){
        const finalText = weather[Math.floor(Math.random() * weather.length)] ;
        speech.text = finalText;
    }

    window.speechSynthesis.speak(speech);
}
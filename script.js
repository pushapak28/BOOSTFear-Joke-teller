const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


// disabled/enable button
function toggleButton() {
    button.disabled = !button.disabled;
}
//  passing joke to voicerss pi
function tellMe(joke) {
    console.log('tell me:', joke);
    VoiceRSS.speech({
        key: '2eb019ef8f6445ddbfe27e36bf5bfaf8',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// get jokes from joke api
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,racist';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        //  text to speech
        tellMe(joke);
        // disabled button
        toggleButton();
    } catch (error) {
        // catch errors here
        console.log('whoo', error);
    }
}

// event listener
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
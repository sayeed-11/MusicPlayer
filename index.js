

const audios = [
    {
        id: 1,
        title: "FALLEN",
        audioSrc: "./audios/Fallen.mp3",
        artist: "Nasheed Intrument",
        postar: "./assets/fallen.png"
    },
    {
        id: 2,
        title: "AFRICA",
        audioSrc: "./audios/Africa.mp3",
        artist: "Nasheed Intrument",
        postar: "./assets/africa.png",
    },
    {
        id: 2,
        title: "HABIB",
        audioSrc: "./audios/Habib.mp3",
        artist: "Nasheed Intrument",
        postar: "./assets/habib.png"
    },
    {
        id: 4,
        title: "WARM VOICES",
        audioSrc: "./audios/Warm Voices.mp3",
        artist: "Nasheed Intrument",
        postar: "./assets/warm_voice.png"
    },

]


let slider = document.querySelector('.music-time-range div input');
let audio = document.querySelector('.musics audio');
let PLAY_BUTTON = document.querySelector('.play');
let PREV_BUTTON = document.querySelector('.left-arrow');
let NEXT_BUTTON = document.querySelector('.right-arrow');
let PLAY_PAUSE = PLAY_BUTTON.children[0];
let IMG_POSTER = document.querySelector('.music-thumb div img');
let SONG_NAME = document.querySelector('.music-info .song-name');
let ARTIST = document.querySelector('.music-info .artist');
let PLAYING_TIME = document.querySelector('.start');
let DURATION = document.querySelector('.duration');
let WHOLE_LOOP_BUTTON = document.querySelector('.whole-loop');
let SINGLE_LOOP_BUTTON = document.querySelector('.single-loop');
let SUFFLE_BUTTON = document.querySelector('.suffle');
let VOLUME_UP = document.querySelector('.volume-up');
let VOLUME_MUTED = document.querySelector('.volume-muted');

let isPlay = false;
let CURRENT_INDEX = 0;


let maxValue = parseInt(slider.max);
let AUDIO_STATUS = "WHOLE_LOOP";



const setAudioInfo = () => {
    const { id, title, audioSrc, artist, postar } = audios[CURRENT_INDEX];
    audio.src = audioSrc;
    SONG_NAME.innerHTML = title;
    ARTIST.innerHTML = artist;
    IMG_POSTER.src = postar;
    audio.onloadedmetadata = () => {
        let min = parseInt((parseInt(audio.duration) / 60));
        let sec = parseInt(audio.duration) % 60;
        DURATION.innerHTML = `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
    };
}
setAudioInfo();

setInterval(() => {
    let min = parseInt((parseInt(audio.currentTime) / 60));
    let sec = parseInt(audio.currentTime) % 60;
    PLAYING_TIME.innerHTML = `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;


    let progress = (audio.currentTime / audio.duration) * 100;
    slider.style.background = `linear-gradient(to right, #F5F5F5 ${progress}%, #dddddd37 ${progress}%)`
    slider.value = progress;


    if (audio.ended) {
        // PLAY_PAUSE.classList = "fa-solid fa-play";
        // isPlay = false;

        if (AUDIO_STATUS == "WHOLE_LOOP") {
            CURRENT_INDEX = (CURRENT_INDEX + 1) % (audios.length);
            setAudioInfo();
            isPlay = false;
            PLAY_MUSIC();
        }
        if (AUDIO_STATUS == "SUFFLE") {
            CURRENT_INDEX = Math.floor(Math.random() * (audios.length - 0)) + 0;
            setAudioInfo();
            isPlay = false;
            PLAY_MUSIC();
        }
    }

})


function PLAY_MUSIC() {
    if (!isPlay) {
        audio.play();
        isPlay = true
        PLAY_PAUSE.classList = "fa-solid fa-pause"
    } else {
        audio.pause()
        isPlay = false
        PLAY_PAUSE.classList = "fa-solid fa-play"
    }

}

PLAY_BUTTON.addEventListener('click', () => {
    PLAY_MUSIC();
})

NEXT_BUTTON.addEventListener('click', () => {
    if (AUDIO_STATUS == "SUFFLE") {
        let RANDOM_INDEX = Math.floor(Math.random() * (audios.length - 0)) + 0;
        if (RANDOM_INDEX == CURRENT_INDEX) {
            CURRENT_INDEX = (RANDOM_INDEX + 1) % (audios.length);
        } else {
            CURRENT_INDEX = RANDOM_INDEX;
        }
    } else {
        CURRENT_INDEX = (CURRENT_INDEX + 1) % (audios.length);
    }
    setAudioInfo();
    isPlay = false;
    PLAY_MUSIC();
})
PREV_BUTTON.addEventListener('click', () => {
    CURRENT_INDEX = CURRENT_INDEX == 0 ? audios.length - 1 : (CURRENT_INDEX - 1);
    setAudioInfo();
    isPlay = false;
    PLAY_MUSIC();
})



function sliderPrice() {
    let progress = (slider.value / maxValue) * 100;

    slider.value = progress;
    // console.log(progress);

    audio.currentTime = (audio.duration * progress) / 100;


    slider.style.background = `linear-gradient(to right, #F5F5F5 ${progress}%, #dddddd37 ${progress}%)`
}

WHOLE_LOOP_BUTTON.addEventListener('click', () => {
    WHOLE_LOOP_BUTTON.style.display = "none";
    SINGLE_LOOP_BUTTON.style.display = "block";
    audio.loop = true;
    AUDIO_STATUS = "LOOP";
})
SINGLE_LOOP_BUTTON.addEventListener('click', () => {
    SINGLE_LOOP_BUTTON.style.display = "none";
    SUFFLE_BUTTON.style.display = "block";
    audio.loop = false;
    AUDIO_STATUS = "SUFFLE";
})
SUFFLE_BUTTON.addEventListener('click', () => {
    SUFFLE_BUTTON.style.display = "none";
    WHOLE_LOOP_BUTTON.style.display = "block";
    audio.loop = false;
    AUDIO_STATUS = "WHOLE_LOOP";
})

VOLUME_UP.addEventListener('click', () => {
    VOLUME_UP.style.display = 'none';
    VOLUME_MUTED.style.display = 'block';
    audio.muted = true;
})
VOLUME_MUTED.addEventListener('click', () => {
    VOLUME_MUTED.style.display = 'none';
    VOLUME_UP.style.display = 'block';
    audio.muted = false;
})

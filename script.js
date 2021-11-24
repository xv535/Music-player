"use strict";

const playBtn = document.querySelector(".navbar .player-play"),
    stopBtn = document.querySelector(".navbar .player-pause"),
    myAudio = document.querySelector("audio"),
    playlist = document.querySelector(".list-song"),
    trackList = document.querySelectorAll(".list-songs li"),
    playlistBtn = document.querySelector(".show-playlist-button"),
    trackTitle = document.querySelector(".track-title"),
    nextBtn = document.querySelector(".next"),
    prevBtn = document.querySelector(".prev");


let trackIndex = 0;
const tracks = [
    {
        title: "Red Hot Chili Peppers - Goodbye Angels",
        src: "song/Red Hot Chili Peppers - Goodbye Angels.mp3"
    },
    {
        title: "Red Hot Chili Peppers - Snow (Hey Oh)",
        src: "song/Red Hot Chili Peppers - Snow (Hey Oh).mp3"
    },
    {
        title: "Red Hot Chili Peppers - Otherside",
        src: "song/Red Hot Chili Peppers - Otherside.mp3",
    },
    {
        title: "Atomic Bombshell- Sweet Baby",
        src: "song/Atomic_Bombshell_-_Sweet_Baby_(mp3.pm).mp3",
    },
];

function createPlaylist() {
    let playlist = document.createElement('ul');
    playlist.classList.add('list-songs');

    tracks.forEach((track, i) => {
        let song = document.createElement('li');
        song.classList.add('song');
        playlist.innerText = `
            <li class="song" src="song/Red Hot Chili Peppers - Goodbye Angels.mp3" class="get-song"
            type="audio/mpeg">${i} ${track.title}</li>
        `;
        playlist.append(song);
    });
    console.log(playlist);
    document.querySelector('.playlist').append(playlist);
}
createPlaylist();


function showTitles(index) {
    tracks.forEach((item, i) => {
        trackTitle.innerText = `${index + 1} ${tracks[trackIndex].title}`;

    });

}

function nextTrack() {
    nextBtn.addEventListener("click", () => {
        if (trackIndex >= tracks.length - 1) {
            trackIndex = 0;
        } else {
            trackIndex++;
        }
        refreshAudioElement();
        console.log(trackIndex);
    });
}

function prevTrack() {
    prevBtn.addEventListener("click", () => {
        if (trackIndex > 0) {
            trackIndex--;
        } else {
            trackIndex = tracks.length - 1;
        }
        refreshAudioElement();
        console.log(trackIndex);
    });
}

prevTrack();
nextTrack();

trackList.forEach((item, i) => {
    item.addEventListener("click", (e) => {
        let target = e.target;
        if (document.querySelector("audio")) {
            document.querySelector("audio").remove();
            createAudio(target.getAttribute('src'));
        } else {
            createAudio(target.getAttribute('src'));
        }
        trackIndex = i;
        showTitles(i);
    });
});


function refreshAudioElement(src) {
    if (document.querySelector("audio")) {
        document.querySelector("audio").remove();
        createAudio(tracks[trackIndex].src);
    } else {
        createAudio(tracks[trackIndex].src);
    }
    playTrack();
}

function createAudio(target) {
    let currentTrack = document.createElement('audio');
    currentTrack.innerHTML = `
            <source class="current-song" src="${target}"
            type="audio/mpeg">
        <p>Ваш браузер не поддерживает HTML5 аудио. Вот взамен
            <a href="myAudio.mp4">ссылка на аудио</a></p>
            `;
    document.querySelector('figure').append(currentTrack);
    stopTrack();
    setTimeout(playTrack, 100);
}

playBtn.addEventListener("click", playTrack);
stopBtn.addEventListener("click", stopTrack);

function playTrack() {
    document.querySelector('audio').play();
    hideBtn(playBtn);
    stopBtn.style.visibility = 'visible';

}

function stopTrack() {
    document.querySelector('audio').pause();
    hideBtn(stopBtn);
    playBtn.style.visibility = 'visible';
}

function hideBtn(btn) {
    btn.style.visibility = 'hidden';

}

playlistBtn.addEventListener('click', () => {
    console.log(playlist);
    if (!playlist.classList.contains('active')) {
        playlist.classList.add('active');
    } else {
        playlist.classList.remove('active');
    }

});



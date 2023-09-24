let wrapper = document.querySelector(".wrapper");
let musicImg = wrapper.querySelector(".img-area img");
let musicName = wrapper.querySelector(".song-details .name");
let musicArtist = wrapper.querySelector(".song-details .artist");
let mainAudio = wrapper.querySelector("#main-audio");
let playPauseBtn = wrapper.querySelector(".play-pause");
let prevBtn = wrapper.querySelector("#prev");
let nextBtn = wrapper.querySelector("#next");
let progressArea = wrapper.querySelector(".progress-area");
let progressBar = wrapper.querySelector(".progress-bar");

let musicIndex = 1;

window.addEventListener("load", () => {
  loadMusic(musicIndex);
});

function loadMusic(index) {
  musicName.innerText = allMusic[index - 1].name;
  musicArtist.innerText = allMusic[index - 1].artist;
  musicImg.src = `assets/img/${allMusic[index - 1].img}.jpg`;
  mainAudio.src = `assets/audio/${allMusic[index - 1].src}.mp3`;
}
function playMusic() {
  wrapper.classList.add("paused");
  playPauseBtn.querySelector("i").innerText = "pause";
  mainAudio.play();
}
function pauseMusic() {
  wrapper.classList.remove("paused");
  playPauseBtn.querySelector("i").innerText = "play_arrow";
  mainAudio.pause();
}
function prevMusic() {
  musicIndex--;
  musicIndex < 1 ? (musicIndex = allMusic.length) : (musicIndex = musicIndex);
  loadMusic(musicIndex);
  playMusic();
}
function nextMusic() {
  musicIndex++;
  musicIndex > allMusic.length ? (musicIndex = 1) : (musicIndex = musicIndex);
  loadMusic(musicIndex);
  playMusic();
}

playPauseBtn.addEventListener("click", () => {
  const isMusicPaused = wrapper.classList.contains("paused");
  isMusicPaused ? pauseMusic() : playMusic();
});

prevBtn.addEventListener("click", () => {
  prevMusic();
});

nextBtn.addEventListener("click", () => {
  nextMusic();
});
mainAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;

  let musicCurrentTime = wrapper.querySelector(".current");
  let musicDuration = wrapper.querySelector(".duration");
  mainAudio.addEventListener("loadeddata", () => {
    let audioDuration = mainAudio.duration;
    let totalMin = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);
    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }
    musicDuration.innerText = `${totalMin}:${totalSec}`;
  });

  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if (currentSec < 10) {
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

progressArea.addEventListener("click", (e) => {
  let progressWidthVal = progressArea.clientWidth;
  let clientOffSetX = e.offsetX;
  let songDuration = mainAudio.duration;
  mainAudio.currentTime = (clientOffSetX / progressWidthVal) * songDuration;
  playMusic();
});

const repeatBtn = wrapper.querySelector("#repeat-playlist");
repeatBtn.addEventListener("click", (e) => {
  let getText = repeatBtn.innerText;
  switch (getText) {
    case "repeat":
      repeatBtn.innerText = "repeat_one";
      repeatBtn.setAttribute("title", "Song looped");
      break;
    case "repeat_one":
      repeatBtn.innerText = "shuffle";
      repeatBtn.setAttribute("title", "Playback shuffle");
      break;
    case "shuffle":
      repeatBtn.innerText = "repeat";
      repeatBtn.setAttribute("title", "Playlist looped");
      break;
  }
});
mainAudio.addEventListener("ended", () => {
  let getText = repeatBtn.innerText;
  switch (getText) {
    case "repeat":
      nextMusic();
      break;
    case "repeat_one":
      mainAudio.currentTime = 0;
      loadMusic(musicIndex);
      playMusic();
      break;
    case "shuffle":
      let randIndex = Math.floor(Math.random() * allMusic.length + 1);
      do {
        randIndex = Math.floor(Math.random() * allMusic.length + 1);
      } while (musicIndex == randIndex);
      musicIndex = randIndex;
      loadMusic(musicIndex);
      playMusic();
      break;
  }
});

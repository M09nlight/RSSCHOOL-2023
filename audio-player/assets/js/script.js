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
let musicList = wrapper.querySelector(".music-list");
let showMoreBtn = wrapper.querySelector("#more-music");
let hideMusicBtn = wrapper.querySelector("#close");

let musicIndex = Math.floor(Math.random() * allMusic.length + 1);

window.addEventListener("load", () => {
  loadMusic(musicIndex);
  playingNow();
});

function loadMusic(index) {
  musicName.innerText = allMusic[index - 1].name;
  musicArtist.innerText = allMusic[index - 1].artist;
  musicImg.src = `assets/img/${allMusic[index - 1].img}.jpg`;
  mainAudio.src = `assets/audio/${allMusic[index - 1].src}.mp3`;
  document.querySelector("#background").src = `assets/img/${
    allMusic[index - 1].img
  }.jpg`;
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
  playingNow();
}
function nextMusic() {
  musicIndex++;
  musicIndex > allMusic.length ? (musicIndex = 1) : (musicIndex = musicIndex);
  loadMusic(musicIndex);
  playMusic();
  playingNow();
}

playPauseBtn.addEventListener("click", () => {
  const isMusicPaused = wrapper.classList.contains("paused");
  isMusicPaused ? pauseMusic() : playMusic();
  playingNow();
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
      playingNow();
      break;
  }
});

showMoreBtn.addEventListener("click", () => {
  musicList.classList.toggle("show");
});
hideMusicBtn.addEventListener("click", () => {
  showMoreBtn.click();
});

const ulTag = wrapper.querySelector("ul");

for (let i = 0; i < allMusic.length; i++) {
  let liTag = ` <li data-li-index="${i + 1}">
  <div class="row">
      <span>${allMusic[i].name}</span>
      <p>${allMusic[i].artist}</p>
  </div>
  <audio class="${allMusic[i].src}" src="assets/audio/${
    allMusic[i].src
  }.mp3"></audio>
  <div id="${allMusic[i].src}" class="audio-duration">3:40</div>
</li>`;
  ulTag.insertAdjacentHTML("beforeend", liTag);

  let liAudioDuration = ulTag.querySelector(`#${allMusic[i].src}`);
  let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);

  liAudioTag.addEventListener("loadeddata", () => {
    let audioDuration = liAudioTag.duration;
    let totalMin = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);
    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }
    liAudioDuration.innerText = `${totalMin}:${totalSec}`;
    liAudioDuration.setAttribute("data-t-duration", `${totalMin}:${totalSec}`);
  });
}

const allLiTags = ulTag.querySelectorAll("li");
function playingNow() {
  for (let j = 0; j < allLiTags.length; j++) {
    let audioTag = allLiTags[j].querySelector(".audio-duration");
    if (allLiTags[j].classList.contains("playing")) {
      allLiTags[j].classList.remove("playing");
      let attrDuration = audioTag.dataset.tDuration;
      audioTag.innerText = attrDuration;
    }
    if (allLiTags[j].dataset.liIndex == musicIndex) {
      allLiTags[j].classList.add("playing");
      audioTag.innerText = "Playing";
    }
    allLiTags[j].setAttribute("onclick", "clicked(this)");
  }
}

function clicked(el) {
  let getLiIndex = el.dataset.liIndex;
  musicIndex = getLiIndex;
  loadMusic(musicIndex);
  playMusic();
  playingNow();
}

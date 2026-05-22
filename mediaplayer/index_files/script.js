  const videoList = [
    { id: 1, src: "index_files/Lofi1.mp4" },
    { id: 2, src: "index_files/Lofi2.mp4" },
    {
      id: 3,
      src: "index_files/Lofi3.mp4",
    },
  ];

  const playlist = [
  {
    title: "Breathe",
    src: "sounds/Avanti-Breathe.mp3"
  },
  {
    title: "Starfish",
    src: "sounds/Austin-Hughes-Starfish.mp3"
  },
  {
    title: "Sunset Swim",
    src: "sounds/Nilix-Sunset-Swim.mp3"
  },
  {
    title: "I just wanna be",
    src: "sounds/Bensky-Lu-I-Just-Wanna-Be.mp3"
  },
  {
    title: "Uneven",
    src: "sounds/Elektra-Uneven.mp3"
  },
  {
    title: "Old Feelings",
    src: "sounds/Bensky-Lu-Old-Feelings.mp3"
  },
  {
    title: "Thinking of You",
    src: "sounds/Bensky-Lu-Thinking-of-You.mp3"
  },
  {
    title: "Escape",
    src: "sounds/Elektra-Escape.mp3"
  },
  {
    title: "Moonlight",
    src: "sounds/Elektra-Moon-Light.mp3"
  },
  {
    title: "Till Next Time",
    src:"sounds/Jake-Mercy-Till-Next-Time.mp3"
  },
  {
    title: "Chasing You",
    src:"sounds/LANDR-Nilix-Chasing-You-Warm-Low.mp3"
  }
  ];

  let currentSongIndex = 0;

  const myVideo = document.querySelector("#my-video");
  console.log(myVideo);

  const nowPlaying=document.getElementById("now-playing");

  const musicPlayer = document.getElementById("music-player");
  musicPlayer.volume=0.2;
  musicPlayer.addEventListener("timeupdate", updateProgress);

  const upNextContainer =document.getElementById("up-next");

  const progressBar = document.querySelector("#progress-bar");
  console.log(progressBar);

  function updateProgress() {

    const progress = (musicPlayer.currentTime / musicPlayer.duration) * 100;
    progressBar.style.width = progress + "%";
  }

  //visually updates progress bar width by calculating how far the user is through audio

  const playPauseButton = document.querySelector("#play-pause-button");
  console.log(playPauseButton);

  playPauseButton.addEventListener("click", togglePlayback);

  const playPauseImg = document.querySelector("#play-pause-img");
  console.log(playPauseImg);

  function togglePlayback() {
    if (musicPlayer.paused) {

      myVideo.play();
      musicPlayer.play();

      playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v2.png";
    } else {

      myVideo.pause();
      musicPlayer.pause();

      playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v2.png";
    }
  }

  //adds a click handler to control playback

  const VOLUME_BOOST = 1.5;

  const muteUnmuteButton = document.querySelector("#mute-unmute-button");
  console.log(muteUnmuteButton); 

  muteUnmuteButton.addEventListener("click", toggleAudio);

  const muteUnmuteImg = document.querySelector("#mute-unmute-img");
  console.log(muteUnmuteImg);

  function toggleAudio() {
    musicPlayer.muted = !musicPlayer.muted;

    if (musicPlayer.muted) {
      muteUnmuteImg.src = "https://img.icons8.com/ios-glyphs/30/no-audio--v1.png";
    } else {
      muteUnmuteImg.src = "https://img.icons8.com/ios-glyphs/30/high-volume--v2.png";
    }
  }

  //mute/unmute toggle function toggles sound on and off by checking if the video is muted and updates icons

  const stardustButton = document.querySelector("#stardust-vid-button");
  console.log(stardustButton);

  stardustButton.addEventListener("click", function chooseVideo() {
    playVideo(0);
  });

  const zenscapeButton = document.querySelector("#zenscape-vid-button");
  console.log(zenscapeButton);

  zenscapeButton.addEventListener("click", function chooseVideo() {
    playVideo(1);
  });

  const musicVideoButton = document.querySelector("#musicvideo-vid-button");
  console.log(musicVideoButton);

  musicVideoButton.addEventListener("click", function chooseVideo() {
    playVideo(2);
  });

  function playVideo(no) {
    myVideo.src = videoList[no].src;
    console.log(myVideo.src);
    myVideo.load();
    myVideo.play();

      musicPlayer.play();
  }

  //switches video source based on which button is clicked, reloads video and starts playback

  const fullscreenButton = document.querySelector("#fullscreen-button");
  console.log(fullscreenButton);

  fullscreenButton.addEventListener("click", toggleFullscreen);

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      myVideo.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  //fullscreen toggle

  const heartButton = document.querySelector("#heart-button");
  console.log(heartButton);

  heartButton.addEventListener("click", updateLikes);

  const likesContainer = document.querySelector("#likes");
  let likes = 0;

  function updateLikes() {
    likes++;
    likesContainer.textContent = likes;
  }

  //heart counter responds to clicks by incrementing a like counter and updating the display

  //const step1Button = document.querySelector("#step1-button");
  //console.log(step1Button)

  //step1Button.addEventListener("click", gotoStep1);

  //function gotoStep1() {
  //  myVideo.currentTime = 16.0;
  //}

  //const step2Button = document.querySelector("#step2-button");
  //console.log(step2Button);

  //step2Button.addEventListener("click", gotoStep2);

  //function gotoStep2() {
  // myVideo.currentTime = 43.0;
  //}

  //skips the videos to specific timestamps when buttons are clicked by setting the currentTime property of the video element

const rewindButton = document.querySelector("#rewind-button");

function rewind() {
  const slow = myVideo.playbackRate === 1.0;
  const rate = slow ? 0.8 : 1.0;

  myVideo.playbackRate = rate;
  musicPlayer.playbackRate = rate;

  myVideo.play();
  musicPlayer.play();
}

if (rewindButton) {
  rewindButton.addEventListener("click", rewind);
}

  const shuffleButton = document.getElementById("shuffle-button");

  shuffleButton.addEventListener("click", shufflePlaylist);

  function shufflePlaylist () {
    for (let i=playlist.length -1; i>0; i--){
      const j = Math.floor(Math.random() * (i + 1));

      [playlist[i], playlist [j]] =
      [playlist[j], playlist[i]];
    }

    currentSongIndex=0;

    loadSong(currentSongIndex);
    musicPlayer.play();

  }

  musicPlayer.addEventListener("ended", nextSong);

  function nextSong() {
    currentSongIndex++;

    if (currentSongIndex >= playlist.length) {
      currentSongIndex = 0;
    }
    loadSong(currentSongIndex);
    musicPlayer.play();
  }

  const timer = document.getElementById("timer");

  let countdown;

  document.getElementById("30-minute").onclick = () => startTimer(30);
  document.getElementById("45-minute").onclick = () => startTimer(45);
  document.getElementById("1-hour").onclick = () => startTimer(60);

  function startTimer(minutes) {

    clearInterval(countdown);

    let seconds = minutes*60;
    countdown = setInterval(() => {

      let mins = Math.floor(seconds/60);
      let secs = seconds % 60;

      timer.textContent = 
      `${mins}:${secs< 10 ? "0" :""}${secs}`;

      seconds--;

      if (seconds < 0) {
        clearInterval(countdown);
        timer.textContent = "TIME'S UP!"
      }

    }, 1000);
    }

  function loadSong(index) {
    musicPlayer.src = playlist[index].src;

    nowPlaying.textContent = "Now Playing: " + playlist[index].title;

    console.log("Now Playing:",
      playlist [index].title);

      displayPlaylist();

    console.log("Now Playing:", playlist [index].title);
  }

  document.addEventListener("DOMContentLoaded", () => {
    loadSong(currentSongIndex);
    musicPlayer.load();
    displayPlaylist();
  });

  musicPlayer.addEventListener("loadedmetadata", () => {
    console.log("Audio metadata loaded");
  });

  function displayPlaylist() {
    upNextContainer.innerHTML = "";
    playlist.forEach((song,index) => {

      const songDiv =
      document.createElement("div");
      songDiv.classList.add("up-next-item");

      if (index === currentSongIndex) {
        songDiv.classList.add("active-song");
      }

      songDiv.textContent = song.title;

      upNextContainer.appendChild(songDiv);
    });
  }
  //music player with a playlist of tracks, each track has a title and source file

  const volumeSlider = document.getElementById("volume-slider");
  const playButtons = document.querySelectorAll('.ambience .play-button');

  let currentAmbience = null;

  playButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (currentAmbience) {
        currentAmbience.pause();
      }
      const trackId = button.getAttribute ('data-track');
      currentAmbience = document.getElementById(trackId);

      currentAmbience.volume = Math.min (volumeSlider.value * VOLUME_BOOST,1);
      currentAmbience.play();
    });
  });

  volumeSlider.addEventListener('input', () => {
    if(currentAmbience) {
      currentAmbience.volume = Math.min (volumeSlider.value * VOLUME_BOOST,1);
    }
  });

  //fastforward toggle function checks current playback speed and toggles between normal and double speed when button is clicked
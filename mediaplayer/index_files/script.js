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

//organised playlists and video lists at the start so they can be easily referenced later

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

  //changed the progress bar to reflect the audio rather than the video since the main focus of my player isn't on the visuals.

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
//play/pause button affects both audio and video, as well as the mute button later on, since the audio isn't inherely attached to any of the videos. In this case, the user doesn't really have a reason to have to control one or the other seperately.
  const VOLUME_BOOST = 1.5;
//needed to amplify the audio of the ambience a bit since they were too quiet. I'm not even sure if this ended up working later on.
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

const reflectiveButton = document.querySelector("#reflective-vid-button");
  console.log(reflectiveButton);

  reflectiveButton.addEventListener("click", function chooseVideo() {
    playVideo(0);
  });

  const atmosphericButton = document.querySelector("#atmospheric-vid-button");
  console.log(atmosphericButton);

  atmosphericButton.addEventListener("click", function chooseVideo() {
    playVideo(1);
  });

  const calmingButton = document.querySelector("#calming-vid-button");
  console.log(calmingButton);

  calmingButton.addEventListener("click", function chooseVideo() {
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

  //fullscreen toggle stays the same - important feature

  const heartButton = document.querySelector("#heart-button");
  console.log(heartButton);

  heartButton.addEventListener("click", updateLikes);

  const likesContainer = document.querySelector("#likes");
  let likes = 0;

  function updateLikes() {
    likes++;
    likesContainer.textContent = likes;
  }
//I ended up keeping the likes button as it still carries a relaxing/wholesome vibe which I coulnd't think of anything else for it to be replaced with.

const rewindButton = document.querySelector("#rewind-button");

function rewind() {
  const slow = myVideo.playbackRate === 1.0;
  const rate = slow ? 0.8 : 1.0;

  myVideo.playbackRate = rate;
  musicPlayer.playbackRate = rate;

  myVideo.play();
  musicPlayer.play();
}

//Initially had a bug which I couldn't seem to fix with this button code after changing it from a fast forward button, so I kept iterating on this function with Chatgpt (4.0) only to realise I had only uploaded changes to the javascript and not the html up until that point.

//I decided a "rewind" button would be muchc more suitable for my chosen context over a fast forward button, so I ended up having the button slow the music and the visuals instead of making it faster. The user would have no reason to fast forward if they weren't watching a video, but giving them the ability to slow it down allows them to keep the music nice and slow if it is still too fast-paced for their liking. Relatively simple to avoid distraction, clicking once sets speed to 0.8, clicking again resets.

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

//I needed the most help creating the shuffle button as it was very unfamilair to me. I used ChatGPT (4.0) to explain how to create an unbiased equation where every song has an equal chance of moving to a different position as I couldn't quite get it working. Afterthe playlist is shuffled it loads and plays the first item in the new order (below). I felt this was a lot more effective than allowing the user to individually choose between songs, as lofi songs are quite generic, and if they didn't like the current song, they could just shuffle the playlist. User doesn't have to do anything once they are happy with the shuffle order, as they will just play one after another, and they can focus on relaxation as there is also no option to play songs individually. 

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

//Another feature that came to my mind when making the media player was the timer, especially because I still needed to fill the sidebar. I was able to make sense of the simple maths primarily through the countdown timer page on w3schools but the string I needed to display was a lot harder which I asked Chatgpt4.0 to help me with, since the symbols had to be precise.

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

  const volumeSlider = document.getElementById("volume-slider");
  const playButtons = document.querySelectorAll('.ambience .play-button');

//ambience controls seperate to music. I felt that the only customisation it needed were the different ambience options and volume control, since it would be overlayed on top of the music. If they were at a fixed volume, it could be too loud or soft for the user. Ensures that only one ambient sound can play at a time from the four buttons.
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

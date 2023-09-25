document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("audio");
  const progressBarContainer = document.querySelector(".progress-bar-container");
  const progressBar = document.getElementById("progress-bar");
  const currentTimeIndicator = document.getElementById("current-time");
  const durationIndicator = document.getElementById("duration");

  function updateProgressBar() {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`;

    const currentMinutes = Math.floor(audio.currentTime / 60);
    const currentSeconds = Math.floor(audio.currentTime % 60);
    const durationMinutes = Math.floor(audio.duration / 60);
    const durationSeconds = Math.floor(audio.duration % 60);

    const currentTimeString = `${currentMinutes.toString().padStart(2, "0")}:${currentSeconds.toString().padStart(2, "0")}`;
    const durationTimeString = `${durationMinutes.toString().padStart(2, "0")}:${durationSeconds.toString().padStart(2, "0")}`;

    currentTimeIndicator.textContent = currentTimeString;
    durationIndicator.textContent = durationTimeString;

    const trackCurrentTimeElement = document.querySelector(".player-header .track-current-time");
    if (trackCurrentTimeElement) {
      trackCurrentTimeElement.textContent = currentTimeString;
    }
  }

  audio.addEventListener("timeupdate", updateProgressBar);

  progressBarContainer.addEventListener("click", (event) => {
    const { offsetX } = event;
    const progressBarWidth = progressBarContainer.clientWidth;
    const progressPercentage = (offsetX / progressBarWidth) * 100;
    const newTime = (progressPercentage / 100) * audio.duration;
    audio.currentTime = newTime;
  });

  const playPauseButton = document.getElementById("play-pause-button");
  const nextButton = document.getElementById("next-button");
  const prevButton = document.getElementById("prev-button");

  let isPlaying = false;
  let currentTrackIndex = 0;

  const tracks = [
    {
      title: "Подснежник",
      artist: "ATL",
      audioSrc: "audio/ATL-Podsnezhnik.mp3",
      coverImageSrc: "images/atl-logo.png",
    },
    {
      title: "Танцуйте",
      artist: "ATL",
      audioSrc: "audio/ATL-Tancujjte.mp3",
      coverImageSrc: "images/atl-dance.png",
    },
    {
      title: "Падали звёзды",
      artist: "Luverance",
      audioSrc: "audio/Luverance-Padali_zvjozdy.mp3",
      coverImageSrc: "images/logo-3.jpg",
    },
    {
      title: "Чистый лист",
      artist: "DVRST feat. Лисса",
      audioSrc: "audio/DVRS.mp3",
      coverImageSrc: "images/logo-5.jpeg",
    },
  ];

  function playPause() {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    isPlaying = !isPlaying;
    updatePlayPauseButton();
  }

  function updatePlayPauseButton() {
    playPauseButton.textContent = isPlaying ? "❚❚" : "▶";
  }

  function changeTrack(direction) {
    if (direction === "next") {
      currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    } else if (direction === "prev") {
      currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    }
    loadTrack(currentTrackIndex);
    if (isPlaying) {
      audio.play();
    }
  }

  function loadTrack(index) {
    const track = tracks[index];
    audio.src = track.audioSrc;

    const trackTitleElement = document.querySelector(".track-title");
    const trackArtistElement = document.querySelector(".track-artist");
    const coverImageElement = document.querySelector(".cover-image");

    trackTitleElement.textContent = track.title;
    trackArtistElement.textContent = track.artist;
    coverImageElement.src = track.coverImageSrc;

    document.body.style.backgroundImage = `url('${track.coverImageSrc}')`;
    document.body.style.backgroundSize = "100% 100vh";
    document.body.style.backgroundRepeat = "no-repeat";

    isPlaying = false;
    playPause();
  }

  playPauseButton.addEventListener("click", playPause);
  nextButton.addEventListener("click", () => changeTrack("next"));
  prevButton.addEventListener("click", () => changeTrack("prev"));
});

const audio = document.getElementById('audio');
const progressBar = document.getElementById('progress-bar');
const currentTimeElement = document.getElementById('current-time');
const totalTimeElement = document.getElementById('total-time');
const playPauseButton = document.getElementById('play-pause');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const albumImage = document.getElementById('album-image');
const artistNameElement = document.getElementById('artist-name');
const songTitleElement = document.getElementById('song-title');
const playIcon = './icons/play-circle-fill.svg';
const pauseIcon = './icons/pause-circle-fill.svg';

let isPlaying = false;
let currentSongIndex = 0;

// List of songs (playlist)
const songs = [
  {
    title: 'Call',
    artist: 'Iyanya ft Ayara Star',
    src: 'songs/song1.mp3/Iyanya_Ft_Ayra_Starr_Call_9jaflaver.com_ - Copy.mp3',
    cover: 'cover/cover1.jpg'
  },
  {
    title: 'Jambole',
    artist: 'Goto',
    src: 'songs/song1.mp3/Jambole-Remix-_tooXclusive.com_.mp3',
    cover: 'cover/cover2.jpg'
  }
];

// Load the song into the audio player and update the UI
function loadSong(songIndex, autoplay = false) {
  const song = songs[songIndex]; // Get the song object from the playlist
  
  audio.src = song.src; // Set the audio source to the song's src
  albumImage.src = song.cover; // Update the album cover
  artistNameElement.textContent = song.artist; // Update the artist name
  songTitleElement.textContent = song.title; // Update the song title
  audio.load(); // Load the new song
  
  if (autoplay) {
    audio.play(); // Automatically play the song if autoplay is true
    playPauseButton.querySelector('img').src = pauseIcon; // Change icon to pause when autoplay
    isPlaying = true;
  }
  updateProgress();
}

// Format time from seconds to mm:ss
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Update the progress bar and timer
function updateProgress() {
  const currentTime = audio.currentTime;
  const duration = audio.duration;

  progressBar.value = (currentTime / duration) * 100;
  currentTimeElement.textContent = formatTime(currentTime);

  // Set total duration once (after metadata is loaded)
  if (!isNaN(duration)) {
    totalTimeElement.textContent = formatTime(duration);
  }
}

// Play/Pause functionality
playPauseButton.addEventListener('click', () => {
  if (isPlaying) {
    audio.pause();
    playPauseButton.querySelector('img').src = playIcon;
  } else {
    audio.play();
    playPauseButton.querySelector('img').src = pauseIcon;
  }
  isPlaying = !isPlaying;
});

// Sync progress bar with audio time
audio.addEventListener('timeupdate', updateProgress);

// Seek functionality (when user drags progress bar)
progressBar.addEventListener('input', () => {
  const duration = audio.duration;
  audio.currentTime = (progressBar.value / 100) * duration;
});

// Set the total time once the metadata of the audio file is loaded
audio.addEventListener('loadedmetadata', () => {
  totalTimeElement.textContent = formatTime(audio.duration);
});

// Function to go to the next song
nextButton.addEventListener('click', () => {
  currentSongIndex++;
  if (currentSongIndex >= songs.length) {
    currentSongIndex = 0; // Loop back to the first song if at the end
  }
  loadSong(currentSongIndex, true); // Pass true to autoplay
});

// Function to go to the previous song
prevButton.addEventListener('click', () => {
  currentSongIndex--;
  if (currentSongIndex < 0) {
    currentSongIndex = songs.length - 1; // Loop to the last song if at the beginning
  }
  loadSong(currentSongIndex, true); // Pass true to autoplay
});

// Load the initial song when the page loads (no autoplay)
loadSong(currentSongIndex);

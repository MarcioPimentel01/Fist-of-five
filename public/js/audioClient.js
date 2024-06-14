document.addEventListener('DOMContentLoaded', function() {
        const musicContainer = document.querySelector('.music-container');
        const playBtn = document.getElementById('play');
        const prevBtn = document.getElementById('prev');
        const nextBtn = document.getElementById('next');
    
        const audio = document.getElementById('audio');
        const progress = document.getElementById('progress');
        const progressContainer = document.getElementById('progress-container');
        const title = document.getElementById('title');
        const cover = document.getElementById('cover');
        const currTime = document.querySelector('#currTime');
        const durTime = document.querySelector('#durTime');
    
        // Song titles
        const songs = ['Lost in a maze', 'Day dreams'];
    
        // Keep track of song
        let songIndex = 0;
    
        // Load song details
        loadSong(songs[songIndex]);
    
        // Update song details
        function loadSong(song) {
            title.innerText = song;
            audio.src = `music/${song}.mp3?v=${new Date().getTime()}`;
        }
    
        // Play song
        function playSong() {
            musicContainer.classList.add('play');
            playBtn.querySelector('i.fas').classList.remove('fa-play');
            playBtn.querySelector('i.fas').classList.add('fa-pause');
    
            audio.play();
        }
    
        // Pause song
        function pauseSong() {
            musicContainer.classList.remove('play');
            playBtn.querySelector('i.fas').classList.add('fa-play');
            playBtn.querySelector('i.fas').classList.remove('fa-pause');
    
            audio.pause();
        }
    
        // Previous song
        function prevSong() {
            songIndex--;
    
            if (songIndex < 0) {
                songIndex = songs.length - 1;
            }
    
            loadSong(songs[songIndex]);
    
            playSong();
        }
    
        // Next song
        function nextSong() {
            songIndex++;
    
            if (songIndex > songs.length - 1) {
                songIndex = 0;
            }
    
            loadSong(songs[songIndex]);
    
            playSong();
        }
    
        // Update progress bar
        function updateProgress() {
            const { duration, currentTime } = audio;
            const progressPercent = (currentTime / duration) * 100;
            progress.style.width = `${progressPercent}%`;
        }
    
        // Set progress bar
        function setProgress(e) {
            const width = this.clientWidth;
            const clickX = e.offsetX;
            const duration = audio.duration;
    
            audio.currentTime = (clickX / width) * duration;
        }
    
        // Get duration & currentTime for Time of song
        function DurTime() {
            const { duration, currentTime } = audio;
            let min = Math.floor(currentTime / 60);
            let sec = Math.floor(currentTime % 60);
            let min_d = Math.floor(duration / 60);
            let sec_d = Math.floor(duration % 60);
    
            currTime.innerHTML = `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
            durTime.innerHTML = `${min_d < 10 ? '0' + min_d : min_d}:${sec_d < 10 ? '0' + sec_d : sec_d}`;
        }
    
        // Event listeners
        playBtn.addEventListener('click', () => {
            const isPlaying = musicContainer.classList.contains('play');
    
            if (isPlaying) {
                pauseSong();
            } else {
                playSong();
            }
        });
    
        // Change song
        prevBtn.addEventListener('click', prevSong);
        nextBtn.addEventListener('click', nextSong);
    
        // Time/song update
        audio.addEventListener('timeupdate', updateProgress);
    
        // Click on progress bar
        progressContainer.addEventListener('click', setProgress);
    
        // Song ends
        audio.addEventListener('ended', nextSong);
    
        // Time of song
        audio.addEventListener('timeupdate', DurTime);
    
    });
    module.exports = audioController;
    
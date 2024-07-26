document.getElementById('generate-lyrics').addEventListener('click', function() {
    const songName = document.getElementById('song-name').value;
    const artistName = document.getElementById('artist-name').value;
    if (songName) {
        if (artistName) {
            fetchLyrics(songName, artistName);
        } else {
            fetchArtists(songName);
        }
    } else {
        alert('Please enter a song name');
    }
});

async function fetchArtists(songName) {
    try {
        const response = await fetch(`https://api.lyrics.ovh/suggest/${songName}`);
        const data = await response.json();
        displayArtists(data.data);
    } catch (error) {
        console.error('Error fetching artists:', error);
        alert('Could not fetch artists. Please try again.');
    }
}

function displayArtists(artists) {
    const lyricsOutput = document.getElementById('lyrics-output');
    lyricsOutput.innerHTML = '<div id="artist-selection"><h3>Select the correct artist:</h3></div>';
    const artistSelection = document.getElementById('artist-selection');
    artists.forEach(artist => {
        const artistButton = document.createElement('button');
        artistButton.textContent = `${artist.artist.name} - ${artist.title}`;
        artistButton.addEventListener('click', () => fetchLyrics(artist.title, artist.artist.name));
        artistSelection.appendChild(artistButton);
    });
}

async function fetchLyrics(songName, artistName) {
    try {
        const response = await fetch(`https://api.lyrics.ovh/v1/${artistName}/${songName}`);
        const data = await response.json();
        displayLyrics(data.lyrics);
    } catch (error) {
        console.error('Error fetching lyrics:', error);
        alert('Could not fetch lyrics. Please try again.');
    }
}

function displayLyrics(lyrics) {
    const lyricsOutput = document.getElementById('lyrics-output');
    lyricsOutput.innerHTML = `<pre>${lyrics}</pre>`;
}

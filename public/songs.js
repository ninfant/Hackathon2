document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const playlistId = params.get("id");
  const playlistName = params.get("name");

  const playlistTitle = document.getElementById("playlistTitle");
  const songList = document.getElementById("songList");
  const songForm = document.getElementById("songForm");

  if (!playlistId) {
    alert("Missing playlist ID in URL");
    window.location.href = "index.html";
    return;
  }

  async function loadSongs() {
    const res = await fetch(`/api/playlists/${playlistId}/songs`);
    const songs = await res.json();

    songList.innerHTML = "";

    if (songs.length === 0) {
      songList.innerHTML = "<li> No songs yet in this playlist</li>";
    }

    songs.forEach((song) => {
      const li = document.createElement("li");
      // const myDivSong = document.createElement("div");
      li.classList.add("song-item");
      li.innerHTML = `
  <div class="song-info">
    <strong>"${song.title}"</strong> by ${song.artist || "Unknown"}<br />
    🎭 <strong>Mood:</strong> ${song.mood}<br />
    📝 ${song.note || "<em>(no note)</em>"}
  </div>
`;

      songList.appendChild(li);
    });
  }

  songForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newSong = {
      title: document.getElementById("title").value,
      artist: document.getElementById("artist").value,
      mood: document.getElementById("mood").value,
      note: document.getElementById("note").value,
      playlist_id: playlistId,
    };

    const res = await fetch("/api/song", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSong),
    });

    const data = await res.json();
    alert(data.message || "Song added!");
    songForm.reset();
    loadSongs();
  });

  playlistTitle.textContent = `Songs🎵 in Playlist "${playlistName}"`;
  loadSongs();
});

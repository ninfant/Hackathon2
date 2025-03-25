document.addEventListener("DOMContentLoaded", () => {
  const playlistList = document.getElementById("playlistList");
  const playlistForm = document.getElementById("playlistForm");

  // load all playlists
  async function loadPlaylists() {
    const res = await fetch("/api/playlists");
    const playlists = await res.json();

    playlistList.innerHTML = ""; // clear old

    playlists.forEach((playlist) => {
      const li = document.createElement("li");

      const span = document.createElement("span");
      span.textContent = playlist.name;

      // Boton eliminar
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "🗑 Delete";
      deleteBtn.classList = "mybutton";
      deleteBtn.onclick = () => deletePlaylist(playlist.id);

      // Boton songs
      const songsBtn = document.createElement("button");
      songsBtn.textContent = "Songs";
      songsBtn.onclick = () => {
        window.location.href = `songs.html?id=${
          playlist.id
        }&name=${encodeURIComponent(playlist.name)}`;
        // aqui uso encodeURIComponent porque playlist names could have spaces or special characters, we have to safely encode them for the URL
      };

      // Contenedor para los botones
      const buttonGroup = document.createElement("div");
      buttonGroup.classList.add("button-group");
      buttonGroup.appendChild(deleteBtn);
      buttonGroup.appendChild(songsBtn);

      li.appendChild(span);
      li.appendChild(buttonGroup);
      playlistList.appendChild(li);
    });
  }

  async function deletePlaylist(id) {
    const res = await fetch(`/api/playlist/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    alert(data.message || "Playlist deleted");
    loadPlaylists();
  }

  // Handle playlist creation
  playlistForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("playlistName").value;

    const res = await fetch("/api/playlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    const data = await res.json();
    alert(data.message || "Playlist created!");
    playlistForm.reset();
    loadPlaylists();
  });

  loadPlaylists();
});

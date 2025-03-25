import express from "express";
import {
  createNewSong,
  createPlaylist,
  getAllSongs,
  getAllPlaylist,
  deletePlayList,
  getSongsByPlaylistID,
  deleteSongsByID,
} from "../controllers/playlistControllers.js";

const router = express.Router();
router.get("/songs", getAllSongs);
router.post("/song", createNewSong);
router.delete("/song/:id", deleteSongsByID);
router.get("/playlists/:id/songs", getSongsByPlaylistID);

router.get("/playlists", getAllPlaylist);
router.post("/playlist", createPlaylist);
router.delete("/playlist/:id", deletePlayList);


export default router;

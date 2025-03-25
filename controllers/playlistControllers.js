// import bcrypt from "bcrypt";
import db from "../config/db.js";
import * as playlistModel from "../models/playlists.js";
import * as songModel from "../models/songs.js";

export const createNewSong = async (req, res) => {
  const { title, artist, mood, note, playlist_id } = req.body;
  try {
    if (!title || !artist || !mood || !playlist_id) {
      return res.status(400).json({ message: "All the fields are required" });
    }
    const newSong = await songModel.createSong(
      title,
      artist,
      mood,
      note,
      playlist_id
    );
    res.status(200).json(newSong);
  } catch (error) {
    res.status(500).json({ message: "Error creating the song" });
  }
};

export const createPlaylist = async (req, res) => {
  const { name } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ message: " Field name is required" });
    }
    const newPlaylist = await playlistModel.createPlaylist(name);
    res
      .status(200)
      .json({ message: "Playlist created succesfully", newPlaylist });
  } catch (error) {
    res.status(500).json({ message: "Error creating the playlist" });
  }
};

export const getAllSongs = async (req, res) => {
  try {
    const allsongs = await songModel.getAllsongs();
    return res.status(200).json(allsongs);
  } catch (error) {
    res.status(500).json({ message: "Error getting all the songs" });
  }
};

export const getAllPlaylist = async (req, res) => {
  try {
    const allplaylist = await playlistModel.getAllplaylist();
    return res.status(200).json(allplaylist);
  } catch (error) {
    res.status(500).json({ message: "Error getting all the playlists" });
  }
};

export const deletePlayList = async (req, res) => {
  const { id } = req.params;

  try {
    const deletep = await playlistModel.deletePlaylist(id); //deletep me va a retornar el número de filas eliminadas
    if (deletep === 0) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    res.status(200).json({ message: "Playlist deleted successfully", deletep });
  } catch (error) {
    res.status(500).json({ message: "Error deliting the playlist" });
  }
};

export const getSongsByPlaylistID = async (req, res) => {
  const { id } = req.params;
  try {
    const songsByPlaylist = await songModel.getSongsByplaylistId(id);
    res.status(200).json(songsByPlaylist);
  } catch (error) {
    res.status(500).json({ message: "Error loading songs" });
  }
};

export const deleteSongsByID = async (req, res) => {
  const { id } = req.params;
  try {
    const deletebysongID = await songModel.deleteSongsByid(id);
    res.status(200).json({ message: "song deleted ", deletebysongID });
  } catch (error) {
    res.status(500).json({ message: "Error deleting the song" });
  }
};

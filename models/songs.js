import db from "../config/db.js";

export const createSong = async (title, artist, mood, note, playlist_id) => {
  return db("songs")
    .insert({ title, artist, mood, note, playlist_id })
    .returning(["title", "artist", "mood", "note", "playlist_id"]);
};

export const getAllsongs = async () => {
  return db("songs").select("*");
};

export const getSongsByplaylistId = async (id) => {
  return db("songs").where({ playlist_id: id });
};

export const deleteSongsByid = async (id) => {
  return db("songs").where({ id: id });
};

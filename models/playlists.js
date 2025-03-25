import db from "../config/db.js";

export const createPlaylist = async (name) => {
  return db("playlists").insert({ name }).returning(["id", "name"]);
};

export const getAllplaylist = async () => {
  return db("playlists").select("*");
};


export const deletePlaylist = async (id) => {
  return db("playlists").where({ id }).delete();
};




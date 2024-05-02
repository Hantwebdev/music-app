import mongoose from "mongoose";

const favoriteSongSchema = new mongoose.Schema({
	//userId: string,
	songId: String,
	deleted: {
		type: Boolean,
		default: false
	},
	deletedAt: Date,
}, {
	timestamps: true
});

const FavoriteSong = mongoose.model("Favorite", favoriteSongSchema, "favorite-songs");
export default FavoriteSong;
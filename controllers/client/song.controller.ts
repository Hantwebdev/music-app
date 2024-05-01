import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";

// [GET] /song/:slugTopic
export const list = async (req: Request, res: Response) => {
    const topic = await Topic.findOne({
        slug: req.params.slugTopic,
        deleted: false
    });

    const songs = await Song.find({
        topicId: topic.id,
        status: "active",
        deleted: false
    }).select("title avatar singerId like createAt slug");

    for (const song of songs) {
        const infoSinger = await Singer.findOne({
            _id: song.singerId,
            deleted: false
        }).select("fullName");

        song["infoSinger"] = infoSinger;
    }

    res.render("client/pages/songs/list", {
		pageTitle: topic.title,
        songs: songs
	});
}

// [GET] /song/detail/:slugSong
export const detail = async (req: Request, res: Response) => {
    const slugSong = req.params.slugSong;

    const song = await Song.findOne({
        slug: slugSong,
        status: "active",
        deleted: false
    });

    const singer = await Singer.findOne({
        _id: song.singerId,
        status: "active",
        deleted: false
    }).select("fullName");

    const topic = await Topic.findOne({
        _id: song.topicId,
        status: "active",
        deleted: false
    }).select("title");

    res.render("client/pages/songs/detail", {
		pageTitle: song.title,
        song: song,
        singer: singer,
        topic: topic
	});
}
import express from "express";
import requireBody from "#middleware/requireBody";
const router = express.Router();
export default router;

import {
    createStory,
    getStories,
    getStoryById,
    updateStory,
    deleteStory,
} from "#db/queries/stories";

import { requireUser } from "#middleware/requireUser";


router.route("/").get(async (req, res) => {
    const stories = await getStories();
    res.json(stories);
})
    .post(
        requireUser,
        async (req, res) => {
            const story = await createStory(req.body);

            res.status(201).json(story);
        }
    );

    router.param("id", async (req, res, next, id) => {
        const story = await getStoryById(id);
        if (!story) return res.status(404).send("That story does not exist.");

        req.story = story;
        next();
    });

    router.route("/:id").get((req, res) => {
        res.send(req.story)
    })
    .delete(requireUser, async (req, res) => {
        await deleteStory(req.story.id);
        res.sendStatus(204);
    })
    .put(requireUser, async (req, res) => {
        const story = await updateStory(req.story.id, fields);

        res.status(200).json(story);
    });
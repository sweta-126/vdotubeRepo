import express from "express";
import { addVideo, addView, deleteVideo, getByTag, getVideo, random, search, sub, trend, updateVideo } from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//create a vdo
router.post("/",verifyToken , addVideo)

//update a vdo
router.put("/:id",verifyToken , updateVideo)

//delete a vdo
router.delete("/:id",verifyToken , deleteVideo)

//get a vdo
router.get("/find/:id", getVideo)

//inc view of video
router.put("/view/:id", addView)

//get trend vdo
router.get("/trend", trend)

//get random vdo
router.get("/random", random)

//get subscribed channel vdo
router.get("/sub",verifyToken, sub)

//get vdo by tags
router.get("/tags", getByTag)

//get vdo by title
router.get("/search", search)


export default router;
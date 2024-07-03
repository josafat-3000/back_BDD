import { Router } from "express";
import {
    createEvent,
    updateEvent,
    deleteEvent,
    getEvent,
    getEvents
} from "../controllers/event.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";
import {eventSchema } from "../Schemas/event.schema.js";
import {validateSchema} from "../middlewares/validator.middleware.js";

const router = Router();

router.get("/event/:id",auth,getEvent);
router.get("/events", auth, getEvents)
router.post("/create",auth,validateSchema(eventSchema), createEvent);
router.delete("/delete/id", auth, deleteEvent);
router.put("/update/id",auth, updateEvent);


export default router;
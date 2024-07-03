import Event from "../models/event.models.js";

export const createEvent = async (req, res) => {
    const {
        nombreVisita,
        asunto,
        empresa,
        vehiculo,
        placas,
        modelo,
        color,
        llegada,
        salida
    } = req.body;
    const newEvent = new Event({
        user: req.user.id,
        nombreVisita,
        asunto,
        empresa,
        vehiculo,
        placas,
        modelo,
        color,
        llegada,
        salida
    });
    try {
        const savedEvent = await newEvent.save();
        res.json(savedEvent);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error creating event" });
    }
}

export const updateEvent = async (req, res) => {
    const { id } = req.params;
    const {
        nombreVisita,
        asunto,
        empresa,
        vehiculo,
        placas,
        modelo,
        color,
        llegada,
        salida
    } = req.body;
    try {
        const updatedEvent = await Event.findByIdAndUpdate(id, {
            nombreVisita,
            asunto,
            empresa,
            vehiculo,
            placas,
            modelo,
            color,
            llegada,
            salida
        }, { new: true });
        res.json(updatedEvent);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error updating event" });
    }
}

export const deleteEvent = async (req, res) => {
    const { id } = req.params;
    try {
        await Event.findByIdAndDelete(id);
        res.json({ message: "Event deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error deleting event" });
    }
}

export const getEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.json(event);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error fetching event" });
    }
}

export const getEvents = async (req, res) => {
    try {
        const events = await Event.find({
            user: req.user.id
        }).populate('user');
        res.json(events);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error fetching events" });
    }
}

const express = require("express");
const cors = require("cors");
const PORT = require("./config.js");
const db =  require('../models'); 
const morgan = require("morgan");


const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));
// Routers
const postRouter = require("./routes/practices.js");
app.use("/api/practices", postRouter);

const usersRouter = require("./routes/auth.js");
app.use("/api/auth", usersRouter);

const schoolRouter = require("./routes/school.js");
app.use("/api/schools",schoolRouter )

const rolRouter = require("./routes/rol.js");
app.use("/api/roles", rolRouter )


db.sequelize.sync().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is listening on port ${PORT}`);
    });
});

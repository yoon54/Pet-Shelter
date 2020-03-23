const express = require("express");
const port = 8000;
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const db_name = "petsdb";

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());

require("./config/mongoose")(db_name);

require("./routes/pet.routes")(app);

app.get("/test", (req,res) => res.json({mesg: "its working!"}));

app.listen(port, () => console.log(`listening on port${port}`));
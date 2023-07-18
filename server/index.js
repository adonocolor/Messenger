const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Chat is this real?')
});

const port = process.env.PORT || 3005;
app.listen(port, (req, res) => {
    console.log(`Server running on port: ${port}`);
});
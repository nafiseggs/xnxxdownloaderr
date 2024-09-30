const { createCanvas, registerFont, loadImage, Image } = require("canvas");
const express =  require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello World!'));

app.get("/test", async(req, res) => {
    let cls = req.query.class;
    const date = req.query.date;
    const subject = req.query.subject;
    const teacher = req.query.teacher;
    const cw = req.query.cw;
    const hw = req.query.hw;
    const remark = req.query.remarks;
    
    const width = 2480;
    const height = 3508;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    let bg = await loadImage("bg2.png");
    ctx.drawImage(bg, 0, 0, width, height);
    
    ctx.font = "61px Arial";
    ctx.fillStyle = "#000000";
    
    ctx.fillText(cls, 448, 736);
    ctx.fillText(subject, 498, 867);
    ctx.fillText(teacher, 691, 994);
    ctx.fillText(cw, 264, 1220);
    ctx.fillText(hw, 264, 1628);
    ctx.fillText(remark, 264, 1860);
    ctx.textAlign = "center";
    
    // Parse the date and get the weekday name
    let [day, month, year] = date.split("-");
    let dayName = new Date(year, month - 1, day).toLocaleString('en-us', { weekday: 'long' });

    // Update the date text with the day name
    ctx.fillText(`Date: ${date} (${dayName})`, 1793, 736);
    
    const imgBuffer = canvas.toBuffer("image/png");

    fs.writeFileSync("test.png", imgBuffer);

    res.sendFile(path.join(__dirname, "test.png"));
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));

const express = require("express");
const path = require("path");
const fs = require("fs"); // добавляем для работы с файлами

const app = express();
const PORT = 3000;

// указываем правильный путь к статическим файлам
app.use(express.static(path.join(__dirname, "src")));
app.use(express.static(path.join(__dirname, 'image')));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "src", "index.html"));
});

app.listen(PORT, () => {
    console.log('сервер запущен: http://localhost:'+PORT);
});
app.listen(3000, "0.0.0.0", () => {
    console.log("Сервер запущен: http://0.0.0.0:3000");
});
app.post("/save_card", (req, res) => {
    const filePath = "users.json";
    const newCard = req.body;

    fs.readFile(filePath, (err, data) => {
        let users = err ? [] : JSON.parse(data);
        users.push(newCard);
        fs.writeFile(filePath, JSON.stringify(users, null, 2), () => res.sendStatus(200));
    });
});
process.on("SIGINT", function () {
    console.log("\n\ncервер завершает работу...");
    process.exit();
});
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// указываем правильный путь к статическим файлам
app.use(express.static(path.join(__dirname, "src")));
app.use(express.static(path.join(__dirname, 'image')));

// главная страница
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "src", "index.html"));
});

app.listen(PORT, () => {
    console.log('сервер запущен: http://localhost:'+PORT);
});


process.on("SIGINT", function () {
    console.log("\n\ncервер завершает работу...");
    process.exit();
});
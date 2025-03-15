const images = {};

// Импорт всех файлов из папки `images`
function importAll(r) {
    r.keys().forEach((key) => {
        const imageName = key.replace("./", "").replace(/\.[^/.]+$/, ""); // Убираем "./" и расширение
        images[imageName] = r(key);
    });
}

// Webpack автоматически импортирует все изображения
importAll(require.context("./", false, /\.(png|jpe?g|webp|svg)$/));

export default images;

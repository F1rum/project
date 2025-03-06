const { createApp } = Vue;

createApp({
    data() {
        return {
            // массив карт которые будут отображаться на странице
            cards: [
                { id: 1, name: 'Магнит', image: '/mag.png', bgColor: "white" },
                { id: 2, name: 'Перекрёсток', image: '/perek.png', bgColor: "green"},
                { id: 3, name: 'Пятёрочка', image: '/pyatyora.png', bgColor: "white" }
            ]
        };
    }
    // подключаем вью приложение к элементу с айди app
}).mount('#app');

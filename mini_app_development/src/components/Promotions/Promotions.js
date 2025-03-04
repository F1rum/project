import { useState } from "react";
import styles from "./Promotions.module.css";

// 🔹 Компонент карточки акции
const PromotionCard = ({ image, promotion, oldPrice, newPrice, addToCart }) => {
    return (
        <div className={styles.promotionCard}>
            <img src={image} alt={promotion} className={styles.promotionImage} />
            <h3>{promotion}</h3>
            <p>
                <span className={styles.oldPrice}>{oldPrice} ₽</span> → <span className={styles.newPrice}>{newPrice} ₽</span>
            </p>
            <button>Добавить в корзину</button>
        </div>
    );
};

// 🔹 Основной блок с акциями
export default function Promotions({ addToCart }) {
    const [promotions] = useState([
            {
                "store": "Пятёрочка",
                "image": "https://avatars.mds.yandex.net/i?id=e228843f49d03bc1751341bb10ba41b0f30bc3bb-10870276-images-thumbs&n=13",
                "promotion": "Яблоки Гала 1 кг",
                "oldPrice": 129.99,
                "newPrice": 89.99
            },
            {
                "store": "Пятёрочка",
                "image": "https://avatars.mds.yandex.net/i?id=de0e48c1ec0e529c4430e833de63b256d4141a04-4526654-images-thumbs&n=13",
                "promotion": "Молоко 1 л",
                "oldPrice": 89.99,
                "newPrice": 59.99
            },
            {
                "store": "Пятёрочка",
                "image": "https://avatars.mds.yandex.net/i?id=2fc980073ce6a352c2ba8650db881f5cfc14f0fc-5250036-images-thumbs&n=13",
                "promotion": "Бананы 1 кг",
                "oldPrice": 110.00,
                "newPrice": 85.00
            },
            {
                "store": "Пятёрочка",
                "image": "https://avatars.mds.yandex.net/i?id=76af9beafa40577a659a4aff9595e477_l-5299794-images-thumbs&n=13",
                "promotion": "Сыр Российский 200 г",
                "oldPrice": 150.00,
                "newPrice": 120.00
            },
            {
                "store": "Магнит",
                "image": "https://tvoydom.ru/upload/resize_cache_custom/c7a/62a/c7a62a7aa9f520db03f1c3d4ae45929e.jpg?date=1734589355",
                "promotion": "Хлеб Бородинский 500 г",
                "oldPrice": 49.99,
                "newPrice": 39.99
            },
            {
                "store": "Магнит",
                "image": "https://30.img.avito.st/image/1/1.CJiKmra4pHG8M2Z0ltpo85k7pnc0OyZ5_D6mczozrHs8.zbOYS0CnJdowNkNaZhg-J1JNrpeB_fT5LFaYw5yimWQ",
                "promotion": "Яйца куриные 10 шт",
                "oldPrice": 70.00,
                "newPrice": 60.00
            },
            {
                "store": "Магнит",
                "image": "https://avatars.mds.yandex.net/i?id=82a62061cbe09e6dbddf3c2fc5129868_l-6639666-images-thumbs&n=13",
                "promotion": "Сахар-песок 1 кг",
                "oldPrice": 55.00,
                "newPrice": 45.00
            },
            {
                "store": "Магнит",
                "image": "https://avatars.mds.yandex.net/get-mpic/1605421/img_id5651076485571227871.jpeg/orig",
                "promotion": "Рис круглозерный 900 г",
                "oldPrice": 80.00,
                "newPrice": 65.00
            },
            {
                "store": "Лента",
                "image": "https://avatars.mds.yandex.net/i?id=8b06012c526a7d1131f6037dafebec2a_l-4055743-images-thumbs&n=13",
                "promotion": "Апельсины 1 кг",
                "oldPrice": 199.99,
                "newPrice": 149.99
            },
            {
                "store": "Лента",
                "image": "https://avatars.mds.yandex.net/i?id=e4a39fb422b3093b806d9b50bba7da2f_l-5234834-images-thumbs&n=13",
                "promotion": "Куриное филе 1 кг",
                "oldPrice": 300.00,
                "newPrice": 250.00
            },
            {
                "store": "Лента",
                "image": "https://avatars.mds.yandex.net/i?id=e07823ea4ecbdc2ba1b180accc3867af_l-5279811-images-thumbs&n=13",
                "promotion": "Помидоры 1 кг",
                "oldPrice": 120.00,
                "newPrice": 90.00
            },
            {
                "store": "Лента",
                "image": "https://avatars.mds.yandex.net/i?id=d3551745b33a8aa6a4c059a44c09769b_l-8961207-images-thumbs&n=13",
                "promotion": "Картофель 1 кг",
                "oldPrice": 50.00,
                "newPrice": 35.00
            }        
    ]);

    // 🔹 Группируем акции по магазинам
    const groupedPromotions = promotions.reduce((acc, promo) => {
        if (!acc[promo.store]) acc[promo.store] = []; // Если магазина ещё нет, создаём массив
        acc[promo.store].push(promo); // Добавляем акцию в нужный магазин
        return acc;
    }, {});

    return (
        <div className={styles.promotionsPage}>
            {Object.entries(groupedPromotions).map(([store, promotions]) => (
                <div key={store} className={styles.storeBlock}>
                    <h1>{store}</h1>
                    <div className={styles.promotionContainer}>
                        {promotions.map((promo, index) => (
                            <PromotionCard
                                key={index}
                                image={promo.image}
                                promotion={promo.promotion}
                                oldPrice={promo.oldPrice}
                                newPrice={promo.newPrice}
                                addToCart={addToCart}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

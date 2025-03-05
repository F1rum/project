import { useState } from "react";
import styles from "./Products.module.css";

// 🔹 Компонент карточки продукта
const ProductCard = ({ image, product, price }) => {
    return (
        <div className={styles.productCard}>
            <img src={image} alt={product} className={styles.productImage} loading="lazy" />
            <h3>{product}</h3>
            <p className={styles.price}>{price} ₽</p>
            <button>Добавить в корзину</button>
        </div>
    );
};

// 🔹 Имитация данных бэкенда
export default function Products() {
    const [products] = useState([
        {
            "store": "Пятёрочка",
            "image": "https://avatars.mds.yandex.net/i?id=e228843f49d03bc1751341bb10ba41b0f30bc3bb-10870276-images-thumbs&n=13",
            "product": "Яблоки Гала 1 кг",
            "price": 89.99
        },
        {
            "store": "Пятёрочка",
            "image": "https://avatars.mds.yandex.net/i?id=de0e48c1ec0e529c4430e833de63b256d4141a04-4526654-images-thumbs&n=13",
            "product": "Молоко 1 л",
            "price": 59.99
        },
        {
            "store": "Пятёрочка",
            "image": "https://avatars.mds.yandex.net/i?id=2fc980073ce6a352c2ba8650db881f5cfc14f0fc-5250036-images-thumbs&n=13",
            "product": "Бананы 1 кг",
            "price": 85.00
        },
        {
            "store": "Пятёрочка",
            "image": "https://avatars.mds.yandex.net/i?id=76af9beafa40577a659a4aff9595e477_l-5299794-images-thumbs&n=13",
            "product": "Сыр Российский 200 г",
            "price": 120.00
        },
        {
            "store": "Магнит",
            "image": "https://tvoydom.ru/upload/resize_cache_custom/c7a/62a/c7a62a7aa9f520db03f1c3d4ae45929e.jpg?date=1734589355",
            "product": "Хлеб Бородинский 500 г",
            "price": 39.99
        },
        {
            "store": "Магнит",
            "image": "https://30.img.avito.st/image/1/1.CJiKmra4pHG8M2Z0ltpo85k7pnc0OyZ5_D6mczozrHs8.zbOYS0CnJdowNkNaZhg-J1JNrpeB_fT5LFaYw5yimWQ",
            "product": "Яйца куриные 10 шт",
            "price": 60.00
        },
        {
            "store": "Магнит",
            "image": "https://avatars.mds.yandex.net/i?id=82a62061cbe09e6dbddf3c2fc5129868_l-6639666-images-thumbs&n=13",
            "product": "Сахар-песок 1 кг",
            "price": 45.00
        },
        {
            "store": "Магнит",
            "image": "https://avatars.mds.yandex.net/get-mpic/1605421/img_id5651076485571227871.jpeg/orig",
            "product": "Рис круглозерный 900 г",
            "price": 65.00
        },
        {
            "store": "Лента",
            "image": "https://avatars.mds.yandex.net/i?id=8b06012c526a7d1131f6037dafebec2a_l-4055743-images-thumbs&n=13",
            "product": "Апельсины 1 кг",
            "price": 149.99
        },
        {
            "store": "Лента",
            "image": "https://avatars.mds.yandex.net/i?id=e4a39fb422b3093b806d9b50bba7da2f_l-5234834-images-thumbs&n=13",
            "product": "Куриное филе 1 кг",
            "price": 250.00
        },
        {
            "store": "Лента",
            "image": "https://avatars.mds.yandex.net/i?id=e07823ea4ecbdc2ba1b180accc3867af_l-5279811-images-thumbs&n=13",
            "product": "Помидоры 1 кг",
            "price": 90.00
        },
        {
            "store": "Лента",
            "image": "https://avatars.mds.yandex.net/i?id=d3551745b33a8aa6a4c059a44c09769b_l-8961207-images-thumbs&n=13",
            "product": "Картофель 1 кг",
            "price": 35.00
        }    
    ]);

    // 🔹 Группируем товары по магазинам
    const groupedProducts = products.reduce((acc, product) => {
        if (!acc[product.store]) acc[product.store] = [];
        acc[product.store].push(product);
        return acc;
    }, {});

    return (
        <div className={styles.productsPage}>
            {Object.entries(groupedProducts).map(([store, items]) => (
                <div key={store} className={styles.storeBlock}>
                    <h1>{store}</h1>
                    <div className={styles.productContainer}>
                        {items.map((item, index) => (
                            <ProductCard
                                key={index}
                                image={item.image}
                                product={item.product}
                                price={item.price}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

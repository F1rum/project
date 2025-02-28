import { useState } from 'react';
import styles from "./PromotionsPage.module.css";

export default function PromotionsPage() {
    const [items, setItems] = useState([]);

    // Функция сортировки по количеству акций
    const sortByAmount = () => {
        const sortedItems = [...items].sort((a, b) => b.amount - a.amount);
        setItems(sortedItems);
    };

    // Фильтр "Горячие предложения" (условно всё, что >15)
    const filterHotDeals = () => {
        const hotDeals = items.filter(item => item.amount > 15);
        setItems(hotDeals);
    };

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text)
            .then(() => console.log("Текст скопирован:", text))
            .catch(err => console.error("Ошибка копирования", err));
    }

    return (
        <div className={styles.promotionsPage}>
            <div className={styles.promotionsCount}>
                <h5>Доступно акций:</h5> 
                <h1>{items.length}</h1> 
            </div>

            {/* Фильтры */}
            <div className={styles.filtersWrapper}>
                <div className={styles.filters}>
                    <button onClick={sortByAmount}>
                        <span>🔽</span> 
                        По количеству
                    </button>
                    <button onClick={filterHotDeals}>
                        <span>🔥</span> 
                        Горячие
                    </button>
                    <button onClick={sortByAmount}>
                        <span>🔽</span> 
                        По количеству
                    </button>
                    <button onClick={filterHotDeals}>
                        <span>🔥</span> 
                        Горячие
                    </button>
                    <button onClick={sortByAmount}>
                        <span>🔽</span> 
                        По количеству
                    </button>
                    <button onClick={filterHotDeals}>
                        <span>🔥</span> 
                        Горячие
                    </button>
                </div>
            </div>

            {/* Список акций */}
            <div className={styles.promotionsList}>
                <h1>Список акций:</h1>
                <div className={styles.stylesForTest}>
                    <h1>Пятёрочка</h1>
                    <h5>Текущие акции:</h5>
                    <div>
                        <button onClick={() => copyToClipboard("#SALE10")}>
                            #SALE10
                            <h4>До 5 марта</h4>
                        </button>
                        <button onClick={() => copyToClipboard("#SALE20")}>
                            #SALE20
                            <h4>До 15 марта</h4>
                        </button>
                    </div>
                </div>
                <p>Это не окончательная стилизация.</p>
            </div>
        </div>
    );
}

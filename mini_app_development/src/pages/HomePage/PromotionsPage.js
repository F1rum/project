import { useState } from "react";
import styles from "./PromotionsPage.module.css";
import Filters from "../../components/Promotions/Filters";
import Promotions from "../../components/Promotions/Promotions";

export default function PromotionsPage() {
    const [items, setItems] = useState([]);

    const sortByAmount = () => {
        const sortedItems = [...items].sort((a, b) => b.amount - a.amount);
        setItems(sortedItems);
    };

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
            <Filters sortByAmount={sortByAmount} filterHotDeals={filterHotDeals} />

            {/* Список акций */}
            <div className={styles.promotionsList}>
                <h1>Список акций:</h1>
                <Promotions copyToClipboard={copyToClipboard} />
                <p>Это не окончательная стилизация.</p>
            </div>
        </div>
    );
}

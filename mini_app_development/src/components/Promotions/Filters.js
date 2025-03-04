import styles from "./Filters.module.css";

// 🔹 Встроенный компонент кнопки фильтра
const FilterButton = ({ onClick, icon, text }) => {
    return (
        <button onClick={onClick}>
            <span>{icon}</span> {text}
        </button>
    );
};

// 🔹 Основной компонент списка фильтров
export default function Filters({ sortByAmount, filterHotDeals }) {
    return (
        <div className={styles.filtersWrapper}>
            <div className={styles.filters}>
                <FilterButton onClick={sortByAmount} icon="🔽" text="По количеству" />
                <FilterButton onClick={filterHotDeals} icon="🔥" text="Горячие" />
                <FilterButton onClick={sortByAmount} icon="🔽" text="По количеству" />
                <FilterButton onClick={filterHotDeals} icon="🔥" text="Горячие" />
            </div>
        </div>
    );
}

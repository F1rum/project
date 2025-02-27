import { Home, CreditCard, ShoppingCart } from "lucide-react";
import styles from "./BottomNavBar.module.css";
import { useTab } from "../../context/TabContext";

function BottomNavBar() {
    const { activeTab, setActiveTab } = useTab();

    return (
        <div className={styles.bottomNav}>
            <button onClick={() => setActiveTab("home")} className={activeTab === "home" ? styles.active : ""}>
                <Home size={28} />
            </button>
            <button onClick={() => setActiveTab("cards")} className={activeTab === "cards" ? styles.active : ""}>
                <CreditCard size={28} />
            </button>
            <button onClick={() => setActiveTab("cart")} className={activeTab === "cart" ? styles.active : ""}>
                <ShoppingCart size={28} />
            </button>
        </div>
    );
}

export default BottomNavBar;

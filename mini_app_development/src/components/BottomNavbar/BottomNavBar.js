import { Home, CreditCard, ShoppingCart } from "lucide-react";
import styles from "./BottomNavBar.module.css";

function BottomNavBar() {

    return (
        <div className={styles.bottomNav}>
            <button>
                <Home size={28} />
            </button>
            <button>
                <CreditCard size={28} />
            </button>
            <button>
                <ShoppingCart size={28} />
            </button>
        </div>
    );
}

export default BottomNavBar;

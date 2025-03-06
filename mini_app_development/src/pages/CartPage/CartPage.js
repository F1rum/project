import { useCart } from "../../context/CartContext";
import styles from "./CartPage.module.css";
import { useTab } from "../../context/TabContext";
import { ArrowLeft, Trash2 } from "lucide-react";

const EmptyCart = ({ setActiveTab }) => {
    return (
        <div className={styles.emptyCart}>
            <div className={styles.emptyCartText}>
                <h1>Корзина пуста</h1>
                <p>Перейдите на главную и добавьте продукты</p>
            </div>
            <button onClick={() => setActiveTab("home")}>На главную</button>
        </div>
    );
};


const CartItem = ({ image, product, price }) => {
    return (
        <div className={styles.cartItem}>
            <img src={image} alt={product} className={styles.cartImage} />
            <div>
                <h3>{product}</h3>
                <p>{price} ₽</p>
            </div>
        </div>
    );
};

export default function CartPage() {
    const { cart, clearCart } = useCart();
    const { setActiveTab } = useTab();

    return (
        <div className="scrollable">
            <div className={styles.cartPage}>
                <div className={styles.cartHeader}>
                    <button>
                        <ArrowLeft />
                    </button>
                    <h1>Корзина</h1>
                    <button onClick={clearCart}>
                        <Trash2 />
                    </button>
                </div>
                <div className={styles.cartContainer}>
                    {cart.length > 0 ? (
                        cart.map((item, index) => <CartItem key={index} {...item} />)
                    ) : (
                        <EmptyCart setActiveTab={setActiveTab} />
                    )}
                </div>
            </div>
        </div>
    );
}

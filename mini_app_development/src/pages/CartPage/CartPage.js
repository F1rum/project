import { useCart } from "../../context/CartContext";
import styles from "./CartPage.module.css";
import { ArrowLeft } from "lucide-react";
import { Trash2 } from "lucide-react";


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
                <div>
                    {cart.length > 0 ? (
                        cart.map((item, index) => <CartItem key={index} {...item} />)
                    ) : (
                        <p className={styles.emptyCart}>Корзина пуста</p>
                    )}
                </div>
            </div>
        </div>
    );
}

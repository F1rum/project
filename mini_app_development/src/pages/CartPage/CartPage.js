import { useCart } from "../../context/CartContext";
import styles from "./CartPage.module.css";
import { useTab } from "../../context/TabContext";
import { ArrowLeft, Trash2 } from "lucide-react";

// Компонент пустой корзины
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

// Компонент товара в корзине
const CartItem = ({ id, image, product, price, quantity, increaseQuantity, decreaseQuantity, removeFromCart }) => {
    return (
        <div className={styles.cartItem}>
            <img src={image} alt={product} className={styles.cartImage} />
            <div className={styles.cartInfo}>
                <h3>{product}</h3>
                <p>{price} ₽</p>
            </div>
            <div className={styles.quantityControl}>
                <button onClick={() => decreaseQuantity(id)} disabled={quantity <= 1}>-</button>
                <span>{quantity}</span>
                <button onClick={() => increaseQuantity(id)}>+</button>
            </div>
            <button className={styles.removeButton} onClick={() => removeFromCart(product)}>
                <Trash2 />
            </button>
        </div>
    );
};

// Главный компонент страницы корзины
export default function CartPage() {
    const { cart, clearCart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
    const { setActiveTab } = useTab();

    return (
        <div className="scrollable">
            <div className={styles.cartPage}>
                <div className={styles.cartHeader}>
                    <button onClick={() => setActiveTab("home")}>
                        <ArrowLeft />
                    </button>
                    <h1>Корзина</h1>
                    <button onClick={clearCart}>
                        <Trash2 />
                    </button>
                </div>
                <div className={styles.cartContainer}>
                    {cart.length > 0 ? (
                        cart.map((item) => (
                            <CartItem 
                                key={item.id} 
                                {...item} 
                                increaseQuantity={increaseQuantity}
                                decreaseQuantity={decreaseQuantity}
                                removeFromCart={removeFromCart}
                            />
                        ))
                    ) : (
                        <EmptyCart setActiveTab={setActiveTab} />
                    )}
                </div>
            </div>
        </div>
    );
}

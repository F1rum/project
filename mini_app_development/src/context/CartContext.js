import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    // Загружаем корзину из localStorage при первом рендере
    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    // Обновляем localStorage при изменении корзины
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Функция добавления товара в корзину
    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    // Очистка корзины
    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

// Хук для использования контекста корзины
export function useCart() {
    return useContext(CartContext);
}

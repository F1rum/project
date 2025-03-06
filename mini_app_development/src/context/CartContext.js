import { createContext, useContext, useState } from "react";

// Создаём контекст
const CartContext = createContext();

// Хук для доступа к контексту
export const useCart = () => useContext(CartContext);

// Провайдер корзины
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Добавить товар в корзину
    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    // Очистить корзину
    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

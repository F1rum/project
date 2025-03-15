import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    // Загружаем корзину из localStorage при загрузке
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    // Сохраняем корзину в localStorage при каждом изменении
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Добавить товар в корзину
    const addToCart = (newItem) => {
        setCart((prevCart) => {
            // Проверяем, есть ли товар с таким же названием
            const existingItem = prevCart.find((item) => item.product === newItem.product);
    
            if (existingItem) {
                // Если товар уже есть, увеличиваем его количество
                return prevCart.map((item) =>
                    item.product === newItem.product ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                // Если товара нет, добавляем новый
                return [...prevCart, { ...newItem, quantity: 1 }];
            }
        });
    };
    
    
    

    // Увеличить количество товара
    const increaseQuantity = (productName) => {
        setCart((prevCart) => 
            prevCart.map((item) =>
                item.product === productName ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };
    

    // Уменьшить количество товара (не меньше 1)
    const decreaseQuantity = (productName) => {
        setCart((prevCart) => 
            prevCart.map((item) =>
                item.product === productName && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };
    

    // Удалить товар из корзины
    const removeFromCart = (productName) => {
        setCart((prevCart) => prevCart.filter((item) => item.product !== productName));
    };
    

    // Очистить корзину полностью
    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider
            value={{ cart, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}

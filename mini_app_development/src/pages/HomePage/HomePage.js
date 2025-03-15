import { Settings } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import PromotionsPage from "./PromotionsPage";
import ProductsPage from "./ProductsPage";

export default function HomePage() {
    const [user, setUser] = useState(null);
    const [activeCategory, setActiveCategory] = useState("Акции");

    useEffect(() => {
        if (window.Telegram && window.Telegram.WebApp) {
            const userData = window.Telegram.WebApp.initDataUnsafe.user;
            setUser(userData);
            console.log("Данные пользователя:", userData);
        }
    }, []);

    return (
        // Вся страница прокручивается
        <div className="scrollable"> 
            <div className={styles.navBarHomePage}>
                <button
                    className={styles.avatarWrapper}
                    onClick={() => console.log("Открыть профиль")}
                >
                    {user?.photo_url ? (
                        <img src={user.photo_url} alt="Аватар" className={styles.avatar} loading="lazy"/>
                    ) : (
                        <div className={styles.avatarFallback}></div>
                    )}
                </button>

                <div className={styles.navBarMenu}>
                    <div
                        className={styles.activeHighlight}
                        style={{
                            transform: `translate3d(${activeCategory === "Акции" ? "0%" : "100%"}, 0, 0)`,  //Отрисовка анимации на GPU
                        }}
                    />
                    <button onClick={() => setActiveCategory("Акции")}>Акции</button>
                    <button onClick={() => setActiveCategory("Продукты")}>Продукты</button>
                </div>

                <button>
                    <Settings size="28" />
                </button>
            </div>

            <div className={styles.pageContent}>
                {activeCategory === "Акции" ? <PromotionsPage  /> : <ProductsPage />}
            </div>
        </div>
    );
}

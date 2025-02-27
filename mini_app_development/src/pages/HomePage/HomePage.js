import { Settings } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import defaultAvatar from "./Кошка.jpg";
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
        <>
            <div className={styles.navBarHomePage}>
                <div className={styles.avatarWrapper}>
                    <img
                        src={user?.photo_url || defaultAvatar}
                        alt="Аватар"
                        className={styles.avatar}
                        onError={(e) => (e.target.style.display = "none")}
                    />
                </div>

                <div className={styles.navBarMenu}>
                    {/* Изменено: Используем `left` */}
                    <div
                        className={styles.activeHighlight}
                        style={{
                            left: activeCategory === "Акции" ? "0%" : "50%",
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
                {activeCategory === "Акции" ? <PromotionsPage /> : <ProductsPage />}
            </div>
        </>
    );
}

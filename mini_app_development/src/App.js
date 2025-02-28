import { useEffect } from "react";
import { TabProvider } from "./context/TabContext";
import BottomNavBar from "./components/BottomNavBar/BottomNavBar";
import HomePage from "./pages/HomePage/HomePage";
import CardsPage from "./pages/CardsPage/CardsPage";
import CartPage from "./pages/CartPage/CartPage";
import { useTab } from "./context/TabContext";

function AppContent() {
    const { activeTab } = useTab();

    //Отключение сворачивания приложения при свайпе вниз
    useEffect(() => {
        if (window.Telegram?.WebApp) {
            window.Telegram.WebApp.ready();
            window.Telegram.WebApp.expand();
            window.Telegram.WebApp.setHeaderColor("#000000"); //чёрный цвет заголовка
            window.Telegram.WebApp.disableVerticalSwipes();
        }
    }, []);

    return (
        <div>
            {activeTab === "home" && <HomePage />}
            {activeTab === "cards" && <CardsPage />}
            {activeTab === "cart" && <CartPage />}
            <BottomNavBar />
        </div>
    );
}

function App() {
    return (
        <TabProvider>
            <AppContent />
        </TabProvider>
    );
}

export default App;

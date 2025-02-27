import { TabProvider } from "./context/TabContext";
import BottomNavBar from "./components/BottomNavBar/BottomNavBar";
import HomePage from "./pages/HomePage/HomePage";
import CardsPage from "./pages/CardsPage/CardsPage";
import CartPage from "./pages/CartPage/CartPage";
import { useTab } from "./context/TabContext";

function AppContent() {
    const { activeTab } = useTab();

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

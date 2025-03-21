import { useEffect } from "react";
import { useIsFetching } from "@tanstack/react-query";
import { Header } from "@/layout/Header";
import { Footer } from "@/layout/Footer";
import { ProductList } from "@/components/product/ProductList";
import { useThemeStore } from "@/store/useThemeStore";

/**
 * Main App component
 * @returns {React.ReactElement} App component
 */
function App() {
    const isFetching = useIsFetching();
    const { mode } = useThemeStore();

    // Apply theme class when component mounts and when theme changes
    useEffect(() => {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(mode);
    }, [mode]);

    return (
        <div className="min-h-svh flex flex-col">
            <Header />
            {isFetching > 0 && (
                <div className="fixed top-0 left-0 right-0 h-1 z-50">
                    <div className="h-full bg-primary animate-pulse"></div>
                </div>
            )}
            <main className="flex-grow py-8">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8">Ürünlerimiz</h2>
                    <ProductList />
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default App;

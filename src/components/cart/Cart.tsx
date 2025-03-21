import React from "react";
import { useCartStore } from "@/store/useCartStore";
import { CartItem } from "./CartItem";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { ShoppingBag, ShoppingCart, ArrowRight, Package, CreditCard, X } from "lucide-react";

/**
 * Component for shopping cart with slide-out panel
 * @returns {React.ReactElement} Cart component
 */
export const Cart: React.FC = () => {
    const { items, totalItems, totalPrice, isOpen, toggleCart, clearCart } = useCartStore();

    /**
     * Format price with currency symbol
     * @param {number} price - Price to format
     * @returns {string} Formatted price
     */
    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat("tr-TR", {
            style: "currency",
            currency: "TRY",
        }).format(price);
    };

    return (
        <Sheet open={isOpen} onOpenChange={toggleCart}>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                    <ShoppingBag className="h-5 w-5" />
                    {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {totalItems}
                        </span>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md flex flex-col p-0 border-l-neutral-200 shadow-xl">
                <SheetHeader className="px-6 py-5 border-b sticky top-0 bg-background z-10">
                    <div className="flex items-center justify-between">
                        <SheetTitle className="flex items-center text-xl">
                            <ShoppingCart className="mr-2 h-5 w-5" />
                            Sepetim{" "}
                            <span className="ml-2 text-sm font-normal text-muted-foreground">
                                ({totalItems} ürün)
                            </span>
                        </SheetTitle>
                        <SheetClose className="rounded-full p-2 hover:bg-muted">
                            <X className="h-5 w-5" />
                            <span className="sr-only">Sepeti kapat</span>
                        </SheetClose>
                    </div>
                </SheetHeader>

                <div className="flex-grow overflow-auto pt-2 pb-24">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8">
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                <ShoppingCart className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-lg font-medium">Sepetiniz boş</h3>
                            <p className="text-sm text-muted-foreground mt-2 max-w-[250px]">
                                Sepetinize ürün eklemek için alışverişe başlayın.
                            </p>
                            <Button className="mt-6" onClick={toggleCart}>
                                Alışverişe Devam Et <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    ) : (
                        <div className="divide-y">
                            {items.map((item) => (
                                <CartItem key={item.id} item={item} />
                            ))}
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="border-t sticky bottom-0 left-0 right-0 bg-background p-6 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                                <div className="text-sm text-muted-foreground flex items-center">
                                    <Package className="h-4 w-4 mr-1 opacity-70" /> Ara Toplam
                                </div>
                                <div className="text-sm text-right font-medium">
                                    {formatPrice(totalPrice)}
                                </div>

                                <div className="text-muted-foreground text-sm flex items-center">
                                    <CreditCard className="h-4 w-4 mr-1 opacity-70" /> Kargo
                                </div>
                                <div className="text-sm text-right font-medium text-green-600">
                                    Ücretsiz
                                </div>
                            </div>

                            <div className="flex justify-between font-medium text-lg pt-2 border-t">
                                <span>Toplam</span>
                                <span>{formatPrice(totalPrice)}</span>
                            </div>

                            <div className="space-y-2">
                                <Button className="w-full" size="lg">
                                    Siparişi Tamamla
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="w-full text-muted-foreground text-xs"
                                    onClick={clearCart}
                                >
                                    Sepeti Temizle
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
};

"use client";
import { useEffect, useState } from "react";
import { ProductProps } from "../types/types";
import ProductCard from "./ProductCard";

export default function Home() {
    const [products, setProducts] = useState<ProductProps[]>([]);
    const [deals, setDeals] = useState<ProductProps[]>([]);

    const Vegetables = products.filter((product) => product.category === "vegetables");
    const Fruits = products.filter((product) => product.category === "fruits");
    const Chicken = products.filter((product) => product.category === "chicken");

    useEffect(() => {
        fetch("/api/products")
            .then((res) => res.json())
            .then((data) => setProducts(data));

        fetch("/api/deals")
            .then((res) => res.json())
            .then((data) => setDeals(data));
    }, []);

    return (
        <div className="px-[18px] ">
            {/* Vegetables Section */}
            {Vegetables.length > 0 && (
                <div>
                    <h1 className="text-3xl font-bold mt-6">Vegetables</h1>
                    <div className="flex flex-wrap justify-start gap-4 w-full ">
                        {Vegetables.map((product, i) => (
                            <ProductCard key={i} {...product} />
                        ))}
                    </div>
                </div>
            )}

            {/* Deals Section */}
            {deals.length > 0 && (
                <div>
                    <h1 className="text-3xl font-bold mt-6">Vegetables Deals</h1>
                    <div className="flex flex-wrap justify-start gap-4 w-full">
                        {deals.map((product, i) => (
                            <ProductCard key={i} {...product} />
                        ))}
                    </div>
                </div>
            )}

            {/* Fruits Section */}
            {Fruits.length > 0 && (
                <div>
                    <h1 className="text-3xl font-bold mt-6">Fruits</h1>
                    <div className="flex flex-wrap justify-start gap-4 w-full">
                        {Fruits.map((product, i) => (
                            <ProductCard key={i} {...product} />
                        ))}
                    </div>
                </div>
            )}

            {/* Chicken Section */}
            {Chicken.length > 0 && (
                <div>
                    <h1 className="text-3xl font-bold mt-6">Chicken</h1>
                    <div className="flex flex-wrap justify-start gap-4 w-full">
                        {Chicken.map((product, i) => (
                            <ProductCard key={i} {...product} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

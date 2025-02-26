"use client"
import { useEffect, useState } from "react";
import { DealProps, ProductProps } from "../types/types";
import ProductCard from "./ProductCard";

export default function Home() {
    const [products, setProducts] = useState<ProductProps[]>([]);
    const [deals, setdeals] = useState<DealProps[]>([]);

    let Vegetables = products.filter((product) => product.category === "vegetables");

    let fruits = products.filter((product) => product.category === "fruits");

    let chicken = products.filter((product) => product.category === "chicken");


    useEffect(() => {
        let res = fetch("/api/products")
            .then((res) => res.json())
            .then((data) => setProducts(data));

        let deals = fetch("/api/deals").then((res) => res.json())
            .then(data => setdeals(data))

    }, []);

    return (

        <div className="">

            {
                Vegetables && (
                    <div>
                        <h1 className="text-3xl font-bold mt-6">Vegetables</h1>
                        <div className="hero-card-style">
                            {Vegetables.map((product, i) => (
                                <ProductCard key={i} {...product} />
                            ))}
                        </div>
                    </div>
                )

            }



            {deals && (
                <div>
                    <h1 className="text-3xl font-bold mt-6">Vegetables Deals</h1>
                    <div className="hero-card-style">
                        {deals.map((product, i) => (
                            <ProductCard key={i} {...product} />
                        ))}
                    </div>

                </div>
            )

            }

            {fruits && (
                <div>
                    <h1 className="text-3xl font-bold mt-6">Fruits</h1>
                    <div className="hero-card-style">
                        {fruits.map((product, i) => (
                            <ProductCard key={i} {...product} />
                        ))}
                    </div>

                </div>
            )

            }
            {chicken && (
                <div>
                    <h1 className="text-3xl font-bold mt-6">Chicken</h1>
                    <div className="hero-card-style">
                        {chicken.map((product, i) => (
                            <ProductCard key={i} {...product} />
                        ))}
                    </div>

                </div>
            )

            }




        </div>
    );
}

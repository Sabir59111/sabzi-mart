"use client";
import { useEffect, useState } from "react";
import { ProductProps } from "../types/types";
import ProductCard from "./ProductCard";

export default function Home() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const categories = [
    { id: "vegetables", name: "Vegetables", items: products.filter((p) => p.category === "vegetables") },
    { id: "deals", name: "Deals", items: products.filter((p) => p.category === "deals") },
    { id: "fruits", name: "Fruits", items: products.filter((p) => p.category === "fruits") },
    { id: "chicken", name: "Chicken", items: products.filter((p) => p.category === "chicken") },
  ];

  // Enable smooth scrolling when navigating using anchor links
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div className="px-6 sm:px-12 py-6">
      {categories.map(({ id, name, items }) =>
        items.length > 0 ? (
          <section key={id} id={id} className="pt-16">
            <h1 className="text-2xl sm:text-3xl font-bold mt-6">{name}</h1>
            <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
              {items.map((product, i) => (
                <ProductCard key={i} {...product} />
              ))}
            </div>
          </section>
        ) : null
      )}
    </div>
  );
}

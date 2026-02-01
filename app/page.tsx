"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import ProductCard from "@/components/productCard/productCard";
import Image from "next/image";
import loader from "@/public/loader.svg";

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  images: string[];
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products?limit=12&skip=0")
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch(() => alert("Error"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className={styles.page}>
        <Image src={loader} width={200} height={200} alt="loading" />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>Latest products</h1>
      <div className={styles.products}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            category={product.category}
            images={product.images}
          />
        ))}
      </div>
    </div>
  );
}

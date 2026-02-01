import Image from "next/image";
import styles from "./productCard.module.scss";
import { useAuthStore } from "@/stores/authStore";

interface ProductProps {
  title: string;
  price: number;
  category: string;
  images: string[];
}

export default function ProductCard({
  title,
  price,
  category,
  images,
}: ProductProps) {
  const { user } = useAuthStore();

  return (
    <div className={styles.container}>
      <Image
        src={images[0]}
        width="200"
        height="200"
        alt={`Image of ${title}`}
      />
      <p className={styles.title}>{title}</p>
      <p className={styles.category}>Category: {category}</p>
      <p>${price}</p>
      {user && <button className={styles.button}>Add to cart</button>}
    </div>
  );
}

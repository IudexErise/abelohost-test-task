"use client";

import { useAuthStore } from "@/stores/authStore";
import styles from "./footer.module.scss";

export default function Footer() {
  const year = new Date().getFullYear();
  const { user } = useAuthStore();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.date}>{year}</p>
        {user && (
          <p className={styles.email}>
            Logged as <span>{user?.email}</span>
          </p>
        )}
      </div>
    </footer>
  );
}

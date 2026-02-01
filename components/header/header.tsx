"use client";

import { useRouter } from "next/navigation";
import styles from "./header.module.scss";
import { useAuthStore } from "@/stores/authStore";
import axios from "axios";

export default function Header() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  async function handleLogout() {
    try {
      await axios.post("/api/logout");
      logout();
      router.push("/");
    } catch {
      alert("Logout failed");
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <p className={styles.headline} onClick={() => router.push("/")}>
          Abelohost shop
        </p>
        {user ? (
          <div className={styles.userBlock}>
            <p className={styles.text}>
              Welcome, {user.firstName} {user.lastName}
            </p>
            <button onClick={handleLogout} className={styles.button}>
              Log out
            </button>
          </div>
        ) : (
          <button
            onClick={() => router.push("/auth")}
            className={styles.button}
          >
            Log in
          </button>
        )}
      </div>
    </header>
  );
}

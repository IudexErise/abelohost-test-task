"use client";

import axios, { AxiosError } from "axios";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import loader from "@/public/loader.svg";
import Image from "next/image";

export default function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});
  const setUser = useAuthStore((state) => state.setUser);
  const isAuth = useAuthStore((state) => Boolean(state.user));
  const router = useRouter();

  function validate() {
    const newErrors: typeof errors = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    } else if (username.trim().length < 3) {
      newErrors.username = "Minimum 3 characters";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.trim().length < 3) {
      newErrors.password = "Minimum 3 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleAuth(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    try {
      const response = await axios.post("/api/login", {
        username,
        password,
      });
      setUser(response.data.user);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      alert(err.response?.data?.message ?? "Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isAuth) {
      router.replace("/");
    }
  }, [isAuth, router]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <form onSubmit={handleAuth} className={styles.form}>
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (errors.username) {
                setErrors((err) => ({ ...err, username: undefined }));
              }
            }}
            placeholder="Enter username"
            disabled={loading}
            className={styles.input}
          />
          {errors.username && <p className={styles.error}>{errors.username}</p>}

          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) {
                setErrors((err) => ({ ...err, password: undefined }));
              }
            }}
            placeholder="Enter password"
            type="password"
            disabled={loading}
            className={styles.input}
          />
          {errors.password && <p className={styles.error}>{errors.password}</p>}

          {loading ? (
            <Image
              src={loader}
              width={60}
              height={60}
              alt="Loading"
              className={styles.loader}
            />
          ) : (
            <button type="submit" disabled={loading} className={styles.button}>
              Log in
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

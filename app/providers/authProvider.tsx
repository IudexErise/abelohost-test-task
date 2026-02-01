"use client";

import { useEffect } from "react";
import React from "react";
import axios from "axios";
import { useAuthStore } from "@/stores/authStore";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    async function getUserData() {
      try {
        const res = await axios.get("/api/user");
        setUser(res.data.user);
      } catch {
        setUser(null);
      }
    }

    getUserData();
  }, [setUser]);

  return <>{children}</>;
}

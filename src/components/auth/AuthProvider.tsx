"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/store/useAuthStore";
import { useProjectStore } from "@/store/useProjectStore";
import { useSprintStore } from "@/store/useSprintStore";
import Cookies from "js-cookie";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
        });
        
        // Fetch projects & Sprints on login
        useProjectStore.getState().fetchProjects();
        useSprintStore.getState().fetchSprints();

        // Ensure cookie stays synced
        Cookies.set("auth", "true", { expires: 7 });
      } else {
        // User is signed out
        setUser(null);
        Cookies.remove("auth");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setLoading]);

  return <>{children}</>;
}

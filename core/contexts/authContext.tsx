import { app, auth } from "@/firebase";
import { AuthContextProps, UserType } from "@/types";
import React, { ReactNode, useEffect, useState } from "react";

export const AuthContext = React.createContext({} as AuthContextProps);

export const AuthProvider = (props: { children: ReactNode | ReactNode[] }) => {
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(auth.getAuth(app), (user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error("Missing information from Google account.");
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      } else {
        setUser(undefined);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function signInWithGoogle() {
    const provider = new auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(auth.getAuth(app), provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google account.");
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
};

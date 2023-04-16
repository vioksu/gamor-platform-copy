import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../hooks/useSupabase"

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

const signUp = (email: string, password: string) =>
  supabase.auth.signUp({ email, password });

const signIn = (email: string, password: string) =>
  supabase.auth.signInWithPassword({ email, password })

const signOut = () => supabase.auth.signOut()

const passwordReset = (email: string) =>
  supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'http://localhost:3000/update-password'
  })

const updatePassword = (updatedPassword: string) =>
  supabase.auth.updateUser({ password: updatedPassword })

export default function AuthProvider({ children }: any) {
  const [user, setUser] = useState(null)
  const [auth, setAuth] = useState(false)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      const { user: currentUser } = data;
      setUser(currentUser ?? null);
      setLoading(false);
    };
    getUser();

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY")
        setAuth(false)
      else if (event === "SIGNED_IN") {
        setUser(session.user)
        setAuth(true)
      }
      else if (event === "SIGNED_OUT") {
        setUser(null)
        setAuth(false)
      }
    });
    return () => {
      data.subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut, passwordReset, updatePassword }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

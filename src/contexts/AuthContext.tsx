import { createContext, useState, useEffect, useContext } from "react";
import type { ReactNode } from "react";
import { api } from "../services/api";

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  perfil?: number;
  Perfil?: number;
}

interface AuthContextType {
  usuario: Usuario | null;
  logado: boolean;
  login: (token: string, usuarioDados: Usuario) => void;
  logout: () => void;
  carregando: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    const usuarioSalvo = localStorage.getItem("@FatecEstagio:usuario");
    if (usuarioSalvo) {
      try {
        return JSON.parse(usuarioSalvo);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [carregando] = useState(false);

  useEffect(() => {
    const tokenSalvo = localStorage.getItem("@FatecEstagio:token");
    if (tokenSalvo) {
      api.defaults.headers.common["Authorization"] = `Bearer ${tokenSalvo}`;
    }
  }, []);

  function login(token: string, usuarioDados: Usuario) {
    localStorage.setItem("@FatecEstagio:token", token);
    localStorage.setItem("@FatecEstagio:usuario", JSON.stringify(usuarioDados));
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUsuario(usuarioDados);
  }

  function logout() {
    localStorage.removeItem("@FatecEstagio:token");
    localStorage.removeItem("@FatecEstagio:usuario");
    delete api.defaults.headers.common["Authorization"];
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, logado: !!usuario, login, logout, carregando }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

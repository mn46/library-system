import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  type SetStateAction,
} from "react";
import { getSession } from "~/lib/session";

interface Props {
  children: ReactNode;
}

const SessionContext = createContext<{
  user: number | null;
  loading: boolean;
  setUser: React.Dispatch<SetStateAction<number | null>>;
}>({
  user: null,
  loading: true,
  setUser: () => {},
});

export const SessionContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getSession().then((user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  return (
    <SessionContext.Provider value={{ user, loading, setUser }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);

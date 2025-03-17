import { useState, useEffect } from "react";
import { sleep } from "@/utils";

interface User {
  name: string;
  user_id: string;
  role: string;
}

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // We can get loading from thunk when calling api instead of create loading state

  useEffect(() => {
    const storedUser = localStorage.getItem("example");

    (async () => {
      await sleep(1000);
      if (storedUser) {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      }

      setLoading(false); // Set loading to false after fetching data
    })();
  }, []);

  return { user, isAuthenticated, loading };
};

export default useAuth;

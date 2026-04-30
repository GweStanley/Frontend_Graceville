import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function useAuth(requiredRole = null) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    // ROLE PROTECTION (optional but important)
    if (requiredRole && parsedUser.role !== requiredRole) {
      router.push("/login");
    }
  }, []);

  return user;
}
import { useEffect } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, useCurrentToken } from "@/redux/service/auth/authSlice";

interface DecodedToken extends JwtPayload {
  exp?: number;
}

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const token = useAppSelector(useCurrentToken);

  useEffect(() => {
    if (!token) {
      toast.error("Please log in to access this page.");
      router.push("/sign-in");
      return;
    }

    try {
      const decodedToken: DecodedToken = jwtDecode(token);
      if (!decodedToken.exp) {
        throw new Error("Invalid token: Missing expiration time.");
      }

      const tokenExpirationTime = decodedToken.exp * 1000;
      const currentTime = Date.now();

      if (tokenExpirationTime > currentTime) {
        const timeUntilExpiration = tokenExpirationTime - currentTime;

        const timer = setTimeout(() => {
          toast.error("Your session expired! Please log in again.");
          dispatch(logout());
          router.push("/sign-in");
        }, timeUntilExpiration);

        return () => clearTimeout(timer);
      } else {
        toast.error("Your session has already expired! Please log in again.");
        dispatch(logout());
        router.push("/sign-in");
      }
    } catch (error: any) {
      toast.error("Authentication error. Please log in again.");
      console.error("Error decoding token:", error);
      dispatch(logout());
      router.push("/sign-in");
    }
  }, [token, dispatch, router]);

  if (token) {
    try {
      const decodedToken: DecodedToken = jwtDecode(token);
      if (decodedToken.exp && decodedToken.exp * 1000 > Date.now()) {
        return children;
      }
    } catch {
      toast.error("Invalid session. Please log in again.");
      dispatch(logout());
      router.push("/sign-in");
    }
  }

  return <Link href="/sign-in"></Link>;
};

export default PrivateRoute;

import "../globals.css";
import ReduxProvider from "@/provider/ReduxProvider";
import PrivateRoute from "@/router/PrivateRoute";

const SecuredLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <ReduxProvider>
        <PrivateRoute>{children}</PrivateRoute>
      </ReduxProvider>
    </>
  );
};

export default SecuredLayout;

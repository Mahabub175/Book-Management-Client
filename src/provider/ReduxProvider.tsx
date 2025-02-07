"use client";

import { persistor, store } from "@/redux/store";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import "@ant-design/v5-patch-for-react-19";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AntdRegistry>{children}</AntdRegistry>
        <Toaster closeButton duration={2000} richColors position="top-center" />
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;

import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App.tsx";
// Hero Ui and style Provider
import { Provider } from "./provider.tsx";
import "@/styles/globals.css";
// React Query Client Configuration
import { queryClientConfig } from "./config/queryClient.config.ts";

const queryClient = new QueryClient(queryClientConfig);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Provider>
        <App />
      </Provider>
    </BrowserRouter>
  </QueryClientProvider>
);

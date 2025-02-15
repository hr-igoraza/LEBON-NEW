  import { StrictMode } from "react";
  import { createRoot } from "react-dom/client";
  import "./index.css";
  import App from "./App.jsx";
  import "bootstrap/dist/css/bootstrap.min.css";
  import "bootstrap/dist/js/bootstrap.bundle.min.js";
  // import "bootstrap/dist/js/bootstrap.bundle.min.js";
  import { BrowserRouter } from "react-router";
  import { CartProvider } from "./context/cartContext.jsx";
  import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

  const queryClient = new QueryClient();

  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <BrowserRouter>
        <CartProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </CartProvider>
      </BrowserRouter>
    </StrictMode>
  );

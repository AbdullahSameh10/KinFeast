import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./context/ThemeContext.tsx";
import LanguageProvider from "./context/LanguageContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { prefetchRecipeBySlug } from "./api/recipe-details.api";
import "./index.css";
import App from "./App.tsx";

// Start fetching recipe data before React initializes the route.
const recipeMatch = window.location.pathname.match(
  /^\/recipes\/([^/]+)\/?$/,
);

if (recipeMatch) {
  try {
    prefetchRecipeBySlug(
      decodeURIComponent(recipeMatch[1]),
    );
  } catch {
    // Invalid URL encoding: let the normal route handle the error.
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);

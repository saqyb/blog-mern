import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserProvider } from "./contexts/user.context";
import { BrowserRouter } from "react-router-dom";
import { BlogsProvider } from "./contexts/blogs.context";
import { CategoriesProvider } from "./contexts/categories.context";
import { AuthorsProvider } from "./contexts/authors.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <BlogsProvider>
        <CategoriesProvider>
          <AuthorsProvider>
            <UserProvider>
              <App />
            </UserProvider>
          </AuthorsProvider>
        </CategoriesProvider>
      </BlogsProvider>
    </BrowserRouter>
  </React.StrictMode>
);

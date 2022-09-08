import { useState } from "react";
import { createContext } from "react";
import Categories from "../categories.api";

export const CategoriesContext = createContext({
  categories: [],
  setCategories: () => null,
});

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([...Categories]);
  const value = { categories, setCategories };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

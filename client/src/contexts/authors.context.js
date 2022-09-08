import { useState } from "react";
import { createContext } from "react";

export const AuthorsContext = createContext({
  authors: [],
  setAuthors: () => null,
});

export const AuthorsProvider = ({ children }) => {
  const [authors, setAuthors] = useState([]);
  const value = { authors, setAuthors };
  return (
    <AuthorsContext.Provider value={value}>{children}</AuthorsContext.Provider>
  );
};

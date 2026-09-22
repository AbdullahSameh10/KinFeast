import { useContext } from "react";
import {
  LanguageContext,
  type LanguageContextValue,
} from "../context/LanguageContext";
export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside a LanguageProvider.");
  }
  return context;
}

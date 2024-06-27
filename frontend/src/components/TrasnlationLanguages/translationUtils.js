// src/components/translationUtils.js

import messages from "./Languagestranslation.json";
import { useLanguage } from "../../contexts/LanguageContext";

export const GetMessages = (tags) => {
  const { language } = useLanguage();
  return tags.map((tag) => messages[tag]?.[language] || tag);
};

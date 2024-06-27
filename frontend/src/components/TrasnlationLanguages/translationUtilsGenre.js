// src/components/translationUtils.js

import messages from "./LanguagestranslationGenre.json";
import { useLanguage } from "../../contexts/LanguageContext";

export const GetMessagesGenre = (genres) => {
  const { language } = useLanguage();
  return genres.map((genre) => messages[genre]?.[language] || genre);
};

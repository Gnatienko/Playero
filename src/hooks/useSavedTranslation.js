import { useEffect } from "react"
import Cookies from "js-cookie"

const useSavedTranslation = (
  setTranslationLanguage,
  setTranslationLanguageFrom
) => {
  useEffect(() => {
    const savedTranslationLanguage = Cookies.get("translationLanguage")
    const savedTranslationLanguageFrom = Cookies.get("translationLanguageFrom")

    if (savedTranslationLanguage) {
      setTranslationLanguage(savedTranslationLanguage)
    }

    if (savedTranslationLanguageFrom) {
      setTranslationLanguageFrom(savedTranslationLanguageFrom)
    }
  }, [setTranslationLanguage, setTranslationLanguageFrom])
}

export default useSavedTranslation

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SupportedLanguage,
  translateEnglishToHindi,
  translateHindiToEnglish
} from '../services/translationService';

interface LanguageContextType {
  language: SupportedLanguage;
  isHindi: boolean;
  setLanguage: (lang: SupportedLanguage) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string) => string;
  convertTextToHindi: (text: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'polar_portal_language';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>('en');

  // Read saved language preference
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as SupportedLanguage | null;
      if (saved === 'hi' || saved === 'en') {
        setLanguageState(saved);
      }
    } catch (e) {
      console.error('Could not read saved language', e);
    }
  }, []);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      console.error('Could not save language', e);
    }
  };

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'hi' : 'en';
    setLanguage(nextLang);
  };

  const t = (key: string, fallback?: string): string => {
    if (language === 'hi') {
      return translateEnglishToHindi(key) || fallback || key;
    }
    return fallback || key;
  };

  const convertTextToHindi = (text: string): string => {
    return translateEnglishToHindi(text);
  };

  // FULL APPLICATION DOM TRANSLATION ENGINE (User Request: full English <-> Hindi or vice versa)
  useEffect(() => {
    const isHindi = language === 'hi';

    const processNode = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const textNode = node as Text;
        const parent = textNode.parentElement;
        if (!parent) return;

        const tag = parent.tagName.toLowerCase();
        // Ignore scripts, stylesheets, text input controls, and elements marked data-no-translate
        if (
          tag === 'script' ||
          tag === 'style' ||
          tag === 'textarea' ||
          tag === 'input' ||
          tag === 'code' ||
          tag === 'pre'
        ) {
          return;
        }

        if (parent.closest('[data-no-translate]')) {
          return;
        }

        const raw = textNode.nodeValue || '';
        const trimmed = raw.trim();

        // Skip whitespace, numbers, or symbol-only strings
        if (!trimmed || /^[\d\s.,:;!?()[\]{}"'/%+°–—•#|@&<>=_/-]+$/.test(trimmed)) {
          return;
        }

        if (isHindi) {
          // Cache original English text on the node if not yet cached
          if ((textNode as any).__origText === undefined) {
            (textNode as any).__origText = raw;
          }
          const orig = (textNode as any).__origText;
          const translated = translateEnglishToHindi(orig);
          if (translated && translated !== raw) {
            textNode.nodeValue = translated;
          }
        } else {
          // Revert to original English text (wise warsa / vice versa)
          if ((textNode as any).__origText !== undefined) {
            textNode.nodeValue = (textNode as any).__origText;
          }
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        const tag = el.tagName.toLowerCase();
        if (
          tag === 'script' ||
          tag === 'style' ||
          tag === 'textarea' ||
          tag === 'input' ||
          tag === 'code' ||
          tag === 'pre'
        ) {
          return;
        }
        if (el.hasAttribute('data-no-translate')) {
          return;
        }

        let child = el.firstChild;
        while (child) {
          processNode(child);
          child = child.nextSibling;
        }
      }
    };

    // 1. Process entire document body immediately
    if (document.body) {
      processNode(document.body);
    }

    // 2. Watch for dynamic page transitions, tab switches, and dialog opens
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'childList') {
          m.addedNodes.forEach((added) => {
            processNode(added);
          });
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        isHindi: language === 'hi',
        setLanguage,
        toggleLanguage,
        t,
        convertTextToHindi
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

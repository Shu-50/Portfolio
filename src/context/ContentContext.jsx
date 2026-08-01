import React, { createContext, useContext, useState, useCallback } from "react";
import { fetchContent, getCachedContent } from "../lib/contentService";

const ContentContext = createContext(null);

export const ContentProvider = ({ children }) => {
  // Content is bundled (src/data/defaultContent.js) — no loading state needed.
  const [content, setContent] = useState(getCachedContent);

  const refresh = useCallback(async () => {
    const next = await fetchContent();
    setContent(next);
    return next;
  }, []);

  return (
    <ContentContext.Provider value={{ content, setContent, loading: false, refresh }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used inside <ContentProvider>");
  return ctx;
};

export default ContentContext;

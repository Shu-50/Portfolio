import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { fetchContent, getCachedContent } from "../lib/contentService";

const ContentContext = createContext(null);

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(getCachedContent);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const next = await fetchContent();
    setContent(next);
    setLoading(false);
    return next;
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <ContentContext.Provider value={{ content, setContent, loading, refresh }}>
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

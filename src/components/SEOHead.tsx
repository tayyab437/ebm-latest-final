import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { generateRouteStructuredData } from "../services/seo.schema";

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: string;
  customSchema?: Record<string, any>;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalUrl,
  ogType = "website",
  customSchema,
}) => {
  const location = useLocation();

  useEffect(() => {
    // Generate route-aware schema or use custom provided schema
    const structuredData =
      customSchema ||
      generateRouteStructuredData(location.pathname, {
        title,
        description,
        canonicalUrl,
      });

    // Derive resolved values from the schema or props
    const resolvedTitle =
      title ||
      (structuredData["@graph"]?.find((item: any) => item["@type"] === "WebPage" || item["@type"] === "AboutPage" || item["@type"] === "ContactPage" || item["@type"] === "CollectionPage")?.name) ||
      "EBM | Personalized Learning Platform for Grade 1 to O/A Levels";

    const resolvedDescription =
      description ||
      (structuredData["@graph"]?.find((item: any) => item["@type"] === "WebPage" || item["@type"] === "AboutPage" || item["@type"] === "ContactPage" || item["@type"] === "CollectionPage")?.description) ||
      "EBM is a personalized learning platform for students from Grade 1 to O/A Levels, combining structured learning, skill development, personalized guidance, and AI-enhanced educational tools.";

    const resolvedCanonical =
      canonicalUrl ||
      (structuredData["@graph"]?.find((item: any) => item["@type"] === "WebPage" || item["@type"] === "AboutPage" || item["@type"] === "ContactPage" || item["@type"] === "CollectionPage")?.url) ||
      (location.pathname === "/" ? "https://ejazbukharimethod.com/" : `https://ejazbukharimethod.com${location.pathname}`);

    // 1. Update Title
    document.title = resolvedTitle;

    // Helper to set or create meta tags
    const setMetaTag = (nameAttr: string, attrValue: string, contentValue: string) => {
      let element = document.querySelector(`meta[${nameAttr}="${attrValue}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(nameAttr, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", contentValue);
    };

    // Helper to remove meta tag if it exists
    const removeMetaTag = (nameAttr: string, attrValue: string) => {
      const element = document.querySelector(`meta[${nameAttr}="${attrValue}"]`);
      if (element) {
        element.remove();
      }
    };

    // Helper to set or create link tags
    const setLinkTag = (relValue: string, hrefValue: string) => {
      let element = document.querySelector(`link[rel="${relValue}"]`) as HTMLLinkElement | null;
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", relValue);
        document.head.appendChild(element);
      }
      element.setAttribute("href", hrefValue);
    };

    // Remove legacy meta keywords tag site-wide
    removeMetaTag("name", "keywords");

    // 2. Standard Meta Tags
    setMetaTag("name", "description", resolvedDescription);
    setMetaTag("name", "robots", "index, follow");

    // 3. OpenGraph Tags
    setMetaTag("property", "og:title", resolvedTitle);
    setMetaTag("property", "og:description", resolvedDescription);
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:url", resolvedCanonical);
    setMetaTag("property", "og:site_name", "Ejaz Bukhari Method (EBM)");

    // 4. Canonical Link
    setLinkTag("canonical", resolvedCanonical);

    // 5. Schema.org Structured Data
    let schemaScript = document.getElementById("ebm-structured-data") as HTMLScriptElement | null;
    if (!schemaScript) {
      schemaScript = document.createElement("script");
      schemaScript.id = "ebm-structured-data";
      schemaScript.type = "application/ld+json";
      document.head.appendChild(schemaScript);
    }

    schemaScript.textContent = JSON.stringify(structuredData);

  }, [title, description, canonicalUrl, ogType, customSchema, location.pathname]);

  return null;
};

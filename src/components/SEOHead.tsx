import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = "EBM | Personalized Learning Platform for Grade 1 to O/A Levels",
  description = "EBM is a personalized learning platform for students from Grade 1 to O/A Levels, combining structured learning, skill development, personalized guidance, and AI-enhanced educational tools.",
  canonicalUrl,
  ogType = "website",
}) => {
  const location = useLocation();
  const currentOrigin = typeof window !== "undefined" && window.location.origin && !window.location.origin.includes("run.app") && !window.location.origin.includes("localhost")
    ? window.location.origin
    : "https://ejazbukharimethod.com";
  const defaultCanonical = location.pathname === "/" ? `${currentOrigin}/` : `${currentOrigin}${location.pathname}`;
  const fullCanonical = canonicalUrl || defaultCanonical;

  useEffect(() => {
    // 1. Update Title
    document.title = title;

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

    // Remove legacy meta keywords tag
    removeMetaTag("name", "keywords");

    // 2. Standard Meta Tags
    setMetaTag("name", "description", description);
    setMetaTag("name", "robots", "index, follow");

    // 3. OpenGraph Tags
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:url", fullCanonical);
    setMetaTag("property", "og:site_name", "Ejaz Bukhari Method (EBM)");

    // 4. Canonical Link
    setLinkTag("canonical", fullCanonical);

    // 5. Schema.org Structured Data
    let schemaScript = document.getElementById("ebm-structured-data") as HTMLScriptElement | null;
    if (!schemaScript) {
      schemaScript = document.createElement("script");
      schemaScript.id = "ebm-structured-data";
      schemaScript.type = "application/ld+json";
      document.head.appendChild(schemaScript);
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: "Ejaz Bukhari Method (EBM)",
      url: fullCanonical,
      logo: `${currentOrigin}/favicon.ico`,
      description: description,
      sameAs: [
        "https://www.facebook.com/syedejazbukhari/",
        "https://www.instagram.com/syedejaz_bukhari/"
      ]
    };

    schemaScript.textContent = JSON.stringify(structuredData);

  }, [title, description, fullCanonical, ogType, location.pathname]);

  return null;
};

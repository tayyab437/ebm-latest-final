/**
 * Intelligent Image Optimization Utility
 * Provides responsive srcset, sizes, explicit dimensions, and format optimization
 * specifically tuned for WebP/AVIF delivery and Lighthouse Core Web Vitals compliance.
 */

export function optimizeUnsplashUrl(
  url: string | undefined | null,
  width: number = 760,
  quality: number = 75,
  fit: string = "crop"
): string {
  if (!url) return "";
  if (!url.includes("images.unsplash.com")) return url;

  try {
    const urlObj = new URL(url);
    urlObj.searchParams.set("w", width.toString());
    urlObj.searchParams.set("q", quality.toString());
    urlObj.searchParams.set("auto", "format");
    urlObj.searchParams.set("fit", fit);
    return urlObj.toString();
  } catch {
    const clean = url.split("?")[0];
    return `${clean}?q=${quality}&w=${width}&auto=format&fit=${fit}`;
  }
}

export interface ResponsiveImageAttrs {
  src: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
}

/**
 * Generates responsive srcset and sizes for hero / featured blog images
 * Aligned to standard viewports (mobile ~360-640px, desktop ~760-850px container).
 */
export function getFeaturedImageAttrs(
  url: string | undefined | null,
  options?: {
    displayWidth?: number;
    aspectRatioWidth?: number;
    aspectRatioHeight?: number;
    quality?: number;
  }
): ResponsiveImageAttrs {
  if (!url) return { src: "" };

  const quality = options?.quality || 75;
  const isUnsplash = url.includes("images.unsplash.com");

  if (!isUnsplash) {
    return {
      src: url,
      width: options?.aspectRatioWidth || 760,
      height: options?.aspectRatioHeight || 442,
    };
  }

  const widths = [380, 640, 760, 960, 1200];
  const srcSet = widths
    .map((w) => `${optimizeUnsplashUrl(url, w, quality)} ${w}w`)
    .join(", ");

  return {
    src: optimizeUnsplashUrl(url, 760, quality),
    srcSet,
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 720px, 760px",
    width: options?.aspectRatioWidth || 760,
    height: options?.aspectRatioHeight || 442,
  };
}

/**
 * Generates sharp, lightweight 1x and 2x retina avatar sources
 * Reduces 400x400 (9.9 KiB) down to targeted 80-160px (< 2 KiB), saving ~8.5 KiB.
 */
export function getAvatarImageAttrs(
  url: string | undefined | null,
  size: number = 80,
  quality: number = 75
): ResponsiveImageAttrs {
  if (!url) return { src: "", width: size, height: size };

  const isUnsplash = url.includes("images.unsplash.com");
  if (!isUnsplash) {
    return { src: url, width: size, height: size };
  }

  const src1x = optimizeUnsplashUrl(url, size, quality);
  const src2x = optimizeUnsplashUrl(url, size * 2, quality);

  return {
    src: src2x,
    srcSet: `${src1x} 1x, ${src2x} 2x`,
    width: size,
    height: size,
  };
}

/**
 * Generates responsive card thumbnail image attributes
 */
export function getCardThumbnailAttrs(
  url: string | undefined | null,
  widthOrOptions?: number | { width?: number; height?: number },
  explicitHeight?: number
): ResponsiveImageAttrs {
  if (!url) return { src: "" };

  const targetWidth =
    typeof widthOrOptions === "number"
      ? widthOrOptions
      : widthOrOptions?.width || 480;

  const targetHeight =
    typeof widthOrOptions === "number"
      ? explicitHeight || Math.round((widthOrOptions * 9) / 16)
      : widthOrOptions?.height || 270;

  const isUnsplash = url.includes("images.unsplash.com");
  if (!isUnsplash) {
    return {
      src: url,
      width: targetWidth,
      height: targetHeight,
    };
  }

  const widths = [280, 480, 640];
  const srcSet = widths
    .map((w) => `${optimizeUnsplashUrl(url, w, 75)} ${w}w`)
    .join(", ");

  return {
    src: optimizeUnsplashUrl(url, targetWidth, 75),
    srcSet,
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px",
    width: targetWidth,
    height: targetHeight,
  };
}

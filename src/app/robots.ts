import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	// Phase 1 contains unpublished skeletons. Revisit with production publishing.
	return { rules: { userAgent: "*", disallow: "/" } };
}

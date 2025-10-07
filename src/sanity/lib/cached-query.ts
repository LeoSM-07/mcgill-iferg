import { promises as fs } from "fs";
import path from "path";

const CACHE_DIR = path.join(process.cwd(), ".cache");

export async function getCachedQuery<T>(
	queryKey: string,
	queryFn: () => Promise<T>,
): Promise<T> {
	// --- Environment Check ---
	// If in development mode, bypass the cache and fetch fresh data.
	if (import.meta.env.PROD && process.env.NODE_ENV !== "development") {
		// --- Build-Time Caching Logic ---
		// The rest of this code only runs during 'astro build'.
		const filePath = path.join(CACHE_DIR, `${queryKey}.json`);

		try {
			const cachedData = await fs.readFile(filePath, "utf-8");
			console.log(`📦 Using cached data for: ${queryKey}`);
			return JSON.parse(cachedData);
		} catch (error) {
			console.log(`💾 Fetching and caching data for: ${queryKey}`);
			const newData = await queryFn();

			await fs.mkdir(CACHE_DIR, { recursive: true });
			await fs.writeFile(filePath, JSON.stringify(newData, null, 2));

			return newData;
		}
	} else {
		console.log(`🚀 Dev mode: Fetching fresh data for: ${queryKey}`);
		return await queryFn();
	}
}

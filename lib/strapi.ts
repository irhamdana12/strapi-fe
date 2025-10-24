const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

// Add a simple in-memory cache to prevent multiple calls
let globalCache: { navigation: NavigationItem[] } | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export type DropdownItem = {
  id: number;
  label: string;
  href: string;
  description?: string | null;
};

export type NavigationItem = {
  id: number;
  label: string;
  href?: string | null;
  startsWith?: boolean;
  order: number;
  dropdown?: DropdownItem[] | null;
};

export async function getGlobal() {
  // Check if we have valid cached data
  const now = Date.now();
  if (globalCache && (now - cacheTimestamp) < CACHE_DURATION) {
    console.log('Using cached global data');
    return globalCache;
  }

  console.log('Fetching fresh global data from Strapi');
  
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/global?populate[navigation][populate]=dropdown`,
      {
        next: { 
          revalidate: 300, // Cache for 5 minutes instead of 1 minute
          tags: ['global'] // Add cache tag for better invalidation
        },
        // Add headers to prevent caching issues
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status}`);
    }

    const data = await response.json();

    // Check if navigation exists
    if (!data?.data?.navigation) {
      console.error('No navigation data found');
      const fallbackData = { navigation: [] };
      globalCache = fallbackData;
      cacheTimestamp = now;
      return fallbackData;
    }

    // Transform and filter navigation
    const navigation: NavigationItem[] = data.data.navigation
      .filter((item: any) => item.label !== 'Logo') // Filter out Logo
      .map((item: any) => ({
        id: item.id,
        label: item.label,
        href: item.href === 'null' ? null : item.href, // Fix "null" string
        startsWith: item.startsWith || false,
        order: item.order || 0,
        dropdown: item.dropdown && item.dropdown.length > 0 
          ? item.dropdown.map((drop: any) => ({
              id: drop.id,
              label: drop.label,
              href: drop.href,
              description: drop.description,
            }))
          : null,
      }))
      .sort((a: NavigationItem, b: NavigationItem) => a.order - b.order); // Sort by order

    const result = { navigation };
    
    // Cache the result
    globalCache = result;
    cacheTimestamp = now;
    
    console.log('Successfully fetched and cached global data');
    return result;
  } catch (error) {
    console.error('Error fetching global data from Strapi:', error);
    const fallbackData = { navigation: [] };
    globalCache = fallbackData;
    cacheTimestamp = now;
    return fallbackData;
  }
}
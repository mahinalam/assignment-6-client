// lib/getPathname.ts
import { headers } from 'next/headers';

export const getPathname = () => {
  const headersList = headers();
  const url = headersList.get('x-url') || headersList.get('referer') || '';
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.pathname;
  } catch (err) {
    return '';
  }
};

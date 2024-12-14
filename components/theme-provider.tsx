'use client';

import dynamic from 'next/dynamic';
import * as React from 'react';

const NextThemesProvider = dynamic(() => import('next-themes').then((e) => e.ThemeProvider), {
  ssr: false,
});
type ThemeProviderProperties = React.ComponentProps<typeof NextThemesProvider>;
export function ThemeProvider({ children, ...properties }: ThemeProviderProperties) {
  return <NextThemesProvider {...properties}>{children}</NextThemesProvider>;
}

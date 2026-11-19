"use client";
// Client Component on purpose: during SSR it renders an executable script
// (runs while the HTML is parsed, before first paint); in the browser it
// renders type="text/plain", so React does not warn about rendering <script>.
// Pattern from node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md

export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

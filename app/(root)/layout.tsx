export default function RootRedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <noscript>
          <meta httpEquiv="refresh" content="0;url=/en/" />
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}

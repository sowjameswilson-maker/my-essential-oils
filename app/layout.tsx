import "./globals.css"; // The path must match your CSS file's location
// This wraps every page in the app
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Remove 'header' or 'nav' if you see it here */}
      <body className="w-full min-h-screen"> 
        <main className="w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
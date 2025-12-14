import './globals.css';

export const metadata = {
  title: 'NovaGPT',
  description: 'AI-powered Chat Application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

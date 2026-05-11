export const metadata = {
  title: "MedReview",
  description: "Plataforma de revisão inteligente",
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

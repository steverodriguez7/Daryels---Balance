import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Daryel Balance - Elimina Grasa Localizada Sin Cirugía',
  description: 'Reductivo liposensible que rompe grasa localizada, desinflama y moldea tu cuerpo sin cirugía, sin agujas y sin castigos. Resultados visibles desde las primeras sesiones.',
  keywords: ['spa', 'reductivo', 'cavitación', 'maderoterapia', 'eliminar grasa', 'moldear cuerpo', 'electroestimulación'],
  openGraph: {
    title: 'Daryel Balance - Elimina Grasa Localizada',
    description: 'Resultados reales desde las primeras sesiones. Valoración corporal GRATIS.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}

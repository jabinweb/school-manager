import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { schoolConfig } from "@/lib/config";
import { Toaster } from "sonner";

// Load fonts dynamically from config
const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins'
});

export const metadata = {
  title: `${schoolConfig.name} - School Management System`,
  description: schoolConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Enhanced theme injection for better dark mode */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const colors = ${JSON.stringify(schoolConfig.theme.colors)};
                
                function hexToHsl(hex) {
                  const r = parseInt(hex.slice(1, 3), 16) / 255;
                  const g = parseInt(hex.slice(3, 5), 16) / 255;
                  const b = parseInt(hex.slice(5, 7), 16) / 255;
                  const max = Math.max(r, g, b);
                  const min = Math.min(r, g, b);
                  let h, s, l = (max + min) / 2;
                  if (max === min) {
                    h = s = 0;
                  } else {
                    const d = max - min;
                    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                    switch (max) {
                      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                      case g: h = (b - r) / d + 2; break;
                      case b: h = (r - g) / d + 4; break;
                    }
                    h /= 6;
                  }
                  return Math.round(h * 360) + ' ' + Math.round(s * 100) + '% ' + Math.round(l * 100) + '%';
                }
                
                function createDarkModeVariant(hsl) {
                  const parts = hsl.split(' ');
                  const lightness = parseInt(parts[2]);
                  const newLightness = Math.min(85, lightness + 25);
                  return parts[0] + ' ' + parts[1] + ' ' + newLightness + '%';
                }
                
                const primaryHsl = hexToHsl(colors.primary);
                const accentHsl = hexToHsl(colors.accent);
                const warningHsl = hexToHsl(colors.warning);
                const successHsl = hexToHsl(colors.success);
                const errorHsl = hexToHsl(colors.error);
                
                const style = document.createElement('style');
                style.id = 'early-theme-injection';
                style.textContent = \`
                  :root {
                    --primary: \${primaryHsl} !important;
                    --primary-foreground: 0 0% 100% !important;
                    --accent: \${accentHsl} !important;
                    --accent-foreground: 0 0% 100% !important;
                    --warning: \${warningHsl} !important;
                    --success: \${successHsl} !important;
                    --error: \${errorHsl} !important;
                  }
                  .dark {
                    --primary: \${createDarkModeVariant(primaryHsl)} !important;
                    --primary-foreground: 222.2 84% 4.9% !important;
                    --accent: \${createDarkModeVariant(accentHsl)} !important;
                    --accent-foreground: 222.2 84% 4.9% !important;
                    --warning: \${createDarkModeVariant(warningHsl)} !important;
                    --success: \${createDarkModeVariant(successHsl)} !important;
                    --error: \${createDarkModeVariant(errorHsl)} !important;
                  }
                \`;
                document.head.appendChild(style);
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} min-h-screen bg-background antialiased`}
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
        <Toaster richColors closeButton position="top-right" />
      </body>
    </html>
  );
}

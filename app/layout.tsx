import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Компьютер сүлжээ · Шинэ жил 2026",
  description: "МКУТИС-ийн Компьютер сүлжээний ангийн шинэ жилийн бүртгэл, санал хураалт.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="mn"><body>{children}</body></html>;
}

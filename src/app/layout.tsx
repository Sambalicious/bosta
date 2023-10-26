import { Inter } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";
import { TailwindIndicator } from "@/components/module/common/TailwindIndicator";
import { ReactQueryProvider } from "./context/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bosta Task | Home",
  description: "Star wars",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {" "}
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <TailwindIndicator />
      </body>
    </html>
  );
}

import { TailwindIndicator } from "@/components/module/common/TailwindIndicator";
import localFont from "next/font/local";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import { ReactQueryProvider } from "./context/ReactQueryProvider";
import "./globals.css";

export const metadata = {
  title: "Bosta Task | Home",
  description: "Star wars",
};
const gotham = localFont({
  src: [
    {
      path: "../../public/fonts/Gotham-Rounded-Medium.otf",
      weight: "400",
    },
    {
      path: "../../public/fonts/Gotham-Rounded-Bold.otf",
      weight: "700",
    },
  ],
  variable: "--gotham-font",
});
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={gotham.className}>
        {" "}
        <Toaster position="top-center" richColors />
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <TailwindIndicator />
      </body>
    </html>
  );
}

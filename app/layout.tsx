"use client";

import "@/app/globals.css";
import { GeistSans } from 'geist/font/sans';
import { CivicAuthProvider } from "@civic/auth-web3/nextjs";
import { WagmiProvider, createConfig, http } from "wagmi";
//@ts-ignore
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { embeddedWallet } from "@civic/auth-web3/wagmi";
import { mainnet } from "viem/chains";
import UserLogin from "@/components/UserLogin";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "InterviewPrep AI - Your Personal Interview Assistant",
//   description: "AI-powered interview preparation platform that helps you practice, learn, and improve your interview skills.",
// };

const wagmiConfig = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
  connectors: [embeddedWallet()],
});

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <CivicAuthProvider>
          <html lang="en">
            <body className={`${GeistSans.className} h-screen light`}>
              <UserLogin />
              <div className="min-h-screen bg-background">
                <Navbar />
                <main className="container mx-auto px-4 py-8">
                  {children}
                </main>
              </div>
            </body>
          </html>
        </CivicAuthProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}

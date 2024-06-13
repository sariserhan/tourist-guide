"use client";

import LoadingComponent from "@/components/loading-component";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { AuthLoading, Authenticated, Unauthenticated, ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { dark, neobrutalism } from '@clerk/themes';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ConvexClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClerkProvider
            appearance={{
              // baseTheme: [dark, neobrutalism],
              layout: {
                socialButtonsVariant: 'iconButton',
                logoImageUrl: '/logo.png',
              },
              variables: {
                colorBackground: '#f9f9f9',
                colorPrimary: '#ff0000',
                colorText: 'black',
                colorInputBackground: '#ffffff',
                colorInputText: 'black',
              },
            }}
          >
          <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
            <AuthLoading>
              <LoadingComponent />
            </AuthLoading>
            <Authenticated>
              {children}
            </Authenticated>
            <Unauthenticated>
              {children}
            </Unauthenticated>
          </ConvexProviderWithClerk>
        </ClerkProvider>;
}

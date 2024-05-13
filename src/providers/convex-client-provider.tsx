"use client";

// import { Loading } from "@/components/ui/loading";
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
              baseTheme: [dark, neobrutalism],
            }}
          >
          <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
            {/* <AuthLoading>
              <Loading />
            </AuthLoading> */}
            <Authenticated>
              {children}
            </Authenticated>
            <Unauthenticated>
              {children}
            </Unauthenticated>
          </ConvexProviderWithClerk>
        </ClerkProvider>;
}

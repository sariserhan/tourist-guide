"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { useMutation } from "convex/react";
import { Id } from "../../convex/_generated/dataModel";
import { api } from "../../convex/_generated/api";

// Define the type for the client object
interface Client {
  isLoading: boolean;
  isAuthenticated: boolean;
}

// Create a context with the client object type
const UserContext = createContext<Client | undefined>(undefined);

// Custom hook to access the UserContext
export function useClient() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useClient must be used within a UserProvider");
  }
  return context;
}

// Provider component to manage user authentication state and information
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { user } = useUser();
  const [userId, setUserId] = useState<Id<"users"> | null>(null);
  const storeUser = useMutation(api.users.addUser);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    async function createUser() {
      const id = await storeUser();
      setUserId(id);
    }
    createUser();

    return () => setUserId(null);
  }, [isAuthenticated, storeUser, user?.id]);

  // Combine the local state with the state from context
  const client: Client = {
    isLoading: isLoading || (isAuthenticated && userId === null),
    isAuthenticated: isAuthenticated && userId !== null,
  };

  return <UserContext.Provider value={client}>{children}</UserContext.Provider>;
};

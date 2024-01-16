'use client'
import { AuthUser } from "@supabase/supabase-js";
import { Subscription } from "../supabase/supabase.types";
import { createContext, useContext, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { getUserSubscriptionStatus } from "../supabase/queries";
import { toast } from "@/components/ui/use-toast";

type SupabaseUserContextType = {
  user: AuthUser | null;
  subscription: Subscription | null;
};

const SupabaseUserContext = createContext<SupabaseUserContextType>({
  user: null,
  subscription: null,
});

export const useSupabaseUser = () => {
  return useContext(SupabaseUserContext);
};

interface SupabaseUserProps {
  children: React.ReactNode;
}

export const SupbaseUserProvider: React.FC<SupabaseUserProps> = ({
  children,
}) => {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const { data, error } = await getUserSubscriptionStatus(user.id);
        if (data) setSubscription(data);
        if (error) {
          toast({
            title: "Unexpected Error",
            description: "Oops! An unexpected error happened. Try again Later",
          });
        }
      }
    };
    getUser();
  }, [supabase]);
  return (
    <SupabaseUserContext.Provider value={{ user, subscription }}>
      {children}
    </SupabaseUserContext.Provider>
  );
};

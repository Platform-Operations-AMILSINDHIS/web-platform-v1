import { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { useToast } from "@chakra-ui/react";
import supabase from "~/lib/supabase/client";
import { userAtom } from "~/lib/atom";

/**
 * Subscribes to real-time Supabase updates on the current user's general_accounts row.
 * Automatically updates the Jotai userAtom and triggers toast notifications when
 * membership status changes (KAP_member or YAC_member become true).
 *
 * Mount this hook once at the app/layout level so it runs for the lifetime of a user session.
 */
const useUserStatusSync = () => {
  const [{ user }, setUserAtom] = useAtom(userAtom);
  const toast = useToast();

  // Keep a stable ref to the current user so the subscription callback always sees fresh values
  const userRef = useRef(user);
  useEffect(() => {
    userRef.current = user;
  }, [user]);

  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel(`user-status-sync-${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "general_accounts",
          filter: `id=eq.${user.id}`,
        },
        (payload) => {
          const updated = payload.new as Record<string, unknown>;
          const prev = userRef.current;

          if (!prev) return;

          const prevKAP = prev.KAP_member;
          const prevYAC = prev.YAC_member;

          setUserAtom((current) => ({
            ...current,
            user: current.user
              ? {
                  ...current.user,
                  KAP_member:
                    typeof updated.KAP_member === "boolean"
                      ? updated.KAP_member
                      : current.user.KAP_member,
                  YAC_member:
                    typeof updated.YAC_member === "boolean"
                      ? updated.YAC_member
                      : current.user.YAC_member,
                  membership_id:
                    typeof updated.membership_id === "string"
                      ? updated.membership_id
                      : current.user.membership_id,
                  date_of_birth:
                    typeof updated.date_of_birth === "string"
                      ? updated.date_of_birth
                      : current.user.date_of_birth,
                }
              : null,
          }));

          if (!prevKAP && updated.KAP_member === true) {
            toast({
              title: "KAP Membership Approved!",
              description:
                "Your Khudabadi Amil Panchayat membership has been approved. Welcome!",
              status: "success",
              duration: 8000,
              isClosable: true,
              position: "top-right",
            });
          }

          if (!prevYAC && updated.YAC_member === true) {
            toast({
              title: "YAC Membership Approved!",
              description:
                "Your Young Amil Circle membership has been approved. Welcome!",
              status: "success",
              duration: 8000,
              isClosable: true,
              position: "top-right",
            });
          }
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [user?.id]);
};

export default useUserStatusSync;

// src/hooks/useRealTime.ts
import { useEffect } from "react";
import supabase from "~/lib/supabase/client";

const useRealTime = (onUpdate: () => Promise<void>, tableName: string) => {
  useEffect(() => {
    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: `${tableName}`,
        },
        (payload) => {
          console.log("Real-time update:", payload);
          void onUpdate();
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [onUpdate]);
};

export default useRealTime;

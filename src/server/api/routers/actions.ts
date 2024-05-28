import supabase from "~/pages/api/auth/supabase";
import { createTRPCRouter, publicProcedure } from "../trpc";

import * as Yup from "yup";

const actions = createTRPCRouter({
  generateMembershipID: publicProcedure
    .input(Yup.object({ formType: Yup.string() }))
    .mutation(async ({ input }) => {
      const { formType } = input;
      const prefix = formType?.toUpperCase() + "#";

      try {
        // Fetch all unique IDs
        const { data, error } = await supabase
          .from("general_accounts")
          .select("membership_id");

        if (error) throw error;

        // Filter IDs with matching prefix
        const matchingIds = data?.filter((id) => {
          const regex = new RegExp(`^${prefix}([0-9]{4})`); // Match prefix followed by 4 digits
          return regex.test(id.toString());
        });

        // Generate sequence number
        const count = matchingIds?.length || 0; // Handle potential empty array
        const suffix = (count + 1).toString().padStart(4, "0");

        return prefix + suffix;
      } catch (err) {
        console.error("Error generating membership ID:", err);
        throw err; // Re-throw for handling at the call site
      }
    }),
});

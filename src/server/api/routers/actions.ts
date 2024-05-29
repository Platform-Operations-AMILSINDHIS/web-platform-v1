import supabase from "~/pages/api/auth/supabase";
import { createTRPCRouter, publicProcedure } from "../trpc";
import * as Yup from "yup";

const actions = createTRPCRouter({
  generateMembershipID: publicProcedure
    .input(Yup.object({ formType: Yup.string().required() }))
    .mutation(async ({ input }) => {
      const { formType } = input;
      const prefix = formType.toUpperCase() + "#";

      try {
        // Fetch all unique IDs
        const { data, error } = await supabase
          .from("general_accounts")
          .select("membership_id");

        if (error) throw error;

        // Filter IDs with matching prefix
        const matchingIds = data?.filter((item) => {
          const membership_id = item.membership_id;
          return membership_id && membership_id.indexOf(prefix) === 0;
        });

        // Extract sequence numbers and find the maximum
        const maxSequenceNumber = matchingIds.reduce((max, item) => {
          const membership_id = item.membership_id;
          const numberPart = parseInt(
            membership_id.substring(prefix.length),
            10
          );
          return numberPart > max ? numberPart : max;
        }, 0);

        // Generate next sequence number
        const suffix = (maxSequenceNumber + 1).toString().padStart(4, "0");

        return prefix + suffix;
      } catch (err) {
        console.error("Error generating membership ID:", err);
        throw err; // Re-throw for handling at the call site
      }
    }),

  generateMatrimonyID: publicProcedure.mutation(async () => {
    try {
      const prefix = "MAT#";
      // Fetch all unique IDs
      const { data, error } = await supabase
        .from("matrimony_profiles")
        .select("matrimony_id");

      if (error) throw error;

      // Filter IDs with matching prefix
      const matchingIds = data?.filter((item) => {
        const matrimony_id = item.matrimony_id;
        return matrimony_id && matrimony_id.indexOf(prefix) === 0;
      });

      // Extract sequence numbers and find the maximum
      const maxSequenceNumber = matchingIds.reduce((max, item) => {
        const matrimony_id = item.matrimony_id;
        const numberPart = parseInt(matrimony_id.substring(prefix.length), 10);
        return numberPart > max ? numberPart : max;
      }, 0);

      // Generate next sequence number
      const suffix = (maxSequenceNumber + 1).toString().padStart(4, "0");

      return prefix + suffix;
    } catch (err) {
      console.error("Error generating matrimony ID:", err);
      throw err; // Re-throw for handling at the call site
    }
  }),
});

export default actions;

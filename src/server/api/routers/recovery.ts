import * as Yup from "yup";
import { createTRPCRouter, publicProcedure } from "../trpc";

const recoveryRouter = createTRPCRouter({
  testMutation: publicProcedure
    .input(Yup.object({ email: Yup.string() }))
    .mutation(async ({ input }) => {
      try {
        const { email } = input;
        const message = `Hi Im a TRPC Router, and your email is --> ${email}`;
        return message;
      } catch (err) {
        console.log(err);
      }
    }),
});

export default recoveryRouter;

import { createTRPCRouter, publicProcedure } from "../trpc";

const formBufferData = createTRPCRouter({
  fetchMembershipBuffer: publicProcedure.query(async () => {}),
});

export default formBufferData;

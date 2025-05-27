import { serve } from "inngest/next";
import { createUserOrder, inngest, snycUserCreation, snycUserDeletion, snycUserUpdation } from "@/config/inngest";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [ 
   snycUserCreation,
   snycUserUpdation,
   snycUserDeletion,
   createUserOrder
  ],
});

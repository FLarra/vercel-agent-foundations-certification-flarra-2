/**
 * Types for the shopper chat UI.
 *
 * `shoppingAgent` is never run. Chapters 1–3 streamed it from `app/api/chat/route.ts`
 * (`git show a1c0d5c`); since 03b0424 the live chat runs `chatFlow` in
 * `lib/workflows/chat-flow.ts`. It's kept because its inferred types drive
 * `useChat<ShoppingAgentUIMessage>` and the generative UI components.
 *
 * Workshop docs: https://agent-foundations-certification.vercel.app/docs/chat-agent
 */

import {
  ToolLoopAgent,
  type InferAgentUIMessage,
  type UIToolInvocation,
} from "ai";
import { searchProducts, getProductDetails, getAllCategories, returnOrder } from "@/lib/tools";
import { shoppingInstructions } from "@/lib/workflows/chat-flow";

export const shoppingAgent = new ToolLoopAgent({
  model: "anthropic/claude-sonnet-5",
  instructions: shoppingInstructions,
  tools: { searchProducts, getProductDetails, getAllCategories, returnOrder },
});

export type ShoppingAgentUIMessage = InferAgentUIMessage<typeof shoppingAgent>;
export type SearchProductsToolInvocation = UIToolInvocation<typeof searchProducts>;
export type ProductDetailsToolInvocation = UIToolInvocation<typeof getProductDetails>;

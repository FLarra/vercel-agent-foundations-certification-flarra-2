/**
 * Shopper chat. Starts a `chatFlow` run and streams it back; the run id goes out
 * in `x-workflow-run-id` so the client can resume via `app/api/chat/[id]/stream`.
 *
 * Chapters 1–3 streamed `shoppingAgent` here with `createAgentUIStreamResponse`
 * (`git show a1c0d5c`).
 *
 * Workshop docs: https://agent-foundations-certification.vercel.app/docs/workflows
 */

import { chatFlow } from "@/lib/workflows/chat-flow";
import { createModelCallToUIChunkTransform } from "@ai-sdk/workflow";
import type { UIMessage } from "ai";
import { createUIMessageStreamResponse } from "ai";
import { start } from "workflow/api";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  const run = await start(chatFlow, [messages]);
  return createUIMessageStreamResponse({
    stream: run.readable.pipeThrough(createModelCallToUIChunkTransform()),
    headers: {
      "x-workflow-run-id": run.runId,
    },
  });
}
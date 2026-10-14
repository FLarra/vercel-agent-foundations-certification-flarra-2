/**
 * Admin chat. Starts an `adminChatFlow` run and streams it back to
 * `components/admin-agent-chat.tsx`. There's no resume route for it yet.
 *
 * Workshop docs: https://agent-foundations-certification.vercel.app/docs/admin-chat-agent
 */

import { adminChatFlow } from "@/lib/workflows/admin-chat-flow";
import { createModelCallToUIChunkTransform } from "@ai-sdk/workflow";
import { createUIMessageStreamResponse } from "ai";
import type { UIMessage } from "ai";
import { start } from "workflow/api";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  const run = await start(adminChatFlow, [messages]);
  return createUIMessageStreamResponse({
    stream: run.readable.pipeThrough(createModelCallToUIChunkTransform()),
    headers: {
      "x-workflow-run-id": run.runId,
    },
  });
}
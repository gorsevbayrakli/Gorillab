import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().min(10).max(20),
  blocker: z.string().max(200).default(""),
  discipline: z.string().max(200).default(""),
  days: z.string().max(200).default(""),
});

export const notifyTrialRequest = createServerFn({ method: "POST" })
  .inputValidator((data) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    try {
      const { sendTrialNotification } = await import("./trial-notify.server");
      const result = await sendTrialNotification(data);
      if (!result.sent) console.error("trial notification not sent:", result.reason);
      return result;
    } catch (err) {
      console.error("trial notification failed:", err);
      return { sent: false as const, reason: "error" };
    }
  });

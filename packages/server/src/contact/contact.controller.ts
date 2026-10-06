import type { Request, Response } from "express";

import { createContactMessage } from "./contact.service.js";
import type { CreateContactMessageInput } from "./contact.types.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

const requestLog = new Map<
  string,
  {
    count: number;
    resetAt: number;
  }
>();

const getClientKey = (req: Request) => {
  const forwardedFor = req.headers["x-forwarded-for"];

  const forwardedIp = Array.isArray(forwardedFor)
    ? forwardedFor[0]
    : forwardedFor?.split(",")[0]?.trim();

  return forwardedIp || req.ip || "unknown";
};

const isRateLimited = (key: string) => {
  const now = Date.now();
  const current = requestLog.get(key);

  if (!current || current.resetAt <= now) {
    requestLog.set(key, {
      count: 1,
      resetAt: now + WINDOW_MS,
    });

    return false;
  }

  if (current.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  current.count += 1;

  return false;
};

const cleanupRateLimitEntries = () => {
  const now = Date.now();

  for (const [key, value] of requestLog.entries()) {
    if (value.resetAt <= now) {
      requestLog.delete(key);
    }
  }
};

setInterval(cleanupRateLimitEntries, WINDOW_MS).unref();

export const createContactMessageController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  if (isRateLimited(getClientKey(req))) {
    res.status(429).json({
      success: false,
      message: "Too many messages. Please try again later.",
    });

    return;
  }

  const input = req.body as Partial<CreateContactMessageInput>;

  // Honeypot anti-spam field.
  // Real visitors never fill this field.
  if (typeof input.website === "string" && input.website.trim()) {
    res.status(400).json({
      success: false,
      message: "Unable to submit this message.",
    });

    return;
  }

  const name =
    typeof input.name === "string"
      ? input.name.trim()
      : "";

  const email =
    typeof input.email === "string"
      ? input.email.trim()
      : "";

  const subject =
    typeof input.subject === "string"
      ? input.subject.trim()
      : "";

  const message =
    typeof input.message === "string"
      ? input.message.trim()
      : "";

  if (!name || !email || !subject || !message) {
    res.status(400).json({
      success: false,
      message:
        "Name, email, subject, and message are required.",
    });

    return;
  }

  if (name.length > 100) {
    res.status(400).json({
      success: false,
      message:
        "Name must be 100 characters or fewer.",
    });

    return;
  }

  if (
    email.length > 254 ||
    !EMAIL_PATTERN.test(email)
  ) {
    res.status(400).json({
      success: false,
      message:
        "Please provide a valid email address.",
    });

    return;
  }

  if (subject.length > 150) {
    res.status(400).json({
      success: false,
      message:
        "Subject must be 150 characters or fewer.",
    });

    return;
  }

  if (message.length > 5000) {
    res.status(400).json({
      success: false,
      message:
        "Message must be 5000 characters or fewer.",
    });

    return;
  }

  try {
    await createContactMessage({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message:
        "Your message was received successfully.",
    });
  } catch (error) {
    console.error(
      "Create contact message error:",
      error,
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to submit your message right now.",
    });
  }
};
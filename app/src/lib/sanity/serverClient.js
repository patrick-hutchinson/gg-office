import "server-only";

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@sanity/client";

import { isSanityPreviewEnvironment } from "./env";

const getRootEnvValue = (key) => {
  const envPaths = [join(process.cwd(), "../.env.local"), join(process.cwd(), "../.env")];

  for (const envPath of envPaths) {
    if (!existsSync(envPath)) continue;

    const match = readFileSync(envPath, "utf8").match(new RegExp(`^${key}=(.*)$`, "m"));
    if (match?.[1]) return match[1].trim();
  }

  return undefined;
};

const token = process.env.SANITY_AUTH_TOKEN || getRootEnvValue("SANITY_AUTH_TOKEN");
const canReadDrafts = isSanityPreviewEnvironment && Boolean(token);

export const sanityServerClient = createClient({
  projectId: "ghlrrzh3",
  dataset: "production",
  apiVersion: "2025-06-27",
  useCdn: !canReadDrafts,
  token: canReadDrafts ? token : undefined,
  perspective: canReadDrafts ? "drafts" : "published",
});

export const sanityServerClientCanReadDrafts = canReadDrafts;

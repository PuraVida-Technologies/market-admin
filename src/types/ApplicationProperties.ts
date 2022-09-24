import type { PublicApplicationConfig } from "@/types";
import type { AppProps } from "next/app";

export type ApplicationProperties = AppProps & {
  publicConfig: PublicApplicationConfig | null;
};

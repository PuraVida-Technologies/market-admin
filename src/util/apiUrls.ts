import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const baseUrl = publicRuntimeConfig.NEXT_PUBLIC_BASE_URL;

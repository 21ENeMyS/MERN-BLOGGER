import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export const isProduction = publicRuntimeConfig.PRODUCTION;

export const API_IMAGE = publicRuntimeConfig.API_IMAGE;

export const API = publicRuntimeConfig.PRODUCTION
  ? publicRuntimeConfig.API_PRODUCTION
  : publicRuntimeConfig.API_DEVELOPMENT;

export const APP_NAME = publicRuntimeConfig.APP_NAME;

export const DOMAIN = publicRuntimeConfig.PRODUCTION
  ? publicRuntimeConfig.DOMAIN_PRODUCTION
  : publicRuntimeConfig.DOMAIN_DEVELOPMENT;

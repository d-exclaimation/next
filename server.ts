//
//  server.ts
//  next
//
//  Created by d-exclaimation on 14 May 2023
//

declare global {
  var instances: Record<string | symbol | number, any>;
}

/**
 * Create an exclusive instance regardless of the environment
 *
 * ### Example
 *
 * ```ts
 * import { PrismaClient } from "@prisma/client";
 *
 * export const prisma = excl("prisma", () => new PrismaClient());
 * ```
 *
 * @public
 *
 * @param key Key to store the instance
 * @param value Value to store
 * @returns The instance
 */
export function excl<K extends string | symbol | number, T>(
  key: K,
  value: () => T
): T {
  const instance = (globalThis?.instances?.[key] as T) ?? value();

  if (process?.env?.NODE_ENV === "development") {
    globalThis.instances ??= {};
    globalThis.instances[key] ??= instance;
  }

  return instance;
}

/**
 * Check if the current environment is server
 *
 * ### Example
 *
 * ```tsx
 * "use client";
 *
 * import { rc, isserver } from "@d-exclaimation/next";
 *
 * export const ItemPreview = page(() => {
 *   if (isserver()) {
 *     // Do something on server only
 *   }
 *
 *   return (
 *     <div> Item Preview </div>
 *   );
 * });
 * ```
 *
 * @public
 * @returns True if the current environment is server
 */
export function isserver() {
  return typeof window === "undefined";
}

/**
 * Check if the current environment is browser / client
 *
 * ### Example
 *
 * ```tsx
 * "use client";
 *
 * import { rc, isclient } from "@d-exclaimation/next";
 *
 * export const ItemPreview = page(() => {
 *   if (isclient()) {
 *     // Do something on client only
 *   }
 *
 *   return (
 *     <div> Item Preview </div>
 *   );
 * });
 * ```
 *
 * @public
 * @returns True if the current environment is browser / client
 */
export function isbrowser() {
  return typeof window !== "undefined";
}

/**
 * Check if the current environment is development
 *
 * @public
 *
 * @returns True if the current environment is development
 */
export function isdev() {
  return process?.env?.NODE_ENV === "development";
}

/**
 * Check if the current environment is production
 *
 * @public
 *
 * @returns True if the current environment is production
 */
export function isprod() {
  return process?.env?.NODE_ENV === "production";
}

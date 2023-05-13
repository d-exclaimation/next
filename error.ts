//
//  error.ts
//  next
//
//  Created by d-exclaimation on 13 May 2023
//

import type { FunctionComponent } from "react";

/**
 * Declare a Next.js Error component that can be used to create a page in the new App router.
 *
 * Use `error` to declare a React component that matches Next.js `error.tsx` requirements.
 *
 * ### Example
 *
 * An example showing how to create a error component:
 *
 * ```tsx
 * "use client";
 *
 * import { error } from "@d-exclaimation/next";
 *
 * export const Error = error(({ error }) => {
 *  return (
 *    <div>{error.message}</div>
 *  );
 * });
 * ```
 *
 * @public
 *
 * @param fn The function component to be used as the error page
 * @returns The function component to be used as the error page
 */
export function error(
  fn: FunctionComponent<{ error: Error; reset: () => void }>
) {
  return fn;
}

//
//  route.ts
//  next
//
//  Created by d-exclaimation on 13 May 2023
//

import type { NextRequest } from "next/server";

type RouteArgs<P extends {} | undefined = undefined> = [
  req: NextRequest,
  context: P extends undefined ? {} : { params: P }
];

/**
 * Declare a Next.js Route handler that can be used to create a route in the new App router.
 *
 * Use `route` to declare a function that matches Next.js `route.ts` requirements.
 *
 * ### Example
 *
 * ```ts
 * import { NextResponse } from "next/server";
 * import { route } from "@d-exclaimation/next";
 *
 * export const GET = route(async (req) => {
 *  return NextResponse.json({ message: "Hello World" });
 * });
 * ```
 *
 * Another example showing how to use the route handler with params:
 *
 * ```ts
 * import { NextResponse } from "next/server";
 * import { route } from "@d-exclaimation/next";
 *
 * type RouteParams = {
 *   id: string;
 * };
 *
 * export const GET  = route<RouteParams>(
 *   async (req, context: { params: { id } }) => {
 *     return NextResponse.json({ message: `Hello ${context.params.id}` });
 *   }
 * );
 * ```
 *
 * @public
 *
 * @param fn The function that will be called when the route is matched
 * @returns The function that will be called when the route is matched
 */
export function route<P extends {} | undefined = undefined>(
  fn: (...args: RouteArgs<P>) => Response | Promise<Response>
) {
  return fn;
}

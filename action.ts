//
//  action.ts
//  next
//
//  Created by d-exclaimation on 13 May 2023
//

import { useTransition } from "react";

/**
 * Allows components to use server actions until subsequent renders so that more crucial updates can be rendered immediately.
 *
 * ### Example
 *
 * ```tsx
 * "use client";
 *
 * import { rc, useAction } from "@d-exclaimation/next";
 * import { clickAction } from "./action";
 *
 * export const Button = rc(() => {
 *   const { isPending, run: click } = useAction(clickAction);
 *
 *   return (
 *     <button onClick={click} disabled={isPending}>
 *       {isPending ? "Loading..." : "Click me"}
 *     </button>
 *   );
 * });
 * ```
 *
 * @public
 *
 * @param action - The action to be used
 * @returns The action state which includes a boolean to check if it's pending and a function to run the action
 */
export function useAction<Args extends any[]>(
  action: (...args: Args) => Promise<void>
) {
  const [isPending, start] = useTransition();

  return {
    isPending,
    run: (...args: Args) => start(() => action(...args)),
  };
}

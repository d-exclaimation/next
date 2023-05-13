//
//  component.ts
//  next
//
//  Created by d-exclaimation on 13 May 2023
//

import type {
  ComponentPropsWithoutRef,
  ElementType,
  FunctionComponent,
} from "react";
import type { AsyncFunctionComponent } from "./types";

/**
 * Infer the props of a React component.
 *
 * Use `InferProps` to infer the props of a React component.
 *
 * ### Example
 *
 * An example showing how to infer the props of a React component:
 *
 * ```tsx
 * import { type InferProps } from "@d-exclaimation/next";
 * import { Counter } from "./counter";
 *
 * export type CounterProps = InferProps<typeof Counter>;
 * ```
 *
 * @public
 *
 * @param T - The React component.
 */
export type InferProps<
  T extends AsyncFunctionComponent | FunctionComponent | ElementType<any>
> = T extends AsyncFunctionComponent<infer P>
  ? P
  : T extends FunctionComponent<infer P>
  ? P
  : T extends ElementType<any>
  ? ComponentPropsWithoutRef<T>
  : never;

/**
 * Declare a React component that can be used to create UI.
 *
 * Use `rc` to declare a React component. A React component can be the usual client component or
 * a special kind of async component that only renders on the server.
 *
 * ### Example
 *
 * An example showing how to create a counter component:
 *
 * ```tsx
 * import { rc } from "@d-exclaimation/next";
 * import { useState } from "react";
 *
 * export type CounterProps = {
 *   initialValue?: number;
 *   step?: number;
 * }
 *
 * export const Counter = rc<CounterProps>(({ initialValue, step }) => {
 *   const [count, setCount] = useState(initialValue || 0);
 *   return (
 *     <div>
 *       <span>{count}</span>
 *       <button onClick={() => setCount(prev => prev + (step || 1))}>+</button>
 *     </div>
 *   );
 * });
 * ```
 *
 * @public
 *
 * @param fn - The function that returns a React element.
 * @returns A React component.
 */
export function rc<P = {}>(
  fn: AsyncFunctionComponent<P> | FunctionComponent<P>
): FunctionComponent<P> {
  return fn as FunctionComponent<P>;
}

//
//  layout.ts
//  next
//
//  Created by d-exclaimation on 13 May 2023
//

import type { Metadata } from "next";
import type { FunctionComponent, ReactNode } from "react";
import { rc } from "./component";
import type { AsyncFunctionComponent } from "./types";

/**
 * Declare the metadata of the page
 * @param meta The metadata of the page
 */
export function meta(meta: Metadata) {
  return meta;
}

type LayoutProps<P extends {} | undefined = undefined> = {
  children: ReactNode;
} & P extends undefined
  ? {}
  : { params: P };

/**
 * Declare a Next.js Layout component that can be used to create a layout in the new App router.
 *
 * Use `layout` to declare a React component that matches Next.js `layout.tsx` requirements.
 *
 * ### Example
 *
 * An example showing how to create a layout component:
 *
 * ```tsx
 * import { layout } from "@d-exclaimation/next";
 *
 * export const Layout = layout(async ({ children }) => {
 *   return (
 *     <html>
 *       <body>{children}</body>
 *     </html>
 *   );
 * });
 * ```
 *
 * Another example showing how to use the layout component with params:
 *
 * ```tsx
 * import { layout } from "@d-exclaimation/next";
 *
 * type LayoutParams = {
 *   title: string;
 * };
 *
 * export const ShopLayout = layout<LayoutParams>(({
 *   children,
 *   params: { title }
 * }) => {
 *   return (
 *    <section>
 *      <h1>{title}</h1>
 *      {children}
 *    </section>
 *   );
 * });
 * ```
 *
 * @public
 *
 * @param T - The layout component with the allowed props.
 * @returns The layout component.
 */
export function layout<P extends {} | undefined = undefined>(
  fn: AsyncFunctionComponent<LayoutProps<P>> | FunctionComponent<LayoutProps<P>>
) {
  return rc(fn);
}

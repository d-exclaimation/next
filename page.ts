//
//  page.ts
//  next
//
//  Created by d-exclaimation on 13 May 2023
//

import type { Metadata, ResolvingMetadata } from "next";
import type { FunctionComponent } from "react";
import { rc } from "./component";
import type { AsyncFunctionComponent } from "./types";

type SearchParams = {
  [key: string]: string | string[] | undefined;
};

type PageArgs = {
  P?: {} | undefined;
  S?: SearchParams;
};

type DefaultPageProps = {
  P?: undefined;
  S?: SearchParams;
};

type PageProps<A extends PageArgs> = {
  searchParams: "S" extends keyof A
    ? A["S"] extends undefined
      ? SearchParams
      : A["S"]
    : SearchParams;
} & ("P" extends keyof A
  ? A["P"] extends undefined
    ? {}
    : { params: A["P"] }
  : {});

/**
 * Declare a Next.js Page component that can be used to create a page in the new App router.
 *
 * Use `pagee` to declare a React component that matches Next.js `page.tsx` requirements.
 *
 * ### Example
 *
 * An example showing how to create a page component:
 *
 * ```tsx
 * import { page } from "@d-exclaimation/next";
 *
 * export const Page = page(() => {
 *   return (
 *     <html>
 *       <body>{children}</body>
 *     </html>
 *   );
 * });
 * ```
 *
 * Another example showing how to use the page component with params:
 *
 * ```tsx
 * import { page } from "@d-exclaimation/next";
 *
 * type ItemParams = {
 *   id: string;
 * };
 *
 * export const ItemPage = page<{ P: ItemParams }>(
 *   async ({ params: { id } }) => {
 *     const item = await fetchItem(id);
 *     return (
 *      <div>
 *        <h3>{item.title}</h3>
 *        <p>{item.description}</p>
 *      </div>
 *     );
 *   }
 * );
 * ```
 *
 * Another example showing how to use the page component with search params:
 *
 * ```tsx
 * import { page } from "@d-exclaimation/next";
 *
 * type ExploreSearchParams = {
 *   order?: "price-asc" | "price-desc" | "rating-asc" | "rating-desc";
 *   q?: string;
 * };
 *
 * export const ItemPage = page<{ S: ExploreSearchParams }>(
 *   async ({ searchParams: { order, q } }) => {
 *     const items = await fetchItems(order, q);
 *     return (
 *      <div>
 *        <h3>Explore</h3>
 *        {items.map((item) => (
 *          <div key={item.id}>
 *            <h3>{item.title}</h3>
 *            <p>{item.description}</p>
 *          </div>
 *        )}
 *      </div>
 *     );
 *   }
 * );
 * ```
 *
 * @public
 *
 * @param T - The page component with the allowed props.
 * @returns The page component.
 */
export function page<A extends PageArgs = DefaultPageProps>(
  fn: AsyncFunctionComponent<PageProps<A>> | FunctionComponent<PageProps<A>>
) {
  return rc(fn);
}

/**
 * Declare the metadata of the page from a function.
 * @param fn - The function that takes the same parameters as the page and returns the metadata.
 * @returns The metadata function of the page.
 */
export function head<A extends PageArgs = DefaultPageProps>(
  fn: (props: PageProps<A>, parent?: ResolvingMetadata) => Metadata
) {
  return fn;
}

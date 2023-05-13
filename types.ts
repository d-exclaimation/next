//
//  types.ts
//  next
//
//  Created by d-exclaimation on 13 May 2023
//

import type { ReactElement, ValidationMap, WeakValidationMap } from "react";

export interface AsyncFunctionComponent<P = {}> {
  (props: P, context?: any): Promise<ReactElement<any, any> | null>;
  propTypes?: WeakValidationMap<P> | undefined;
  contextTypes?: ValidationMap<any> | undefined;
  defaultProps?: Partial<P> | undefined;
  displayName?: string | undefined;
}

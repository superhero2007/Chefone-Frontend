// flow-typed signature: 261a5ad3fc3f0c9b2737bebb141b55b3
// flow-typed version: 843ec3c04f/react-css-modules_v3.x.x/flow_>=v0.53.x

declare module 'react-css-modules' {
  declare function exports(
    component: any,
    styles: any,
    options?: {
      allowMultiple?: boolean,
      errorWhenNotFound?: boolean,
    },
  ): any;
  // declare function exports<P, S, C: React$Component<P, S>, X>(
  //   component: Class<C>,
  //   styles: X,
  //   options?: {|
  //     allowMultiple?: boolean,
  //     errorWhenNotFound?: boolean,
  //   |},
  // ): Class<React$Component<$Diff<P, { styles: X }>, S>>;
}

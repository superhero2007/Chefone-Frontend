// flow-typed signature: 7ef6619af42068323c49beaf0170692d
// flow-typed version: 6b8370bc71/react-helmet_v3.x.x/flow_>=v0.53.x

declare module 'react-helmet' {
  declare type Props = {
    htmlAttributes?: Object,
    title?: string,
    defaultTitle?: string,
    titleTemplate?: string,
    base?: Object,
    meta?: Array<Object>,
    link?: Array<Object>,
    script?: Array<Object>,
    noscript?: Array<Object>,
    style?: Array<Object>,
    onChangeClientState?: (newState: Object, addedTags: Object, removeTags: Object) => void | mixed,
  };
  declare interface HeadAttribute {
    toString(): string;
    toComponent(): React$Element<*>;
  }
  declare interface Head {
    htmlAttributes: HeadAttribute;
    title: HeadAttribute;
    base: HeadAttribute;
    meta: HeadAttribute;
    link: HeadAttribute;
    script: HeadAttribute;
    style: HeadAttribute;
  }

  declare class Helmet extends React$Component<Props> {
    static rewind(): Head;
  }
  declare var exports: typeof Helmet;
}

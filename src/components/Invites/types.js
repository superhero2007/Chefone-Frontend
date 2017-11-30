//@flow

export type Invite = {
  id: string,
  email: string,
  status: string,
};

export type InviteProps = {
  index: number,
  id: string,
  email: string,
  status: string,
};

export type InputProps = {
  className?: string,
  type?: string,
};

export type MultiLineInputProps = {
  className?: string,
};

export type ButtonProps = {
  text: string,
  disable?: boolean,
  pressed?: boolean,
  onClick?: Function,
};

export type SocialButtonProps = {
  backgroundColor: string,
  frontClass: string,
  glyphUrlPath: string,
  text: string,
  url: string,
  disable?: boolean,
  pressed?: boolean,
  onClick?: Function,
};

export type FormHeadProps = {
  head: string,
  subhead?: string,
};

// @flow

import React from 'react';

export default ({
  Container,
  containterProps,
  children,
}: {
  Container: Object,
  containterProps: Object,
  children?: Object,
}) => <Container {...containterProps}>{children}</Container>;

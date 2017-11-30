// @flow

import React from 'react';
import { Row, Col, Grid } from 'react-flexbox-grid';

import Button, { Modes, Sizes } from '../';

const Code = ({ children }) => {
  return (
    <div>
      <span>{children}</span>
    </div>
  );
};

const CodeAndEvaluate = ({ code, elem }) => {
  return (
    <Col xs={12}>
      <Row center="xs">
        <Code>{code}</Code>
      </Row>
      <Row center="xs">{elem}</Row>
    </Col>
  );
};

export default () => {
  const customButtonsRow = (
    <Row center="xs">
      <Col xs={12}>
        <h2>Custom</h2>
      </Col>
      <CodeAndEvaluate
        code={`<Button size='md' text='text' width='300px' />`}
        elem={<Button size="md" text="text" width="300px" />}
      />
      <CodeAndEvaluate
        code={`<Button size='md' text='text' width='30%' />`}
        elem={<Button size="md" text="text" width="30%" />}
      />
    </Row>
  );

  const allButtonsRow = (
    <Row center="xs">
      <Col xs={12}>
        <h2>All</h2>
      </Col>
      {Object.keys(Modes).map(mode => {
        return (
          <Col sm={4} xs={12}>
            <Row center="xs">
              <Col
                xs={12}
                style={{
                  height: 500,
                  paddingTop: 30,
                  paddingBottom: 30,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                {Object.keys(Sizes).map(size => {
                  return (
                    <Row center="xs">
                      <CodeAndEvaluate
                        code={`<Button mode='${mode}' size='${
                          size
                        }' text='text' />`}
                        elem={<Button mode={mode} size={size} text="text" />}
                      />
                    </Row>
                  );
                })}
              </Col>
            </Row>
          </Col>
        );
      })}
    </Row>
  );
  return (
    <Grid fluid>
      {allButtonsRow}
      {customButtonsRow}
    </Grid>
  );
};

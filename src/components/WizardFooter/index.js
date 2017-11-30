// @flow

import React from 'react';
import ProgressButton from '../ProgressButton';
import { Row, Col } from 'react-flexbox-grid';
const BACK_BTN_TEXT = 'Zurück';
const NEXT_BTN_TEXT = 'Weiter';
export default ({
  onBackClick,
  onNextClick,
  loadable,
  nextButtonState,
  backButtonText,
  nextButtonText,
}: {
  onBackClick: Function,
  onNextClick: Function,
  loadable: boolean,
  nextButtonState: Object,
  backButtonText: string,
  nextButtonText: string,
}) => {
  return (
    <Row center="xs">
      <Col md={3} className="text-center">
        <button
          className="btn btn-danger-outline footer-button"
          onClick={onBackClick}
        >
          {backButtonText || BACK_BTN_TEXT}
        </button>
      </Col>
      <Col md={3} className="text-center">
        {loadable ? (
          <ProgressButton
            className="footer-button"
            buttonState={nextButtonState}
            onClick={onNextClick}
          >
            {nextButtonText || NEXT_BTN_TEXT}
          </ProgressButton>
        ) : (
          <button
            className="btn btn-success footer-button"
            onClick={onNextClick}
          >
            {nextButtonText || NEXT_BTN_TEXT}
          </button>
        )}
      </Col>
    </Row>
  );
};

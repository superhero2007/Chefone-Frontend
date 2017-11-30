// @flow

import R from 'ramda';
import React from 'react';
import City from './City';
import DashboardNavbar from '../../components/DashboardNavbar';
import Loader from '../../components/UIKit/Loader';
import withSimpleState from '../../utils/withSimpleState';
import { Row, Col } from 'react-flexbox-grid';
import {
  progressPendingPromise,
  toPlainObject,
} from '../../decorators/ValidationDecorator';
import FooterWizardLayout from '../FooterWizardLayout';

import { fixedCSSModules } from '../../utils';
import styles from './index.module.less';

const HocScreenWidth = Component => {
  class Wrapped extends React.Component<*, *> {
    state: {
      screenWidth?: number,
    };

    constructor(props) {
      super(props);
      this.state = {};
    }

    componentDidMount() {
      this.setState({ screenWidth: window.innerWidth });
    }

    render() {
      return <Component {...this.props} {...this.state} />;
    }
  }
  return Wrapped;
};

const getStateToSave = props => {
  return {
    city: props.selectedCity,
  };
};

export default R.compose(
  withSimpleState('nextButtonState', ({ nextButtonState }) => nextButtonState),
  HocScreenWidth,
  withSimpleState('selectedCity', ({ city, cities }) => {
    return city ? city : cities[0];
  }),
  fixedCSSModules(styles),
)(props => {
  const {
    cities,
    selectedCity,
    nextButtonState,
    onSubmitForm,
    onNextClick,
    onBackClick,
  } = props;

  return (
    <FooterWizardLayout
      loadable
      nextButtonState={nextButtonState.value}
      onNextClick={async () => {
        const myProgressBarClickProc = progressPendingPromise(nextButtonState);
        const stateToSubmit = getStateToSave(props);
        console.log(stateToSubmit);
        await onSubmitForm(stateToSubmit);
        return await myProgressBarClickProc(
          () => Promise.resolve(),
          onNextClick,
        )(stateToSubmit);
      }}
      onBackClick={() => onBackClick(toPlainObject(getStateToSave(props)))}
    >
      <DashboardNavbar />
      <div styleName="select-city-list" className="container">
        <h1 className="text-center">Erstelle ein Event</h1>
        <h4 className="text-center">
          In welcher Stadt soll dein Dinner statt finden?
        </h4>
        <Row between="xs" styleName="cities-list">
          {cities ? null : <Loader />}
          {cities.map((city, i) => (
            <Col xs={12} md={4}>
              <City
                key={i}
                isSelected={city.objectId === selectedCity.value.objectId}
                image={city.city_image}
                cityName={city.city}
                countryName={city.country}
                onClick={async () => {
                  // selectedCity.onChange(city);
                  const myProgressBarClickProc = progressPendingPromise(
                    nextButtonState,
                  );
                  const stateToSubmit = { city: { value: city } };
                  await onSubmitForm(stateToSubmit);
                  return await myProgressBarClickProc(
                    () => Promise.resolve(),
                    onNextClick,
                  )(stateToSubmit);
                }}
              />
            </Col>
          ))}
        </Row>

        <Row center="xs" className="text-center support-msg">
          Deine Stadt ist noch nicht gelistet? Kontaktiere uns einfach unter:{' '}
          <a href="https://chefone.zendesk.com/hc/en-us/requests/new">
            support
          </a>
        </Row>
      </div>
    </FooterWizardLayout>
  );
});

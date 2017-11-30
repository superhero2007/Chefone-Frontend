// @flow

export * as fixtures from './fixtures';

import React from 'react';
import DinnerImages from '../DinnerImages';
import { fixedCSSModules } from '../../../utils';
import styles from './index.module.less';
const applyStyles = fixedCSSModules(styles, { allowMultiple: true });
import R from 'ramda';
import FooterWizardLayout from '../../FooterWizardLayout';
import ChefInfoForm from '../ChefInfoForm';
import CityImageBlock from '../CityImageBlock';
import PriceBlock from '../PriceBlock';
import CityImagePriceColumn from '../CityImagePriceColumn';
import withSimpleState from '../../../utils/withSimpleState';
import withSimpleReducer from '../../../utils/withSimpleReducer';
//import type { ParseGeoPointType } from '../../../parseApi/src/runtime';
import { getRawEventServiceFeeFunc } from '../../../selectors';
import { loc } from '../../../localization';
import type { Changeble } from '../../../utils/withSimpleState';
import { Row, Col } from 'react-flexbox-grid';
// import CityImageBlock from '../CityImageBlock';

import ValidationDecorator, {
  checkCompose,
  progressPendingPromise,
  toPlainObject,
} from '../../../decorators/ValidationDecorator';

const FormDinnerImages = ValidationDecorator()(props => (
  <DinnerImages {...props} />
));

export type PropsT = {
  feePercent: number,
  foodImages: Array<any>,
  city: {
    city_image: {
      url: string,
    },
    city: string,
  },
  countryName: string,
  price: number,
  currency: Object,
  category: string,
  onNextClick: Function,
  onBackClick: Function,
  onSubmitForm: Function,
};

export type InnerPropsT = PropsT & {
  nextButtonState: Changeble<string>,
  phoneNumberChangeble: Changeble<string>,
  locationChangeble: Changeble<string>,
  addressChangeble: Changeble<string>,
  locationDetailsChangeble: Changeble<string>,
  priceChangeble: Changeble<string>,
  categoryChangeble: Changeble<string>,
  foodImagesChangeble: Object,
};

export default R.compose(
  withSimpleState('nextButtonState', ({ nextButtonState }) => nextButtonState),
  R.compose(
    withSimpleState(
      'phoneNumberChangeble',
      ({ phoneNumber }) => phoneNumber || '',
      checkCompose(value => !value && loc.errors.NO_PHONE_ERROR_TEXT),
    ),
    withSimpleState(
      'addressChangeble',
      ({ address }) => address,
      checkCompose(value => !value && loc.errors.NO_ADDRESS_ERROR_TEXT),
    ),
    withSimpleState('locationChangeble', ({ location }) => location),
    withSimpleState(
      'locationDetailsChangeble',
      ({ locationDetails }) => locationDetails,
    ),
    withSimpleState(
      'priceChangeble',
      ({ price }) => price,
      checkCompose(value => !value && loc.errors.NO_PRICE_ERROR_TEXT),
    ),
    withSimpleState('categoryChangeble', ({ category }) => category),
    withSimpleReducer(
      'foodImagesChangeble',
      {
        REMOVE: (state, { payload: { index } }) => R.update(index, null, state),
        UPLOAD: (state, { payload: { index, img } }) =>
          R.update(index, img, state),
      },
      ({ foodImages }) => foodImages,
      checkCompose(
        ([img1, img2, img3]) =>
          !img1 && !img2 && !img3 && loc.errors.MIN_ONE_IMAGE_ERROR_TEXT,
      ),
    ),
  ),
  applyStyles,
)(props => {
  const {
    nextButtonState,
    feePercent,
    countryName,
    currency,
    city,
    foodImagesChangeble,
    locationDetailsChangeble,
    locationChangeble,
    phoneNumberChangeble,
    addressChangeble,
    priceChangeble,
    categoryChangeble,
    onNextClick,
    onBackClick,
    onSubmitForm,
  }: InnerPropsT = props;
  const { city_image, city: cityName } = city;
  const { url: cityImage } = city_image || {};
  const getStateToSave = props => ({
    phoneNumber: {
      ...props.phoneNumberChangeble,
      value: parseInt(props.phoneNumberChangeble.value.replace(/\D/g, '')),
    },
    price: {
      ...props.priceChangeble,
      value: props.priceChangeble.value
        ? parseInt(props.priceChangeble.value)
        : null,
    },
    address: props.addressChangeble,
    location: {
      ...props.locationChangeble,
      value: props.locationChangeble.value
        ? props.locationChangeble.value
        : null,
    },
    locationDetails: props.locationDetailsChangeble,
    category: props.categoryChangeble,
    foodImages: props.foodImagesChangeble,
  });

  return (
    <FooterWizardLayout
      loadable
      nextButtonState={nextButtonState.value}
      onNextClick={async () => {
        const myProgressBarClickProc = progressPendingPromise(nextButtonState);
        const stateToSubmit = getStateToSave(props);

        await onSubmitForm(stateToSubmit);
        try {
          const result = await myProgressBarClickProc(() => Promise.resolve())(
            stateToSubmit,
          );
          await onNextClick(result);
          nextButtonState.onChange('success');
        } catch (e) {
          console.log(e);
          nextButtonState.onChange('error');
        }
      }}
      onBackClick={() => onBackClick(toPlainObject(getStateToSave(props)))}
    >
      <div styleName="create-event-container" className="container">
        <h1 className="text-center">Event erstellen</h1>
        <h4 className="text-center">Fülle folgende Felder aus</h4>
        <Row className="hide-mobile">
          <Col xs={8} styleName="chef-info-dinner-col">
            <Row>
              <Col xs={12}>
                <ChefInfoForm
                  locationDetails={locationDetailsChangeble}
                  location={locationChangeble}
                  phoneNumber={phoneNumberChangeble}
                  address={addressChangeble}
                />
              </Col>
            </Row>
            <Row styleName="second-row">
              <Col xs={12}>
                <FormDinnerImages
                  {...foodImagesChangeble}
                  onRemoveImage={foodImagesChangeble.REMOVE}
                  onUploadImage={foodImagesChangeble.UPLOAD}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={4}>
            <CityImagePriceColumn
              feePercent={feePercent}
              countryName={countryName}
              currency={currency}
              city={props.city}
              price={priceChangeble}
              category={categoryChangeble}
            />
          </Col>
        </Row>
        <div className="hide-desktop" styleName="mobile-col">
          <Row>
            <Col xs={12}>
              <CityImageBlock
                cityImage={cityImage}
                cityName={cityName}
                countryName={countryName}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <ChefInfoForm
                locationDetails={locationDetailsChangeble}
                location={locationChangeble}
                phoneNumber={phoneNumberChangeble}
                address={addressChangeble}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <FormDinnerImages
                {...foodImagesChangeble}
                onRemoveImage={foodImagesChangeble.REMOVE}
                onUploadImage={foodImagesChangeble.UPLOAD}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <PriceBlock
                currency={currency}
                price={priceChangeble}
                category={categoryChangeble}
                calcFee={(price: number) =>
                  getRawEventServiceFeeFunc(price, feePercent)
                }
                calcGuestPrice={(price: number) =>
                  price + getRawEventServiceFeeFunc(price, feePercent)
                }
              />
            </Col>
          </Row>
        </div>
      </div>
    </FooterWizardLayout>
  );
});

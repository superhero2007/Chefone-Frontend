//@flow

import React from 'react';

import GoogleMap from 'google-map-react';
import GreatPlace from './GreatPlaceWithStick';

const GMap = ({
  center,
  zoom,
  children,
}: {
  center?: Object,
  zoom?: number,
  children?: Object,
}) => (
  <GoogleMap
    defaultCenter={center}
    defaultZoom={zoom}
    options={{ scrollwheel: false }}
  >
    {children}
  </GoogleMap>
);

GMap.defaultProps = {
  center: { lat: 59.938043, lng: 30.337157 },
  zoom: 9,
};

export type CoordsT = {
  longitude: number,
  latitude: number,
};

export const GMapCenteredOnPlace = ({
  placeCoords,
  zoom,
}: {
  placeCoords: CoordsT,
  zoom: number,
}) => {
  const convertedCoords = {
    lat: placeCoords.latitude,
    lng: placeCoords.longitude,
  };
  return (
    <GMap center={convertedCoords} zoom={zoom}>
      <GreatPlace {...convertedCoords} />
    </GMap>
  );
};

export default GMap;

// @flow
//
import { ParseGeoPoint } from '../../parseApi/src/runtime';
import type { ParseGeoPointType } from '../../parseApi/src/runtime';

// import R from 'ramda'

// const finalAddress = R.compose(
//   (str)=>str.split(' ').join('+'),
//   (arr)=>arr.join(' ,'),
//   R.filter((objectId)=>objectId)
// )([
//   apartment,
//   street,
//   city,
//   zip,
//   country
// ])

// EXAMPLE: '{"apartment":25,"street":"Abbestraße","city":"Hamburg"}'
export const findCoordsByAddress = async ({
  address,
}: {
  address: string,
}): Promise<{ location: ParseGeoPointType | null }> => {
  // const country = 'Germany';
  const response = await fetch(
    encodeURI(
      `https://maps.google.com/maps/api/geocode/json?address=${
        address
      }&sensor=false&language=en`,
    ),
  );
  const json = await response.json();
  if (!json.results || !json.results.length) {
    return {
      location: null,
    };
  }
  const { results: [{ geometry: { location: { lat, lng } } }] } = json;
  return {
    location: ParseGeoPoint(parseFloat(lat), parseFloat(lng)),
  };
};

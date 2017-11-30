// @flow

import R from 'ramda';

const res = {
  omnivore: 'omnivore',
  vegetarian: 'vegetarian',
  vegan: 'vegan',
};

export const nutritionNumberMap = {
  [res.omnivore]: 1,
  [res.vegetarian]: 2,
  [res.vegan]: 3,
};

export const numberNutritionMap = R.invertObj(nutritionNumberMap);

export type Type = $Keys<typeof res>;

export const toDbNutrition = (a: Type): number => {
  if (a === res.omnivore) {
    return 1;
  }
  if (a === res.vegetarian) {
    return 2;
  }
  if (a === res.vegan) {
    return 3;
  }

  throw Error('no such nutrition');
};
export default res;

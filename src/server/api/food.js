// @flow

import R from 'ramda';

import { Food, Chef } from '../../parseApi/api';
import { ParseFile } from '../../parseApi/src/runtime';

export const nutritionMap = {
  omnivore: 1,
  vegetarian: 2,
  vegan: 3,
};

// {"chefId":"AJDzeZEMPo","title":"3232323","foodDescription":"32323","nutrition":"vegetarian","foodImages":[null,null,null]}
// '{"chefId":"AJDzeZEMPo","title":"3232323","foodDescription":"32323","nutrition":"vegetarian","foodImages":["data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",null,null]}'
export const updateFood = async ({
  foodId,
  chefId,
  title,
  foodDescription,
  foodImages,
  nutrition,
}: {
  foodId: ?string,
  chefId: string,
  title: string,
  foodDescription: string,
  foodImages: Array<string | null>,
  nutrition: string,
}) => {
  console.log('foodId provided ', foodId);
  const oldFood = foodId ? await Food.GetById(foodId) : null;

  console.log('convert image files...');
  const foodImagesFiles = (files =>
    files.map((image, i) => {
      if (oldFood && image && !image.startsWith('data:')) {
        return oldFood[`image${i}`];
      }

      return image ? ParseFile(`image${i + 1}.jpg`, { base64: image }) : null;
    }))(foodImages);

  let newFoodImagesFiles = R.map(file => Promise.resolve(file))(
    foodImagesFiles,
  );
  console.log('convert image files...');
  newFoodImagesFiles = await Promise.all(newFoodImagesFiles);
  console.log('converted');

  const foodImagesObject = R.compose(R.fromPairs, files =>
    files.map((file, i) => [`image${i + 1}`, file]),
  )(newFoodImagesFiles);

  const finalNutrition = nutritionMap[nutrition];

  if (!finalNutrition) {
    throw Error(`nutrition - ${nutrition} is invalid`);
  }

  console.log('updating food:', foodId);

  const resultId = await Food.setOrCreate({
    objectId: foodId ? foodId : undefined,
    chef: Chef.Pointer(chefId),
    title,
    ...foodImagesObject,
    food_description: foodDescription,
    nutrition: nutritionMap[nutrition],
  });
  console.log('resultId', resultId);

  return resultId;
};

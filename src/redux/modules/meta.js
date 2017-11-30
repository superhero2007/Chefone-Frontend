// @flow

import { createAction, handleActions } from 'redux-actions';

const UPDATE_META = 'UPDATE_META';

type paramsT = {
  title?: string,
  image?: {
    src: string,
    width: number,
    height: number,
  },
  description?: string,
  keywords?: string,
  googleStructuredData?: Object | Array<Object>,
};

export const updateMeta = (a: paramsT) => createAction(UPDATE_META)(a);

const siteName = { property: 'og:site_name', content: 'CHEF.ONE' };

const defaultState = {
  title: 'CHEF.ONE',
  meta: [siteName],
};

export default handleActions(
  {
    UPDATE_META: (
      state,
      {
        payload: { title, image, description, keywords, googleStructuredData },
      }: { payload: paramsT },
    ) => {
      const limitedDescription = description && description.slice(0, 160);
      const limitedTitle = title && title.slice(0, 60);
      return {
        title: limitedTitle,
        script: googleStructuredData
          ? [
              {
                type: 'application/ld+json',
                innerHTML: JSON.stringify(googleStructuredData),
              },
            ]
          : [],
        meta: [
          siteName,
          ...(title
            ? [
                { property: 'og:title', content: title },
                { property: 'title', content: title },
              ]
            : []),
          ...(image
            ? [
                { property: 'og:image', content: image.src },
                { property: 'og:image:width', content: image.width || 600 },
                { property: 'og:image:height', content: image.height || 400 },
              ]
            : []),
          ...(limitedDescription
            ? [
                { property: 'og:description', content: limitedDescription },
                { name: 'description', content: limitedDescription },
              ]
            : []),
          ...(keywords ? [{ property: 'keywords', content: keywords }] : []),
        ],
      };
    },
  },
  defaultState,
);

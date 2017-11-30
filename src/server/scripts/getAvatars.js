//@flow

import R from 'ramda';
import { _User } from '../../parseApi/api';

// var base64 = require('node-base64-image');

// const downloadBase64Image = (url)=>new Promise((resolve)=>{
//   var options = {string: true};
//   base64.encode(url, options, function (err, image) {
//     if (err) {
//         console.log(err);
//     }
//     resolve(image)
//   });
// })

const getNthUser = (n: number) => async () =>
  await _User.Get({
    limit: 100,
    skip: n * 100,
  });

async function* createAsyncIterable(syncIterable) {
  for (const elem of syncIterable) {
    const res = await elem();
    const filter = R.filter(({ avatar, authData }) => {
      // if (duplicate === 'restored-image') {
      //   return false;
      // }
      if (!avatar && !!authData && !!authData.facebook) {
        return true;
        // return moment().isBefore(authData.facebook.expiration_date)
      }
      return false;
    });

    //$FlowIssue
    yield* filter(res);
  }
}

const delay = sec => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), sec);
  });
};

export const getAvatars = async () => {
  const res = (async function*() {
    const createIterable = R.compose(R.map(getNthUser), R.times(R.identity));

    const gen = createAsyncIterable(createIterable(800 / 100));
    var fetch = require('node-fetch');
    let i = 0;
    for await (const { firstName, avatar, authData } of gen) {
      console.log();
      console.log(i++, firstName, avatar, authData);
      if (authData.facebook && authData.facebook.id) {
        const id = authData.facebook.id;
        const imageUrl = `https://graph.facebook.com/${
          id
        }/picture?width=500&height=500&redirect=false`;

        //$FlowIssue
        const response = await fetch(imageUrl);
        console.log(response.status);
        // const {data:{url}} = await response.json();

        // let base64Data = await downloadBase64Image(url)
        // const contentType = 'image/jpeg'
        // // const imageResponse = await fetch(url)
        // // console.log(imageResponse)
        // // const contentType = imageResponse.headers.get('content-type')
        // // console.log(contentType)
        // const prefix = `data:${contentType};base64,`;
        // // const txt = await imageResponse.text();
        // // const base64 = new Buffer(txt).toString('base64');
        // base64Data = prefix + base64Data;
        // await _User.Set({
        //   objectId,
        //   avatar:ParseFile(`avatar-${objectId}`, {base64:base64Data}),
        //   duplicate:'restored-image',
        // })

        console.log(i);
      }

      // if(url && R.contains('files.parsetfss.com')(url)) {
      //   console.log('=>> old link: ', url)
      //   console.log('=>> delete image...');
      //   // await delay(500);
      //   await _User.Set({
      //     objectId,
      //     avatar:null,
      //   })
      //   console.log('=>> image deleted!');
      // }

      console.log();
    }
    return yield true;
  })();
  const t = await res.next();
  console.log(t);
  return delay(500000);
};

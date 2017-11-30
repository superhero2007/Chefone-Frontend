//@flow

import R from 'ramda';
import moment from 'moment';
import { Order } from '../../parseApi/api';

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

const mom = moment().subtract(3, 'day');
const getNthOrder = (n: number) => async () =>
  await Order.Get({
    equalTo: [Order.Field.emailed(true)],
    greaterThan: Order.Field.createdAt(mom.toDate()),
    limit: 100,
    skip: n * 100,
  });

async function* createAsyncIterable(syncIterable) {
  for (const elem of syncIterable) {
    const res = await elem();
    const filter = id => !!id;

    //$FlowIssue
    yield* filter(res);
  }
}

const delay = sec => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), sec);
  });
};

export const run = async () => {
  const res = (async function*() {
    const createIterable = R.compose(R.map(getNthOrder), R.times(R.identity));

    const gen = createAsyncIterable(createIterable(800 / 100));

    let i = 0;
    for await (const order of gen) {
      console.log(order);

      console.log(i++);
    }
    return yield true;
  })();
  const t = await res.next();
  console.log(t);
  return delay(500000);
};

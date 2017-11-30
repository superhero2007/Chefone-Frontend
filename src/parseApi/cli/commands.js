import fx from './fx';
import R from 'ramda';

import * as api from '../api';

export default vorpal => {
  vorpal.command('sum [params...]').action(
    fx(async (ctx, { params }) => {
      console.log(params.reduce((x, y) => x + y, 0));
    }),
  );

  vorpal
    .command('api [params...]')
    .option('-j, --json <data>', 'data in json format')
    .action(
      fx(async (ctx, args) => {
        const pairs = R.toPairs(api);
        const { params, options } = args;

        console.log('args', args);

        if (!params.length) {
          console.log('Api classes:');

          const res = R.compose(
            R.map(([key, val]) =>
              [key, `${Object.keys(val).length} methods`].join(' - '),
            ),
          )(pairs);
          console.log(res.join('\n'));
        } else {
          const [className, methodName, ...methodParams] = params;
          if (params.length >= 1) {
            const classInst = api[className];
            if (!classInst) {
              console.log(`No such class as ${className}`);
              return;
            }

            if (params.length === 1) {
              console.log(`Class <${className}>:`);
              console.log(Object.keys(classInst).join('\n'));
              return;
            }

            if (params.length >= 2) {
              const methodInst = classInst[methodName];
              if (!methodInst) {
                console.log(
                  `No such method as ${methodName} in class ${className}`,
                );
                return;
              }

              // if(params.length === 2) {
              //   console.log(`Method <${className}.${methodName}>:`);
              //   console.log(methodInst)
              //   return
              // }

              try {
                console.log(`--- Running <${className}.${methodName}> ---`);
                console.log('methodParams', methodParams);

                let paramOne = methodParams[0];
                try {
                  const { json } = options;
                  if (json) {
                    paramOne = json.split("\\'").join('"');
                  }
                  paramOne = JSON.parse(paramOne);
                  console.log(paramOne);
                } catch (e) {
                  console.log(e);
                }

                const methodResult = await methodInst(paramOne);
                console.log('RESULT: ');
                console.log(methodResult);
              } catch (e) {
                console.log(e);
              }
            }
          }
        }
      }),
    );
};

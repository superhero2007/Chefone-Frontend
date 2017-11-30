# Terms:

low level api: client wrappers for parse, 1 to 1 to it example: Update Order,
create Review high level api: data what components need to display themselves
and business logic example: fetching data for routes,
https://chef.one/event/{id} , https://chef.one/order/{id}, getOrders for review
reminder mail, send/read message, make payment

# Goal

have type safed, runtime validated generated low level parse api (via swagger)
&& once we have this we can move to high level api (graphql)

Low level gives us (swagger with flow)

* checks in compile time
* propagation for rest(parse in our case) endpoint api changes
* ability to share code and types between microservices

High level api gives us:

* efficient one round trip xhr calls
* solid language to describe components dependacies
* tools to operate/query on server to quickly iterate
* makes us less dependant on parse, as this is highlevel api

# Plan

* cover existing api with flow (type checker)
* generate js modules on parse.com schema (with flow declarations) via swagger
* make high level api existing api to use generated code
* move low level generated api to npm, use it in frontend as dependancy
* use it in other projects (payment, email)
* wrap with graphQL on client - eliminate all adhoc api methods, replace
  existing highlevel api
* propagate change on selectors deprecate some of them
* wrap server and remove add-hoc queries to debug (servers, gets graphQL so no
  need)

  // cdn.chef.one.s3-eu-west-1.amazonaws.com

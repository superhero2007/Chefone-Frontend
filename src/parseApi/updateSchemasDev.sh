curl -X GET \
-H "X-Parse-Application-Id: dCu1H3zQvQdebNowXwiLYFSJpYrGJHBUk7LIoAS8" \
-H "X-Parse-Master-Key: 35ttQFi4i23FK0VJdJ1qs1AukmQTGRLrH4Ytquq6" \
https://c1-dev-parse.chef.one/parse/schemas | python -m json.tool > schemas.json


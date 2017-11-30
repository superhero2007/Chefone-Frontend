curl -X GET \
-H "X-Parse-Application-Id: Blx8qxwUngtgM36BawekRClJsuOUXAQrval8FFvF" \
-H "X-Parse-Master-Key: jYcCT2JAxetaUYBKfFPAQiCq2Z134YnHYrU0fsjr" \
https://c1-prod-parse.chef.one/parse/schemas | python -m json.tool > schemas.json

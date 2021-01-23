# Steps to populate your db with fake data
1. edit the ~/api/ormconfig.json file and fill in your db info
2. create the database you have named in ~/api/ormconfig.json
3. exeucte `npm install`
4. execute `npm run fakedata` ctrl+c when done
5. execute `npm run fakedata2` ctrl+c when done
6. execute `npm run verify` to make sure the math checks out between orders,
   order_items, and items ctrl+c when done
6. execute `npm run serve` to activate api server
7. For postman testing, make sure that you do not add / alter the database as
   it may cause some of the tests to fail
8. Owner login information is email:`Owner` password:`Owner` (ideally we set this
   up with whatever login you desire)
9. Item tags are randomized to start with. The three major category tags are
   spice, herb, and blend.

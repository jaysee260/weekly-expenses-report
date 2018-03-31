'use strict';

///////////////////////////
/////   root route   /////
/////////////////////////

// const bodyParser = require('body-parser');

const root = (router) => {
  // router.use(bodyParser.json());
  router.use((req, res, next) => {
    const msg = `
    <pre>

    ----- weekly budget tracker -----

        Site under construction.
        Please come back later.

    </pre>
  `;
    res.send(msg);
  });
}

module.exports = root;

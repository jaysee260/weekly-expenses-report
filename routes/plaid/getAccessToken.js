
// invokes plaid method that generates access token

const getAccessToken = (router) => {
  router.post('/', (req, res, next) => {
    console.log('you\'ve reached get_access_token route');
    res.json({
      status: 'under construction...',
      msg: 'you\'ve reached get_access_token route.'
    });
    next();
  });
}

module.exports = getAccessToken;
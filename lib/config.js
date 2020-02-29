const _config = {
  region: 'ca-central-1',
  userpoolId: '',
  clientId: '',
  clientSecret: '',
};

const updateRegion = region => {
  _config.region = region;
};

module.exports = {
  updateRegion,
  config: _config,
};

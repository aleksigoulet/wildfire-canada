module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      // the lines below cause compile errors but are included when installing 
      // commented out for now
      // ['@babel/preset-env', {targets: {node: 'current'}}],
      // '@babel/preset-typescript'
    ],
  };
};

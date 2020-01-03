module.exports = function () {
  const plugins = [
    'babel-plugin-styled-components',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-class-properties',
  ];

  return {
    plugins,
  };
};

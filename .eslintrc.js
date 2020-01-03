module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": [
    "plugin:react/recommended",
    "airbnb"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "react/destructuring-assignment": 1,
    "react/jsx-filename-extension": [
      2,
      { "extensions": [".js", ".jsx"] }
    ],
    "no-const-assign": 1,
    "no-this-before-super": 1,
    "no-undef": 1,
    "no-unreachable": 1,
    "no-unused-vars": [2, { "argsIgnorePattern": "^_" }],
    "constructor-super": 1,
    "valid-typeof": 1,
    "global-require": 0,
    "no-console": 0,
    "max-len": 1,
    "no-alert": 0,
    "import/no-extraneous-dependencies": 0,
    "import/extensions": 0,
    "import/no-unresolved": 0,
    "no-plusplus": 0,
    "no-continue": 0,
    "react/prop-types": 1,
    "react/state-in-constructor": 0,
    "react/jsx-uses-react": 1,
  },
  "globals": {
    "navigator": true
  },
  "plugins": [
    "react",
    "import"
  ],
};

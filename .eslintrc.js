module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "parser": "babel-eslint",
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  "settings": {
    "react": {
      "pragma": "React",
      "version": "16.3",
    },
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "indent": [
      "error",
      2
    ],
    "max-len": [
      0,
      80,
    ],
    "no-undef": [
      0
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ],
    "react/prop-types": [
      0
    ]
  }
};

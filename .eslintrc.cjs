module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2022: true
  },
  globals: {
    Chart: 'readonly',
    beforeEach: 'readonly'
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential'
  ],
  plugins: ['vue'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-unused-vars': 'warn',
    'no-unused-vars': 'warn'
  },
  overrides: [
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    }
  ],
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'coverage/',
    '*.min.js'
  ]
}
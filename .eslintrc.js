module.exports = {
    parser: 'vue-eslint-parser',
    "parserOptions": {
        "sourceType": "module"
    },
    extends: ["plugin:vue/essential"],
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    rules: {
        'no-console': 'off',
    },
    plugins: [
        'vue',
    ],
    globals: {
        BMap: true
    }
}


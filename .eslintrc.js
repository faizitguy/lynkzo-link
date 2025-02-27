module.exports = {
	'env': {
		'browser': true,
		'commonjs': true,
		'es2021': true
	},
	'extends': 'eslint:recommended',
	'parserOptions': {
		'ecmaVersion': 12
	},
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'no-useless-catch': [
			'off'
		],
		'space-in-parens': [
			'error',
			'always'
		],
		'object-curly-spacing': [
			'error',
			'always'
		],
		'array-bracket-spacing': [
			'error',
			'always'
		],
		'padded-blocks': [
			'error',
			'always'
		]
	}
};

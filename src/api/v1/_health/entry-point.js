module.exports = [
	{
		method: 'GET',
		handler: () => 'Health check complete',
		path: '/',
		config: {
			auth: false,
		}
	}
];
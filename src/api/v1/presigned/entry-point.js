const presignedLinkHandler = require( './domain' );

module.exports = [
	{
		method: 'GET',
		handler: presignedLinkHandler.getPresignedLink,
		path: '/',
		config: {
			auth: false,
		}
	}
];
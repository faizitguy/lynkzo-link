const HapiPino = require( 'hapi-pino' );

const plugins = [
	{
		plugin: HapiPino,
		options: {
			getChildBindings: request => ( {
				method: request.method,
				path: request.path,
				ip: request.info.remoteAddress,
			} ),
			ignorePaths: [ '/_health' ],
		},
	},
	{
		plugin: './router',
		options: {},
	},
];
exports.register = async function register( server ) {

	try {

		await Promise.all( plugins.map( async ( { plugin, options } ) => {

			if ( typeof plugin === 'string' ) {

				plugin = require( plugin );

			}

            
			try {
                
				console.log( [ 'startup', 'registering plugin' ], { pluginName: plugin.pkg ? plugin.pkg.name : plugin.name } );

				await server.register( { plugin, options } );

			} catch ( error ) {

				throw error;

			}

		} ) );

		server.log( [ 'startup', 'success' ], 'all plugins successfully registered' );
        

	} catch ( error ) {

		throw error;

	}



};
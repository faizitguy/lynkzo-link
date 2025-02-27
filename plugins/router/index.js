const path = require( 'path' );
const glob = require( 'glob' );
const Logger = require( '../../logger' );

exports.register = function register( server ) {

	const controllerRoutes = glob.sync( path.join( __dirname, '..', '..', 'src', 'api', '**', 'entry-point.js' ) );
	if ( controllerRoutes.length === 0 ) {

		Logger.warn( 'No controllers found' );
		return undefined;

	}

	Logger.debug( { controllers: controllerRoutes.length }, 'enumerated controllers' );

	controllerRoutes.forEach( controllerRoute => {

		const [ version, controller ] = controllerRoute.split( '/' ).slice( -3 );
		Logger.debug( {
			version,
			controller,
		}, 'attaching controller' );

		const routes = require( controllerRoute );
		routes.forEach( route => {

			Logger.trace( {
				method: route.method,
				path: route.path,
				version,
				controller,
			}, 'attaching route' );
            
			route.config = {
				auth: 'simple',
				...route.config,
			};

			server.route( {

				...route,
				path: `/${ version }/${ controller }${ route.path === '/' ? '' : route.path }`,
                
			} );

		} );

	} );

};

exports.pkg = require( './package.json' );

/* eslint-disable no-undef */
'use strict';

const Hapi = require( '@hapi/hapi' );
const Logger = require( '../logger' );
const Plugins = require( '../plugins' );

require('dotenv').config();

let server = null;



async function terminateHttpServerAndExit () {

	if ( server ) {

		await server.stop( { timeout: 10000 } );
		Logger.error( 'Stopped the server successfully' );

	}

	process.exit();

}

async function listenToError () {

	process.on( 'uncaughtException', async ( error ) => {

		Logger.error( 'uncaughtException', error );

	} );

	process.on( 'unhandledRejection', async ( reason ) => {

		Logger.error( 'unhandledRejection', reason );

	} );

	process.on( 'SIGTERM', async () => {

		Logger.error(
			'App received SIGTERM event, try to gracefully close the server'
		);
		await terminateHttpServerAndExit();

	} );

	process.on( 'SIGINT', async () => {

		Logger.error(
			'App received SIGINT event, try to gracefully close the server'
		);
		await terminateHttpServerAndExit();

	} );

}

exports.initializeServer = async function initializeServer() {

	if ( server ) {

		return server;

	}

	try {

		Logger.trace( 'Initializing the server' );

		server = Hapi.server( {
			port: 4000,
			host: 'localhost'
		} );

		await Plugins.register( server );


		server.events.on( 'response', request => {

			request.logger.info( {
				credentials: request.auth.credentials || '[UNAUTHENTICATED]',
				ipAddress: request.headers[ 'x-forwarded-for' ] || request.info.remoteAddress,
				statusCode: request.response.statusCode,
			}, 'request successfully completed' );
    
		} );

		server.ext( 'onPreResponse', async ( request, h ) => {

			try {
    
				return h.continue;
            
			} catch ( error ) {
    
				console.error( error );
				const response = {
					statusCode: 500,
					error: 'Internal Server Error',
					message: 'An internal server error occurred',
				};
				return h.response( response ).code( 500 );
            
			}
        
		} );

		return server;

	} catch( error ) {

		throw error;

	}

};

exports.startServer = async function startServer() {

	server.log( [ 'startup', 'starting' ], 'Starting the server' );

	await server.start();
    
	server.log( [ 'startup', 'success' ], `The server is running on ${server.info.uri}` );

	await listenToError();

};

exports.stopServer = async function stopServer() {

	const timeoutMillisecond = 10000;
	server.log( [ 'process', 'stopping server' ], `Gracefully stopping server in ${timeoutMillisecond/1000} seconds` );

	try {
		
		await server.stop( { timeout: timeoutMillisecond } );
		Logger.info( 'Server stopped, exiting the process smoothly' );
		process.exit( 0 );

	} catch ( error ) {
		
		Logger.error( error );
		throw error;

	}

};
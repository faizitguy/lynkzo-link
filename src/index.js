const { initializeServer, startServer , stopServer } = require( './server' );

async function startApplication() {

	try {
        
		await initializeServer();
		await startServer();
	
	} catch ( error ) {
        
		console.error( 'Error while starting the application', error );
	
	}

}

startApplication();
const pino = require( 'pino' );
const config = require( './src/config' );

const pinoInstance = pino( config.get( '/logging/instance' ) );

module.exports = pinoInstance;
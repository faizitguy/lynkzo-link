const confidence = require( 'confidence' );
const store = new confidence.Store( require( './config.json' ) );

module.exports = store;
const AWS = require('aws-sdk');

// Configure AWS SDK with your credentials
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Use environment variables
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION 
});

const s3 = new AWS.S3({
    region: process.env.AWS_REGION,  
    signatureVersion: "v4"
});

module.exports = {
	async getPresignedLink(request, h) {
		console.log("AWS_ACCESS_KEY_ID:", process.env.AWS_ACCESS_KEY_ID);
		console.log("AWS_SECRET_ACCESS_KEY:", process.env.AWS_SECRET_ACCESS_KEY);
		console.log("AWS_REGION:", process.env.AWS_REGION);

        try {
            const params = {
                Bucket: 'lynkzo-assess', // Your S3 bucket name
                Key: 'lynkzo-img1.jpg', // The file name in S3
                Expires: 6000 // Expiration time in seconds (default: 6000s)
            };

            const signedUrl = await s3.getSignedUrlPromise('getObject', params);

            return {
                data: signedUrl
            };

        } catch (error) {
            console.error("Error generating pre-signed URL:", error);
            return h.response({ error: 'Could not generate pre-signed URL' }).code(500);
        }
    }
};

const AWS = require('aws-sdk');

// Configure AWS SDK with your credentials
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Use environment variables
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: 'ap-south-1'
});


const s3 = new AWS.S3({
    region: 'ap-south-1',  
    signatureVersion: "v4"
});

module.exports = {
	async getPresignedLink(request, h) {

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

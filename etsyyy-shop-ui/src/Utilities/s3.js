import aws from 'aws-sdk'

const config = {
    "bucketName":process.env.AWS_S3_BUCKET_NAME,
    "region": process.env.AWS_REGION,
    "accessKeyId": process.env.AWS_ACCESS_KEY,
    "secretAccessKey": process.env.AWS_SECRET_KEY,
    "signatureVersion": "v4"
}

export const bucketName = config.bucketName

export const s3 = new aws.S3({
    region: config.region,
    signatureVersion: config.signatureVersion,
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
})
require('dotenv').config();

const config = {
  dbUser: process.env.DB_USER,
  dbName: process.env.DB_NAME,
  dbPassword: process.env.DB_PASSWORD,
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 5000,
  dbUrl: process.env.DATABASE_URL,
  //
  bucketName: process.env.AWS_BUCKET_NAME,
  bucketRegion: process.env.AWS_BUCKET_REGION,
  publicKey: process.env.AWS_PUBLIC_KEY,
  secretKey: process.env.AWS_KEY_SECRET,
}

module.exports = { config };
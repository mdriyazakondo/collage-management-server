import dotend from 'dotenv';
import path from 'path';

dotend.config({ path: path.join(process.cwd(), '.env') });
const DB_NAME = process.env.DATABASE_NAME;
const NODE_ENV = process.env.NODE_ENV;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

if (!process.env.PORT) {
  throw new Error('PORT is not defined');
}

const port = process.env.PORT || '5000';
const databaseUrl = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@cluster0.pvixvzy.mongodb.net/collage_management_system?appName=Cluster0`;
// const databaseUrl = `mongodb+srv://accounting_department:8LgeWgXqBUxRcQ3k@cluster0.pvixvzy.mongodb.net/medicophile?appName=Cluster0`;
export default {
  port,
  database_url: databaseUrl,
  NODE_ENV,
  JWT_REFRESH_SECRET,
  JWT_ACCESS_SECRET,
};

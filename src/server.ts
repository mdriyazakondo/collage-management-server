import mongoose from 'mongoose';
import config from './app/utils/config';
import app from './app';

async function main(): Promise<void> {
  try {
    await mongoose.connect(config.database_url as string);

    console.log('Database connected');

    const startPort = parseInt(config.port);
    let currentPort = startPort;
    let attempts = 0;
    const maxAttempts = 10;

    const tryListen = () => {
      const server = app.listen(currentPort, () => {
        console.log(`✓ Server listening on port ${currentPort}`);
      });

      server.on('error', (err: any) => {
        if (err.code === 'EADDRINUSE' && attempts < maxAttempts) {
          attempts++;
          currentPort++;
          console.log(
            `Port ${currentPort - 1} is in use, trying port ${currentPort}...`,
          );
          tryListen();
        } else {
          console.error('❌ Unable to start server:', err.message);
          process.exit(1);
        }
      });
    };

    tryListen();
  } catch (err) {
    console.log('❌ Connection error:', err);
    process.exit(1);
  }
}

main();

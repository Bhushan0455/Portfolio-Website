import { execSync } from 'child_process';
import process from 'process';

if (process.env.VERCEL === '1' || process.env.CI === 'true') {
  console.log('Skipping react-snap pre-rendering in Vercel/CI build environment to avoid headless Chrome dependency errors.');
  process.exit(0);
}

try {
  console.log('Running react-snap static pre-rendering...');
  execSync('npx react-snap', { stdio: 'inherit' });
} catch (error) {
  console.error('react-snap execution failed:', error);
  process.exit(1);
}

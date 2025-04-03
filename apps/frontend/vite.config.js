import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react({
        // Temporarily remove babel-plugin-react-compiler for stability
        // babel: {
        //   plugins: [
        //     [
        //       "babel-plugin-react-compiler",
        //       {
        //         sources: (filename) => {
        //           return filename.includes('src/path/to/dir');
        //         },
        //       },
        //     ],
        //   ],
        // },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'), // Alias for src directory
      },
    },
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV), // Define global APP_ENV
      ...Object.keys(env).reduce((acc, key) => {
        acc[`process.env.${key}`] = JSON.stringify(env[key]); // Define process.env variables
        return acc;
      }, {}),
    },
    envPrefix: 'VITE_', // Prefix for environment variables

    // Optimize dependencies
    optimizeDeps: {
      include: [
        'apollo-upload-client', // Force Vite to optimize apollo-upload-client
        'jquery', // Add other CommonJS dependencies if needed
        'bootstrap',
      ],
    },

    // Build configuration
    build: {
      commonjsOptions: {
        include: [
          /node_modules/, // Include all node_modules
          /apollo-upload-client/, // Treat apollo-upload-client as CommonJS
          /jquery/, // Add other CommonJS dependencies if needed
          /bootstrap/,
        ],
      },
    },
  };
});
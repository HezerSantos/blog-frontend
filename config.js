const config = {
    production: {
      apiUrl: "https://blog-backend-production-6a28.up.railway.app"
    },
    development: {
      apiUrl: "http://localhost:8080"
    }
  };

const currentConfig = process.env.NODE_ENV === 'production'
? config.production
: config.development;

export default currentConfig;
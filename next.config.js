/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true, // to use Server Actions in Beta
    },
    webpack: (config, { isServer, buildId, dev, webpack }) => {
        if (!isServer) {
          config.resolve.fallback = {
            ...config.resolve.fallback,
            stream: require.resolve('stream-browserify'),
            crypto: require.resolve('crypto-browserify'),
          };
    
          config.plugins.push(
            new webpack.ProvidePlugin({
              process: 'process/browser',
            }),
            new webpack.NormalModuleReplacementPlugin(
              /node:crypto/,
              (resource) => {
                resource.request = resource.request.replace(/^node:/, '');
              }
            )
          );
        }
        return config;
  },
  images: {
    domains: ['dgolzsqzhofrhjkkxjxp.supabase.co'],
  },
    
};

module.exports = nextConfig

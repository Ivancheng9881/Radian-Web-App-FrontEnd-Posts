module.exports = {
  style: {
    reactStrictMode: true,
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  webpack: {
    configure: {
      module: {
        rules: [
          {
            type: 'javascript/auto',
            test: /\.mjs/,
            use: [],
          }
        ]
      }
    }
  }
}
  
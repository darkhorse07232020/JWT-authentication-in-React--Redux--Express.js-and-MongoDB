const colors = {
  primary: '#0F2231',
  secondary: '#F2CB05',
  darkBlue: '#0F2231',
  lightBlue: '#324755',
  lightGray: '#f3f4f6',
  whiteGray: '#b7bcc4',
};

module.exports = {
  purge: ['./src/**/*.js', './src/**/*.jsx', './src/**/*.ts', './src/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors,
      spacing: {
        '100': "25rem",
      },
      zIndex: {
        '-1': '-1',
        '-10': '-10',
      },
      transformOrigin: {
        "0": "0%",
      },
      minWidth: {
        "8": "2rem",
      },
      maxWidth: {
        "100": "25rem",
      }
    },
  },
  variants: {
    container: [],
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};

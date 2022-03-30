module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    maxWidth: {
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      '4/5': '80%',
     },
    extend: {
      screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      },
      colors: {
        purple: {
          DEFAULT : '#a997c4',
        }
      },
      minHeight: {
        '0': '0',
        '1/4': '25vh',
        '1/2': '50vh',
        '3/4': '75vh',
        'full': '100%',
      },
      backgroundImage: {
        'hero1': "url('/images/page-hero1.jpg')",
        'hero7': "url('/images/page-hero7.jpg')",
        'hero8': "url('/images/page-hero8.jpg')",
        'hero9': "url('/images/page-hero9.jpg')",
      },
    },

  },
  variants: {
    extend: {},
  },
  plugins: [],
}

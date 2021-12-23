const customTheme = {
  primary: '#e34468',
  secondary: '#fafafa',
  primaryDark: '#ac0329',
  white: '#fff',
  black: '#000',
  backgroundLight: '#1E1E1E',
  backgroundDark: '#000000',
  dragonPink: '#eb4b6f',
  lightGray: '#ced4da',
  gray: '#939393',
  success: '#33d68a',
  danger: '#fc6058',
}


module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'display': ['Roboto']
    },
    colors: {
      'theme-primary': customTheme.primary,
      'theme-primaryDark': customTheme.primaryDark,
      'theme-body-1': customTheme.secondary,
      'theme-white': customTheme.white,
      'theme-black': customTheme.black,
      'theme-bg-light': customTheme.backgroundLight,
      'theme-bg-dark': customTheme.backgroundDark,
      'theme-gray': customTheme.gray,
      'theme-lightGray': customTheme.lightGray,
      'theme-success': customTheme.success,
      'theme-danger': customTheme.danger,
      'theme-dragon': customTheme.dragonPink,
    },
    extend: {},
  },
  plugins: [],
}
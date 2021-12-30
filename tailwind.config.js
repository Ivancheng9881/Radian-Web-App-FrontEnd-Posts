const customTheme = {
  primaryDark: '#ac0329',
  darkBlue: '#3B04DE',
  lightBlue: "#5359F6",
  white: '#fff',
  bodyText: "#B9B9B9",
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
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'display': ['Roboto']
    },
    colors: {
      'theme-body-1': customTheme.secondary,
      'theme-white': customTheme.white,
      'theme-body-text': customTheme.bodyText,
      'theme-black': customTheme.black,
      'theme-light-blue': customTheme.lightBlue,
      'theme-dark-blue': customTheme.darkBlue,
      'theme-bg-light': customTheme.backgroundLight,
      'theme-bg-dark': customTheme.backgroundDark,
      'theme-gray': customTheme.gray,
      'theme-lightGray': customTheme.lightGray,
      'theme-success': customTheme.success,
      'theme-danger': customTheme.danger,
      'theme-dragon': customTheme.dragonPink,
    },
    extend: {
      width: {
        '140': '35rem'
      },
    },
  },
  plugins: [],
}

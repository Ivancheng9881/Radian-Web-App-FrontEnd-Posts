const customTheme = {
    primaryDark: '#ac0329',
    darkBlue: '#3B04DE',
    lightBlue: "#5359F6",
    white: '#fff',
    bodyText: "#B9B9B9",
    black: '#000',
    danger: '#fc6058',
    backgroundLight: '#1E1E1E',
    backgroundDark: '#000000',
    lightGray: '#ced4da',
    gray: '#939393',
    success: '#33d68a',
    danger: '#fc6058',
    purple: '#c743f5',
    lightPurple: '#8c9cf8',
    lightGreen: '#7dddbe'
}


module.exports = {
    purge: [
        './src/**/*.{js,jsx}',
        './public/index.html'
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
            'theme-danger': customTheme.danger,
            'theme-light-blue': customTheme.lightBlue,
            'theme-dark-blue': customTheme.darkBlue,
            'theme-purple': customTheme.purple,
            'theme-lightPurple': customTheme.lightPurple,
            'theme-lightGreen': customTheme.lightGreen,
            'theme-bg-light': customTheme.backgroundLight,
            'theme-bg-dark': customTheme.backgroundDark,
            'theme-gray': customTheme.gray,
            'theme-lightGray': customTheme.lightGray,
            'theme-success': customTheme.success,
            'theme-danger': customTheme.danger,
        },
        extend: {
            width: {
                '140': '35rem'
            },
            minWidth: {
                '2/3vw': '66vw'
            }
        },
    },
    plugins: [],
}

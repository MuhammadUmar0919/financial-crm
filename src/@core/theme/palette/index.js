const palette = (mode, skin) => {
  // ** Vars
  const whiteColor = '#FFF'
  const lightColor = '76, 78, 100'
  const darkColor = '234, 234, 255'
  const mainColor = mode === 'light' ? lightColor : darkColor

  const defaultBgColor = () => {
    if (skin === 'bordered' && mode === 'light') {
      return whiteColor
    } else if (skin === 'bordered' && mode === 'dark') {
      return '#30334E'
    } else if (mode === 'light') {
      return '#F7F7F9'
    } else return '#282A42'
  }

  return {
    customColors: {
      dark: darkColor,
      main: mainColor,
      light: lightColor,
      darkBg: '#282A42',
      lightBg: '#F7F7F9',
      bodyBg: mode === 'light' ? '#F7F7F9' : '#282A42',
      trackBg: mode === 'light' ? '#F2F2F4' : '#41435C',
      tooltipBg: mode === 'light' ? '#262732' : '#464A65',
      tableHeaderBg: mode === 'light' ? '#F5F5F7' : '#3A3E5B'
    },
    mode: mode,
    common: {
      black: '#000',
      white: whiteColor
    },
    primary: {
      // lighter: '#D1E9FC',
      // light: '#76B0F1',
      // main: '#2065D1',
      // dark: '#103996',
      // darker: '#061B64',
      // contrastText: whiteColor

      light: '#787EFF',
      main: '#666CFF',
      dark: '#5A5FE0',
      contrastText: whiteColor
    },
    secondary: {
      light: '#7F889B',
      main: '#6D788D',
      dark: '#606A7C',
      contrastText: whiteColor
    },
    error: {
      lighter: '#FFE7D9',
      light: '#FFA48D',
      main: '#FF4842',
      dark: '#B72136',
      darker: '#7A0C2E',
      contrastText: whiteColor
    },
    warning: {
      lighter: '#FFF7CD',
      light: '#FFE16A',
      main: '#FFC107',
      dark: '#B78103',
      darker: '#7A4F01',
      contrastText: whiteColor
    },
    info: {
      lighter: '#D0F2FF',
      light: '#74CAFF',
      main: '#26C6F9',
      dark: '#21AEDB',
      darker: '#1890FF',
      contrastText: whiteColor
    },
    success: {
      lighter: '#E9FCD4',
      light: '#AAF27F',
      main: '#54D62C',
      mains: "#54d62cb3",
      dark: '#229A16',
      darker: '#08660D',
      contrastText: whiteColor
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#F5F5F5',
      A200: '#EEEEEE',
      A400: '#BDBDBD',
      A700: '#616161'
    },
    text: {
      primary: `rgba(${mainColor}, 0.87)`,
      secondary: `rgba(${mainColor}, 0.6)`,
      disabled: `rgba(${mainColor}, 0.38)`
    },
    divider: `rgba(${mainColor}, 0.12)`,
    background: {
      paper: mode === 'light' ? whiteColor : '#30334E',
      default: defaultBgColor()
    },
    action: {
      active: `rgba(${mainColor}, 0.54)`,
      hover: `rgba(${mainColor}, 0.05)`,
      hoverOpacity: 0.05,
      selected: `rgba(${mainColor}, 0.08)`,
      disabled: `rgba(${mainColor}, 0.26)`,
      disabledBackground: `rgba(${mainColor}, 0.12)`,
      focus: `rgba(${mainColor}, 0.12)`
    }
  }
}

export default palette

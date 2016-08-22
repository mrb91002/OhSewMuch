import { blue700, blue500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from 'components/Routes';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  fontFamily: 'Roboto, sans-serif',

  palette: {
    primary1Color: blue500,
    primary2Color: '#F110EC'
    // primary1Color: cyan500,
    // primary2Color: cyan700,
    // primary3Color: grey400,
    // accent1Color: pinkA200,
    // accent2Color: grey100,
    // accent3Color: grey500,
    // textColor: darkBlack,
    // alternateTextColor: white,
    // canvasColor: white,
    // borderColor: grey300,
    // disabledColor: fade(darkBlack, 0.3),
    // pickerHeaderColor: cyan500,
    // clockCircleColor: fade(darkBlack, 0.07),
    // shadowColor: fullBlack,
  },

  flatButton: {
    // color: transparent,
    // buttonFilterColor: '#999999',
    // disabledTextColor: fade(palette.textColor, 0.3),
    // textColor: palette.textColor,
    // primaryTextColor: palette.primary1Color,
    // secondaryTextColor: palette.accent1Color,
    // fontSize: typography.fontStyleButtonFontSize,
    // fontWeight: typography.fontWeightMedium,
    buttonFilterColor: blue700,
    textColor: 'white'
  }
});

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Routes />
  </MuiThemeProvider>,
  document.getElementById('app')
);

import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'react-vis/dist/style.css'
import { BrowserRouter } from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Shadows } from '@material-ui/core/styles/shadows'
import GA from 'services/GoogleAnalytics'

const theme = createMuiTheme({
  // palette: {
  //   type: 'dark',
  //   background: {
  //     default: '#161A1E',
  //     paper: '#20232A',
  //   },
  // },
  palette: {
    primary: {
      main: '#FF6F61',
    },
    background: {
      default: '#F4F2F2',
    },
  },
  typography: {
    fontFamily: ['"Source Sans Pro"', '"sans-serif"'].join(','),
  },
  shape: {
    borderRadius: 16,
  },
  overrides: {
    MuiPaper: {
      root: {
        'box-shadow':
          '0px 1px 2px rgba(0, 0, 0, 0.12), 0px 0px 0px 1px rgba(0, 0, 0, 0.05) !important',
      },
    },
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        {GA.init() && <GA.RouteTracker />}
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

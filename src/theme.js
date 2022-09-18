import { createTheme } from '@mui/material/styles';

export const themeOptions = createTheme({
    palette: {
        type: 'light',
        primary: {
          main: '#f7a735',
       
        },
        secondary: {
          main: '#fbc02d',
        },
        warning: {
          main: '#EFA32C',
        },
        background: {
          default: 'rgba(226, 226, 226, 0.55)',
          paper: '#ECF3C6',
          
        },
        text: {
            primary: 'rgba(72,69,69,0.87)',
            secondary: 'rgba(0,0,0,0.54)',
          },
      },
  });


  
import PropTypes from "prop-types";
import { useContext } from "react";
// @mui
import { CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
  
} from "@mui/material/styles";
import palette from './palette';
import shadows, { customShadows } from "./shadows";
import typography from './typography';
import ThemeContext from "../context/ThemeContext";


MyCustomTheme.propTypes = {
    children: PropTypes.node,
  };

export default function MyCustomTheme({children}) {
    const context = useContext(ThemeContext)
    const paletteMode = context.paletteMode
    const isLight = paletteMode === "light";
    console.log(isLight);
   
    const theme = createTheme({
        palette: isLight ? palette.light : palette.dark,
        typography,
        shape: { borderRadius: 8 },
        shadows: isLight ? shadows.light : shadows.dark,
        customShadows: isLight ? customShadows.light : customShadows.dark,
    });
    return (
      
          <MUIThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </MUIThemeProvider>
     
      );
}


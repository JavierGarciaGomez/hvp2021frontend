import React, { useState } from "react";

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme, createTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { LoginTab } from "./LoginTab";
import { RegisterColTab } from "./RegisterColTab";
import { RegisterCliTab } from "./RegiterCliTab";
import { ThemeProvider } from "@emotion/react";

export const AuthTabs = () => {
  const theme = createTheme({
    typography: {
      // Tell MUI what's the font-size on the html element is.
      htmlFontSize: 10,
    },
  });

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: "#f1f3f5" }}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Login" {...a11yProps(0)} />
            <Tab label="Registro clientes" {...a11yProps(1)} />
            <Tab label="Registro colaboradores" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <LoginTab />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <RegisterCliTab />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <RegisterColTab />
          </TabPanel>
        </SwipeableViews>
      </Box>
    </ThemeProvider>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

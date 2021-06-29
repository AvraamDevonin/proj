import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {AppBar, Toolbar, CssBaseline, useScrollTrigger, Box, Container, Slide } from "@material-ui/core";
 

import HomePage from "./components/homePage/homePage";
import Header from './components/header/header'
import SingUp from './components/sing/singUp/singUp'
import Footer from './components/footer/footer';

const outerTheme = createMuiTheme({
	palette: {
		primary: {
			light: "#1d3557",
			main: "#1d3557",
			dark: "#1d3557",
			contrastText: "#f1faee",
		},
		secondary: {
			light: "#457b9d",
			main: "#a8dadc", 
			dark: "#457b9d",
			contrastText: "#1d3557",
		},
		warning: {
			main: '#e63946'
		  }
	},
	shadows: Array(25).fill("none"),
});

function HideOnScroll(props) {
	const { children, window } = props;
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({ target: window ? window() : undefined });

	return (
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	);
}

HideOnScroll.propTypes = {
	children: PropTypes.element.isRequired,
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
};

// const innerTheme = createMuiTheme({
// 	palette: {
// 		secondary: {
// 			main: green[500],
// 		},
// 	},
// });

function App() {
	return (
		<div>
			<ThemeProvider theme={outerTheme}>
				<Router>
					<CssBaseline />
					<HideOnScroll >
						<AppBar>
              				<Header/>
						</AppBar>
					</HideOnScroll>
					<Toolbar />
					<Container>

						{/* 	content */}

					</Container>

					

					<Switch>
						<Route path="/checkup">
							<SingUp />
						</Route>



						<Route path="/">
							<HomePage />
						</Route>
					</Switch>

					<Footer/>
				</Router>
			</ThemeProvider>
		</div>
	);
}

export default App;

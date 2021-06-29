import React from "react";

import {
	Grid,
	Button,
	ButtonGroup,
	Typography,
	Toolbar,
	Paper,
} from "@material-ui/core";

import { Link } from "react-router-dom";

function Header() {
	

	return (
		<>
			<Toolbar>
				<Grid
					container
					spacing={3}
					justify="space-between"
					alignItems="center"
				>
					<Typography variant="h6">Hype</Typography>

					<ButtonGroup
						disableElevation
						variant="contained"
						color="primary"
					>
						<Button>Sing In</Button>
						
						<Link to="/checkup">
							<Button
								variant="outlined"
								color="secondary"
							>
								Sing Up
							</Button>
						</Link>
					</ButtonGroup>
				</Grid>
			</Toolbar>
		</>
	);
}

export default Header;

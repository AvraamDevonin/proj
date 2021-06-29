import { Container, Grid, Box, TextField, Button, Avatar } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { useContext } from "react";
import {UserContext} from '../../../contexts/usercontext/userContext';

const useStyles = makeStyles((theme) => ({
	root: {
		minHeight: "calc(100vh - 100px)",
	},
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
      },
}));

function SingUp() {
	const classes = useStyles();

    const {user} = useContext(UserContext)

	return (
		<>
			<form noValidate autoComplete="off">
				<Container>
					<Grid
						className={classes.root}
						container
						alignItems="center"
						direction="column"
					>
						<Box mt={3}>
							<Avatar
								alt="Remy Sharp"
								src="./assets/img/ava.jpg"
								className={classes.large}   
							/>
						</Box>

						<Box width={300} m={1}>
                            <div align="center">{"Check in"}</div>
							 
						</Box>

						<Box width={300} m={1}>
							<TextField
								required
								fullWidth={true}
								id="filled-required"
								label="Name"
								variant="outlined"
								color="primary"
							/>
						</Box>
						<Box width={300} m={1}>
							<TextField
								fullWidth={true}
								required
								id="filled-email"
								label="Email"
								variant="outlined"
							/>
						</Box>
						<Box width={300} m={1}>
							<TextField
								required
								fullWidth={true}
								id="filled-password-input"
								label="Password"
								type="password"
								variant="outlined"
							/>
						</Box>

						<Box width={300} m={1}>
							<Button
								variant="outlined"
								color="primary"
								fullWidth
							>
								Password confirmation
							</Button>
						</Box>
					</Grid>
				</Container>
			</form>
		</>
	);
}

export default SingUp;

import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../redux/login-reg/actions.js';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles((theme) => ({
	menuButton: {
		flexGrow: 1
	},
	link: {
		color: 'whitesmoke',
		textDecoration: 'none'
	},
	navBar: {
		marginBottom: "50px"
	}, 
}));

export default function() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const loginStatus = useSelector((state) => state.auth.loginStatus);

	return (
		<AppBar position="static" className={classes.navBar}>
			<Toolbar>
				<ButtonGroup className={classes.menuButton}>
					<Button>
						<Link to="/" className={classes.link}>
							Home
						</Link>
					</Button>
					<Button>
						<Link to="/dashboard" className={classes.link}>
							Dashboard
						</Link>
					</Button>
					<Button>
						<Link to="/ledger" className={classes.link}>
							Ledger
						</Link>
					</Button>
				</ButtonGroup>
				<ButtonGroup>
					{!loginStatus && (
						<ButtonGroup>
							<Button>
								<Link to="/register" className={classes.link}>
									Register
								</Link>
							</Button>
							<Button>
								<Link to="/login" className={classes.link}>
									Login
								</Link>
							</Button>
						</ButtonGroup>
					)}
					{loginStatus && (
						<Button onClick={() => dispatch(logout())} className={classes.link}>
							Logout
						</Button>
					)}
				</ButtonGroup>
			</Toolbar>
		</AppBar>
	);
}

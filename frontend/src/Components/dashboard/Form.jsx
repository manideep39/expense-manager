import React from 'react';

import {
	Grid,
	TextField,
	Button,
	Typography,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 195
	},
	selectEmpty: {
		marginTop: theme.spacing(2)
	}
}));

export default function(props) {
	const classes = useStyles();
	const { addTransaction, setState } = props.fns;
	const state = props.state;

	const onTextChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value });
	};

	return (
		<form onSubmit={(e) => addTransaction(e)}>
			<Grid container spacing={1} direction="column">
				<Grid item>
					<Typography variant="h6">ADD NEW TRANSACTION</Typography>
				</Grid>
				<Grid item>
					<TextField
						label="Title"
						variant="outlined"
						size="small"
						name="title"
						value={state.title}
						onChange={(e) => onTextChange(e)}
					/>
				</Grid>
				<Grid item>
					<FormControl variant="outlined" className={classes.formControl} size="small">
						<InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
						<Select
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							value={state.type}
							onChange={(e) => onTextChange(e)}
							label="Type"
              name="type"
						>
							<MenuItem value="credit">Credit</MenuItem>
							<MenuItem value="debit">Debit</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item>
					<TextField
						label="Amount"
						variant="outlined"
						size="small"
						type="text"
						name="amount"
						value={state.amount}
						onChange={(e) => onTextChange(e)}
					/>
				</Grid>
				<Grid item>
					<Button variant="contained" color="primary" onClick={addTransaction}>
						Add Record
					</Button>
				</Grid>
			</Grid>
		</form>
	);
}

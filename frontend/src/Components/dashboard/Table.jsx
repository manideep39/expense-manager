import React, { useEffect } from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
	table: {
		minWidth: 600
	}
});

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: '#3f51a1',
		color: theme.palette.common.white
	},
	body: {
		fontSize: 14
	}
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover
		}
	}
}))(TableRow);

export default function(props) {
	const classes = useStyles();

	useEffect(() => {
		props.getLastTrans();
	}, []);

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<StyledTableCell>Time</StyledTableCell>
						<StyledTableCell align="right">Title</StyledTableCell>
						<StyledTableCell align="right">Type</StyledTableCell>
						<StyledTableCell align="right">Amount</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{props.lastTrans.map((row) => (
						<StyledTableRow key={row._id}>
							<StyledTableCell component="th" scope="row">
								{new Date(`${row.timestamp}`).toUTCString()}
							</StyledTableCell>
							<StyledTableCell align="right">{row.title}</StyledTableCell>
							<StyledTableCell align="right">{row.type}</StyledTableCell>
							<StyledTableCell align="right">{row.amount}</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

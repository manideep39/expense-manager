import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles({
	table: {
		minWidth: 600
	},
	marginBtm: {
		marginBottom: '10px'
	},
	btnCredit: {
		backgroundColor: '#8bc34a'
	},
	btnDebit: {
		backgroundColor: '#f44336'
	},
  btnAll: {
    backgroundColor: '#03a9f4'
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
	const [ newData, setNewData ] = React.useState([]);

	const auth = useSelector((state) => state.auth);

	const getAllTransactions = () => {
		axios.get(`http://localhost:5000/transactions/${auth['user_id']}`).then((res) => {
			setNewData(res.data.current);
		});
	};

	useEffect(() => {
		getAllTransactions();
	}, []);

	const handleDebit = async () => {
		axios
			.post(`http://localhost:5000/transactions/type`, { type: 'debit', id: auth['user_id'] })
			.then((res) => setNewData(res.data));
	};
	const handleCredit = () => {
		axios
			.post(`http://localhost:5000/transactions/type`, { type: 'credit', id: auth['user_id'] })
			.then((res) => setNewData(res.data));
	};
	const handleAll = () => {
		axios
			.post(`http://localhost:5000/transactions/type`, { type: 'all', id: auth['user_id'] })
			.then((res) => setNewData(res.data));
	};

	return (
		<Grid container direction="column">
			<Grid item container direction="row" className={classes.marginBtm}>
				<Grid item sm={1} />
				<Grid item sm={3}>
					<Button onClick={handleDebit} variant="contained" className={classes.btnCredit}>
						Debit
					</Button>
				</Grid>
				<Grid item sm={4}>
					<Button onClick={handleCredit} variant="contained" className={classes.btnDebit}>
						Credit
					</Button>
				</Grid>
				<Grid item sm={3}>
					<Button onClick={handleAll} variant="contained" className={classes.btnAll}>
						Show All
					</Button>
				</Grid>
				<Grid item sm={1} />
			</Grid>
			<Grid item>
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
							{newData.map((row) => (
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
			</Grid>
		</Grid>
	);
}

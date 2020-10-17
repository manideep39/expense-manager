import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense } from '../redux/expense/action';

import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import styles from './styles.module.css';

const useTable = makeStyles({
	table: {
		minWidth: 650
	}
});

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing(1),
		textAlign: 'center',
		color: theme.palette.text.secondary
	}
}));

export default function DashBoard() {
	const [ title, setTitle ] = useState('');
	const [ amt, setAmt ] = useState('');
	const [ debit, setDebit ] = useState(0);
	const [ credit, setCredit ] = useState(0);
	const [ balance, setBalance ] = useState(0);
	const [ show, setShow ] = useState(false);
	const [ value, setValue ] = React.useState('credit');
	const classes = useStyles();
	const TableClasses = useTable();
	const data = useSelector((state) => state.expense.data);
	const dispatch = useDispatch();

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	function FormRow() {
		return (
			<React.Fragment>
				<Grid item xs={4}>
					<Paper
						style={{ backgroundColor: 'orange', margin: '1%', fontSize: '24px', fontWeight: 'bolder' }}
						className={classes.paper}
					>
						Total Debit :<br />
						{debit}
					</Paper>
				</Grid>
				<Grid item xs={4}>
					<Paper
						style={{ backgroundColor: 'yellowgreen', margin: '1%', fontSize: '24px', fontWeight: 'bolder' }}
						className={classes.paper}
					>
						Total Credit :<br />
						{credit}
					</Paper>
				</Grid>
				<Grid item xs={4}>
					<Paper
						style={{ backgroundColor: 'indianred', margin: '1%', fontSize: '24px', fontWeight: 'bolder' }}
						className={classes.paper}
					>
						Total Balance :<br />
						{balance}
					</Paper>
				</Grid>
			</React.Fragment>
		);
	}

	useEffect(() => {
		setBalance(credit - debit);
		
    
	});
	const handleAdd = (e) => {
		e.preventDefault();
		let obj = {
			title: title,
			amount: amt,
			type: value,
			date:new Date().toLocaleString(),
		
        };
        
		dispatch(addExpense(obj));
		if (value == 'debit') {
			setDebit((prev) => prev + Number(amt));
		} else {
			setCredit((prev) => prev + Number(amt));
		}
	};
	const handleTran = () => {
		setShow(!show);
	};
	return (
		<React.Fragment>
			<div className={classes.root}>
				<Grid container spacing={1}>
					<Grid container item xs={12} spacing={3}>
						<FormRow />
					</Grid>
				</Grid>
			</div>
			<br />
			<br />
			<div>
				<div className={styles.formBox}>
					<h1>Enter Your Details</h1>
					<form className={styles.form}>
						<input placeholder="Enter Title" value={title} onChange={(e) => setTitle(e.target.value)} />
						<br />
						<input placeholder="Enter Amount" value={amt} onChange={(e) => setAmt(e.target.value)} />
						<br />
						<FormControl className={styles.radio} component="fieldset">
							<FormLabel component="legend">Type</FormLabel>
							<RadioGroup aria-label="type" name="type" value={value} onChange={handleChange}>
								<FormControlLabel value="debit" control={<Radio />} label="Debit" />
								<FormControlLabel value="credit" control={<Radio />} label="Credit" />
							</RadioGroup>
						</FormControl>
						<br />
						<button className={styles.btn} onClick={handleAdd}>
							ADD
						</button>
					</form>

					<div>
						<button onClick={handleTran} className={styles.show}>
							Show Last 5 Transaction
						</button>
					</div>
					{show ? (
						<div className={styles.table}>
							<TableContainer component={Paper}>
								<Table className={TableClasses.table} aria-label="simple table">
									<TableHead>
										<TableRow>
                                        <TableCell>Date</TableCell>
											<TableCell>Title</TableCell>
											<TableCell align="right">Type</TableCell>
											<TableCell align="right">Amount</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{data.filter((item, index) => index > data.length - 5).map((item) => (
											<TableRow key={item.amount}>
												<TableCell component="th" scope="row">
													{item.date}
												</TableCell>
                                                <TableCell align="right">{item.title}</TableCell>
												<TableCell align="right">{item.type}</TableCell>
												<TableCell align="right">{item.amount}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</div>
					) : (
						''
					)}
				</div>
			</div>
		</React.Fragment>
	);
}

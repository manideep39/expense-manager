import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import SummaryCard from './Card';
import Table from './Table';
import Form from './Form';

import { Grid } from '@material-ui/core';


export default function(props) {
	const [ summary, setSummary ] = useState({});
	const auth = useSelector((state) => state.auth);
	const [ state, setState ] = useState({ title: '', type: '', amount: '' });
	const [ lastTrans, setLastTrans ] = useState([]);

	const addTransaction = (e) => {
		e.preventDefault();
		axios
			.post('http://localhost:5000/add-transaction', { ...state, user_id: auth['user_id'] })
			.then((res) => {
				getSummary();
				getLastTrans();
			})
			.catch((err) => console.log(err));
		setState({ title: '', type: '', amount: '' });
	};

	const getLastTrans = () => {
		axios
			.get(`http://localhost:5000/transactions/last-five/${auth['user_id']}`)
			.then((res) => setLastTrans(res.data))
			.catch((err) => console.log(err));
	};

	const getSummary = () => {
		axios
			.get(`http://localhost:5000/summary/${auth['user_id']}`)
			.then((res) => setSummary(res.data))
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		getSummary();
	}, []);

	console.log(summary);
	return (
		<Grid container alignItems="center">
			<Grid item sm={1} />

			<Grid item container direction="column" spacing={5} sm={4}>
				<Grid item>
					<SummaryCard name="Total Income" amount={summary.credit} />
				</Grid>
				<Grid item>
					<SummaryCard name="Total Expenses" amount={summary.debit} />
				</Grid>
				<Grid item>
					<SummaryCard name="Balance" amount={summary.balance} />
				</Grid>
			</Grid>
			<Grid item sm={1} />
			<Grid item container direction="column" spacing={5} sm={4}>
				<Grid item>
					<Form fns={{ addTransaction, setState }} state={state} />
				</Grid>
				<Grid item>
					<Table lastTrans={lastTrans} getLastTrans={getLastTrans} />
				</Grid>
			</Grid>

			<Grid item sm={1} />
		</Grid>
	);
}

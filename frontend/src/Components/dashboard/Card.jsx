import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';

const useStyles = makeStyles({
	root: {
		minWidth: 275
	},

	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)'
	},

	pos: {
		marginBottom: 12
	},

	cardColor: {
		backgroundColor: (props) => {
			switch (props.name) {
				case 'Total Income':
					return '#8bc34a';
				case 'Total Expenses':
					return '#f44336';
				case 'Balance':
					return '#03a9f4';
				default:
					return 'black';
			}
		}
	}
});

export default function(props) {
	const classes = useStyles(props);

	return (
		<Box boxShadow={5}>
			<Card className={classNames(classes.root, classes.cardColor)}>
				<CardContent>
					<Typography variant="h4" className={classes.pos}>
						{props.name}
					</Typography>
					<Typography variant="h3">{props.amount}</Typography>
				</CardContent>
			</Card>
		</Box>
	);
}

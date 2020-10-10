import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {addExpense} from '../redux/expense/action'

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';




const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function DashBoard() {
    const [title, setTitle] = useState("")
    const [amt, setAmt] = useState("")
    const [debit, setDebit] = useState(0)
    const [credit, setCredit] = useState(0)
    const [balance, setBalance] = useState(0)
    const [value, setValue] = React.useState('female');
    const classes = useStyles();
    const history = useHistory()
    const data = useSelector(state=>state.data)
    const dispatch = useDispatch()

    const handleChange = (event) => {
        setValue(event.target.value);
    };


    function FormRow() {
        return (
            <React.Fragment>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>Total Debit :{debit}</Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>Total Credit :{credit}</Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>Total Balance :{balance}</Paper>
                </Grid>
            </React.Fragment>
        );
    }

const handleAdd=()=>{
    let obj={
        title:title,
        amtount:amt
    }
    dispatch(addExpense(obj))
    console.log(data)
}
    return (
        <>
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
                <form>

                    <input placeholder="Enter Title" value={title} onChange={(e) => setTitle(e.target.value)} /><br />
                    <input placeholder="Enter Title" value={amt} onChange={(e) => setAmt(e.target.value)} /><br />
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Type</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                            <FormControlLabel value="debit" control={<Radio />} label="Debit" />
                            <FormControlLabel value="credit" control={<Radio />} label="Credit" />
                        </RadioGroup>
                    </FormControl>
                    <button onClick={handleAdd}>ADD</button>
                </form>
            </div>
        </>
    )
}






const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const transactionRoute = require('./routes/transactions');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/', transactionRoute);

mongoose.connect(
	process.env.ATLAS_URL,
	{
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true
	},
	(req, res) => {
		console.log('The database is connected');
	}
);

app.listen(process.env.PORT, () => {
	console.log(`The server is up and running ${process.env.PORT}`);
});

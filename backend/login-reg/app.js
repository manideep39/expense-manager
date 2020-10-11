const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
	process.env.ATLAS_URL,
	{
		useUnifiedTopology: true,
		useNewUrlParser: true
	},
	() => {
		console.log('The database is up and running');
	}
);

const authRoute = require('./routes/auth');
app.use('/api/user', authRoute);

app.listen(9000, () => {
	console.log('The server is running on PORT 9000');
});

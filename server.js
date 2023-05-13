const express = require('express');
const connectDB = require('./db/db');

const app = express();
const port = 5000;
//connect to db
connectDB();
app.get('/', (req, res) => {
	res.send('server is listening');
});
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

app.use('/api', require('./routes/character'));

app.listen(port, () => console.log(`app is listening on port : ${port}`));

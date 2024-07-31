const express = require('express');
const app = express();
const port = 4000;

app.get('/', (req, res) => {
	res.send('인스빌!');
});

const longRouter = require('./router/long.js');

app.use('/long', longRouter);

app.listen(port, () => {
	console.log('Listening...');
});


const express = require('express');
const cors = require("cors");
const app = express();
const port = 4000;

app.use(cors()); // CORS 미들웨어 추가
app.use(express.json());

app.get('/', (req, res) => {
	res.send('인스빌!');
});

const longRouter = require('./router/long.js');
const loginRouter = require('./router/login.js');
const homeRouter = require('./router/home.js');

app.use('/long', longRouter);
app.use('/login', loginRouter);
app.use('/home', homeRouter);

app.listen(port, () => {
	console.log('Listening...');
});


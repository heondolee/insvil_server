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
const userRouter = require('./router/user.js');
const customerRouter = require('./router/customer.js');
const carRouter = require('./router/car.js');
const referenceRouter = require('./router/dataroom.js');

app.use('/long', longRouter);
app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/customer', customerRouter);
app.use('/car', carRouter);
app.use('/dataroom', referenceRouter);

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});

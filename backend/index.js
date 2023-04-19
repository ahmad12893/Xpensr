const express = require('express');
const cors = require('cors');
const transactionRoutes = require('./routes/transactionRoutes');
const {
  errorHandlingMiddleware,
} = require('./middlewares/errorHandlingMiddleware');

const port = 3001;
const app = express();

app.use(express.json());
app.use(cors());

app.use(transactionRoutes);
app.use(errorHandlingMiddleware);

app.listen(port, () => console.log(`listening on http://localhost:${port}`));

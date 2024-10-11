const express = require('express')
const userRoutes = require('./routes/UserRoute')
const taskRoutes = require('./routes/TaskRoute')
const cors = require('cors')
var {connectDB} = require('./config/database')

var syncDB = require('./config/sync.js')

const app = express();
app.use(cors());
connectDB();
syncDB();
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', taskRoutes);

const PORT = 2000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
import config from './config/config.js';
import app from './server/express.js'; // Assuming this import is correct
import mongoose from 'mongoose';

const port = process.env.PORT || 3010;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://xhristianobi:jS1e6afFJfzKwktS@cluster0.iwjrgbs.mongodb.net/Marketplace?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', () => {
  throw new Error(`Unable to connect to the database: ${config.mongoUri}`);
});

app.get('/', (req, res) => {
  res.json('{Message: Welcome to Dresstore Application}');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

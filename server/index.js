import express from 'express';
import patientRoutes from './routes/patients.js';
import gameRoute from './routes/game.js';
import { createServer } from 'http'; // Import HTTP server
import { Server } from 'socket.io';
import cors from 'cors';

// Setup
const app = express();
const port = 8000;
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// Middlewares & Routes
app.use(express.json());
app.use('/api/patients', patientRoutes);

const gameNamespace = io.of('/api/game');
gameRoute(gameNamespace);

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

// index for everything ok
app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

// Start server
server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

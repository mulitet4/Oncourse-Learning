export default (gameNamespace) => {
  gameNamespace.on('connection', (socket) => {
    console.log('A user connected to the /api/game namespace:', socket.id);

    socket.on('startGame', (data) => {
      console.log('Game started with data:', data);
      socket.emit('gameUpdate', { message: 'Game has started' });
    });
  });
};

const socket = io('http://localhost:3000');

const message = document.getElementById('message');
const messages = document.getElementById('messages');

const handleSubmitNewMessage = () => {
  socket.emit(
    'joinChat',
    {
      frete_id: 222,
      embarcador_codigo: 15,
      usuarios: [
        { id: 13, nome: 'Teste 3',  tipo_usuario: 'TRUCKME' },
      ],
      data: message.value,
    },
    (chat) => {
      console.log(chat);
    },
  );
};

socket.on('message', ({ data }) => {
  handleNewMessage(data);
});

const handleNewMessage = (message) => {
  messages.appendChild(buildNewMessage(message));
};

const buildNewMessage = (message) => {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(message));
  return li;
};

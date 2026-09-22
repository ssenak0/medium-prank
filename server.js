const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// public klasörünü dışa açıyoruz
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Bir cihaz bağlandı!');

  // Admindan gelen emri alıp kurbana gönderir
  socket.on('admin_komutu', (data) => {
    io.emit('saka_calistir', data);
  });
});

const listener = http.listen(process.env.PORT || 3000, () => {
  console.log('Sunucu çalışıyor...');
});

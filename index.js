const express = require('express');
const app = express();
app.listen(4000, () => console.log('Server UP! \nhöre auf Port 4000'));
app.use(express.static('public'));
app.use(express.json());
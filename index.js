//Startup Webserver
const express = require('express');
const app = express();
app.listen(4000, () => console.log('Server UP! \nhöre auf Port 4000'));
app.use(express.static('public'));
app.use(express.json());


//Verbindung zu Mqtt Broker
let mqtt = require('mqtt')
let client = mqtt.connect('mqtt:/192.168.0.132:1883', {
    username: 'LedEsp',
    password: 'LedEsp'
})


//sendet daten an mqtt broker
function publishData(data) {
    console.log(data[2])
    console.log(data[0])
    client.publish('/led/helligkeit', String(data[2]))  //client.publish('topic', zu sendende Daten) 
    client.publish('/led/farbe', String(data[0]))
}


app.post('/hsvdata', function (req, res) {
    const data = req.body
    publishData(data)
});
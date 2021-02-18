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

    let temphelligkeit = data[2]
    temphelligkeit = (temphelligkeit/100)*255
    let tempfarbe = data[0]
    tempfarbe = (tempfarbe/360)*255
    client.publish('/led/helligkeit', String(temphelligkeit))  //client.publish('topic', zu sendende Daten) 
    client.publish('/led/farbe', String(tempfarbe))
    console.log(`Umgerechnet Farbe | Helligkeit -- ${tempfarbe}|${temphelligkeit}`);
}


app.post('/hsvdata', function (req, res) {
    const data = req.body
    publishData(data)
});
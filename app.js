const express = require('express');
const app = express();


const path = require('path');



app.use(express.static('bin'));

app.get('/', (req, res) => {

  res.sendFile(path.join(__dirname+'/index.html'));
});


const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`);
});
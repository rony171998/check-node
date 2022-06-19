const express = require('express');

const { RegistrationsRouter } = require('./routes/registrations.routes');

const { db } = require('./util/database.util');


const app = express();


app.use(express.json()) 

app.use('/registrations', RegistrationsRouter);

db.authenticate()
.then(()=> console.log(`Db authenticated`))
.catch(err => console.log(err));

db.sync()
.then(()=> console.log(`Db asynced`))
.catch(err => console.log(err));

app.listen(4000, () => {
    console.log('Express is running on port 4000');
})
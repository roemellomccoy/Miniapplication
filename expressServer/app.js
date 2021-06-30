const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;
const knex = require('knex')(require('./knexfile.js')['development']);

app.use(cors({origin : 'http://localhost:3000', credentials: true }));

app.use(express.json());

app.get('/', function(req, res) {
  knex
    .select('*')
    .from('todolist')
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
    );
});

app.post('/', function (req, res) {
    knex('todolist')
    .insert({title: req.body.title})
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
      );
})

app.delete('/', function (req, res) {
  knex('todolist')
  .del()
  .where({id: req.body.id})
  .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
      );
})

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});
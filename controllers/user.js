const pool = require('../config/db');
const { validationResult } = require('express-validator');

exports.getAllUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.saveUser = async (req, res) =>{
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  try{
    const { name, email } = req.body;
    const result = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
    res.status(200).json(result.rows[0]);

  }catch(err){
    res.status(500).json({ error: err.message });
  }
}

exports.editUser = async(req, res) => {
  try{
    const { id } = req.params;
    const { name, email } = req.body;
    const result = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [name, email, id]);
    res.status(200).json(result.rows[0]);
  }catch(err){
    res.status(500).json({ error: err.message });
  }
}

exports.coba = async (req, res) => {
  const jsonHasil = {
  "took": 14,
  "timed_out": false,
  "_shards": {
    "total": 5,
    "successful": 5,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": {
      "value": 10000,
      "relation": "gte"
    },
    "max_score": null,
    "hits": []
  },
  "aggregations": {
    "1": {
      "value": 8419184
    },
    "2": {
      "value": 256160
    },
    "3": {
      "value": 152878
    },
    "4": {
      "value": 9396915
    }
  }
};

  // const hasil = JSON.parse(jsonHasil);

  const result = {

    "jumlah_terlalu_banyak": jsonHasil.aggregations['1'].value,
    "jumlah_terlalu_dekat": jsonHasil.aggregations['2'].value,
    "jumlah_terlalu_muda": jsonHasil.aggregations['3'].value,
    "julah_terlalu_tua": jsonHasil.aggregations['4'].value
  
  }
  res.json(result);
};

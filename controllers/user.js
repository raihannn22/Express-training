const pool = require('../config/db');

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
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.coba = async (req, res) => {
  const jsonHasil = `{
  "took": 306,
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
    "kode_ddn": {
      "doc_count_error_upper_bound": -1,
      "sum_other_doc_count": 11569883,
      "buckets": [
        {
          "key": "35",
          "doc_count": 221474,
          "total_rincian": {
            "value": 60465494799799.375
          }
        },
        {
          "key": "64",
          "doc_count": 64924,
          "total_rincian": {
            "value": 42000000000000
          }
        },
        {
          "key": "36",
          "doc_count": 97386,
          "total_rincian": {
            "value": 23970469982994
          }
        },
        {
          "key": "63",
          "doc_count": 115330,
          "total_rincian": {
            "value": 23556591912204
          }
        },
        {
          "key": "32.01",
          "doc_count": 121471,
          "total_rincian": {
            "value": 23067017560044.062
          }
        }
      ]
    }
  }
}`;

  const hasil = JSON.parse(jsonHasil);
  res.json(hasil);
};

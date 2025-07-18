const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res, next)=>{
    const {email,username, password} = req.body;
    try{
        const user = await pool.query(
            'select id, username, email, password from users where email = $1 or username = $2', [email, username]
        )
            if(!user.rows[0]){
                return res.status(401).json({message: 'username/email/password salah'})
            }

        const isValid = await bcrypt.compare(password, user.rows[0].password);
        if(!isValid){
            return res.status(401).json({message: 'username/email/password salah'})
        }
        
        const payload = {
            user: {
                id: user.rows[0].id,
                username: user.rows[0].username,
                email: user.rows[0].email
            }
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1d'});
        res.status(200).json({message: 'login berhasil!', token: token, expiresIn: '1d'});
        

  
        }
    catch(err){
        res.status(500).json({error: err.message});
    }
}

module.exports = (req,res,next)=>{
    const auth = req.headers['authorization'];
    const token = auth && auth.split(' ')[1];
    if(!token){
        return res.status(401).json({message: 'unauthorized'});
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user)=> {
        if (err) return res.sendStatus(403).json({message: 'token invalid'});
        req.user = user;
        next();
    })
    
}
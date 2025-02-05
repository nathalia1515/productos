// const { response } = require('express');
// const jwt = require('jsonwebtoken');


// const createJwt = async(data) => {
//     const {id, email} = data;

//     const token = jwt.sign({
//         email,
//         id
//     }, process.env.AUTH_JWT_SECRET_KEY

//     );

//     return token;
// }

// const validateJwt = async(req, res=response, next) => {
//     let token = req.header('authorization');

//     if (!token) {
//         return res.status(401).json({"message": 'Error de token'});
//     }

//     try{
//         const {id, email} = await jwt.verify(token, process.env.AUTH_JWT_SECRET_KEY);
//     }catch(e){
//         return res.status(401).json({"message": 'Token Invalido'});
//     }

//     next();

// }

// module.exports={
//     createJwt,
//     validateJwt
// }
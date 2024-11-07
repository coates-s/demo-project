import jsonwebtoken from 'jsonwebtoken';

export function createJWT(user){
  return jsonwebtoken.sign({
    id: user.id,
    username: user.username
  }, process.env.SECRET_KEY);
}

export function compare(jwt){
  return jsonwebtoken.verify(jwt, process.env.SECRET_KEY);
}

export function auth(req, res, next){
  //Authorization: Bearer <token>
  let token = req.header('Authorization');
  let bearer = token.split("Bearer ")[1];

  req.user = compare(bearer);
  next();
}
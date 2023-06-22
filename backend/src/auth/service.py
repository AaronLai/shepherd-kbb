from fastapi import HTTPException
import bcrypt
from jose import JWTError, jwt

from backend.config import Settings, get_settings
from backend.src.database.Users import userDBService

def register_user(email, password):
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')
    userDBService.create_user(email=email, password=hashed_password)
    return None

def user_login(email, password):
    query_search_result = userDBService.search_by_email(email)
    if(len(query_search_result) != 1):
        raise HTTPException(status_code=404, detail='Email does not exist')
    
    user = query_search_result[0]
    if(not user.is_correct_password(password)):
        raise HTTPException(status_code=401, detail='Wrong password')
    
    jwt = create_jwt_token(user._id)
    return (user, jwt)

def create_jwt_token(user_id: str):
    settings = get_settings()

    payload = {
        'id': user_id,
    }

    return jwt.encode(payload, settings.jwt_secret, algorithm='HS256')
    
from fastapi import HTTPException, status
import bcrypt
from jose import JWTError, jwt

from backend.config import Settings, get_settings
from backend.src.database.Users import userDBService

def register_user(name, email, password):
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')
    userDBService.create_user(name=name, email=email, password=hashed_password)
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

def get_user_from_jwt(token: str):
    settings = get_settings()

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, settings.jwt_secret, algorithms=['HS256'])
        id: str = payload.get("id")
    except JWTError:
        raise credentials_exception
    
    user = userDBService.get_by_id(id)
    if user is None:
        raise credentials_exception

    return (user)
    
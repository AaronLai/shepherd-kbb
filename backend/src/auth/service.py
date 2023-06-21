import bcrypt

from backend.config import Settings
from backend.src.database.Users import userDBService

class AuthService():
    @staticmethod
    def register_user(email, password):
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')
        userDBService.create_user(email=email, password=hashed_password)
        return None

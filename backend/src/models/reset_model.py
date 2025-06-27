from db import get_db_connection
import bcrypt
from datetime import datetime, timedelta
import random
import string

def save_reset_code(email, code, expires_at):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO password_resets (email, code, expires_at) VALUES (%s, %s, %s)",
        (email, code, expires_at)
    )
    conn.commit()
    cursor.close()
    conn.close()

def verify_reset_code(email, code):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute(
        "SELECT * FROM password_resets WHERE email=%s AND code=%s AND expires_at > NOW()",
        (email, code)
    )
    result = cursor.fetchone()
    cursor.close()
    conn.close()
    return result is not None

def update_user_password(email, hashed_password):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE usuarios SET password=%s WHERE email=%s",
        (hashed_password.decode('utf-8'), email)
    )
    conn.commit()
    cursor.close()
    conn.close()

import os
import base64
from pathlib import Path
import eel
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import padding



user_home = str(Path.home())+'/'
eel.init('web')

#Functions
def padData(data):
    padder = padding.PKCS7(128).padder()
    padded_data = padder.update(data)
    padded_data += padder.finalize()
    return padded_data

def unPadData(unpadded_data):
    unpadder = padding.PKCS7(128).unpadder()
    cleaned = unpadder.update(unpadded_data)
    cleaned + unpadder.finalize()
    return cleaned

def encrypt(password, data):
    backend = default_backend()
    key = padData(password.encode())
    iv = os.urandom(16)
    message = padData(data.encode())
    cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=backend)
    encryptor = cipher.encryptor()
    ct = encryptor.update(message) + encryptor.finalize()
    to_file = iv+ct
    return base64.b64encode(to_file)

def decrypt(myPass,myData):
    key = padData(myPass.encode())
    data = base64.b64decode(myData)
    iv = data[:16]
    data = data.replace(iv,b'')
    backend = default_backend()
    cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=backend)
    decryptor = cipher.decryptor()
    padded_data = decryptor.update(data) + decryptor.finalize()
    unpadded_data = unPadData(padded_data)
    return unpadded_data.decode()

@eel.expose
def getPasses():
    if os.path.isdir(user_home + '.gnixpass'):
        pass_files = os.listdir(user_home + '.gnixpass')
        return pass_files
    else:
        os.mkdir(user_home + '.gnixpass')
        return []


eel.start('index.html',mode='chrome')

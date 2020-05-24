###########################
#      Gnixpass 1.0       #
#       -gatovato-        #
###########################

#Imports
import os
import base64
import json
import eel
from pathlib import Path
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import padding

#Filepath
user_home = str(Path.home())+'/'
gnix_home = user_home + '.gnixpass'

eel.init('web')

 ######################
 # Internal Functions #
 ######################

def padData(data):
    padder = padding.PKCS7(128).padder()
    padded_data = padder.update(data)
    padded_data += padder.finalize()
    return padded_data

def unPadData(padded_data):
    unpadder = padding.PKCS7(128).unpadder()
    cleaned = unpadder.update(padded_data)
    cleaned = cleaned + unpadder.finalize()
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

def decrypt(password,data):
    key = padData(password.encode())
    data = base64.b64decode(data)
    iv = data[:16]
    data = data.replace(iv,b'')
    backend = default_backend()
    cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=backend)
    decryptor = cipher.decryptor()
    padded_data = decryptor.update(data) + decryptor.finalize()
    unpadded_data = unPadData(padded_data)
    return unpadded_data.decode()


 ######################
 # External Functions #
 ######################

#Populate Home page dropdown
@eel.expose
def getPasses():
    if os.path.isdir(gnix_home):
        pass_files = os.listdir(gnix_home)
        return pass_files
    else:
        os.mkdir(gnix_home)
        return []

@eel.expose
def createPass(name,passwd):
    my_data = encrypt(passwd,'{}')
    new_pass = gnix_home + '/' + name
    my_file = open(new_pass,'w')
    error = False
    try:
        my_file.write(my_data.decode())
    except:
        error = True
    finally:
        my_file.close()
    return error

@eel.expose
def openPass(name,passwd):
    file_path = gnix_home + '/' + name
    try:
        my_file = open(file_path,'r')
        encoded_data = my_file.read()
        my_file.close()
    except:
        data = 'open_failed'
        return data
    try:
        data = decrypt(passwd,encoded_data)
    except:
        data = 'decrypt_failed'
        return data
    return data

@eel.expose
def rmPass(name,passwd):
    file_path = gnix_home + '/' + name
    try:
        my_file = open(file_path,'r')
        encoded_data = my_file.read()
        my_file.close()
    except:
        data = 'delete_failed'
        return data
    try:
        data = decrypt(passwd,encoded_data)
    except:
        data = 'decrypt_failed'
        return data
    try:
        os.remove(file_path)
    except:
        data = 'delete_failed'
        return data
    data = 'success'
    return data

@eel.expose
def savePass(name,data,passwd):
    print(data)
    
#Runtime
eel.start('index.html',mode='chrome')

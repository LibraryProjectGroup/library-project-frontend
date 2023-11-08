import os
import platform
from dotenv import load_dotenv

load_dotenv()

def get_os():
    if platform.system() == 'Darwin':
        return 'COMMAND+A'
    else:
        return 'CTRL+A'

def get_variables():
    variables = {
    "TESTUSERNAME" : os.getenv('TESTUSERNAME'),
    "TESTPASSWORD" : os.getenv('TESTPASSWORD'),
    "TESTUSERNAME2" : os.getenv('TESTUSERNAME2'),
    "TESTPASSWORD2" : os.getenv('TESTPASSWORD2'),
    "OPERATINGSYSTEMCOMMAND" : get_os()
    }
    return variables

get_variables()
var = get_variables()
print(var)
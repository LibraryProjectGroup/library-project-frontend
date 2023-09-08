import os
from dotenv import load_dotenv

load_dotenv()

def get_variables():
    variables = {
    "TESTUSERNAME" : os.getenv('TESTUSERNAME'),
    "TESTPASSWORD" : os.getenv('TESTPASSWORD'),
    "TESTUSERNAME2" : os.getenv('TESTUSERNAME2'),
    "TESTPASSWORD2" : os.getenv('TESTPASSWORD2')
    }
    return variables

get_variables()

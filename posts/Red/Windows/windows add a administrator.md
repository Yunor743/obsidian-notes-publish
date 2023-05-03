```powershell
net user <username> <password> /add
net localgroup administrators <username> /add
```

_The important take away from this task:_

Reverse and Bind shells are an essential technique for gaining remote code execution on a machine, however, they will never be as fully featured as a native shell. Ideally we always want to escalate into using a "normal" method for accessing the machine, as this will invariably be easier to use for further exploitation of the target.

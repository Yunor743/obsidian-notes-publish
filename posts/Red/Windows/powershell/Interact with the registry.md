## Interact with the registry in powershell

### Read an entry
```powershell
Get-ItemPropertyValue -Path '[HKLM|HKCU]:<path>' -Name "<name>"
# exemple, check if windows is in dark mode
Get-ItemPropertyValue -Path 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Themes\Personalize' -Name "SystemUsesLightTheme"
```

### Set an entry
```powershell
New-ItemProperty -Path “<Register key path>” -Name <key name> -Value <key value> # -PropertyType DWORD -Force

# examples:
# to disable windows defender
New-ItemProperty -Path “HKLM:\SOFTWARE\Policies\Microsoft\Windows Defender” -Name DisableAntiSpyware -Value 1 -PropertyType DWORD -Force

# to disable aslr
New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\Session Manager\Memory Management" -Name MoveImages -Value 0 -PropertyType DWORD -Force
```

### List all keys (and their value) in a registry sub key
You have to use the path of the parent, so to list the content of `HKCU:\Software\Microsoft\Windows\CurrentVersion\Themes\Personalize`, you have to use:
```powershell
Get-ChildItem -Path 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Themes\'
```

> Resources : https://adamtheautomator.com/powershell-to-get-a-registry-value/

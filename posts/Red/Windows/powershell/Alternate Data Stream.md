### List ADS
```powershell
Get-Item * -Stream *
```

### Read ADS content
```powershell
Get-Item <file> | Get-Content -Stream <data stream name> # read the default file content
# or
Get-Content -Path test.file -Stream sub
# example
Get-Item .\Get-ZimmermanTools.ps1 | Get-Content -Stream $Data # read the default file content
Get-Item .\Get-ZimmermanTools.ps1 | Get-Content -Stream Zone.Identifier # read another data stream
```

### Remove ADS
```powershell
Remove-item -Path <file> -Stream <data stream name>
# example
Remove-item -Path test.file -Stream sub
```

> resource : https://blog.ironmansoftware.com/daily-powershell/powershell-alternate-data-streams/#:~:text=To%20locate%20the%20available%20alternate,the%20length%20of%20the%20stream.

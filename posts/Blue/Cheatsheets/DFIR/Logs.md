Le 1er fichier de logs à récupérer est celui nommé `Security.evtx` situé dans le dossier  
commun à tous les journaux sous Windows: `C:\Windows\System32\winevt\Logs`. Avec  
les outils d’Eric Zimmerman, il est possible de parser le contenu et de le convertir au  
format CSV avec la commande `EvtxCmd`.

## Windows logs
```
C:\Windows\System32\winevt\Logs
```

#### Security.evtx
```
C:\Windows\System32\winevt\Logs\Security.evtx
```

Usage example:
```powershell
EvtxECmd.exe -f C:\Users\Documents\Sekoia\Export\Security.evtx --
csv C:\Temp --csvf Security.csv
```

> Tips : on linux you can read a csv file with this command : `mlr --icsv --opprint cat <file path> | less -S`

> Tips : on windows you can directly read `*.evtx` files using the `Event viewer` GUI application, to import a new evtx click on : `Toolbar > Action > Open Saved Log...`

> Or you can open the csv file with a software like libreoffice or excel, but personnaly I recommend vscode with extension `"Excel Viewer" from GrapeCity`

### Get RDP logs
```powershell
# in folder : C:\Windows\System32\winevt\Logs\
- Security.evtx # check for code 4624 & 4625
- Microsoft-Windows-TerminalServices-RemoteConnectionManager*.evtx
- Microsoft-Windows-TerminalServices-LocalSessionManager*.evtx
```


Technologie Microsoft permettant la création de snapshot de fichiers ou volumes  
pendant leur utilisation. La technologie repose sur les systèmes de fichiers NTFS ou ReFS.  
L’ensemble est géré par un service système Volume Shadow Copy.

> ransomware uses `vssadmin.exe` to delete all shadow copy backups

Monter tous les shadow volumes d’un poste  
```
PS C:\Users\Sekoia>VSCmount.exe --dl C --mp C:\MyVSC
```

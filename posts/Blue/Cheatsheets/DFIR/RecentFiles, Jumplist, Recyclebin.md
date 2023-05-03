## RecentFiles

Cette fonctionnalité permet à Windows d’afficher la liste des « Documents Récents ».  
Lors de l’ouverture d’un fichier, un lien (LNK) vers ce fichier est automatiquement créé  
dans un répertoire spécifique.  
Lors d’une investigation ou l’activité de l’utilisateur est importante, cet artefact peut être  
analysé afin de déterminer un historique des fichiers récemment ouverts avec  
notamment les informations suivantes:  
• Chemin complet du fichier  
• Date de premier / dernier accès  
Emplacements:  
```
\%USERPROFILE%\AppData\Roaming\Microsoft\Windows\Recent\  
\%USERPROFILE%\AppData\Roaming\Microsoft\Office\Recent\
```

`\%USERPROFILE%\` is similar to `$HOME` so in `C:\Users\<user name>`

Parser un raccourcis Windows  :
```
C:\Users\Sekoia>LECmd.exe -f "C:\Temp\DocumentsMyShortcut.lnk" --csv "C:\Temp" --neb -q
```

> /!\ A noter que la création du fichier LNK entraîne par la même occasion la création d’une entrée dans la MFT

## Jumplist

Cette fonctionnalité permet à Windows d’afficher les derniers fichiers accédés avec une  
application particulière dans la barre des tâches.  
Lors d’une investigation ou l’activité de l’utilisateur est importante, cet artefact peut être  
analysé afin de déterminer un historique des fichiers ouverts avec notamment les  
informations suivantes:  
• Application utilisée pour accéder au fichier  
• Date de dernier accès  
• Chemin complet du fichier  
• Nombre d’ouverture  
• Hostname de l’ordinateur  
• MAC adresse  

Emplacement:  
```
\%USERPROFILE%\AppData\Roaming\Microsoft\Windows\Recent\AutomaticDestinations
```

Parser la JumpList de documents récents (l’utilitaire existe aussi en version GUI)
```
C:\Users\Sekoia>JLECmd.exe -q -d "C:\Users\Sekoia\AppData\Roaming\Microsoft\Windows\Recent" --dumpTo “C:\Temp
```

## RecycleBin

Corbeille Windows  
La corbeille Windows est l’endroit où sont stockés les fichiers indiqués comme à  
supprimer par l’utilisateur. Pour autant le fichier n’a pas complètement été supprimé du  
système. Le dossier contenant ces éléments comporte 2 artefacts d’investigation  
intéressant:  
- les fichiers commençant par $I: comprenant les métadonnées du fichier à supprimer  
- Les fichiers commençant par $R: comprenant les données originelles du fichier  
Dans les métadonnées on retrouvera les éléments suivant:  
- Taille du fichier  
- Date et heure de suppression  
- Chemin complet originel  

Emplacement: 
```
\%SYSTEMROOT%\$Recycle.Bin\%SID%\
```

Parser les fichiers de la Corbeille
```
C:\Users\Sekoia>RBCmd.exe -q -d "C:\$Recycle.bin\<SID>\" --csv “C:\Temp”
```

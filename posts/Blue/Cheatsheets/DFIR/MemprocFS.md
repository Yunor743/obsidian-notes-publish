> https://github.com/ufrisk/MemProcFS

#### Monter une image mémoire sur Windows ou Linux
```bash
# windows
> .\MemProcFs.exe -device C:\Users\sekoia\Desktop\image.raw
# linux
$./memprocfs -mount /home/sekoia/mnt_img -device /home/sekoia/image.raw
```

Sous Windows, le logiciel créera un disque partagé (par défault sur le lecteur M, l’option  
-mount permettant de spécifier le nom du lecteur).

Enfin l’option -forensic X permet d’activer le module de recherche forensic avec un  
entier pour spcifier l’option de persistance des données (0 en mémoire, 3 dans un fichier  
qui sera conservé à la fermeture de MemProcFS)

![[Pasted image 20221129174428.png]]
![[Pasted image 20221129174443.png]]

By running MemProcFS, If you have an error message saying that `dokan1.dll` is missing, install : https://github.com/dokan-dev/dokany/releases/tag/v1.5.1.1000

![[Pasted image 20221214141734.png]]
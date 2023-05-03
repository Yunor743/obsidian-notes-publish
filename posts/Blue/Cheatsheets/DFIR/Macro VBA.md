![[Pasted image 20221128141330.png]]
![[Pasted image 20221128141349.png]]
![[Pasted image 20221128141406.png]]
![[Pasted image 20221128141416.png]]

## Analyse
- [OleTool](https://github.com/decalage2/oletools)
	- oleid: affiche les caractéristiques principales d’un fichier OLE  
	- olevba: extrait et analyse le code VBA  
	- mraptor: analyse le code VBA pour essayer de déterminer si un fichier est suspect, en cherchant des chaînes spécifiques  
	- oleobj: extrait des objets joints à un fichier OLE  
	- rtfobj: extrait des objets joints à un fichier RTF  
	- oledir: afin d’afficher toutes les entrée d’un fichier OLE
	- msodde : Un champ spécial “DDEAUTO” permet d’exécuter une autre application lors de l’ouverture du document afin (théoriquement) d’enrichir celui-ci. `msodde` permet de lister tous les potentiel payload présent dans le document
- [ViperMonkey](https://github.com/decalage2/ViperMonkey) Macro VBA Emulation
- [OleDump](https://blog.didierstevens.com/programs/oledump-py/) Alternative for analyse

```bash
$ oleid maldoc.doc
$ mraptor -m maldoc.doc
$ olevba maldoc.doc
# basic deobfuscation
$ olevba --decode --deobf maldoc.doc
# ViperMonkey using docker
$ docker/dockermonkey.sh maldoc.doc
# identifier les champs DDE / DDEAUTO
$ msodde maldoc.doc
```

![[Pasted image 20221128142046.png]]
> XLMMacroDeobfuscator : https://github.com/DissectMalware/XLMMacroDeobfuscator
```bash
xlmdeobfuscator --file maldoc.xls
```



### Extract the $MFT
> https://andreafortuna.org/2017/07/18/how-to-extract-data-and-timeline-from-master-file-table-on-ntfs-filesystem/

```
sudo icat -o <offset (in sectors not bytes)> image.E01 0 > mft.raw
```

### GUI application on windows
Use `MFTExplorer` (a tool from Eric Zimmerman) directly on mft.raw

## TUI application on linux
Use my own custom script `mft-reader.sh`


# Parse $MFT to csv

## On linux

> Use my own custom script `mft-reader.sh`

```bash
mft-reader.sh mft.raw > mft.csv
# and remove the first line of the output

# or use
# analyzeMFT : https://github.com/dkovar/analyzeMFT : pip2 install analyzeMFT
```

## On windows

#### Parse the MFT of the current workstation:
```powershell
PS C:\Users\Sekoia>MFTECmd.exe --csv C:\Users\Sekoia\Documents --csvf mft_parse.csv
```

#### Parse an MFT extracted form another disk 
```powershell
PS C:\Users\Sekoia>MFTECmd.exe -f .\MFT --csv C:\Users\Sekoia\Documents --csvf mft_parse.csv
```

> It's also possible to use `MFTExplorer` which is the same but with a GUI

> MFTECmd.exe works also for `$UsnJrnl`

## Search a keywords

```powershell
Select-String -Path C:\Users\talion\Desktop\mft.csv -Pattern "your keyword" | Format-Table
```
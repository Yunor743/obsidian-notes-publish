###  Use ewfmount to expose the RAW version of an EWF disk
```bash
# apt install ewf-tools
sudo mkdir -p /mnt/ewf
sudo ewfmount disk-image.E01 /mnt/ewf
```

>  the RAW version is now accessible at `/mnt/ewf/ewf1`

### Get the partitions
with `mmls`
```bash
mmls disk-image.raw # install mmls with : apt install sleuthkit
DOS Partition Table
Offset Sector: 0
Units are in 512-byte sectors
     Slot    Start      End        Length     Description
000: Meta    0000000000 0000000000 0000000001 Primary Table (#0)
001: ------- 0000000000 0000002047 0000002048 Unallocated
002: 000:000 0000002048 0002099199 0002097152 NTFS / exFAT (0x07)
003: 000:001 `0002099200` 0250066943 0247967744 NTFS / exFAT (0x07)
004: ------- 0250066944 0250069679 0000002736 Unallocated
```

> The main partition is generally the bigger one

##### Compute the offset (in bytes)
for the next steps, it is necessary to calculate the offset of the
partition in bytes. To do this, we multiply the offset of the partition in sectors with the size
of a sector.
```bash
$> echo $((512*2099200)) # <-- 2099200 is from mmls output
1074790400 # <-- this is the offset
```

> to know the sector size use `ewfinfo`

### Check if bitlocker is in use
```bash
bdeinfo -o <OFFSET> disk-image.raw # install bdetools : apt install libbde-utils
```

### Decrypt a partition crypted with bitlocker
```bash
mkdir -p /mnt/bde
bdemount -r <RECOVERY-KEY> -o <OFFSET> disk-image.raw /mnt/bde
```

> The decrypted version is now located at `/mnt/bde/bde1`


### Mount a decrypted RAW partition:
```bash
mkdir -p /mnt/windows_mount
mount -o loop,ro,show_sys_files,streams_interface=windows,offset=<OFFSET> disk-image.raw /mnt/windows_mount
```

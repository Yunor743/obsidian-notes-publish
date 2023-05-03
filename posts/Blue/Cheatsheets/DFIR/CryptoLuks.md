
```bash
cryptsetup luksOpen /dev/sda1 sdacrypt
mkdir /mnt/sdacrypt && mount /dev/mapper/sdacrypt /mnt/sdacrypt
```

> more info in pdf page 433

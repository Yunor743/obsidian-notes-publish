> source : https://www.youtube.com/watch?v=0CFWHjc4B-I&list=PLHUKi1UlEgOIc07Rfk2Jgb5fZbxDPec94&index=7

When to use this method ? => When NX protection is enable

if no `PIE` or `ASLR` you can use `ldd` to get all linked libraries and their address
```bash
$> ldd pb
linux-vdso.so.1 (0x00007ffff7fd0000)
libc.so.6 => ./glibc/libc.so.6 (0x00007ffff7da2000)
./glibc/ld-linux-x86-64.so.2 => /lib64/ld-linux-x86-64.so.2 (0x00007ffff7fd2000)
```

You can use `readelf` to get a specific symbol offset from a specific library
```
$> readelf -s ./glibc/libc.so.6  | grep -i system
1481: 0000000000050d60    45 FUNC    WEAK   DEFAULT   15 system@@GLIBC_2.2.5
```
Then you can combine this offset to the base of the library address

We can also get a offset of a specific string from a specific library,
for example we can get the offset of "/bin/sh" always present in the libc:
```bash
$> strings -a -t x ./glibc/libc.so.6  | grep -i "bin/sh"
1d8698 /bin/sh
```


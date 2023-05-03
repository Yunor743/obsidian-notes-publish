To find SUID binary
```
find / -perm -4000 2>/dev/null
find / -perm -u=s -type f 2>/dev/null

# Find all the SUID/SGID executables on the Debian VM:

find / -type f -a \( -perm -u+s -o -perm -g+s \) -exec ls -l {} \; 2> /dev/null

```

### Automated tools
- LinEnum.sh
- LinPeas.sh
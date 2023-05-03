### Interesting location to check:

```bash
/proc/sched_debug # print running processes
/proc/net/tcp # tcp socket infos
/etc/hosts
/var/www/html/<website>/index.php
# you can replace "self" with a PID (or fuzz the PID) in the following
/proc/self/cmdline
/proc/self/environ
/proc/self/cwd
/proc/self/cwd/<cmdline binary>
/proc/self/maps # display memory mapping of the binary (like base address) and linked library (like libc for example). Base of the binary is the first address at the first line ! Same libc base address is the first entry of the libc lines ! ref : https://youtu.be/1MDqn1kBHQM?t=1507

```
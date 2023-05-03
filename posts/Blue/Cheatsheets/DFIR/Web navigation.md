### Edge

```
# /!\ le dernier navigateur de Microsoft a migré sous Chromium, il faut donc se référer aux artefacts de Google Chrome
# Profile
C:\Users\[User]\AppData\Local\Packages\Microsoft.MicrosoftEdge_\AC

# Historique + Cookies + Téléchargements
C:\Users\[User]\AppData\Local\Microsoft\Windows\WebCache\WebCacheV01.dat

# Paramètres + Favoris + Liste de lecture
C:\Users\[User]\AppData\Local\Packages\Microsoft.MicrosoftEdge_\AC\MicrosoftEdge\ User\Default\DataStore\Data\nouser1\\DBStore\spartan.edb

# Cache
C:\Users\[User]\AppData\Local\Packages\Microsoft.MicrosoftEdge_XXXXXXX\AC\#![XXX]\MicrosoftEdge\Cache

# Sessions
C:\Users\[User]\AppData\Local\Packages\Microsoft.MicrosoftEdge_\AC\MicrosoftEdge\User\Default\Recovery\Active
```

### Chrome

```
# Profile
C:\Users\[User]\AppData\Local\Google\Chrome\User Data\[Default, ChromeDefaultData]\

# Historique + Téléchargements + Recherches
C:\Users\[User]\AppData\Local\Google\Chrome\User Data\[Default, ChromeDefaultData]\History

# Cookies
C:\Users\[User]\AppData\Local\Google\Chrome\User Data\[Default, ChromeDefaultData]\Cookies

# Favoris
C:\Users\[User]\AppData\Local\Google\Chrome\User Data\[Default, ChromeDefaultData]\Bookmarks

# Formulaires & Login
C:\Users\[User]\AppData\Local\Google\Chrome\User Data\[Default, ChromeDefaultData]\[Web, Login] Data

# Sessions
C:\Users\[User]\AppData\Local\Google\Chrome\User Data\[Default, ChromeDefaultData]\[Current, Last] Session
C:\Users\[User]\AppData\Local\Google\Chrome\User Data\[Default, ChromeDefaultData]\[Current, Last] Tabs

# Cache
C:\Users\[User]\AppData\Local\Google\Chrome\User Data\[Default, ChromeDefaultData]\Cache

# Extensions
C:\Users\[User]\AppData\Local\Google\Chrome\User Data\[Default, ChromeDefaultData]\Extensions\

# Paramètres
C:\Users\[User]\AppData\[Roaming, Local]\Mozilla\Firefox\Profiles\.default\prefs.js

```

### Firefox

```
# Profile
C:\Users\[User]\AppData\[Roaming, Local]\Mozilla\Firefox\Profiles\.default\

# Historique
C:\Users\[User]\AppData\[Roaming, Local]\Mozilla\Firefox\Profiles\.default\places.sqlite

# Cookies
C:\Users\[User]\AppData\[Roaming, Local]\Mozilla\Firefox\Profiles\.default\cookies.sqlite

# Favoris
C:\Users\[User]\AppData\[Roaming, Local]\Mozilla\Firefox\Profiles\.default\bookmarkbackups\*.jsonlz4

# Téléchargements
C:\Users\[User]\AppData\[Roaming, Local]\Mozilla\Firefox\Profiles\.default\downloads.sqlite

# Formulaires & Logins
C:\Users\[User]\AppData\[Roaming, Local]\Mozilla\Firefox\Profiles\.default\formhistory.sqlite
C:\Users\[User]\AppData\[Roaming, Local]\Mozilla\Firefox\Profiles\.default\logins.json
C:\Users\[User]\AppData\[Roaming, Local]\Mozilla\Firefox\Profiles\.default\key4.db

# Sessions
C:\Users\[User]\AppData\[Roaming, Local]\Mozilla\Firefox\Profiles\.default\sessionstore.jsonlz4
C:\Users\[User]\AppData\[Roaming, Local]\Mozilla\Firefox\Profiles\.default\sessionstore-backups\

# Cache
C:\Users\[User]\AppData\[Roaming, Local]\Mozilla\Firefox\Profiles\.default\cache2\entries
C:\Users\[User]\AppData\[Roaming, Local]\Mozilla\Firefox\Profiles\.default\startupCache

# Extensions
C:\Users\[User]\AppData\[Roaming, Local]\Mozilla\Firefox\Profiles\.default\addons.sqlite
C:\Users\[User]\AppData\[Roaming, Local]\Mozilla\Firefox\Profiles\.default\extensions.sqlite

# Paramètres
C:\Users\[User]\AppData\[Roaming, Local]\Mozilla\Firefox\Profiles\.default\prefs.js
```

## Tooling:

- sqlite client
- JSONLZ4: https://www.jeffersonscher.com/ffu/bookbackreader.html
- NirSoft : utility suite : https://www.nirsoft.net/web_browser_tools.html
	- EdgeCookiesView
	- ESEDatabaseView (Une partie des artefacts du navigateur Edge sont stockés au format ESE, format propriétaire Microsoft Extensible Storage Engine.)





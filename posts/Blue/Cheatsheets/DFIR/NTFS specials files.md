## New Technology FileSystem

Is bundle some specials file (starting with a $ in the name) at the root of it's partition requiering very high privileges (normal and admin users can't see it (only the system))

So to see these file it's simpler to mount the partition from another OS (like linux)

#### Master File Table ($MFT)
For each file in the system, the MFT contains its name, location, size, permissions
its location, its size, the associated permissions, as well as 8 timestamps (Creation,
Modification, Metadata and Access for "Standard Information" and "Filename").
`MACB`:
- Modified
- Accessed
- Changed
- Birth 

#### $LogFile
Contains transactions done on the NTFS volume (creation, modification, deletion).
It can be use to replay and revert a transaction

#### Update Sequence Number Journal ($UsnJrnl)
Same as Logfile but can't replay or revert because it contain less usefull informations

#### $INDX or $I30
Lists the entire tree structure it contains in order to speed up
speed up the search operations


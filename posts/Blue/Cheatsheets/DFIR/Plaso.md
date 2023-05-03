### Using docker
```bash
docker run --rm -v "$(pwd):/data" -w /data log2timeline/plaso <TOOL> <ARGUMENTS>
```

### Example
```bash
docker run --rm -v "$(pwd):/data" -w /data log2timeline/plaso psort -o dynamic --fields datetime,message -w out.csv 20221107T085542-20200918_0347_CDrive.E01.plaso 'event_identifier is 4625 and source_name is "Microsoft-Windows-Security-Auditing"'
```

#### Creating the plaso file example
```bash
docker run --rm -v "$(pwd):/data" -w /data log2timeline/plaso log2timeline --partitions all --filter-file filter.yaml --parsers winevtx,esedb/msie_webcache <IMAGE>
```

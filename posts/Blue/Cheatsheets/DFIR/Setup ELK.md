
to setup ElasticSearch and kibana, use this `docker-compose.yml`
```yml
version: "3.7"
services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.12.0
    environment:
      discovery.type: single-node
      bootstrap.memory_lock: "true"
      ES_JAVA_OPTS: -Xms4g -Xmx4g
      node.name: elk
      indices.query.bool.max_clause_count: 10000
    ports:
      - "127.0.0.1:9200:9200"
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data
    networks:
      - elk
  kibana:
    image: docker.elastic.co/kibana/kibana:7.12.0
    environment:
      ELASTICSEARCH_HOSTS: http://elasticsearch:9200
    ports:
      - "127.0.0.1:5601:5601"
    networks:
      - elk

volumes:
  elasticsearch_data:
    name: elasticsearch_data

networks:
  elk:
    name: elk

```

Run logstash:
```bash
logstash -f myconfig.conf
```

```bash
docker run --rm -v "$(pwd):/data" --network elk docker.elastic.co/logstash/logstash:7.12.0 -f /data/myconfig.conf
```

##### Install plugins:
```bash
bin/logstash-plugin install logstash-filter-tld
```

###### If you work with docker you can run an iteractive bash session:
```bash
talion@pluton elk> docker run --rm -it -v ""(pwd)":/data" --network elk docker.elastic.co/logstash/logstash:7.12.0 bash
bash-4.2$ logstash-plugin  install logstash-filter-tld
Using bundled JDK: /usr/share/logstash/jdk
OpenJDK 64-Bit Server VM warning: Option UseConcMarkSweepGC was deprecated in version 9.0 and will likely be removed in a future release.
Validating logstash-filter-tld
Installing logstash-filter-tld
^[^YInstallation successful
bash-4.2$ logstash -f
bin/                      CONTRIBUTORS              Gemfile                   lib/                      modules/                  vendor/
.bundle/                  data/                     Gemfile.lock              logstash-core/            pipeline/                 x-pack/
config/                   .gem/                     jdk/                      logstash-core-plugin-api/ tools/
bash-4.2$ logstash -f data/^C
bash-4.2$ ls data/
bash-4.2$ ls -la /data/
total 16
drwxr-xr-x 2 logstash logstash 4096 Nov 16 15:48 .
drwxr-xr-x 1 root     root     4096 Nov 16 15:50 ..
-rw-r--r-- 1 logstash logstash  724 Nov 15 18:30 docker-compose.yml
-rw-r--r-- 1 logstash logstash    0 Nov 16 15:48 Dockerfile
-rw-r--r-- 1 logstash logstash 1318 Nov 16 15:43 logstash.conf
bash-4.2$ logstash -f /data/logstash.conf
```


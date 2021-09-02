to restart server:

```
sudo docker-compose down
sudo docker volume rm server_taskbuff-db
sudo docker-compose up
```

This will remove all data on the database and reinitialize it with create.sql. Necisarry because some of the tables changed.

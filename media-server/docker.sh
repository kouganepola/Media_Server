sudo docker-compose up -d
sudo docker exec -it mongoDB mongo

rs.initiate(
  {
    _id : 'rs0',
    members: [
      { _id : 0, host : "db:27017" },
      { _id : 1, host : "db1:27018" },
      { _id : 2, host : "db2:27019" }
    ]
  }
)

exit
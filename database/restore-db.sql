RESTORE DATABASE GameForumDB
FROM DISK = '/var/opt/mssql/backup/GameForumDB.bak'
WITH MOVE 'GameForumDB_Data' TO '/var/opt/mssql/data/GameForumDB.mdf',
     MOVE 'GameForumDB_Log' TO '/var/opt/mssql/data/GameForumDB_log.ldf',
     REPLACE;
#!/bin/bash

# Wait for SQL Server to start
echo "⏳ Waiting for SQL Server to start..."
until /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong!Passw0rd -Q "SELECT 1" > /dev/null 2>&1
do
  sleep 2
done

echo "✅ SQL Server is up. Restoring database..."

# Get logical file names
LOGICAL_NAMES=$(/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong!Passw0rd -Q "RESTORE FILELISTONLY FROM DISK = '/var/opt/mssql/backup/GameForumDB.bak'" -s"," -W | grep -E '.mdf|.ldf' | awk -F ',' '{print $1}' | tr -d '\r')

DATA_NAME=$(echo "$LOGICAL_NAMES" | head -n 1)
LOG_NAME=$(echo "$LOGICAL_NAMES" | tail -n 1)

# Restore database
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong!Passw0rd -Q "
RESTORE DATABASE GameForumDB
FROM DISK = '/var/opt/mssql/backup/GameForumDB.bak'
WITH MOVE '$DATA_NAME' TO '/var/opt/mssql/data/GameForumDB.mdf',
     MOVE '$LOG_NAME' TO '/var/opt/mssql/data/GameForumDB_log.ldf',
     REPLACE"
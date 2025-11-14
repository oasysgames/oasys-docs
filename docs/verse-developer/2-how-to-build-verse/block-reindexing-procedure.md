# Procedure to reindexing a specific block

## 1. Delete the block-related data from the database

Connect to PostgreSQL and delete all data associated with the target block (in this example, block `9089339`).

```sql
BEGIN;

-- 1. Delete internal transactions belonging to transactions in the block
DELETE FROM internal_transactions
WHERE transaction_hash IN (
  SELECT hash FROM transactions WHERE block_number = 9089339
);

-- 2. Delete logs (event logs) belonging to the block
DELETE FROM logs
WHERE block_number = 9089339;

-- 3. Delete token transfers belonging to the block (if enabled)
DELETE FROM token_transfers
WHERE block_number = 9089339;

-- 4. Delete transactions belonging to the block
DELETE FROM transactions
WHERE block_number = 9089339;

-- 5. Finally, delete the block itself
DELETE FROM blocks
WHERE number = 9089339;

COMMIT;
```

> ⚠️ **Important:** Always take a **backup** of the database before running this script.

---

## 2. Reset the indexing server (Docker)

Restart the Blockscout indexing server to reindex the deleted block.

```bash
# Stop the Blockscout indexer container
docker-compose stop

# Restart the container
FRONT_PROXY_PASS=http://host.docker.internal:3000 docker-compose -f external-frontend.yml up -d
```

- After restarting, the indexer will fetch the deleted block again and reindex it in the database.  
- Check the logs to confirm that block `9089339` has been successfully reindexed.

---
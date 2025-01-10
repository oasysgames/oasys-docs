# Users FAQ

### Q. How can I resolve a stuck pending transaction?
To resolve a stuck pending transaction, you can try the following method:

1. Use a Custom Nonce:
-	Refer to the [Metamask guide on custom nonce](https://support.metamask.io/transactions-and-gas/transactions/how-to-speed-up-or-cancel-a-pending-transaction/#method-2-custom-nonce). Instead of sending 0 ETH, try sending 1 OAS to your own account (the same address for both From and To).
2. Set the Correct Nonce:
- Use the nonce of the earliest pending transaction. For example, if the stuck transaction has a nonce of “5,” use “5” as the custom nonce.
3. Increase the Gas Price:
-	Set the gas price to 10 times higher than the normal rate (e.g., if the standard rate is 1.5 Gwei, set it to 15 Gwei). This significantly increases the chances of clearing the pending transaction.

---

### Q: How can I resolve the issue of `oasfi` not outputting CSV data for the specified date or epoch range?

`oasfi` references the existing CSV file and does not output data for epochs earlier than the latest epoch already in the file.  
Please try the following:

- Use the `--output=output_csv/xxxx.csv` option when running the command to save the CSV with a new name.
- If the above doesn’t work, back up the `output_csv` directory, delete it, and run the process again.

---

# CSV Download

Accurate record-keeping is critical in the realm of digital transactions.
Considering the diverse needs of users, from personal tax returns to complex corporate accounting, Explorer is equipped with a CSV export feature.
Explorer is designed to access and output data such as On Chain Transactions and Token Transfers.
Read below to understand the step-by-step process and additional tools available to ensure data accuracy.

## How to Use

### Donwload CSV

- Navigate to the desired page where the Download CSV Button is available.
- Click on the Download CSV button
- Choose the desired time period for which you want to download the CSV file.
- Click on the reCAPTCHA to verify that you are not a robot.
- Click on the Download button to download the CSV file to your computer.
- If the period of data to be downloaded is wide, the load on the server will be high and the download will take time.


## Use Case
The downloaded CSV can be utilized for various purposes. Here, we present practical examples for different use cases.

### Staking Reward Tax Calculation
For those who wish to calculate the rewards earned from staking, we provide a step-by-step guide.


1. Enter the wallet address used for staking in the search window located at the upper right corner of the explorer and press Enter.
   ![exp-dl-1](/img/docs/tech/csv-download/exp-dl-1.jpg)

2. In the Transaction Details section, select the 'Internal Transactions' tab.
   ![exp-dl-2](/img/docs/tech/csv-download/exp-dl-2.jpg)

3. At the bottom of the page, click on "CSV Download" to download the CSV file.
   ![exp-dl-3](/img/docs/tech/csv-download/exp-dl-3.jpg)

4. Specify the time period you wish to analyze, select the corresponding checkbox, and then download the file.
   ![exp-dl-4](/img/docs/tech/csv-download/exp-dl-4.jpg)

5. Open the CSV and apply the following filters to the rows:
   - The 'from' address should be the staking contract: (`0x000000000000000000000000000000000000000000000000000000000001001`)
   - The 'to' address should be your wallet address.
     ![case-staking-tax-5](/img/docs/tech/csv-download/case-staking-tax-5.png)![case-staking-tax-5](/img/docs/tech/csv-download/case-staking-tax-5.png)

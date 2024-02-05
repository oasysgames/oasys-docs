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

### Download CLI (optional)

#### Why Use CLI to Modify CSV

The necessity to modify the CSV using the CLI tool arises due to a known issue
where token transfers are duplicated in some cases in the CSV output from Blockscout v5.
This issue has been observed in the Hub Mainnet, and the CLI tool is used to correct this problem.
Although it is currently observed only in hub mainnet, there is a possibility that it may occur in other verses in the future.
Using the CLI tool to correct the CSV is optional but recommended to ensure the accuracy and reliability of the data in the CSV file.

- Download the latest oasfi-\* from [releases](https://github.com/oasysgames/oasfi/releases).
- Choose among MacOS, Windows, or Linux.
- Download location: Any
- Assume the csv file is in the same directory.

### Usage

For usage instructions, please refer to the tool's [guideline](https://github.com/oasysgames/oasfi/blob/main/doc/doc_EN/correct_csv_EN.md). As an example, we provide a guide on how to use it on macOS.

1. First, launch the Terminal.
   ![terminal_launch](/img/docs/tech/csv-download/explorerCsvCliTerminal.jpg)
2. In the Terminal, navigate to [your CLI directory] by typing `cd [your CLI directory]` and then pressing enter. Replace [your CLI directory] with the path where you've stored the CLI tool.
3. Then, execute following commad:

> **_Note:_** If you omit the --chain or -c option, the default setting is hub_mainnet.

#### macOS:

```bash
./oasfi-macos correct-csv -i=input.csv -o=output.csv --chain=chain_name

# example
# ./oasfi-macos correct-csv -i=foo.csv -o=bar.csv --chain=hub_mainnet
```

#### windows:

```bash
./oasfi-win.exe correct-csv -i=input.csv -o=output.csv --chain=chain_name

# example
# ./oasfi-win.exe correct-csv -i=foo.csv -o=bar.csv --chain=hub_mainnet
```

#### linux:

```bash
./oasfi-linux correct-csv -i=input.csv -o=output.csv --chain=chain_name

# example
# ./oasfi-linux correct-csv -i=foo.csv -o=bar.csv --chain=hub_mainnet
```

Here, input.csv is the path to the CSV file you want to read, and output.csv is the path where the resulting CSV file will be saved.

## Use Case
The downloaded CSV can be utilized for various purposes. Here, we present practical examples for different use cases.

### Staking Reward Tax Calculation
For those who wish to calculate the rewards earned from staking, we provide a step-by-step guide.


1. Enter the wallet address used for staking in the search window located at the upper right corner of the explorer and press Enter.
![case-staking-tax-1](/img/docs/tech/csv-download/case-staking-tax-1.png)
1. On the Transaction Details section, select the 'Internal Transactions' tab.
![case-staking-tax-2](/img/docs/tech/csv-download/case-staking-tax-2.png)
1. At the bottom of the page, click on "CSV Download" to download the CSV file.
![case-staking-tax-3](/img/docs/tech/csv-download/case-staking-tax-3.png)
1. Specify the time period you wish to analyze, select the corresponding checkbox, and then download the file.
![case-staking-tax-4](/img/docs/tech/csv-download/case-staking-tax-4.png)
1. Open the CSV and apply the following filters to the rows:
  - The 'from' address should be the staking contract: (`0x000000000000000000000000000000000000000000000000000000000001001`)
  - The 'to' address should be your wallet address.
![case-staking-tax-5](/img/docs/tech/csv-download/case-staking-tax-5.png)

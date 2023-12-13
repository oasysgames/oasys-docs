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
   ![terminal_launch](/img/tutorial/explorerCsvCliTerminal.jpg)
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

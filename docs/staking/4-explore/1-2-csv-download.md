# CSV Download

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

- Download the latest oasys-csv-cli-* from [releases](https://github.com/oasysgames/explorer-csv-cli/releases).
- Choose among MacOS, Windows, or Linux.
- Download location: Any
- Assume the csv file is in the same directory.

### Execute from Terminal

![terminal_launch](/img/tutorial/explorerCsvCliTerminal.jpg)

In Terminal, type cd [your CLI directory] and press enter. Replace [your CLI directory] with the path where you have placed the CLI tool.

Execute the following according to your system:

- macOS

```bash
./oasys-csv-cli-macos input.csv output.csv chain_name

# example
# ./oasys-csv-cli-macos foo.csv bar.csv hub_mainnet
```

- Linux

```bash
./oasys-csv-cli-linux input.csv output.csv chain_name
```

- Windows

```bash
./oasys-csv-cli-windows input.csv output.csv chain_name
```

Here, input.csv is the path to the CSV file you want to read, and output.csv is the path where the resulting CSV file will be saved.
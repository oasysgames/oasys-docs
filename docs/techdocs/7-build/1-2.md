# IPFS
[IPFS(Interplanetary File System)](https://ipfs.tech/) is a decentralized p2p file system that wants to connect all computers. Many Web3 projects use it, and recently many NFT projects have required IPFS for NFT storage.

IPFS uses content addressing to identify content, not its location, and uses [IPLD](https://ipld.io/) to import content from raw content to IPFS addresses that uniquely identify content on the IPFS network.

## Install IPFS
- [IPFS Desktop Version](https://github.com/ipfs/ipfs-desktop/releases) : You can use IPFS through the GUI using the IPFS Desktop version without using the terminal.
- IPFS Command-line Version

### Windows OS

1. Download the Windows OS binary.
```
 cd ~\
wget https://dist.ipfs.tech/kubo/v0.16.0/kubo_v0.16.0_windows-amd64.zip -Outfile kubo_v0.16.0.zip
```

2. Unzip the downloaded file.
```
Expand-Archive -Path kubo_v0.16.0.zip -DestinationPath ~\Apps\kubo_v0.16.0
```

3. Go to the unzipped folder and make sure that kubo_v0.16.0 works well.
```
cd ~\Apps\kubo_v0.16.0\kubo
.\ipfs.exe --version

> ipfs version 0.16.0
```

4. Save the current working directory into a temporary variable:
```
$GO_IPFS_LOCATION = pwd
```

5. Create a powershell profile.
```
if (!(Test-Path -Path $PROFILE)) { New-Item -ItemType File -Path $PROFILE -Force }
```

6. Add the location of your Kubo daemon and add it to PowerShell's PATH by truncating it to the end of your PowerShell profile.
```
Add-Content $PROFILE "`n[System.Environment]::SetEnvironmentVariable('PATH',`$Env:PATH+';;$GO_IPFS_LOCATION')"
```

7. Load your $PROFILE
```
& $profile   
```

8. Test that your IPFS path is set correctly by going to your home folder and asking IPFS for the version.
```
cd ~
ipfs --version

> ipfs version 0.16.0
```

### Mac OS

1. Download the Mac OS binary.
```
curl -O https://dist.ipfs.tech/kubo/v0.16.0/kubo_v0.16.0_darwin-amd64.tar.gz
```

2. Unzip the downloaded file.
```
tar -xvzf kubo_v0.16.0_darwin-amd64.tar.gz

> x kubo/install.sh
> x kubo/ipfs
> x kubo/LICENSE
> x kubo/LICENSE-APACHE
> x kubo/LICENSE-MIT
> x kubo/README.md
```

3. Move into the kubo folder and run the install script.
```
cd kubo
sudo bash install.sh

> Moved ./ipfs to /usr/local/bin
```

4. Check that IPFS is installed.
```
ipfs --version

> ipfs version 0.16.0
```

### Linux OS

1. Download the Linux OS binary.
```
wget https://dist.ipfs.tech/kubo/v0.16.0/kubo_v0.16.0_linux-amd64.tar.gz
```

2. Unzip the downloaded file.
```
tar -xvzf kubo_v0.16.0_linux-amd64.tar.gz

> x kubo/install.sh
> x kubo/ipfs
> x kubo/LICENSE
> x kubo/LICENSE-APACHE
> x kubo/LICENSE-MIT
> x kubo/README.md
```

3. Move into the kubo folder and run the install script.
```
cd kubo
sudo bash install.sh

> Moved ./ipfs to /usr/local/bin
```

Test that IPFS has been installed correctly:
```
ipfs --version

> ipfs version 0.16.0
```

## Add files

1. Within the CLI, navigate to the directory containing the file or folder you wish to share. In this example, we will navigate to the ~/Documents directory.

```
cd ~/Documents

ls 

hello-ipfs.txt
```

2. Next up, we'll use the `ipfs add` command to add a file to IPFS. Add the file extension to the end of the file name.

```
ipfs add hello-ipfs.txt

> added QmRgR7Bpa9xDMUNGiKaARvFL9MmnoFyd86rF817EZyfdGE hello-ipfs.txt
6 B / 6 B [==========================================================] 100.00
```

### Retrieve a file

1. Within the CLI, navigate to the directory where you wish to save the folder. IPFS will save the folder to whichever directory you are in. In this case, we'll save the folder in the ~/Documents directory.

```
cd ~/Documents
```

2. To get content over IPFS, we need to tell the `ipfs daemon` which CID we want. In this case, we want bafybeif2ewg3nqa33mjokpxii36jj2ywfqjpy3urdh7v6vqyfjoocvgy3a.

3. Use the command `ipfs get`, combined with the CID we want, to retrieve the folder:

```
ipfs get bafybeif2ewg3nqa33mjokpxii36jj2ywfqjpy3urdh7v6vqyfjoocvgy3a

> Saving file(s) to bafybeif2ewg3nqa33mjokpxii36jj2ywfqjpy3urdh7v6vqyfjoocvgy3a
1.76 KiB / 1.76 KiB [==============================================] 100.00% 0s
```

### View a file
You can view the contents of a file from within the CLI using the command `ipfs cat`. We'll use this command to view the contents of the folder we just retrieved, but you can also use `ipfs cat` on files you don't already have locally.

```
ipfs cat bafybeif2ewg3nqa33mjokpxii36jj2ywfqjpy3urdh7v6vqyfjoocvgy3a

> Error: this dag node is a directory
```

Attempting to run `ipfs cat` on the CID from above returns an error! The CID points to the directory, not the file. We will run `ipfs refs <CID>` to view the directory contents.

```
ipfs refs bafybeif2ewg3nqa33mjokpxii36jj2ywfqjpy3urdh7v6vqyfjoocvgy3a

> bafkreig24ijzqxj3cxdp6yh6ia2ysxzvxsfnd6rzahxxjv6ofcuix52wtq
```

The `ref` command returns the CID that points to the file within the directory. Now you can use `ipfs cat` with this new CID to view it:

```
ipfs cat bafkreig24ijzqxj3cxdp6yh6ia2ysxzvxsfnd6rzahxxjv6ofcuix52wtq

> 
MMMMMMMMMMN0xo;';ox0NMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMWXOdoloxkkkxolodOXWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMN0xdoodkOOOOOOOOOkdoodx0NMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MKo;;oxOOOOOOOOOOOOOOOOOxo;;oKMMMMMXOKMMMN0kkkkkO0NWMMXOkkkkkkOXMMWKkddddk0NMMMM
Wd...':okOOOOOOOOOOOOOko:'...dWMMMWd.lWMM0,.;ccc:;,oXWd.'clllco0WO:,:loolcckWMMM
Wdckdc,..;lxOOOOOOOxl;..';lo;dWMMMWo.lWMM0''0MMMWK:.oNo.lWMMMMMMX:.dWMMMMMWWMMMM
WdcOKK0ko;'.,:c:c:,..,:oxxxd;dWMMMWo.lWMM0''0MMMMNc.oNo.lNWWWWWMNl.;x0XNWMMMMMMM
WdcOKKKKKKOd:.   .,cdxxxxxxd;dWMMMWo.lWMM0'.coool;'cKWo..clllldXMNkl:;;;:lxXMMMM
WdcOKKKKKKKK0l. .:dxxxxxxxxd;dWMMMWo.lWMM0'.cooodkKWMWo.:0K000KWMMMMWNK0xc.,0MMM
WdcOKKKKKKKKK0: ,dxxxxxxxxxd:dWMMMWo.lWMM0''0MMMMMMMMWo.lWMMMMMMMMMMMMMMMX:.dWMM
Wd;xKKKKKKKKK0: ,dxxxxxxxxxl,dWMMMWo.lWMM0''0MMMMMMMMWo.lWMMMMMMWOdk0KXXKd.,0MMM
Mk',d0KKKKKKK0: ,dxxxxxxxdc.'kMMMMMO:xWMMKllXMMMMMMMMWk:kWMMMMMMWOlcccccccdKWMMM
MWKkdooxOKKKK0: ,dxxxxdlclokKWMMMMMWWWMMMMWWMMMMMMMMMMMWMMMMMMMMMMMWWNNNNWMMMMMM
MMMMWNOxdodk00: ,ddoccldONWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMWKkdol' .:lokKWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMWKd'.'dKWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
```

## Pin a file

You can pin the data we want to save to our IPFS node to ensure you don't lose this data.

1. Use the `ipfs pin add` command:

```
ipfs pin add bafybeif2ewg3nqa33mjokpxii36jj2ywfqjpy3urdh7v6vqyfjoocvgy3a

> pinned bafybeif2ewg3nqa33mjokpxii36jj2ywfqjpy3urdh7v6vqyfjoocvgy3a recursively
```

## Remove a file

1. First, you need to grab the CID of the file or folder we want to unpin. To view a content list, you have pinned, run `ipfs pin ls`.

```
ipfs pin ls

> QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB indirect
QmQGiYLVAdSHJQKYFRTJZMG4BXBHqKperaZtyKGmCRLmsF indirect
QmU5k7ter3RdjZXu3sHghsga1UQtrztnQxmTL22nPnsu3g indirect
QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn recursive
QmYCvbfNbCwFR45HiNP45rwJgvatpiW38D961L5qAhUM5Y indirect
QmejvEPop4D7YUadeGqYWmZxHhLc4JBUCzJJHWMzdcMe2y indirect
QmQ5vhrL7uv6tuoN9KeVBwd4PwfQkXdVVmDLUZuTNxqgvm indirect
QmQPeNsJPyVWPFDVHb77w8G42Fvo15z4bG2X8D2GhfbSXc recursive
QmQy6xmJhrcC5QLboAcGFcAE1tC8CrwDVkrHdEYJkLscrQ indirect
```

2. If you know exactly which CID you want to remove, great! However, if you're unsure which CID is, you can use the `ipfs add` command again on the file or folder you want to remove to find out. We're going to unpin the hello-ipfs.txt file we used earlier.

```
cd ~/Documents

ipfs add hello-ipfs.txt

> added QmRgR7Bpa9xDMUNGiKaARvFL9MmnoFyd86rF817EZyfdGE hello-ipfs.txt
6 B / 6 B [==========================================================] 100.00
```

3. Now, you can use the `ipfs pin rm` command to unpin the file.

```
ipfs pin rm QmRgR7Bpa9xDMUNGiKaARvFL9MmnoFyd86rF817EZyfdGE

> unpinned QmRgR7Bpa9xDMUNGiKaARvFL9MmnoFyd86rF817EZyfdGE
```

4. The hello-ipfs.txt file is now unpinned but has not been deleted from our node. To delete it, we need to run the garbage collection. The command will remove everything from your node that does not have a pin.

```
ipfs repo gc

> removed bafybeif2ewg3nqa33mjokpxii36jj2ywfqjpy3urdh7v6vqyfjoocvgy3a
removed bafkreieceevgg2auxo4u3rjgeiqfr4ccxh6ylkgxt2ss6k2leuad5xckxe
removed bafkreiblcvcr7letdbp2k2thkbjyunznrwq3y6pyoylzaq4epawqcca2my
[...]
```
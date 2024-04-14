# Bitburner

These are the scripts I wrote for the Bitburner Game. Before I started this game I couldn't write any code. 

Bitburner is a programming-based incremental game that revolves around hacking and cyberpunk themes. The game can be played in a [browser](https://danielyxie.github.io/bitburner) or installed through [Steam](https://store.steampowered.com/app/1812820/Bitburner/).

## Genesis

### collectStage1.js

This script generates a list of all servers with short processing times. It records necessary details such as hostname, required action (weak, grow, hack), and the threads needed for each action. Once the list is complete, it is sorted based on thread count, and then all entries in the network are installed. If any entry fails to install completely, the script halts and waits until the network is empty again before proceeding with the next installation round.

`args non`
> run collectStage1.js

### collectStage2.js

Collectstage2 operates in a similar fashion to collectstage1. Just as collectstage1 operates based on short turnaround times, collectstage2 operates based on probability. In this process, the script will iterate through the server list, and if there's more than an 80% probability, it will calculate the necessary steps to launch an attack on the server. This, in turn, is installed within the network. Unlike collectstage1, the script doesn't verify whether the installation was successful; thus, it adopts a somewhat more aggressive approach. It will never utilize more threads than necessary to keep the network available for running as many scripts as possible. Additionally, alongside focusing on the 80% probability, another script called pre_weak.js is initiated on the home server. This script assists in bringing servers that fall outside the probability threshold back within the 80% range.

`args non`
> run collectStage2.js

### hacknet.js

This script will operate autonomously until all provided arguments are met, at which point it will terminate. If no arguments are given, the script will automatically purchase 4 nodes with 25 levels, 2 gigabytes of RAM, and 1 core. This configuration is sufficient to receive an invitation from Netburners.

The script accepts the following arguments:

- Number of nodes to purchase
- Number of levels per node to purchase
- Amount of RAM per node to purchase (in gigabytes)
- Number of cores per node to purchase

`args: optional`
> run hacknet.js 5 100 16 2

### pck_*.js

These scripts have the same functions as sqn_gwh.js buy are seperated for more control on timing en threads. The arguments are provided bij collectStage3.js

- Weak the security of a server, use arg to define target server with a delay
- Grow the money of a server, use arg to define target server with a delay
- Hack the money available of a server, use arg to define target server with a delay

`parent: collectStage3.js`
`args required`
> run pck_grow.js sigma-cosmetics 2000

### server.js

This script will continuously purchase servers until 32GB. Initially, it will buy servers with 4GB of RAM. Once all 24 servers have 4GB RAM, it will replace each server with an 8GB RAM version. This process will continue, increasing the RAM of each server until the 32GB amount of RAM is reached. The script will consider the total available RAM in the network. If the usage is more than 90% of the total RAM, the script will purchase new servers or upgrades.

`args: non`
> run servers.js 128

### sharePower.js

When all is said and done, and all you're waiting for is the reputation of a faction, run this script. The network will be flooded with sharepower so that waiting for reputation can proceed more quickly.

`args: non`
> run sharePower.js

### pre_weak.js

The pre_weak.js script operates based on probability. It initiates within a range of 70% to 80% and traverses through all servers to lower their security. Once all servers within this range have been addressed, the range expands to 60% to 80%. This process continues until all servers are completely open, at 0% security. At this point, the script self-terminates. The purpose of this script is to bring servers with a probability lower than 70% into this range. Once achieved, collectStage2.js takes over further actions.

`parent: collectStage2.js`
`args optional`
> run pre_weak.js 0.5 0.8

### stockmarket.js

The stock market script is designed to gather information on all stocks that exceed the purchase threshold or in which shares are currently held. Once collected, this data is sorted to prioritize investment opportunities. Based on this analysis, shares are then purchased accordingly. Conversely, if a stock's value drops below the selling threshold, the script automatically triggers the sale of all associated shares to mitigate potential losses. For a detailed overview of the current status and transactions, you can refer to the comprehensive logs generated by the script.

`args non`
> run stockmarket.js

## Singularity

### company.js

Upon starting, you must specify the company you wish to work for and the maximum reputation you aim to achieve there. Once you've provided this information, the script will begin working towards the specified goals. If no arguments are provided upon startup, the script will work at 4sigma until reaching the status of CEO, CFO, or CTO. This should suffice for Silhouette, as it is one of the requirements to work for the gang.

`args optional`
> run company.js ECorp 400000

### core.js

core.js will keep buying as long as the script is running.

`args non`
> run core.js

### crime.js Next update...
### faction.js Next update...
### gym.js 

When starting this script, you are required to specify via the arguments how much skills you want to acquire. Upon starting the script, it will first attempt to install a backdoor on the gym server for a small discount. Then, you will be directed to the correct location. Afterward, you will begin building up your skills to the point you have specified. Once the goal is reached, the script will automatically close itself.

skills: str, def, dex, agi

`args required`
> run gym.js 20 20 20 20

### install.js Next update...
### programs.js

During its focus, Programs will always take precedence over any of its similar scripts. This script contains a list of essential programs that will either be purchased or created. Once all the programs are acquired, the script will close to free up space for other scripts.

`cousins: company, crime, gym, programs, reputation, school`
`args non`
> run programs.js

### ram.js
 
Ram.js will keep buying as long as the script is running.

`args non`
> run ram.js

### reputation.js Next update...
### requirement.js Next update...
### school.js

When starting this script, you are required to specify via the arguments how much charisma you want to acquire. Upon starting the script, it will first attempt to install a backdoor on the school server for a small discount. Then, you will be directed to the correct location. Afterward, you will begin building up your charisma to the point you have specified. Once the goal is reached, the script will automatically close itself.

`args required`
> run school.js 375
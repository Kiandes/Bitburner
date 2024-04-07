# Bitburner

These are the scripts I wrote for the Bitburner Game. Before I started this game I couldn't write any code. 

Bitburner is a programming-based incremental game that revolves around hacking and cyberpunk themes. The game can be played in a [browser](https://danielyxie.github.io/bitburner) or installed through [Steam](https://store.steampowered.com/app/1812820/Bitburner/).

## Genesis

### collectStage1.js

With this script, you can execute a ‘grow weak’ hack on servers that are easy to manipulate. Arguments are optional, if you run this script without any arguments, it will target n00dles.

`args optional`
> run collectStage1.js joesguns

### collectStage2.js

This script floods the entire network with the sqn_gw.js script, thereby increasing the funds on each server and lowering security. If the money on a server exceeds 40% of its maximum capacity, the script will initiate a hacking action on the home server. To limit RAM usage, only one hack per server will be executed at all times.

`args non`
> run collectStage2.js

### collectStage3.js

collectStage3 handles threads very efficiently. When it installs an action in the network, it will only create one instance of it distributed across multiple servers. Although this is efficient with threads, the script struggles with time management because all instances are executed sequentially.

`args non`
> run collectStage3.js

### sqn_gwh.js

The sqn_gwh.js weakens the security, grows the balance, hacks the money available. Grows server money incremental on every hack + 1%. The arguments are provided bij collectStage1.js but can also be run manualy. If no argument is given it will hack n00dles by default.

`parent: collectStage1.js`
`args optional`
> run sqn_gwh.js n00dles

### sqn_gw.js

The sqn_gw.js script increases the account balance and reduces security based on the chance. The hacking process is carried out by either collectStage2.js or collectStage3.js. Initially, the arguments are provided by parents, but they can also be manually specified. If no argument is provided, the default hack chance is set to 80% (in decimal form).

`parent: collectStage2.js`
`args: optional`
> run sqn_gw.js 0.7

### pck_*.js

These scripts have the same functions as sqn_gwh.js buy are seperated for more control on timing en threads. The arguments are provided bij collectStage3.js

- Weakens the security of a server, use arg to define target server with a delay
- Grows the money of a server, use arg to define target server with a delay
- Hacks the money available of a server, use arg to define target server with a delay

`parent: collectStage3.js`
`args required`
> run pck_grow.js sigma-cosmetics 2000

## Purchase

### hacknet.js

This script will operate autonomously until all provided arguments are met, at which point it will terminate. If no arguments are given, the script will automatically purchase 4 nodes with 25 levels, 2 gigabytes of RAM, and 1 core. This configuration is sufficient to receive an invitation from Netburners.

The script accepts the following arguments:

- Number of nodes to purchase
- Number of levels per node to purchase
- Amount of RAM per node to purchase (in gigabytes)
- Number of cores per node to purchase

`args: optional`
> run hacknet.js 5 100 16 2

### server.js

This script will continuously purchase servers until argument conditions are met. Initially, it will buy servers with 4GB of RAM. Once all 24 servers have 4GB RAM, it will replace each server with an 8GB RAM version. This process will continue, increasing the RAM of each server until the args amount of RAM is reached. Additionally if no args are provided, the script will consider the total available RAM in the network. If the usage is more than 90% of the total RAM, the script will purchase new servers or upgrades.

`args: optional`
> run servers.js 128

### programs.js

This script purchases or creates only the necessary .exe programs required to run the hack scripts, ensuring that essential programs are the only ones acquired.

BruteSSH.exe, FTPCrack.exe, relaySMTP.exe, HTTPWorm.exe, SQLInject.exe

`args: non`
> run programs.js

### ram.js

Keeps buying untill your money runs out.

`args: non`
> run ram.js

### core.js

Keeps buying untill your money runs out.

`args: non`
> run core.js
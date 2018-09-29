# Hack a Thing 2
## Decentralized Voting with Ethereum, Truffle, and Ganache

### Emma Kennelly and Emily Pitts

### How to run:

1. Download truffle `npm install truffle` and Ganache (via website or `ganache-cli`).

2. Start ganache at port `127.0.0.1:7545`. (Either through the desktop app or by command `ganache-cli`.)

3. `truffle compile` to create a `build` folder holding contract .json files.

4. `truffle migrate` to migrate contracts onto ganache.

5. Start the webapp using `npm run dev`.
  - If you have Metamask installed on Chrome, you must 'submit' the transaction to confirm after each vote, then refresh the page.
  - Without Metamask (i.e. on Safari), the vote will update upon clicking the 'Vote' button under a candidate.

### What we worked on

With recent elections taking place as well as the rush process for Greek organizations, our idea was to create a less questionable, more reliable voting system. We also wanted to learn more about blockchain decentralized apps, so we fused  the two ideas together to create a decentralized voting app that enhances security, transparency, and efficiency.

To simulate the voting app, we decided to create a mini election for attendees to choose their favorite speaker at the Grace Hopper Celebration 2018.

We started by following a tutorial online: https://medium.freecodecamp.org/developing-an-ethereum-decentralized-voting-application-a99de24992d9

This tutorial recommended using an already-existing git repo containing code for Truffle/Ethereum contracts and javascript for a voting system. However, we decided to try starting a Truffle project from scratch and follow along to the tutorial from there to gain a better understanding of Truffle.

So, we downloaded the Truffle package and followed these steps:
`truffle init` to create a new Truffle project.
`truffle compile`
`truffle migrate` to migrate contracts onto the blockchain.

From there, we added our own contract `Voting` holding the logic for voting for candidates.

We used Ganache to locally deploy our contracts onto the blockchain. We tested this both using the Ganache desktop app as well as the ganache-cli. Below is a screenshot of the output from `truffle migrate` while ganache is running at local port 8545.

![ganache](pics/ganache.png)

### What went wrong
We really wanted to get the blockchain voting logic working from the first tutorial so that we could create a nice, UI-friendly voting app, but we kept getting stuck with our contract transactions not appearing on the page after emitting an event, i.e. `emit AddedCandidate(uint candidateId);` (nothing happened). After unsuccessfully trying to debug this connection issue, we decided to start from scratch again with a [slightly simpler tutorial](https://truffleframework.com/tutorials/pet-shop) which provided a decent Bootstrap UI to get us going.

### The final product

We replaced the tutorial's contract/transaction logic with a very basic `Voting` contract which tracks an array in storage indexing candidate IDs to their total votes. The UI allows a user to vote for a candidate, which in turn creates a transaction to update the candidate's number of votes in storage.

### Moving forward
If we had more time to work on this, we think we have developed a deep enough understanding to create a much more complex application with a more intuitive contract logic for voting, but given the time constraints and the errors we were stuck on, this was a great start.

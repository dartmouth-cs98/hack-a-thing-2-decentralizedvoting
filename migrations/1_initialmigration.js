var Migrations = artifacts.require("./Migrations.sol")
var Voting = artifacts.require("./Voting.sol")


module.exports = function(deployer) {
  deployer.deploy(Migrations).then(function(instance) {
    console.log("deployed migration");
    return deployer.deploy(Voting, true, 2000, instance.address);
  })
}

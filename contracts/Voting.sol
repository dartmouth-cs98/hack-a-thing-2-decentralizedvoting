pragma solidity ^0.4.17;

contract Voting {
	uint[16] public candidates;

	// Voting on candidate
	function vote(uint candidateId) public returns (uint) {
		require(candidateId >= 0 && candidateId <= 15);
		candidates[candidateId] += 1;



		return candidateId;
	}

	function getVotes(uint candidateID) public returns (uint) {
		require(candidateID >= 0 && candidateID <= 15);
		return candidates[candidateID];
	}


	// Retrieving the candidates
	function getcandidates() public view returns (uint[16]) {
  		return candidates;
	}

}


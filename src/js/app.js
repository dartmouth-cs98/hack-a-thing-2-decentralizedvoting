
App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    // Load candidates.
    $.getJSON('../candidates.json', function(data) {
      var candidatesRow = $('#candidatesRow');
      var candidateTemplate = $('#candidateTemplate');

      for (i = 0; i < data.length; i ++) {
        candidateTemplate.find('.panel-title').text(data[i].name);
        candidateTemplate.find('img').attr('src', data[i].picture);
        candidateTemplate.find('.btn-vote').attr('data-id', data[i].id);

        candidatesRow.append(candidateTemplate.html());
      }
    });

    return App.initWeb3();
  },

  initWeb3: function() {
    // Is there an injected web3 instance?
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {

      // If no injected web3 instance is detected, fall back to Ganache
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('voting.json', function(data) {
    // Get the necessary contract artifact file and instantiate it with truffle-contract
    var votingArtifact = data;
    App.contracts.Voting = TruffleContract(votingArtifact);

    // Set the provider for our contract
    App.contracts.Voting.setProvider(App.web3Provider);

    // Use our contract to retrieve and mark the voted candidates
    return App.markVoted();
});

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-vote', App.handleVote);
  },

  markVoted: function(candidates, account) {
    var votingInstance;

    App.contracts.Voting.deployed().then(function(instance) {
    votingInstance = instance;
    //int votes = votingInstance.getVotes()

    return votingInstance.getCandidates.call();
    }).then(function(candidates) {
      console.log("here")
    for (i = 0; i < candidates.length; i++) {
      if (candidates[i] !== '0x0000000000000000000000000000000000000000') {
        $('.panel-candidate').eq(i).find('.votes').text(candidates[i]);
      }
    }
    }).catch(function(err) {
    console.log(err.message);
    });

  },

  handleVote: function(event) {
    console.log("handle")
    event.preventDefault();

    var candidateId = parseInt($(event.target).data('id'));

    var votingInstance;

  web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    }

    var account = accounts[0];

    App.contracts.Voting.deployed().then(function(instance) {
      votingInstance = instance;

      // Execute vote as a transaction by sending account
      return votingInstance.vote(candidateId, {from: account});
    }).then(function(result) {
      return App.markVoted();
    }).catch(function(err) {
      console.log(err.message);
    });
  });
    }

  };

$(function() {
  $(window).load(function() {
    App.init();
  });
});

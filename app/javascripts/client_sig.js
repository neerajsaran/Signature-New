var ks; // KeyStore

window.onload = function() {
  console.log("In client_sig");
    // Example of seed 'unhappy nerve cancel reject october fix vital pulse cash behind curious bicycle'
    var seed = prompt('Enter your private key seed', 'Something long');;
    // the seed is stored in memory and encrypted by this user-defined password
    var password = prompt('Enter password to encrypt the seed', 'dev_password');

    lightwallet.keystore.deriveKeyFromPassword(password, function(err, _pwDerivedKey) {
        pwDerivedKey = _pwDerivedKey;
        ks = new lightwallet.keystore(seed, pwDerivedKey);

        // Create a custom passwordProvider to prompt the user to enter their
        // password whenever the hooked web3 provider issues a sendTransaction
        // call.
        console.log("Before Password Provider");
        ks.passwordProvider = function (callback) {
            console.log("In Password provider");
            var pw = prompt("Please enter password to sign your transaction", "dev_password");
            callback(null, pw);
        };

        var provider = new HookedWeb3Provider({
            // Let's pick the one that came with Truffle
            host: web3.currentProvider.host,
            transaction_signer: ks
        });
        web3.setProvider(provider);

        // Generate the first address out of the seed
        ks.generateNewAddress(pwDerivedKey);

        accounts = ks.getAddresses();
        account = "0x" + accounts[0];
        console.log("Your account is " + account);
        refreshBalance();
    });
}

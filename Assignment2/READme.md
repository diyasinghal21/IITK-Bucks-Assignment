## Assignment2

### Choosing the Input

Choose the data from `input.json`
The `original text` is the `unencrypted text` and then the `encrypted text`.

### Sample Input

```
Unencrypted text :  Diya
```

```
Encrypted text : 1a9364533ee777285926b3e99e918c419d237c0294ef5bd5eb9ee867e3158e34aff32c6d3aeb23686561196ca3edb32780d67199881eff403ef3172250a29836498fff78f44bbeb6b5ec7e7699c75bca525eabd4762021aae2fea29af9981b4568e1fa27390c63a932b75572c7f13433721b733d24489a0f1b76d00efc8e1578a91959b91a92a82460bbd0424c9bcb73746dd4349acab98da4674e611286acd6585325e9767a54db8e034079540116abd5c903edbb3bdf207f2e02b07ad438463e6fe183c2771e787aa41f33e32fdd7b7da5c54da77dc64d251dc8e5d82def77358c3f0e0de7cebf0bec6f042330795631786d7df77d31e805bd90bc41190bdcb12145425ecdcb2debcca60cd7459c918ec89b10a00966966d83ab4c2190df41146036ba181bd943ea6ffee70aec7da677043a38dc9a79c986e302a0465ed39406ada2fdcc479c2aec8033f218abcc9f80cfac5b6862d5ccb6d5ad4ab96173bd7aa0aa4d287759e00246c873e362075017126468bbfcf8021d57b3b3701e5ab9
```

### Running the Verification Code

Run the command in terminal

```

python3 index.py

```

The terminal ask for the `public key path` , `unencrypted text` and `encrypted text`.

Enter the input as chosen from `input.json` file

If the encrypted message is decrypted from my public key then the message is shown
`Signature is valid` else
it shows `Signature is invalid`

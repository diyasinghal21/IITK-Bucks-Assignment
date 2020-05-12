## Assignment2

## Installing Dependencies

Run the following command to install dependencies:

```
npm install
pip3 install -r requirements.txt
```

### Choosing the Input

Choose the data from `input.json`
The `original text` is the `unencrypted text` and then the `encrypted text`.

### Sample Input

```
Unencrypted text :  Diya
```

```
Encrypted text : 77d628ede431d9c57b62312f1b376e30b0b0332363f4abac14d33374e4ad114df6ae6461f91727f5a96045f856d7d4c980b51969108bf328e4a0d1ffdf3becee6bf80148fd037636bb4cca6d62f99854912cc5681c801b5db27cde67e7c579f836db8ac4d5e15b3eb6d5e78382603be6739141255ed708652eb7f7f7fbc67b143459009626b2b25d739eb517b88532671690e8cb0e23f10d18f154073b44a35ee37ea08d0619ae2924e4e915e744c4b5eb7dbf4fab4ec8f4c89109469ef958ad33cea034663d98089661bd228a221cd9ed188240c4e9cfba74ade4cb52e965f6e831614936fa7fb1340c8644cae1114736e59c6d05421504e38d40d4585499f480aca7785e214592454dd6addb953d3de045a79fd391a510776374926411022baa0e038c2655377de8d816bc9c7b701a313710ce39a388af194d214202bf8ed6c74c1df954ec0efd2b9312d27d80c45143da9edade680fa734d07258b0e17e11a7dca1bf426905943882d47069b3d5e7f82a08b34134f14ff2ee171a178a4f84
```

### Running the Verification Code

Run the command in terminal

```

node index.js

```

The terminal ask for the `public key path` , `unencrypted text` and `encrypted text`.

Enter the input as chosen from `input.json` file

If the encrypted message is decrypted from my public key then the message is shown
`Signature is valid` else
it shows `Signature is invalid`

// CHILIZ_MAINNET = 88888
// CHILIZ_TESTNET = 88882

import {
  Hex,
  createWalletClient,
  encodeFunctionData,
  http,
  parseAbi,
  zeroAddress,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { ChainId } from '@biconomy/core-types'
import { createSmartAccountClient } from "@biconomy/account";

// CC2 has its own entrypoint address
const CHILIZ_BUNDLER_ENTRYPOINT_ADDRESS='0x00000061FEfce24A79343c27127435286BB7A4E1'

// Biconomyに関する学習
// https://note.com/standenglish/n/nb041cdc258bc
// https://zenn.dev/mashharuki/articles/300394ab31d0cb

const bundler = new Bundler({
    bundlerUrl: `https://bundler.biconomy.io/api/v2/${ChainId.CHILIZ_TESTNET}/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44`,
    chainId: ChainId.CHILIZ_TESTNET,
    entryPointAddress: CHILIZ_BUNDLER_ENTRYPOINT_ADDRESS,
})


const bundlerUrl =
  "https://bundler.biconomy.io/api/v2/80001/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44"; // Found at https://dashboard.biconomy.io

export const createAccountAndMintNft = async () => {
  // ----- 1. Generate EOA from private key
  const account = privateKeyToAccount("0x" + "PRIVATE_KEY");
  const client = createWalletClient({
    account,
    chainId: ChainId.CHILIZ_TESTNET, // or ChainId.CHILIZ_MAINNET,
    transport: http(),
  });
  const eoa = client.account.address;
  console.log(`EOA address: ${eoa}`);

  // ------ 2. Create biconomy smart account instance
  const smartAccount = await createSmartAccountClient({
    signer: client,
    bundlerUrl,
  });
  const saAddress = await smartAccount.getAccountAddress();
  console.log("SA Address", saAddress);
};
createAccountAndMintNft();
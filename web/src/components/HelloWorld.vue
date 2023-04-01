<template>
  <div class="hello">
    <ConnectWalletButton
      :address="address"
      :txnCount="0"
      :dark="false"
      @click="connect"
    >
      <!-- Override the default text on the "Connect Wallet" button -->
      Connect Wallet!
    </ConnectWalletButton>
    <div>
      <div>{{ permitRequest }}</div>
      <button @click="permit">Permit</button>
    </div>
    <div>{{ signature }}</div>
  </div>
</template>

<script>
import { useMetaMaskWallet } from "vue-connect-wallet"
import { ref } from "vue"
import { signPermitRequest } from "../lib/permit"
//import ethers from 'ethers'

export default {
  setup() {
    const wallet = useMetaMaskWallet()
    const address = ref("")
    const signature = ref("")
    let signer = null
    let token = null
    const permitRequest = ref("")
    permitRequest.value = {
      owner: "0x",
      spender: "0x",
      value: "100",
    }
    const connect = async () => {
      const accounts = await wallet.connect()
      if (typeof accounts === "string") {
        console.log("An error occurred" + accounts)
      }
      address.value = accounts[0]
      permit.value.owner = accounts[0]
      //signer = new ethers.JsonRpcSigner(window.ethereum, accounts[0])
    }

    const permit = async () => {
      const nonce = "0"
      const deadline = Date.now() / 1000 + 99999999999
      const sig = await signPermitRequest(
        token,
        signer,
        permitRequest.value.owner,
        permitRequest.value.spender,
        permitRequest.value.value,
        nonce,
        deadline
      )
      sig.value = sig
    }

    return {
      wallet,
      connect,
      address,
      permit,
      token,
      signer,
      signature,
      permitRequest,
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

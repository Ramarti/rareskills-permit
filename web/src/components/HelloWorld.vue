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
      <div>Network: {{ network }}</div>
      <div>USDC Goerli</div>
      <div>0x07865c6E87B9F70255377e024ace6630C1Eaa37F</div>
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
import { ethers } from "ethers"
const abi = require("../assets/usdc-abi.json")

export default {
  setup() {
    const wallet = useMetaMaskWallet()
    const address = ref("")
    const signature = ref("")
    
    const permitRequest = ref("")
    permitRequest.value = {
      owner: "0x",
      spender: "0xdEAdbEeF87b9F70255377E024Ace6630C1EAa37f",
      value: ethers.utils.parseUnits("100", 6).toString(),
    }
    const network = ref("")
    const connect = async () => {
      const accounts = await wallet.connect()
      if (typeof accounts === "string") {
        console.log("An error occurred" + accounts)
      }
      address.value = accounts[0]
      permitRequest.value.owner = accounts[0]
      const prov = new ethers.providers.Web3Provider(window.ethereum, "any");
      network.value = (await prov.getNetwork()).chainId
    }

    const permit = async () => {
      const nonce = "0"
      const deadline = Math.floor(Date.now() / 1000) + 99999999999
      const prov = new ethers.providers.Web3Provider(window.ethereum, "any");
      const signer = await prov.getSigner()
      const t = new ethers.Contract(
        "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
        abi,
        signer
      )
      console.log(t)
      const sig = await signPermitRequest(
        signer,
        Number(network.value),
        permitRequest.value.owner,
        permitRequest.value.spender,
        permitRequest.value.value,
        nonce,
        deadline
      )
      signature.value = sig
    }

    return {
      wallet,
      connect,
      address,
      permit,
      signature,
      permitRequest,
      network,
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

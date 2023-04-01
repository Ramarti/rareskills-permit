
async function signPermitRequest(
  token,
  signer,
  owner,
  spender,
  value,
  nonce,
  deadline
) {
  const chainId = (await token.getChainId()).toNumber()
  const name = await token.name()
  const domain = {
    name: name,
    version: "1",
    chainId: chainId,
    verifyingContract: token.address,
  }

  const types = {
    Permit: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
      { name: "value", type: "uint256" },
      { name: "nonce", type: "uint256" },
      { name: "deadline", type: "uint256" },
    ],
  }
  const permitRequest = {
    owner,
    spender,
    value,
    nonce,
    deadline,
  }
  return signer._signTypedData(domain, types, permitRequest)
}

module.exports = {
  signPermitRequest,
}

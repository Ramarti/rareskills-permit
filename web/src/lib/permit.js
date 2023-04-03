
async function signPermitRequest(
  signer,
  chainId,
  owner,
  spender,
  value,
  nonce,
  deadline
) {
  const domain = {
    name: 'USD Coin',
    version: "1",
    chainId: chainId,
    verifyingContract: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
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

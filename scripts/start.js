async function main() {
  const [owner, somebodyElse] = await hre.ethers.getSigners()
  const keyboardContractFactory = await hre.ethers.getContractFactory(
    'Keyboards'
  )
  const keyboardsContract = await keyboardContractFactory.deploy()
  await keyboardsContract.deployed()
  console.log(`Deployed at ${keyboardsContract.address}`)

  let keyboards = await keyboardsContract.getKeyboards()
  console.log('We got the keyboards!', keyboards)

  const keyboardTxn1 = await keyboardsContract.create(
    'A really great keyboard!'
  )
  await keyboardTxn1.wait()

  const keyboardTx2 = await keyboardsContract
    .connect(somebodyElse)
    .create('An even better keyboard!')
  await keyboardTx2.wait()

  keyboards = await keyboardsContract.getKeyboards()
  console.log('We got the keyboards!', keyboards)

  keyboards = await keyboardsContract.connect(somebodyElse).getKeyboards()
  console.log('And as somebody else!', keyboards)
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(error)
    process.exit(1)
  })

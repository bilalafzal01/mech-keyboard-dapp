import { useState } from 'react'
import SecondaryButton from './secondary-button'
import { ethers } from 'ethers'
import abi from '../utils/Keyboards.json'

const contractAddress = '0x44e175613a1B84a0bbb7C315D5d1330ADBE06C63'
const contractABI = abi.abi

export default function TipButton({ keyboardsContract, index }) {
  const [mining, setMining] = useState(false)

  const submitTip = async (e) => {
    if (!keyboardsContract) {
      console.error('KeyboardsContract object is required to submit a tip')
      return
    }

    setMining(true)
    try {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()

      const keyboardsContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      )
      const tipTxn = await keyboardsContract.tip(index, {
        value: ethers.utils.parseEther('0.01'),
      })
      console.log('Tip transaction started...', tipTxn.hash)

      await tipTxn.wait()
      console.log('Sent tip!', tipTxn.hash)
    } finally {
      setMining(false)
    }
  }

  return (
    <SecondaryButton onClick={submitTip} disabled={mining}>
      {mining ? 'Tipping...' : 'Tip 0.01 eth!'}
    </SecondaryButton>
  )
}

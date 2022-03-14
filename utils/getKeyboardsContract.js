import { ethers } from 'ethers'

import abi from '../utils/Keyboards.json'

const contractAddress = '0x44e175613a1B84a0bbb7C315D5d1330ADBE06C63'
const contractABI = abi.abi

export default function getKeyboardsContract(ethereum) {
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    return new ethers.Contract(contractAddress, contractABI, signer)
  } else {
    return undefined
  }
}

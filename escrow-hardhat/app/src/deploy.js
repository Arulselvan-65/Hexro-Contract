import { ethers } from 'ethers';
import {abi,bytecode} from './es';


export default async function deploy(signer, arbiter, beneficiary, value) {
  const factory = new ethers.ContractFactory(
    abi,
    bytecode,
    signer
  );
  return factory.deploy(arbiter, beneficiary, {value});
}

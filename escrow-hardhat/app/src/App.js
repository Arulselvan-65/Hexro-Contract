import { useEffect, useState} from 'react';
import { ethers } from 'ethers';
import deploy from './deploy';
import Escrow from './Escrow';
import Deployed from './deployedContracts';
import './index';

const provider = new ethers.providers.Web3Provider(window.ethereum);

function App() {

    const [account, setAccount] = useState();
    const [signer, setSigner] = useState();
    const [escrows, setEscrows] = useState([]);
    const storedValues = JSON.parse(localStorage.getItem('storedValues')) || [];

    useEffect(() => {
      async function getAccounts() {
        const accounts = await provider.send('eth_requestAccounts', []);
        setAccount(accounts[0]);
        setSigner(provider.getSigner());
      }
      getAccounts();
    }, [account]);

    async function newContract() {
      const beneficiary = document.getElementById('beneficiary').value;
      const arbiter = document.getElementById('arbiter').value;
      const value = ethers.BigNumber.from(document.getElementById('wei').value);
      const escrowContract = await deploy(signer, arbiter, beneficiary,ethers.utils.parseEther(`${value}`));
     
  
      const n = {
        address: escrowContract.address,
        arbiter,
        beneficiary,
        value: value.toString()
      }
  
      const escrow = {
        address: escrowContract.address,
        arbiter,
        beneficiary,
        value: value.toString(),
        handleApprove: async () => {
          escrowContract.on('Approved', () => {
            document.getElementById(escrowContract.address).className =
              'complete';
            document.getElementById(escrowContract.address).innerText =
              "✓ It's been approved!";
          });
  
          if(await approve(escrowContract, signer)){

          storedValues.push(n);
          localStorage.setItem('storedValues', JSON.stringify(storedValues));}
        },
      };
      setEscrows([...escrows, escrow]);
    }

    async function approve(escrowContract, signer) {
      try{
      const approveTxn = await escrowContract.connect(signer).approve();
      await approveTxn.wait();
      }
      catch(e){
          alert("Invalid Arbiter!!");
      }
    }

    return (
      <div class="ovr">
        <div className='spa'></div>
        <p className="tit"style={{color: 'white', textAlign: 'center', textDecoration: 'none'}}>Hexro Contract</p>
        <div className="contract">
              <h1 style={{color: 'white', textAlign: 'center'}}> New Contract </h1>
              <label style={{color: 'white'}}>
                Arbiter Address
                <input type="text" id="arbiter" class="inp"/>
              </label>
              <label style={{color: 'white'}}>
                Beneficiary Address
                <input type="text" id="beneficiary" class="inp"/>
              </label>
              <label style={{color: 'white'}}>
                Deposit Amount (in ETH)
                <input type="text" id="wei" class="inp"/>
              </label>
              <div className="button" id="deploy" onClick={(e) => {
                  e.preventDefault();
                  newContract();
                }}>
              Deploy
              </div>
        </div>
              <div>
                  <div className="existing-contracts">
                      <h1 style={{color: 'white', textAlign: 'center'}}> Contract Approval </h1>
                      <div id="container">
                        {escrows.map((escrow) => {
                          return <Escrow key={escrow.address} {...escrow} />;
                        })}
                      </div>
                  </div>
                  <div className='store'>
                    <div id="container">
                        {storedValues.map((escrow) => {
                          return <Deployed key={escrow.address} {...escrow} />;
                        })}  
                    </div>
                  </div>
              </div>
              <div className='spa'></div>
          </div>
    )
        }
export default App;




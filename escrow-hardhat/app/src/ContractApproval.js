import Escrow from './Escrow';
import Deployed from './deployedContracts';
import {useParams,useState} from 'react';
import deploy from './deploy';



function ContractApproval(){

    const [escrows, setEscrows] = useState([]);
    const storedValues = JSON.parse(localStorage.getItem('storedValues')) || [];
    const {signer} = useParams();

    if(signer){
      newContract();
    }

    async function newContract(props) {
        const {arbiter, beneficiary, value} = props;

        const escrowContract = await deploy(signer, arbiter, beneficiary, value);
    
        const n = {
          address: escrowContract.address,
          arbiter,
          beneficiary,
          value: value.toString()
        }
        storedValues.push(n);
        localStorage.setItem('storedValues', JSON.stringify(storedValues));
    
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
    
            await approve(escrowContract, signer);
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
        <div>
             <div className="existing-contracts">
        <h1> Existing Contracts </h1>

        <div id="container">
          {escrows.map((escrow) => {
            return <Escrow key={escrow.address} {...escrow} />;
          })}
        </div>
      </div>

      <div id="container">
          {storedValues.map((escrow) => {
            return <Deployed key={escrow.address} {...escrow} />;
          })}  
      </div>
    </div>
    )
}

export default ContractApproval;



export default function Deployed({
    arbiter,
    beneficiary,
    value,
  }) {
    return (
      <div className="existing-contract">
        <ul className="fields">
          <li>
            <div> Arbiter </div>
            <div> {arbiter} </div>
          </li>
          <li>
            <div> Beneficiary </div>
            <div> {beneficiary} </div>
          </li>
          <li>
            <div> Value </div>
            <div> {value} </div>
          </li>
        </ul>
      </div>
    );
  }
  
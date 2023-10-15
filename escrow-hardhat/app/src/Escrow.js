export default function Escrow({
  address,
  arbiter,
  beneficiary,
  value,
  handleApprove,
}) {
  return (
    <div className="existing-contract">
      <ul className="fields">
        <li>
          <div className="s"> Arbiter </div>
          <div className="i"> {arbiter} </div>
        </li>
        <li>
          <div className="s"> Beneficiary </div>
          <div className="i"> {beneficiary} </div>
        </li>
        <li>
          <div className="s"> Value </div>
          <div className="i"> {value} </div>
        </li>
        <div
          className="button"
          id={address}
          onClick={(e) => {
            e.preventDefault();

            handleApprove();
          }}
        >
          Approve
        </div>
      </ul>
    </div>
  );
}

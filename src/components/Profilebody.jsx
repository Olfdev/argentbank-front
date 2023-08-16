import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function AccountPage({ setViewTransactions },){
    const user = useSelector(state => state.auth.user);

    return (
        <>
          <h2 className="sr-only">Accounts</h2>
          {user && user.accounts.map(account => (
            <section className="account" key={account.account_type}>
              <div className="account-content-wrapper">
                <p className="account-title">Argent Bank - {account.account_type} {'(' + account.account_number + ')'}</p>
                <h3 className="account-amount">$2,082.79</h3>
                <p className="account-title">Available Balance</p>
              </div>
              <div className="account-content-wrapper cta">
                {/* <Link to={`/transactions/${account.account_type.toLowerCase().replace(/\s+/g, '_')}`} className="transaction-button">View transactions</Link> */}
                {/* <Link to={`/transactions/${account.account_type}`} className="transaction-button" onClick={() => setViewTransactions(true)}>View transactions</Link> */}
                <Link to={`${account.account_type}_${account.account_number}`}><button className="transaction-button" onClick={() => setViewTransactions(true)}>View transactions</button></Link>
              </div>
            </section>
            ))}
        </>
    );
}
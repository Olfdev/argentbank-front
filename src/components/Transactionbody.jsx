import { useEffect, useState } from 'react';
import { useGetTransactionMutation, useUpdateTransactionMutation } from '../rtk/ApiSlice';
import { useParams } from 'react-router-dom';
//import Error from '../pages/Error';

export default function TransactionPage() {
    const { accountType } = useParams();
    //console.log(accountType);
    const [getTransactions, { data, error, isError, isLoading }] = useGetTransactionMutation();
    const [collapseStates, setCollapseStates] = useState({});

    useEffect(() => {
        getTransactions(accountType);
    }, [getTransactions, accountType]);
  
    return (
        <main>
            <div className="main bg-dark">
                <div className='account-trans'>
                    <div className='account-content-wrapper'>
                        <h3>Argent Bank - {accountType} Account</h3>
                        <h1>$2,082.79</h1>
                        <p>Available balance</p>
                    </div>
                </div>
                {isLoading ? (
                    <p>Loading transactions...</p>
                ) : isError ? (
                    <p className="perror">{error.message}</p>
                ) : (
                    <>
                        <h2 className="sr-only">Transactions for {accountType} Account</h2>
                        <div className="account-table-header-wrapper">
                            <h3 className="">Date</h3>
                            <h3>Description</h3>
                            <h3>Amount</h3>
                            <h3>Balance</h3>
                        </div>
                        <section className=""></section>
                        {data && data.body.transactions && (() => {
                            const filteredTransactions = data.body.transactions.filter(transaction => transaction.account_type === accountType);
                            if (filteredTransactions.length === 0) {
                                return <h2>No transactions found</h2>;
                            }
                            return filteredTransactions
                                .reverse()
                                .map((transaction) => {
                                    const europeanDate = new Date(transaction.date).toLocaleDateString('en-GB');

                                    const toggleCollapse = () => {
                                        setCollapseStates(prevState => ({
                                            ...prevState,
                                            [transaction.date]: !prevState[transaction.date]
                                        }));
                                    };

                                    return (
                                        <div className="table-transactions" key={transaction.date}>
                                            <div className="account-table-transaction" onClick={toggleCollapse}>
                                                <p className="">{europeanDate}</p>
                                                <p className="">{transaction.description}</p>
                                                <p className="">${Number(transaction.amount.$numberDecimal).toFixed(2)}</p>
                                                <p>$2,082.79</p>
                                                <i className={`fa-solid fa-angle-${collapseStates[transaction.date] ? 'up' : 'down'}`}></i>
                                            </div>
                                            <div className={`account-collapse ${collapseStates[transaction.date] ? 'down' : ''}`}>
                                                <div className="account-table-details">
                                                    <p className="">Transaction type</p>
                                                    <p className="">{transaction.type}</p>
                                                </div>
                                                <div className="account-table-details">
                                                    <p className="">Category</p>
                                                    <p className="">{transaction.category}</p>
                                                </div>
                                                <div className="account-table-details">
                                                    <p className="">Notes</p>
                                                    <p className="">{transaction.note}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                });
                        })()}
                    </>
                )}
            </div>
        </main>
    );
}
import { useEffect, useState } from 'react';
import { useGetTransactionMutation, useUpdateTransactionMutation } from '../rtk/ApiSlice';
import { useNavigate, useParams } from 'react-router-dom';

export default function TransactionPage() {
    const { accountTypeAndNumber } = useParams();
    const navigate = useNavigate();

    const [accountType, accountNumber] = accountTypeAndNumber.split('_');

    const [getTransactions, { data, error, isLoading }] = useGetTransactionMutation();
    const [updateTransaction, { isSuccess, isError }] = useUpdateTransactionMutation();

    const [collapseStates, setCollapseStates] = useState({});
    const [editingField, setEditingField] = useState(null);

    // Category
    const [editingCategory, setEditingCategory] = useState(null);
    const [editedCategory, setEditedCategory] = useState('');

    const handleEditCategory = (transaction) => {
        setEditingCategory(transaction);
        setEditingField('category');
        setEditedCategory(transaction.category);
        setEditedNote(transaction.note);
    };

    const handleCategoryChange = async (event) => {
        setEditedCategory(event.target.value);
    };

    // Note
    const [editingNote, setEditingNote] = useState(null);
    const [editedNote, setEditedNote] = useState('');

    const handleEditNote = (transaction) => {
        setEditingNote(transaction);
        setEditingField('note');
        setEditedCategory(transaction.category);
        setEditedNote(transaction.note);
    };

    const handleNoteChange = async (event) => {
        setEditedNote(event.target.value);
    };

    // Update db
    const handleSaveEdited = async (transaction) => {
        if (transaction) {
            const transactionData = {
                transactionId: transaction.transactionId,
                category: editedCategory,
                note: editedNote,
            };

            try {
                await updateTransaction(transactionData);
                setEditingCategory(null);
                setEditingNote(null);
                setEditingField(null);
            } catch (error) {
                console.error("Error updating transaction:", error);
            }
        }
    };

    const goBack = () => {
        navigate(-1); // Use the history object to navigate back
    };

    // Fetch data on initial load
    useEffect(() => {
        getTransactions(accountType);
    }, [getTransactions, accountType]);

    // Fetch data after a successful PUT
    useEffect(() => {
        if (isSuccess) {
            getTransactions(accountType);
        }
    }, [isSuccess, getTransactions, accountType]);
  
    return (
        <main>
            <div className="main bg-dark">
                <div className='account-trans'>
                    <i className="fa-solid fa-circle-chevron-left" onClick={goBack}></i>
                    <div className='account-content-wrapper'>
                        <h3>Argent Bank - {accountType} {'(' + accountNumber + ')'}</h3>
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
                        <h2 className="sr-only">Transactions for {accountType} Account {accountNumber}</h2>
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
                                            [transaction.transactionId]: !prevState[transaction.transactionId]
                                        }));
                                    };

                                    return (
                                        <div className="table-transactions" key={transaction.transactionId}>
                                            <div className="account-table-transaction" onClick={toggleCollapse}>
                                                <p className="">{europeanDate}</p>
                                                <p className="">{transaction.description}</p>
                                                <p className="">${Number(transaction.amount.$numberDecimal).toFixed(2)}</p>
                                                <p>$2,082.79</p>
                                                <i className={`fa-solid fa-angle-up collapse-${collapseStates[transaction.transactionId] ? 'up' : 'down'}`}></i>
                                            </div>
                                            <div className={`account-collapse ${collapseStates[transaction.transactionId] ? 'down' : ''}`}>
                                                <div className="account-table-details">
                                                    <p className="">Transaction type</p>
                                                    <p className="">{transaction.type}</p>
                                                </div>
                                                <div className="account-table-details">
                                                    <p className="">Category</p>
                                                    <div className='edit-pencil'>
                                                    {editingCategory === transaction ? (
                                                        <div className='category-select'>
                                                            <select className='transaction-select' name="category" id="category" value={editedCategory} onChange={handleCategoryChange}>
                                                                <option value="Beauty">Beauty</option>
                                                                <option value="Clothes">Clothes</option>
                                                                <option value="Drinks">Drinks</option>
                                                                <option value="Food">Food</option>
                                                                <option value="Hardware">Hardware</option>
                                                                <option value="Houseware">Houseware</option>
                                                                <option value="Medicine">Medicine</option>
                                                            </select>
                                                            <i className="fa-solid fa-check" onClick={() => handleSaveEdited(transaction)}></i>
                                                        </div>
                                                    ) : (
                                                        <>
                                                        <p className="">{transaction.category}</p>
                                                        {editingField !== 'note' && (
                                                            <i className="fa-solid fa-pencil" onClick={() => handleEditCategory(transaction)}></i>
                                                        )}
                                                        </>
                                                    )}
                                                    </div>
                                                </div>
                                                <div className="account-table-details">
                                                    <p className="">Notes</p>
                                                    <div className='edit-pencil'>
                                                    {editingNote === transaction ? (
                                                        <div className='note-input'>
                                                            <input
                                                                className='transaction-input'
                                                                type="text"
                                                                value={editedNote}
                                                                onChange={handleNoteChange}
                                                            />
                                                            <i className="fa-solid fa-check" onClick={() => handleSaveEdited(transaction)}></i>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <p className="">{transaction.note}</p>
                                                            {editingField !== 'category' && (
                                                                <i className="fa-solid fa-pencil" onClick={() => handleEditNote(transaction)}></i>
                                                            )}
                                                        </>
                                                    )}
                                                    </div>
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
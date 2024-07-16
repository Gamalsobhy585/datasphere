import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { Helmet } from 'react-helmet';
import Chart from '../Chart/Chart';

export default function Home() {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/customers')
      .then(response => {
        console.log('Fetched customers:', response.data);
        setCustomers(response.data);
      })
      .catch(error => console.error('Error fetching customers:', error));

    axios.get('http://localhost:3000/transactions')
      .then(response => {
        console.log('Fetched transactions:', response.data);
        setTransactions(response.data);
      })
      .catch(error => console.error('Error fetching transactions:', error));
  }, []);

  useEffect(() => {
    if (customers.length && transactions.length) {
      const combined = customers.map(customer => ({
        ...customer,
        transactions: transactions.filter(transaction => transaction.customer_id === customer.id)
      }));
      setCombinedData(combined);
      setFilteredData(combined);
      console.log(combined);
    }
  }, [customers, transactions]);

  const searchByCustomerName = (customerName) => {
    const filtered = combinedData.filter(customer => {
      return customer.name.toLowerCase().includes(customerName.toLowerCase());
    });
    setFilteredData(filtered);
  };

  const searchByAmount = (amount) => {
    const filtered = combinedData.map(customer => ({
      ...customer,
      transactions: customer.transactions.filter(transaction => transaction.amount === parseInt(amount))
    })).filter(customer => customer.transactions.length > 0);
    setFilteredData(filtered);
  };
  const handleReset = () => {
    setFilteredData(combinedData);
  };
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Datasphere</title>
        <link rel="shortcut icon" href="/goldfavicon.png" type="image/x-icon" />
      </Helmet>
      <Navbar onSearchCustomer={searchByCustomerName} onReset={handleReset} onSearchAmount={searchByAmount} />
      <h1 className='text-center mt-4 h5'>Customer Transactions</h1>
      <div className="container my-5 d-flex align-items-center justify-content-center">
        <table className='table-responsive mb-3 table-active'>
          <thead id='table-header' className='table-header'>
            <tr>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(customer => (
              customer.transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{transaction.id}</td>
                  <td>{transaction.date}</td>
                  <td>{transaction.amount}</td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </div>
      {filteredData.length === 1 && filteredData[0].transactions.length > 0 && (
        <Chart transactions={filteredData[0].transactions} />
      )}
    </>
  );
}

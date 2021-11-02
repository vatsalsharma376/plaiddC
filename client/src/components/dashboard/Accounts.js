import React, { Component } from "react";
import PropTypes from "prop-types";
import PlaidLinkButton from "react-plaid-link-button";
import { connect } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import {
  getTransactions,
  addAccount,
  deleteAccount
} from "../../actions/accountActions";
import { logoutUser } from "../../actions/authActions";
import Header from "../layout/Navbar";
import MaterialTable from "material-table"; // https://mbrn.github.io/material-table/#/
import { FiLogOut } from "react-icons/fi";
// AiOutlineUser
import { BiUserCircle } from "react-icons/bi";
import { Link,BrowserRouter as Router,Route,Switch } from "react-router-dom";
import Transactions from "./Transactions";
import Template from "./Template";
import Dash from "./Dash";
const Accounts = (props) => {
  
  useEffect( ()=> {
    
    const { accounts } = props;
    //props.getTransactions(accounts);
    //axios.post("/api/plaid/accounts/transactions",accounts).then((response) => {
      //props=response.data;
      //transactionsLoading=false;
     // populate();
     },[])

  // Add account
  const handleOnSuccess = (token, metadata) => {
    const { accounts } = props;
    const plaidData = {
      public_token: token,
      metadata: metadata,
      accounts: accounts
    };

    props.addAccount(plaidData);
  };

  // Delete account
  const onDeleteClick = id => {
    const { accounts } = props;
    const accountData = {
      id: id,
      accounts: accounts
    };
    props.deleteAccount(accountData);
  };

  // Logout
  const onLogoutClick = e => {
    e.preventDefault();
    props.logoutUser();
  };

  
    const { user, accounts } = props;
    
    
    let accountItems = accounts.map(account => (
      <li key={account._id} style={{ marginTop: "1rem" }}>
        <button
          style={{ marginRight: "1rem" }}
          onClick={onDeleteClick.bind(this, account._id)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          <i className="material-icons">delete</i>
        </button>
        <b>{account.institutionName}</b>
      </li>
    ));

    // Setting up data table 
    const transactionsColumns = [
      { title: "Account", field: "account" },
      { title: "Date", field: "date", type: "date", defaultSort: "desc" },
      { title: "Name", field: "name" },
      { title: "Amount", field: "amount", type: "numeric" },
      { title: "Category", field: "category" }
    ];
    
    //console.log(props.plaid);
    function showT(props){
      return <Template {...props} />;
    }
    function showD(props){
      return <Dash {...props} />
    }
    return (
       <>
       
      <div className="flex flex-row ">
        
        {/* {accounts.length>=1 && <Template {...props}/> } */}
        <div className=" hhw"><Header {...props}/></div>
        {/* <div className="dnmic">
        <Router>
        <Switch>
        <Route exact path="/transactions" component={showT} />
        <Route path="/dshbrd" component={showD}  />
        </Switch>
        </Router>
        </div> */}
          {/* <hr style={{ marginTop: "2rem", opacity: ".2" }} />
          <h5>
            <b className="text-3xl text-indigo-800">Transactions</b>
          </h5>
          {transactionsLoading ? (
            <p className="text-xl text-gray-600">Fetching transactions...</p>
          ) : (
            <>
              <p className="text-xl smol">
                You have <b>{transactionsData.length}</b> transactions from your
                <b> {accounts.length}</b> linked
                {accounts.length > 1 ? (
                  <span> accounts </span>
                ) : (
                  <span> account </span>
                )}
                from the past 30 days
              </p>
              <MaterialTable
                columns={transactionsColumns}
                data={transactionsData}
                title="Search Transactions"
              />
            </> */}
          
        
        <div className="ml-20 lgot">
          
          <button
            onClick={onLogoutClick}
            className="inline-block mt-1 p-2 pl-5 pr-5 bg-transparent border-2 border-red-400 text-red-400 text-lg rounded-lg transition-colors duration-700 transform hover:bg-red-500 hover:text-gray-100 focus:border-4 focus:border-indigo-300"
          >
            <FiLogOut/>
          </button>
          <BiUserCircle className="w-10 h-10 mt-0 inline-block"/>
          </div>
          </div>
      
      
      </>
    );
  
}

Accounts.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getTransactions: PropTypes.func.isRequired,
  addAccount: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  accounts: PropTypes.array.isRequired,
  plaid: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  plaid: state.plaid
});

export default connect(
  mapStateToProps,
  { logoutUser, getTransactions, addAccount, deleteAccount }
)(Accounts);

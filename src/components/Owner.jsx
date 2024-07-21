import React, { useState } from 'react';
// import Web3 from 'web3';
// import PeerEnergyContract from './contracts/PeerEnergy.json'; // ABI of the PeerEnergy contract

const Owner = (props) => {
  // const [account, setAccount] = useState('');
  // const [peerEnergy, setPeerEnergy] = useState(null);
  const [gridNumber, setGridNumber] = useState('');
  const [priceType, setPriceType] = useState('');
  const [gridCreationStatus, setGridCreationStatus] = useState('');
  const [smartMeterAddr, setSmartMeterAddr] = useState('');
  const [appNodeAddr, setAppNodeAddr] = useState('');
  const [userType, setUserType] = useState('');
  const [gridNo, setGridNo] = useState('');
  const [userCreationStatus, setUserCreationStatus] = useState('');

  const [tokens, setTokens] = useState('');
  const [balance, setBalance] = useState('');

  const[name, setName] = useState('');
  const [peerEnergyAddress, setPeerEnergyAddress] = useState('');
  const [ExchangeAddr, setExchangeAddr] = useState(''); 
  // const [price, setPrice] = useState('');
  // const [quantity, setQuantity] = useState('');
  // const [time, setTime] = useState('');
  // const [sellOffers_Price ,setSellOffers_Price] = useState([]);
  // const [sellOffers_Qty, setSellOffers_Qty] = useState([]);
  // const [buyOffers_Price ,setBuyOffers_Price] = useState([]);
  // const [buyOffers_Qty, setBuyOffers_Qty] = useState([]);

  // useEffect(() => {
  //   const loadBlockchainData = async () => {
  //     const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
  //     const accounts = await web3.eth.requestAccounts();
  //     setAccount(accounts[0]);
  //     const networkId = await web3.eth.net.getId();
  //     const networkData = PeerEnergyContract.networks[networkId];
  //     if (networkData) {
  //       const contract = new web3.eth.Contract(PeerEnergyContract.abi, networkData.address);
  //       setPeerEnergy(contract);
  //     } else {
  //       window.alert('Smart contract not deployed to detected network.');
  //     }
  //   };
  //   loadBlockchainData();
  // }, []);

  const viewName = async () => {
    if (props.contract) {
      try {
        const n = await props.contract.methods.name().call();
        setName(n);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
  };

  const viewPeerEnergyAddress = async () => {
    if (props.contract2) {
      try { 
        const p = await props.contract2.methods.peerEnergyAddress().call();
        setPeerEnergyAddress(p);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
  };

  const changeExchangeAddr = async () => {
    if (props.contract2) {
      try {
        await props.contract.methods.setExchangeAddr(ExchangeAddr).send({ from: props.account });
        const e = await props.contract.methods.ExchangeAddr().call();
        setExchangeAddr(e);
      } catch (error) { 
        console.error(error);
        alert(error);
      }
    }
  };

  const createGrid = async () => {
    // alert('Creating grid...');
    if (props.contract) {
      try {
        await props.contract.methods.createGrid(gridNumber, priceType).send({ from: props.account });
        setGridCreationStatus('Grid created successfully!');
        alert('Grid created successfully!');
      } catch (error) {
        setGridCreationStatus('Error creating grid.');
        console.error(error);
        alert(error);
      }
    }
  };
  
  const createUser = async () => {
    if (props.contract) {
      try {
        await props.contract.methods.createUser(smartMeterAddr, appNodeAddr, userType, gridNo).send({ from: props.account });
        setUserCreationStatus('User created successfully!');
      } catch (error) {
        setUserCreationStatus('Error creating user.');
        console.error(error);
        alert(error);
      }
    }
  };

/////////////////////////////////////////////////////////////////////
  const transferTokens = async () => {
    if (props.contract) {
      try {
        await props.contract.methods.transfer(smartMeterAddr, tokens).send({ from: props.account });
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
  };

  const getBalance = async () => {
    if (props.contract) {
      try {
        const balance = await props.contract.methods.CheckMybalance(appNodeAddr).call();
        setBalance(balance);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
  };

/////////////////////////////////////////////////////////////////////


  // const placeSellOffer = async () => {
  //   if (props.contract) {
  //     try {
  //       await props.contract.methods.placeSellOffer(price, quantity, time).send({ from: props.account });
  //       setUserCreationStatus('sell offer created successfully!');
  //     } catch (error) {
  //       setUserCreationStatus('Error creating sell offer.');
  //       console.error(error);
  //       alert(error);
  //     }
  //   }
  // };

  // const placeBuyOffer = async () => {
  //   if (props.contract) {
  //     try {
  //       await props.contract.methods.placeBuyOffer(price, quantity, time).send({ from: props.account });
  //       setUserCreationStatus('buy offer created successfully!');
  //     } catch (error) {
  //       setUserCreationStatus('Error creating buy offer.');
  //       console.error(error);
  //       alert(error);
  //     }
  //   }
  // };

  // const viewSellOffers = async () => {
  //   if (props.contract) {
  //     try {
  //       const p = await props.contract.methods.viewSellOffers(gridNo, time).call();
  //       setSellOffers_Price(p[0]);
  //       setSellOffers_Qty(p[1]);

  //       // setUserCreationStatus('User created successfully!');
  //     } catch (error) {
  //       setUserCreationStatus('Error seeing sell offers.');
  //       console.error(error);
  //       alert(error);
  //     }
  //   }
  // };

  // const viewBuyOffers = async () => {
  //   if (props.contract) {
  //     try {
  //       const r = await props.contract.methods.viewBuyOffers(gridNo, time).call();
  //       setBuyOffers_Price(r[0]);
  //       setBuyOffers_Qty(r[1]);

  //       // setUserCreationStatus('User created successfully!');
  //     } catch (error) {
  //       setUserCreationStatus('Error seeing buy offers.');
  //       console.error(error);
  //       alert(error);
  //     }
  //   }
  // };


  return (
    <>
    <div>
      <h2>Peer Energy DApp</h2>
      <p>Connected account: {props.account}</p>
      <button onClick={viewName}>View Name</button>
      <p>Name: {name}</p>
      <button onClick={viewPeerEnergyAddress}>View Peer Energy Address</button>
      <p>Peer Energy Address: {peerEnergyAddress}</p>
      

      <h3>Set Exchange Contract Address</h3>
      <input type="text" value={ExchangeAddr} onChange={(e) => setExchangeAddr(e.target.value)} placeholder="Exchange Address" />
      <button className='mx-3' onClick={changeExchangeAddr}>Change Exchange Address</button>
      <p> ExchangeAddr : {ExchangeAddr} </p>
    

      <h3>Create Grid</h3>
      <input type="text" value={gridNumber} onChange={(e) => setGridNumber(e.target.value)} placeholder="Grid Number" />
      <input type="text" value={priceType} onChange={(e) => setPriceType(e.target.value)} placeholder="Price Type" />
      <button className='mx-3' onClick={createGrid}>Create Grid</button>
      <p>{gridCreationStatus}</p>

      <h3>Create User</h3>
      <input type="text" value={smartMeterAddr} onChange={(e) => setSmartMeterAddr(e.target.value)} placeholder="Smart Meter Address" />
      <input type="text" value={appNodeAddr} onChange={(e) => setAppNodeAddr(e.target.value)} placeholder="App Node Address" />
      <input type="text" value={userType} onChange={(e) => setUserType(e.target.value)} placeholder="User Type" />
      <input type="text" value={gridNo} onChange={(e) => setGridNo(e.target.value)} placeholder="Grid No" />
      <button className='mx-3' onClick={createUser}>Create User</button>
      <p>{userCreationStatus}</p>
    </div>
    
    <div>
      <h3>Transfer Tokens</h3>
      <input type="text" value={smartMeterAddr} onChange={(e) => setSmartMeterAddr(e.target.value)} placeholder="Smart Meter Address" />
      <input type="text" value={tokens} onChange={(e) => setTokens(e.target.value)} placeholder="Tokens" />
      <button className='mx-3' onClick={transferTokens}>Transfer Tokens</button>
      <p> </p>

      <h3>Get Balance</h3>
      <input type="text" value={appNodeAddr} onChange={(e) => setAppNodeAddr(e.target.value)} placeholder="App Node Address" />
      <button className='mx-3' onClick={getBalance}>Get Balance</button>
      <p>Balance: {balance}</p>
    </div>

    <div>
      {/* <h3>Place Buy Offer</h3>
      <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
      <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" />
      <input type="text" value={time} onChange={(e) => setTime(e.target.value)} placeholder="Time" />
      <button className='mx-3' onClick={placeBuyOffer}>Place Buy Offer</button>
      <p>{userCreationStatus}</p> */}

      {/* <h3>Place Sell Offer</h3>
      <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
      <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" />
      <input type="text" value={time} onChange={(e) => setTime(e.target.value)} placeholder="Time" />
      <button className='mx-3' onClick={placeSellOffer}>Place Sell Offer</button>
      <p>{userCreationStatus}</p> */}

      {/* <h3>View Sell Offers</h3>
      <input type="text" value={gridNo} onChange={(e) => setGridNo(e.target.value)} placeholder="Grid No" />
      <input type="text" value={time} onChange={(e) => setTime(e.target.value)} placeholder="Time" />
      <button className='mx-3' onClick={viewSellOffers}>View Sell Offers</button>
      <p>sellOffers_Price: {sellOffers_Price.join(', ')}</p>
      <p>sellOffers_Qty: {sellOffers_Qty.join(', ')}</p> */}

      {/* <h3>View Buy Offers</h3>
      <input type="text" value={gridNo} onChange={(e) => setGridNo(e.target.value)} placeholder="Grid No" />
      <input type="text" value={time} onChange={(e) => setTime(e.target.value)} placeholder="Time" />
      <button className='mx-3' onClick={viewBuyOffers}>View Buy Offers</button>
      <p>buyOffers_Price: {buyOffers_Price.join(', ')}</p>
      <p>buyOffers_Qty: {buyOffers_Qty.join(', ')}</p> */}
    </div>
    </>
  );
};

export default Owner;

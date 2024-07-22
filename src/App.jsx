// import { EthProvider } from "./contexts/EthContext";
// import Intro from "./components/Intro/";
// import Setup from "./components/Setup";
// import Demo from "./components/Demo";
// import Footer from "./components/Footer";

// function App() {
//   return (
//     <EthProvider>
//       <div id="App">
//         <div className="container">
//           {/* <Intro /> */}
//           {/* <hr /> */}
//           {/* <Setup /> */}
//           <hr />
//           <Demo />
//           <hr />
//           <Footer />
//         </div>
//       </div>
//     </EthProvider>
//   );
// }

// export default App;

 
// 2. this if of peerenergy..........................

import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
// import './styles.css';
import PeerEnergyContract from './contracts/PeerEnergy.json'; // ABI of the PeerEnergy contract
import ExchangeContract from './contracts/ExchangeContract.json'; // ABI of the ExchangeContract contract
import Owner from './components/Owner.jsx';
import Buyer from './components/Buyer.jsx';
import Seller from './components/Seller.jsx';
import TokenOffers from './components/TokenOffers.jsx';
import Navbar from './components/Navbar.jsx';
import Exchange from './components/Exchange.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

function App() {
  const [account, setAccount] = useState('');
  const [peerEnergy, setPeerEnergy] = useState(null);
  const [exchangeContract, setExchangeContract] = useState(null);
  // const [web3, setWeb3] = useState(null);
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar /><Owner contract={peerEnergy} contract2={exchangeContract} account={account} /></>,
    },
    {
      path: "/buyer",
      element: <><Navbar /><Buyer contract={peerEnergy} account={account} /></>,
    },
    {
      path: "/seller",
      element: <><Navbar /><Seller contract={peerEnergy} account={account} /></>,
    },
    {
      path: "/token-offers",
      element: <> <Navbar /><TokenOffers contract={peerEnergy} account={account} /></>,
    },
    {
      path: "/exchange-contract",
      element: <> <Navbar /><Exchange contract2={exchangeContract} account={account} /></>,
    },

  ]);

  useEffect(() => {
    loadBlockchainData();
  }, []);

  const loadBlockchainData = async () => {
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
    const accounts = await web3.eth.requestAccounts();
    setAccount(accounts[0]);
    const networkId = await web3.eth.net.getId();
    const peerEnergyNetworkData = PeerEnergyContract.networks[networkId];
    const exchangeContractNetworkData = ExchangeContract.networks[networkId];
    if (peerEnergyNetworkData && exchangeContractNetworkData) {
      const peerEnergyContract = new web3.eth.Contract(PeerEnergyContract.abi, peerEnergyNetworkData.address);
      const exchangeContract = new web3.eth.Contract(ExchangeContract.abi, exchangeContractNetworkData.address);
      setPeerEnergy(peerEnergyContract);
      setExchangeContract(exchangeContract);
      window.alert('Smart contracts deployed to detected network.');
    } else {
      window.alert('Smart contracts not deployed to detected network.');
    }
  };


  return (
    <div className="App">
      <header className="App-header">
        {/* <Navbar /> */}
        <RouterProvider router={router} />

        {/* <h1>Peer Energy Trading DApp</h1>
        <Owner contract={peerEnergy} contract2={exchangeContract} account={account} />

        <h2>Buyer</h2>
        <Buyer contract={peerEnergy} account={account} />

        <h2>Seller</h2>
        <Seller contract={peerEnergy} account={account} />

        <h2>Token Offers</h2>
        <TokenOffers contract={peerEnergy} account={account} /> */}

      </header>
    </div>
  );
}

export default App;


// 3. double sided auction ..........................


// import React, { useState, useEffect } from 'react';
// import Web3 from 'web3';
// import DoubleSidedAuction from './contracts/DoubleSidedAuction.json';

// const App = () => {
//   const [account, setAccount] = useState('');
//   const [contract, setContract] = useState(null);
//   const [web3, setWeb3] = useState(null);
//   const [sellOffers, setSellOffers] = useState([]);
//   const [buyOffers, setBuyOffers] = useState([]);
//   const [sellPrice, setSellPrice] = useState('');
//   const [sellQuantity, setSellQuantity] = useState('');
//   const [buyPrice, setBuyPrice] = useState('');
//   const [buyQuantity, setBuyQuantity] = useState('');

//   useEffect(() => {
//     loadBlockchainData();
//   }, []);

//   const loadBlockchainData = async () => {
//     const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
//     setWeb3(web3);
//     const accounts = await web3.eth.requestAccounts();
//     setAccount(accounts[0]);
//     const networkId = await web3.eth.net.getId();
//     const networkData = DoubleSidedAuction.networks[networkId];
//     if (networkData) {
//       const auction = new web3.eth.Contract(DoubleSidedAuction.abi, networkData.address);
//       setContract(auction);
//       loadOffers(auction);
//       window.alert('Smart contract deployed to detected network.');

//     } else {
//       window.alert('Smart contract not deployed to detected network.');
//     }
//   };

//   const loadOffers = async (auction) => {
//     const sellOffers = await auction.methods.viewSellTokenOffers().call();
//     const buyOffers = await auction.methods.viewBuyTokenOffers().call();
//     setSellOffers(sellOffers);
//     setBuyOffers(buyOffers);
//   };

//   const placeSellOffer = async () => {
//     await contract.methods.placeSellTokenOffer(sellPrice, sellQuantity).send({ from: account });
//     loadOffers(contract);
//   };

//   const placeBuyOffer = async () => {
//     await contract.methods.placeBuyTokenOffer(buyPrice, buyQuantity).send({ from: account });
//     loadOffers(contract);
//   };

//   const confirmSell = async (refId) => {
//     await contract.methods.sellerConfirmation(refId).send({ from: account });
//     loadOffers(contract);
//   };

//   const confirmBuy = async (refId) => {
//     await contract.methods.buyerConfirmation(refId).send({ from: account });
//     loadOffers(contract);
//   };

//   return (
//     <div>
//       <h1>Double Sided Auction</h1>
//       <p>Account: {account}</p>

//       <div>
//         <h2>Place Sell Offer</h2>
//         <input
//           type="text"
//           placeholder="Sell Price"
//           value={sellPrice}
//           onChange={(e) => setSellPrice(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Sell Quantity"
//           value={sellQuantity}
//           onChange={(e) => setSellQuantity(e.target.value)}
//         />
//         <button onClick={placeSellOffer}>Place Sell Offer</button>
//       </div>

//       <div>
//         <h2>Place Buy Offer</h2>
//         <input
//           type="text"
//           placeholder="Buy Price"
//           value={buyPrice}
//           onChange={(e) => setBuyPrice(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Buy Quantity"
//           value={buyQuantity}
//           onChange={(e) => setBuyQuantity(e.target.value)}
//         />
//         <button onClick={placeBuyOffer}>Place Buy Offer</button>
//       </div>

//       <div>
//         <h2>Sell Offers</h2>
//         <ul>
//           {sellOffers[0]?.map((price, index) => (
//             <li key={index}>
//               Price: {price} | Quantity: {sellOffers[1][index]}
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div>
//         <h2>Buy Offers</h2>
//         <ul>
//           {buyOffers[0]?.map((price, index) => (
//             <li key={index}>
//               Price: {price} | Quantity: {buyOffers[1][index]}
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div>
//         <h2>Confirm Transactions</h2>
//         <input type="text" placeholder="Reference ID" />
//         <button onClick={confirmSell}>Confirm Sell</button>
//         <button onClick={confirmBuy}>Confirm Buy</button>
//       </div>
//     </div>
//   );
// };

// export default App;

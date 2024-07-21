import React ,{useState} from "react";  

const TokenOffers = (props) => {
    const [sellOffers, setSellOffers] = useState([]);
    const [buyOffers, setBuyOffers] = useState([]);
    const [sellPrice, setSellPrice] = useState('');
    const [sellQuantity, setSellQuantity] = useState('');
    const [buyPrice, setBuyPrice] = useState('');
    const [buyQuantity, setBuyQuantity] = useState('');


    const loadOffers = async (contract) => {
        const sellOffers = await contract.methods.viewSellTokenOffers().call();
        const buyOffers = await contract.methods.viewBuyTokenOffers().call();
        setSellOffers(sellOffers);
        setBuyOffers(buyOffers);
    };

    const placeSellOffer = async () => {
        if(props.contract) {
            try {
                await props.contract.methods.placeSellTokenOffer(sellPrice, sellQuantity).send({ from: props.account });
                loadOffers(props.contract);
            } catch (error) {
                console.error(error);   
                alert(error);
            }
        }
    };

    const placeBuyOffer = async () => {
        if(props.contract) {
            try {
                await props.contract.methods.placeBuyTokenOffer(buyPrice, buyQuantity).send({ from: props.account });
                loadOffers(props.contract);
            } catch (error) {
                console.error(error);   
                alert(error);
            }
        }
    };

    const confirmSell = async (refId) => {
        if(props.contract) {
            try {
                await props.contract.methods.sellerConfirmation(refId).send({ from: props.account });
                loadOffers(props.contract);
            } catch (error) {
                console.error(error);   
                alert(error);
            }
        }
    };

    const confirmBuy = async (refId) => {
        if(props.contract) {
            try {
                await props.contract.methods.buyerConfirmation(refId).send({ from: props.account });
                loadOffers(props.contract);
            } catch (error) {
                console.error(error);   
                alert(error);
            }
        }
    };

    return (
        <div>
        <h1>Double Sided Auction</h1>
        <p>Account: {props.account}</p>

        <div>
            <h2>Place Sell Token Offer</h2>
            <input type="text" placeholder="Sell Price" value={sellPrice} onChange={(e) => setSellPrice(e.target.value)} />
            <input type="text" placeholder="Sell Quantity" value={sellQuantity} onChange={(e) => setSellQuantity(e.target.value)} />
            <button onClick={placeSellOffer}>Place Sell Offer</button>
        </div>

        <div>
            <h2>Place Buy Token Offer</h2>
            <input type="text" placeholder="Buy Price" value={buyPrice} onChange={(e) => setBuyPrice(e.target.value)} />
            <input type="text" placeholder="Buy Quantity" value={buyQuantity} onChange={(e) => setBuyQuantity(e.target.value)} />
            <button onClick={placeBuyOffer}>Place Buy Offer</button>
        </div>

        <div>
            <h2>Sell Token Offers</h2>
            <ul>
            {sellOffers[0]?.map((price, index) => (
                <li key={index}>
                Price: {price} | Quantity: {sellOffers[1][index]}
                </li>
            ))}
            </ul>
        </div>

        <div>
            <h2>Buy Token Offers</h2>
            <ul>
            {buyOffers[0]?.map((price, index) => (
                <li key={index}>
                Price: {price} | Quantity: {buyOffers[1][index]}
                </li>
            ))}
            </ul>
        </div>

        <div>
            <h2>Confirm Transactions</h2>
            <input type="text" placeholder="Reference ID" />
            <button onClick={confirmSell}>Confirm Sell</button>
            <button onClick={confirmBuy}>Confirm Buy</button>
        </div>
        </div>
    );
};

export default TokenOffers;
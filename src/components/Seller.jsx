import React ,{useState} from "react";  

const Seller = (props) => {
    const [gridNo, setGridNo] = useState('');
    const [userCreationStatus, setUserCreationStatus] = useState('');
  
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [time, setTime] = useState('');
  
    const [sellOffers_Price ,setSellOffers_Price] = useState([]);
    const [sellOffers_Qty, setSellOffers_Qty] = useState([]);

    const placeSellOffer = async () => {
        if (props.contract) {
          try {
            await props.contract.methods.placeSellOffer(price, quantity, time).send({ from: props.account });
            setUserCreationStatus('sell offer created successfully!');
          } catch (error) {
            setUserCreationStatus('Error creating sell offer.');
            console.error(error);
            alert(error);
          }
        }
    };

    const viewSellOffers = async () => {
        if (props.contract) {
          try {
            const p = await props.contract.methods.viewSellOffers(gridNo, time).call();
            setSellOffers_Price(p[0]);
            setSellOffers_Qty(p[1]);
    
            // setUserCreationStatus('User created successfully!');
          } catch (error) {
            setUserCreationStatus('Error seeing sell offers.');
            console.error(error);
            alert(error);
          }
        }
    };

    return(
        <div>
                    
            <h3>Place Sell Offer</h3>
            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
            <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" />
            <input type="text" value={time} onChange={(e) => setTime(e.target.value)} placeholder="Time" />
            <button className='mx-3' onClick={placeSellOffer}>Place Sell Offer</button>
            <p>{userCreationStatus}</p>   
        
            <h3>View Sell Offers</h3>
            <input type="text" value={gridNo} onChange={(e) => setGridNo(e.target.value)} placeholder="Grid No" />
            <input type="text" value={time} onChange={(e) => setTime(e.target.value)} placeholder="Time" />
            <button className='mx-3' onClick={viewSellOffers}>View Sell Offers</button>
            <p>sellOffers_Price: {sellOffers_Price.join(', ')}</p>
            <p>sellOffers_Qty: {sellOffers_Qty.join(', ')}</p>

        </div>
    );
};

export default Seller;
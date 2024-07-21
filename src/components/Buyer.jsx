import React ,{useState} from "react";  

const Buyer = (props) => {

  const [gridNo, setGridNo] = useState('');
  const [userCreationStatus, setUserCreationStatus] = useState('');

  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [time, setTime] = useState('');
  
  const [buyOffers_Price ,setBuyOffers_Price] = useState([]);
  const [buyOffers_Qty, setBuyOffers_Qty] = useState([]);

    const placeBuyOffer = async () => {
        if (props.contract) {
          try {
            await props.contract.methods.placeBuyOffer(price, quantity, time).send({ from: props.account });
            setUserCreationStatus('buy offer created successfully!');
          } catch (error) {
            setUserCreationStatus('Error creating buy offer.');
            console.error(error);
            alert(error);
          }
        }
      };

    const viewBuyOffers = async () => {
    if (props.contract) {
        try {
        const r = await props.contract.methods.viewBuyOffers(gridNo, time).call();
        setBuyOffers_Price(r[0]);
        setBuyOffers_Qty(r[1]);

        // setUserCreationStatus('User created successfully!');
        } catch (error) {
        setUserCreationStatus('Error seeing buy offers.');
        console.error(error);
        alert(error);
        }
    }
    };

    return(
        <div className='my-3'>
            <h2>Peer Energy DApp</h2>
            <h5>Connected account: {props.account}</h5>
            <h3>Place Buy Offer</h3>
            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
            <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" />
            <input type="text" value={time} onChange={(e) => setTime(e.target.value)} placeholder="Time" />
            <button className='mx-3' onClick={placeBuyOffer}>Place Buy Offer</button>
            <p>{userCreationStatus}</p>       
        
            <h3>View Buy Offers</h3>
            <input type="text" value={gridNo} onChange={(e) => setGridNo(e.target.value)} placeholder="Grid No" />
            <input type="text" value={time} onChange={(e) => setTime(e.target.value)} placeholder="Time" />
            <button className='mx-3' onClick={viewBuyOffers}>View Buy Offers</button>
            <p>buyOffers_Price: {buyOffers_Price.join(', ')}</p>
            <p>buyOffers_Qty: {buyOffers_Qty.join(', ')}</p>

        </div>


    );

};

export default Buyer;

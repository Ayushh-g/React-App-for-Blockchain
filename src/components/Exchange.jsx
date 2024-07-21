import React from 'react'

export default function Exchange(props) {

  const clear_tokens = async () => {
    if (props.contract) {
      try {
        await props.contract.methods.clearToken().send({ from: props.account });
        alert('Token Cleared');
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
  }

  const clear_energy = async () => {
    if (props.contract) {
      try {
        await props.contract.methods.clearEnergy().send({ from: props.account });
        alert('Energy Cleared');
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
  }

  return (
    <div className='my-3'>
        <h2>Peer Energy DApp</h2>
        <h5>Connected account: {props.account}</h5>
      
        <h3>For Clearing the Token:</h3>
        <button className='mx-3' onClick={clear_tokens}>Clear Token</button>

        <h3>For Clearing the Energy:</h3>
        <button className='mx-3' onClick={clear_energy}>Clear Energy</button>
        <p>
          <h5>### caller should be smart meter address.</h5>
        </p>
    </div>
  )
}

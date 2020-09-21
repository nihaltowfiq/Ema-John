import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css';

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
      <input name="name" defaultValue={loggedInUser.name} placeholder='Your name' ref={register({ required: true })} />
      {errors.name && <span className='error'>Name is required</span>}

      <input name="email" defaultValue={loggedInUser.email} placeholder='Your email' ref={register({ required: true })} />
      {errors.email && <span className='error'>Email is required</span>}

      <input name="address" placeholder='Your address' ref={register({ required: true })} />
      {errors.address && <span className='error'>Address is required</span>}

      <input name="phone" placeholder='Your phone number' ref={register({ required: true })} />
      {errors.phone && <span className='error'>Phone Number is required</span>}
      <input type="submit" />
    </form>
  );
};

export default Shipment;
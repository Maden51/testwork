import React, { useState } from "react";
import { IProduct } from "../models";
import axios from 'axios';
import ErrorMessage from "./ErrorMessage";

const productData: IProduct = {
  title: '',
  price: 13.5,
  description: 'lorem ipsum set',
  image: 'https://i.pravatar.cc',
  category: 'electronic',
  rating: {
    rate: 42,
    count: 10,
  }
}

interface CreateProductProps {
  onCreate: (product: IProduct) => void
}

export default function CreateProduct({ onCreate }: CreateProductProps) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  const submitHandler = async(e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if(value.trim().length === 0) {
      setError('Please enter valid title')
      return
    }
    productData.title = value;
    const res = await axios.post<IProduct>('https://fakestoreapi.com/products', productData)

    onCreate(res.data);
  }

  const changeHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        className="border py-2 px-4 mb-2 w-full outline-none"
        placeholder="Enter product title..."
        value={value}
        onChange={changeHandler}
      />

      {error && <ErrorMessage error={error} />}
      <button className="border py-2 px-4 bg-yellow-400 hover:text-white" type="submit">Create</button>
    </form>
  )
}
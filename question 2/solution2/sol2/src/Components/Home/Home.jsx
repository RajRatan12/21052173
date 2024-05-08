import { useState,useEffect } from "react";
import Card from "../Card/Card.jsx"
function Home() {
    const [data,setData]=useState([])
    useEffect(()=>{
    fetch('http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000')
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
        setData(data);
    })
  },[])
  return (
    <div className="flex justify-center p-4 mt-10">
        <h1>List of Products</h1>
        <div className="flex flex-wrap justify-center space-y-12 md:space-y-0 md:space-x-[5rem]">
        {data.map((index) => (
          <div key={index} className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5">
            <Card {price,rating,discount,availability} />
          </div>
        ))}
      </div>
        
    </div>
  )
}

export default Home
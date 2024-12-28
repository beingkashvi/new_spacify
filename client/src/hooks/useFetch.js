import {useEffect, useState} from "react"
import axios from "axios"

//A custom Hook in React is a reusable function that uses built-in 
//React Hooks (useState, useEffect, etc.) to encapsulate logic and 
//state management for a specific functionality, such as fetching data.
const useFetch = (url)=>{
    // state variables
    // 1. data:
    // ->Stores the data fetched from the provided url.
    // ->Initially set to an empty array [].
    // 2. loading:
    // ->Tracks whether the data fetching process is currently ongoing.
    // ->Initially set to false.
    // 3. error:
    // ->Captures any error that might occur during the fetch operation.
    // ->Initially set to false.
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(false)
    //useEffect:React's Hook to run side effects. Here, 
    //it's used to fetch data when the component mounts 
    //or when the url changes.
    useEffect(()=>{
        //An asynchronous function defined inside 
        //useEffect to fetch data using axios.
        const fetchData=async()=>{
            setLoading(true)
            try{
                //Axios is a popular JavaScript library used for making HTTP
                //requests from the browser or a Node.js environment.
                const res=await axios.get(url)
                //Updates the data state with the fetched data.
                setData(res.data)
            }catch(err){
                setError(err)
            }   
            setLoading(false)        
        }
        fetchData();
        //dependency array[url]: Ensures the effect runs 
        //only when the url changes.
    },[])

    const reFetch=async()=>{
        setLoading(true)
            try{
                const res=await axios.get(url)
                setData(res.data)
            }catch(err){
                setError(err)
            }   
        setLoading(false)  
    }
    return {data,loading,error,reFetch}
}

export default useFetch
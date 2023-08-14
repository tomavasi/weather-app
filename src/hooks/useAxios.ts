import axios from 'axios';
import { useState, useEffect } from 'react';


export const useAxios = (url:string)=> {
    const [data, setData] = useState<[]>([]);
    const [loading,setLoading]= useState<boolean>(false);
    const [error,setError] = useState <string | null>(null);

    useEffect(()=>{
        setLoading (true);
        axios.get(url).then(response =>{
                setData(response.data);
            }).catch((err)=>{
                setError(err);
                console.error(err)
            }).finally (()=>{
                setLoading(false);
            });
            },[url]);

    return {data, setData, loading, error};
}
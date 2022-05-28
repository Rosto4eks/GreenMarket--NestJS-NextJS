import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { createProduct } from "../../components/createProduct.module";
import { header } from "../../components/header.module";
import { menu } from "../../components/menu.module";
import style from "../../styles/products.module.css"

const index = ({products}) => {
    const router = useRouter()
    const query = router.query
    if (query.page === undefined) {
        query.page = "1"
    }

    return menu(), query, (
        
    <>
       <Head>
           <link rel="preconnect" href="https://fonts.googleapis.com"></link>
           <link rel="preconnect" href="https://fonts.gstatic.com"></link>
           <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500;600&display=swap" rel="stylesheet"></link>
      </Head>
       <div className={style.container}>
           {header()}
           <div id="stick"></div>
           <div id="products" className={style.products}>
               {products && products.map( (product: any) =>  createProduct(product.id, product.name, product.price) )}
           </div>
           <Link href="/products"><a className={style.button}>на главную</a></Link>
       </div>

       <style jsx global>{
          ` body {
               background-color: #b5e8c7;
               margin: 0;
           }
           ::-webkit-scrollbar {
               width: 0;
           }  
           `
        }</style>
    </>
    )
    
};

export default index;

export const getServerSideProps = async ({query}) => {
    const data = await axios.get('http://localhost:8000/products/search', {params: {product: query.product}})
    const products = data.data 
    return {props: {products}}
}
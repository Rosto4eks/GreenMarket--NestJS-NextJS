import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { createButtons } from "../../components/createButtons.module";
import { createProduct } from "../../components/createProduct.module";
import { header } from "../../components/header.module";
import { menu } from "../../components/menu.module";
import style from "../../styles/products.module.css"

const index = ({products, maxPage}) => {
    
    const {query} = useRouter()
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
               {products && products.map( (product) =>  createProduct(product.id, product.name, product.price) )}
           </div>
           <div className={style.buttons}>
               {createButtons(query.page, maxPage)}
           </div>
       </div>

       <style jsx global>{
          ` body {
               background: #fcecd2;
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
    const data = await axios.get('http://localhost:8000/products', {params: {page: query.page}})
    const products = data.data

    const count = await axios.post('http://localhost:8000/products/count')
    const maxPage = Number(count.data) / 5
    

    return {props: {products, maxPage}}
}
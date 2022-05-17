import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import style from "../../styles/products.module.css"

function createProduct(id, name, price) {
    return (
        <div key={name} className={style.product}>
        <Link href={"/products/"+ id}>
            <a className={style.item}>
                <Image className={style.image} src={"/images/"+name+".jpg"} alt="image" width="500px" height="500px"/>
                <div className={style.productText}>
                    <div className={style.name}>{name}</div>
                    <div className={style.price}>{price}$</div>
                </div>
                <ul className={style.avaible}><li>в наличии</li></ul>
            </a>
        </Link>
        </div>
    )
}

function menu() {
    useEffect(
        () => {
            const menu = document.getElementById("menu")
            const stick = document.getElementById("stick")
            const observer = new window.IntersectionObserver( 
                (entries) => {
                    if (!entries[0].isIntersecting) {
                        menu.style.transform = 'translateY(0)'
                    } 
                    else {
                        menu.style.transform = 'translateY(-60px)'
                    }
                }
              );
              
            observer.observe(stick);
        }
    )
}


const index = () => {
    const {query} =useRouter()
    if (query.page === undefined) {
        query.page = "1"
    }

    const [maxPage, setMaxPage] = useState(null)
    useEffect(() => {
        const getData =async () => {
            axios.post("http://localhost:8000/products/count").then(response => {
                setMaxPage(Number(response.data) / 5)
            })
        }
        getData()
    }, [maxPage])

    function createButtons() {
        if(Number(query.page) >= maxPage) {
            return (<>
            <Link href={"/products?page="+(Number(query.page)-1)}><a className={style.button}>назад</a></Link>
            </>)
        }
        else if (Number(query.page) <= 1) {
            return (<>
               <Link href={"/products?page="+(Number(query.page)+1)}><a className={style.button}>вперед</a></Link>
            </>)
        }
        else {
            return (<>
                <Link href={"/products?page="+(Number(query.page)-1)}><a className={style.button}>назад</a></Link>
                <Link href={"/products?page="+(Number(query.page)+1)}><a className={style.button}>вперед</a></Link>
            </>)
        }
    }

    const [products, setProducts] = useState(null)
    
    useEffect(() => {
        const getData = async () => {
            if( query.page ) {
                axios.get('http://localhost:8000/products', {params: {page: query.page}}).then(response => {
                setProducts(response.data)
                })
            }
            else {
                axios.get('http://localhost:8000/products').then(response => {
                setProducts(response.data)
                })
            }
        }
        getData()
    }, [query])

    return menu(), (
        
    <>
       <Head>
           <link rel="preconnect" href="https://fonts.googleapis.com"></link>
           <link rel="preconnect" href="https://fonts.gstatic.com"></link>
           <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500;600&display=swap" rel="stylesheet"></link>
      </Head>
       <div className={style.container}>
           <div id="header" className={style.header}>
               <div className={style.searchBox}><input className={style.search} type="search" placeholder="поиск"></input></div>
               <Link href="/cart" passHref><a className={style.cart}><Image className={style.cart_image} src="/cart.png"  width="40px" height="40px"></Image></a></Link>
               <Link href="/account" ><a className={style.account}><Image className={style.account_image} src="/account.png"  width="40px" height="40px"></Image></a></Link>
           </div>
           <div id="menu" className={style.menu}>
               <div className={style.searchBox}><input className={style.menuSearch} type="search" placeholder="поиск"></input></div>
               <Link href="/cart" passHref><a className={style.cart}><Image className={style.cart_image} src="/cart.png"  width="40px" height="40px"></Image></a></Link>
               <Link href="/account" ><a className={style.account}><Image className={style.account_image} src="/account.png"  width="40px" height="40px"></Image></a></Link>
           </div>
           <div id="stick"></div>
           <div id="products" className={style.products}>
               {products && products.map( (product) =>  createProduct(product.id, product.name, product.price) )}
           </div>
           <div className={style.buttons}>
               {createButtons()}
           </div>
       </div>

       <style jsx global>{
          ` body {
               background-color: #dfdfdf;
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

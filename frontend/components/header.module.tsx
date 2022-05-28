import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import style from "../styles/products.module.css"


export const header = () => {
    const [value, setValue] = useState("")
    const router = useRouter();
    useEffect(()=> {
        const search = document.getElementsByName("search")
        search.forEach(item => {item.addEventListener("submit", (e)=> {
            e.preventDefault()
            router.push(encodeURI(`/products/search?product=${value}`))
        })})
    })
    return (
    <>
    <div id="header" className={style.header}>
        <form name="search" className={style.searchBox}>
            <input value={value} onChange={(e)=>{setValue(e.currentTarget.value)}} id="input" className={style.search} type="text" placeholder="поиск">
            </input>
        </form>
        <Link href="/cart" passHref>
            <a className={style.cart}>
                <Image className={style.cart_image} src="/cart.png"  width="40px" height="40px"></Image>
            </a>
        </Link>
        <div className={style.balance}>1200руб</div>
        <Link href="/account" ><a className={style.account}><Image className={style.account_image} src="/account.png"  width="40px" height="40px"></Image></a></Link>
    </div>
    <div id="menu" className={style.menu}>
        <form name="search" className={style.searchBox}>
            <input className={style.menuSearch} value={value} onChange={(e)=>{setValue(e.currentTarget.value)}} type="search" placeholder="поиск"></input>
        </form>
        <Link href="/cart" passHref><a className={style.cart}><Image className={style.cart_image} src="/cart.png"  width="40px" height="40px"></Image></a></Link>
        <Link href="/account" ><a className={style.account}><Image className={style.account_image} src="/account.png"  width="40px" height="40px"></Image></a></Link>
    </div>
    </>
    )
}

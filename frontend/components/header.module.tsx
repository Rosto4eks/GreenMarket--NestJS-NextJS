import Image from "next/image"
import Link from "next/link"
import style from "../styles/products.module.css"

export const header = () => {
    return (
        <>
        <div id="header" className={style.header}>
        <div className={style.searchBox}><input className={style.search} type="search" placeholder="поиск"></input></div>
        <Link href="/cart" passHref><a className={style.cart}><Image className={style.cart_image} src="/cart.png"  width="40px" height="40px"></Image></a></Link>
        <div className={style.balance}>1200руб</div>
        <Link href="/account" ><a className={style.account}><Image className={style.account_image} src="/account.png"  width="40px" height="40px"></Image></a></Link>
    </div>
    <div id="menu" className={style.menu}>
        <div className={style.searchBox}><input className={style.menuSearch} type="search" placeholder="поиск"></input></div>
        <Link href="/cart" passHref><a className={style.cart}><Image className={style.cart_image} src="/cart.png"  width="40px" height="40px"></Image></a></Link>
        <Link href="/account" ><a className={style.account}><Image className={style.account_image} src="/account.png"  width="40px" height="40px"></Image></a></Link>
    </div>
    </>
    )
}
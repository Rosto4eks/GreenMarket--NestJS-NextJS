import { useRouter } from "next/router";
import { useEffect } from "react";
import nookies from 'nookies'
import axios from "axios";
import Head from "next/head";
import style from "../../styles/profile.module.css"
import Link from "next/link";
import Image from "next/image";

const logout = () => {
  nookies.set(null, "access_token", '', {maxAge: 1})
}

const Index = ({data}) => {
    const router = useRouter();
    if (data === 'Unauthorized') {
        useEffect(() => {
            router.push('/profile/login')
        })
    }
    return (
      <>
      <Head>
         <link rel="preconnect" href="https://fonts.googleapis.com"></link>
         <link rel="preconnect" href="https://fonts.gstatic.com"></link>
         <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500;600&display=swap" rel="stylesheet"></link>
      </Head>
      <div className={style.container}>
        <div className={style.user}>
          <div className={style.logo}><Image src={"/account.png"} alt="image" height="200px" width="200px" /></div>
         <div className={style.info}>
            <div className={style.userInfo}>имя: <div className={style.bold}>{data.name}</div ></div>
            <div className={style.userInfo}>почта: <div className={style.bold}>{data.mail}</div></div>
         </div>
        </div>

        <div className={style.buttons}>
          <Link href="/profile/cart"><a className={style.button1}>корзина</a></Link>
          <Link href="/profile/orders"><a className={style.button1}>заказы</a></Link>
        </div>

        <div className={style.buttons}>
          <Link href="/products"><a className={style.button}>на главную</a></Link>
          <Link href="/profile/login"><a onClick={logout} className={style.button2}>выйти</a></Link>
        </div>
      </div>

      <style jsx global>{
        ` body {
             background-color: #fcecd2;
             margin: 0;
         }
         ::-webkit-scrollbar {
             width: 0;
         }  
         `
      }</style>
      </>
  )
}

export const getServerSideProps = async (ctx) => {
    const cookies =  nookies.get(ctx)
    let data: any
    try {
      const res = await axios.get(`http://192.168.100.8:8000/profile`, {headers: {'Authorization': "Bearer " + cookies["access_token"]}})
      data = res.data
    } catch (err) {
      data = err.response.data.message
    }
    return {props: {data}}
}

export default Index;
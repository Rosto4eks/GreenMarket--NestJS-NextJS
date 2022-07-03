import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import style from "../../styles/profile.module.css"
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import Link from "next/link";

const register = () => {
  const router = useRouter()

  const [err, setErr] = useState('')
  const [name, setName] = useState('')
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')

  const sumbitUser = (e) => {
    e.preventDefault()   
    const form = {name: name, mail: mail, password: password}
    axios.post(`http://192.168.100.8:8000/profile/register`, form)
      .then((e) => {
        setCookie(null, 'access_token', e.data["access_token"], {maxAge: 3*30*24*60*60, path: '/'})
        router.push('/profile')
      })
      .catch((e) => {
        console.log(e)
        if (e.response.data.message == "exist") {
          setErr('пользователь с этой почтой уже зарегистрирован')
        } else {setErr('ошибка сервера')}
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
          <div className={style.name}>РЕГИСТРАЦИЯ</div>
          <div className={style.err}>{err}</div>
          <form id="form" onSubmit={sumbitUser} encType="multipart/form-data" className={style.form} method="post">
            <input className={style.input} placeholder="имя" type="text" onChange={(e) => setName(e.target.value)} defaultValue={name} name="name" />
            <input className={style.input} placeholder="почта" type="email" onChange={(e) => setMail(e.target.value)} defaultValue={mail} name="mail" />
            <input className={style.input} placeholder="пароль" type="password" onChange={(e) => setPassword(e.target.value)} defaultValue={password} name="password" />
            <button className={style.button} type="submit">Регистрация</button>
          </form>
          <div className={style.buttons}>
            <Link href='/profile/login'><a className={style.ref}>Авторизация</a></Link>
            <Link href='/products'><a className={style.ref}>На главную</a></Link>
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
};

export default register;
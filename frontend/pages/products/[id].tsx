import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { header } from "../../components/header.module";
import style from "../../styles/product.module.css"

const index = ({product}) => {
    const router = useRouter()
    return (
        <>
           <Head>
              <link rel="preconnect" href="https://fonts.googleapis.com"></link>
              <link rel="preconnect" href="https://fonts.gstatic.com"></link>
              <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500;600&display=swap" rel="stylesheet"></link>
           </Head>
           <div className={style.container}>

               {header()}
               <div id="stick"></div>

               <div onClick={router.back} className={style.back}>{"< назад"}</div>
               <div className={style.main}>
                   <div className={style.imageBlock}><Image className={style.image} src={"/images/"+product.name + '.jpg'} width="1000" height="1000"></Image></div>
                   <div className={style.nameBlock}>
                       <div className={style.name}>{product.name}</div>
                       <div className={style.price}>{product.price} руб</div>
                       <div className={style.buy}>
                            <Link href="/cart"><a className={style.button}>в корзину</a></Link>
                            <Link href="/cart"><a className={style.button}>купить</a></Link>
                       </div>
                    </div>
               </div>
               <div className={style.info}>
                   <div className={style.infoBlock} style={{border:"none"}}>при покупке 6 растений, 7 абсолютно бесплатно!</div>
                   <div className={style.infoBlock}>дарим набор по уходу за растением при первой покупке!</div>
                   <div className={style.infoBlock}>бесплатная доставка при покупке от 50 руб, доставка по Беларуси в течение 3 дней</div>
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

export default index;

export const getServerSideProps = async (context: any) => {
    const id = context.query.id
    const data = await axios.get(`http://localhost:8000/products/${id}`)
    const product = data.data


    return {props: {product}}
}
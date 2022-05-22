import Image from "next/image"
import Link from "next/link"
import style from "../styles/products.module.css"

export const createProduct = (id: string, name: string, price: string) => {
    return (
        <div key={name} className={style.product}>
        <Link href={"/products/"+ id}>
            <a className={style.item}>
                <Image className={style.image} src={"/images/"+name+".jpg"} alt="image" width="500px" height="500px"/>
                <div className={style.productText}>
                    <div className={style.name}>{name}</div>
                    <div className={style.price}>{price} руб</div>
                </div>
                <ul className={style.avaible}><li>в наличии</li></ul>
            </a>
        </Link>
        </div>
    )
}
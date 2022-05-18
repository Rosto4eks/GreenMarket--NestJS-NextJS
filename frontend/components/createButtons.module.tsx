import Link from "next/link"
import style from "../styles/products.module.css"

export const createButtons = (page: string[] | string, maxPage: string | number) => {
    if(Number(page) >= maxPage) {
        return (<>
        <Link href={"/products?page="+(Number(page)-1)}><a className={style.button}>назад</a></Link>
        </>)
    }
    else if (Number(page) <= 1) {
        return (<>
           <Link href={"/products?page="+(Number(page)+1)}><a className={style.button}>вперед</a></Link>
        </>)
    }
    else {
        return (<>
            <Link href={"/products?page="+(Number(page)-1)}><a className={style.button}>назад</a></Link>
            <Link href={"/products?page="+(Number(page)+1)}><a className={style.button}>вперед</a></Link>
        </>)
    }
}
import Image from 'next/image'
import styles from './page.module.css'
import emeraldPic from '../../image/emerald.png'
import scopusPic from '../../image/scopus.png'
import taylorPic from '../../image/taylor.png'
import brillPic from '../../image/brill.png'
import Link from 'next/link'


export default function Home() {

  const dataJournal = [
    {
      title: "Emerald",
      desc: "Accounting, Finance & Economics Business, Management & Strategy Education Engineering etc.",
      link: 'emerald.com',
      imgUrl: emeraldPic
    },
    {
      title: "Scopus",
      desc: "Finds relevant research, identifies experts and provides access to reliable data, metrics and analytical tools.",
      link: 'scopus.com',
      imgUrl: scopusPic
    },
    {
      title: "Taylor",
      desc: "Social Science & Humanities Library; Science & Technology Library; Medical Library etc.",
      link: 'taylor.com',
      imgUrl: taylorPic
    }, {
      title: "Brill",
      desc: "Biology; Languages, Linguistics and Literature; Asian Studies ; Middle East & Islamic Studies; Humanities etc.",
      link: 'brill.com',
      imgUrl: brillPic
    }
  ]


  return (
    <main className={styles.main}>
      <h2>Ezproxy</h2>
      {dataJournal.map(i =>
        <Link href={`/?url=${i.link}`}>
          <div key={i} className={styles.containera} >
            <div className={styles.containerb}>
              <Image
                src={i.imgUrl}
                layout='fill'
                alt="Picture"
              />
            </div>
            <div className={styles.containerc}>
              <h4>{i.title}</h4>
              <p>{i.desc}</p>
            </div>
          </div>
        </Link>
      )}

    </main>
  )
}

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'

export default function About() {
    return (
      <div className={styles.container}>
        <Header active="About" />

        <main className={styles.main}>
                <div className={styles.About}>
                    <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ultricies lacus sed turpis tincidunt id. Mauris rhoncus aenean vel
              elit scelerisque mauris. Mauris cursus mattis molestie a iaculis.
              Aliquam eleifend mi in nulla posuere sollicitudin. Id diam vel
              quam elementum pulvinar etiam. Justo nec ultrices dui sapien eget
              mi. Eget arcu dictum varius duis at consectetur lorem donec.
              Elementum tempus egestas sed sed risus pretium quam. Eu ultrices
              vitae auctor eu augue. Vel elit scelerisque mauris pellentesque
              pulvinar pellentesque habitant morbi. Ipsum consequat nisl vel
              pretium lectus quam. Ultricies tristique nulla aliquet enim
              tortor. Id cursus metus aliquam eleifend mi in nulla. Bibendum at
              varius vel pharetra vel turpis nunc eget. Viverra tellus in hac
              habitasse platea dictumst vestibulum rhoncus est. Ornare aenean
              euismod elementum nisi quis eleifend. Sit amet mauris commodo
              quis. Ac odio tempor orci dapibus ultrices in iaculis nunc sed.
              Faucibus pulvinar elementum integer enim neque volutpat ac
              tincidunt.
            </p>
            <p>
              Tincidunt tortor aliquam nulla facilisi. Proin libero nunc
              consequat interdum varius sit. Sit amet nisl suscipit adipiscing.
              Enim neque volutpat ac tincidunt vitae semper. Ultrices dui sapien
              eget mi. Ornare massa eget egestas purus viverra accumsan in nisl.
              Ut sem nulla pharetra diam sit amet. Tempor id eu nisl nunc.
              Sollicitudin ac orci phasellus egestas. Semper viverra nam libero
              justo laoreet sit. Integer quis auctor elit sed. Ultricies lacus
              sed turpis tincidunt id aliquet risus feugiat in. Dolor morbi non
              arcu risus quis varius quam quisque. Massa eget egestas purus
              viverra. Mollis aliquam ut porttitor leo a diam sollicitudin
              tempor id. At tellus at urna condimentum. Justo eget magna
              fermentum iaculis eu. Ut lectus arcu bibendum at. Adipiscing elit
              ut aliquam purus sit. Tempor nec feugiat nisl pretium fusce id.
            </p>
            <Image
              src="/Headshot.png"
              height={400}
              width={400}
              alt="photo of me"
            />
          </div>
        </main>

        <footer className={styles.footer}>
          <a
            href="https://github.com/IyobedZekarias"
            target="_blank"
            rel="noopener noreferrer"
          >
            Created by{" "}
            <span className={styles.logo}>
              <Image
                src="/Iyobed.svg"
                alt="Vercel Logo"
                width={76}
                height={36}
              />
            </span>
          </a>
        </footer>
      </div>
    );
}
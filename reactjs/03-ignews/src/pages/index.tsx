import styles from './home.module.scss'
import Head from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton'
import { GetStaticProps } from 'next'
import { stripe } from '../services/stripe'

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
    product: {
      name: string;
    }
  }
}

export default function Home({product}: HomeProps) {
  return (
    <>
    <Head>
    <title>Home | ig.news </title>
    </Head>


    <main className={styles.contentContainer}>
      <section className={styles.hero}>
        <span>👏 Hey, welcome</span>
        <h1>News about the <span>React</span> world.</h1>
        <p>Get access to all publications <br />
          <span>For only {product.amount} per month</span>
        </p>
        <SubscribeButton product={product.product} />
      </section>

      <img src="/images/avatar.svg" alt="Girl Coding" />
      </main>
    </>
  )
}


export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1Jwpp1Fg15WIKyuPLWz0gMin', {
    expand: ['product']
    })

    
  const product = {
    priceId: price.id,
    product: price.product,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
    
  }
  console.log(product)
  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24 // revalidate after 24 hours
  }
}
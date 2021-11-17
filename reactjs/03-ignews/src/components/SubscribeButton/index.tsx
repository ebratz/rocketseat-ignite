import styles from './styles.module.scss'

interface SubscribeButtonProps {
  product: {
    name: string
  }
}

export function SubscribeButton({product}:SubscribeButtonProps) {
  return (
    <button
     type="button"
     className={styles.subscribeButton}
    >Buy {product.name} now</button>
  )
}
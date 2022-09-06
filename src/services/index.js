import orderBook from './store/index'

export const services = ({pair})=>{
    orderBook.createBook({pair})
} 
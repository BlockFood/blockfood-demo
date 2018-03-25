import Http from 'axios'
import {IOrder, IOrderDetails, ORDER_STATUS} from '../../../lib/Orders'

const API_REMOTE_URL = 'http://localhost:4242'

class Api {
    private demoId: string
    private onError: () => any

    init(demoId: string, onError: () => any) {
        this.demoId = demoId
        this.onError = onError
    }

    getDemoId(): string {
        return this.demoId
    }

    startDemo(): Promise<string> {
        return Http.post(`${API_REMOTE_URL}/api/start-demo`)
            .then(({data: demoId}: any) => {
                this.demoId = demoId
                return demoId
            })
            .catch(this.onError)
    }

    getOrders(): Promise<IOrder[]> {
        return Http.get(`${API_REMOTE_URL}/api/${this.demoId}/orders`)
            .then(({data: orders}: any) => orders as IOrder[])
            .catch(this.onError)
    }

    createNewOrder(restaurantId: string, details: IOrderDetails): Promise<IOrder[]> {
        const orderData = {restaurantId, details}
        return Http.post(`${API_REMOTE_URL}/api/${this.demoId}/order`, orderData)
            .then(({data: orders}: any) => orders as IOrder[])
            .catch(this.onError)
    }

    updateOrderStatus(orderId: string, status: ORDER_STATUS): Promise<IOrder[]> {
        return Http.put(`${API_REMOTE_URL}/api/${this.demoId}/order/${orderId}`, {status})
            .then(({data: orders}: any) => orders as IOrder[])
            .catch(this.onError)
    }
}

export default new Api()
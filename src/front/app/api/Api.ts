import Http from 'axios'
import {IOrderDetails, ORDER_STATUS} from '../../../lib/Orders'

class Api {
    private demoId: string
    private onError: () => any

    init(demoId: string, onError: () => any) {
        this.demoId = demoId
        this.onError = onError
    }

    getDemoId() {
        return this.demoId
    }

    startDemo() {
        return Http.post('/api/start-demo').then(({data: demoId}: any) => {
            this.demoId = demoId
        }).catch(this.onError)
    }

    getStep() {
        return Http.get(`/api/${this.demoId}/step`).then(({data: step}: any) => +step)
    }

    getOrders() {
        return Http.get(`/api/${this.demoId}/orders`).then(({data: orders}: any) => orders)
    }

    createNewOrder(restaurantId: string, details: IOrderDetails) {
        const orderData = {restaurantId, details}
        return Http.post(`/api/${this.demoId}/order`, orderData).then(({data: orders}: any) => orders).catch(this.onError)
    }

    updateOrderStatus(orderId: string, status: ORDER_STATUS) {
        return Http.put(`/api/${this.demoId}/order/${orderId}`, {status}).then(({data}: any) => data).catch(this.onError)
    }
}

export default new Api()
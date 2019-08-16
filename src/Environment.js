// 1
import {GC_AUTH_TOKEN} from "./constants";
import {SubscriptionClient} from "subscriptions-transport-ws";

const {
    Environment,
    Network,
    RecordSource,
    Store,
} = require('relay-runtime')

//1
export const fetchQuery = (operation, variables) => {
    return fetch('https://api.graph.cool/relay/v1/cjmc1zsmy4i4h01125wbd54v5', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem(GC_AUTH_TOKEN)}`
        },
        body: JSON.stringify({
            query: operation.text,
            variables,
        }),
    }).then(response => {
        return response.json()
    })
}

// 2
const setupSubscription = (config, variables, cacheConfig, observer) => {
    const query = config.text

    const subscriptionClient = new SubscriptionClient('wss://subscriptions.graph.cool/v1/cjmc1zsmy4i4h01125wbd54v5', {reconnect: true})
    subscriptionClient.subscribe({query, variables}, (error, result) => {
        observer.onNext({data: result})
    })
}

// 3
const network = Network.create(fetchQuery, setupSubscription)


//// OLD
// // 2grap
const store = new Store(new RecordSource())
//
// export const fetchQuery = (operation, variables) => {
//     return fetch('https://api.graph.cool/relay/v1/cjmc1zsmy4i4h01125wbd54v5', {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${localStorage.getItem(GC_AUTH_TOKEN)}`
//         },
//         body: JSON.stringify({
//             query: operation.text,
//             variables,
//         }),
//     }).then(response => {
//         return response.json()
//     })
// }
//
// // 3
// const network = Network.create((operation, variables) => {
//     // 4
//     return fetch('https://api.graph.cool/relay/v1/cjmc1zsmy4i4h01125wbd54v5', {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${localStorage.getItem(GC_AUTH_TOKEN)}`
//         },
//         body: JSON.stringify({
//             query: operation.text,
//             variables,
//         }),
//     }).then(response => {
//         return response.json()
//     })
// })
//
// // 5
const environment = new Environment({
    network,
    store,
})
//
// // 6
 export default environment
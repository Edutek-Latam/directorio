import * as CryptoJs from 'crypto-js'
import { environment } from '../../../environments/environment';


export function hmac(body:any){
    const date = new Date().toUTCString()
    const payload = JSON.stringify(body);
    console.log(payload)
    const secretKey = environment.secret
    //${date}d95e0d1a-166d-496a-92c0-45f57c8ee763
    const auth = `${payload}`
    const hmac = CryptoJs.HmacSHA512(auth, secretKey).toString(CryptoJs.enc.Base64)
    console.log(hmac)
    return hmac

}
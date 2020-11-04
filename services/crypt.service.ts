import { AES, enc, mode, pad, CipherOption } from 'crypto-js'

export class CryptService {
  private static secret: string = 'CIPHERKEY'
  private static options: CipherOption = {
    iv: enc.Hex.parse('00000000000000000000000000000000'),
    mode: mode.CBC,
    padding: pad.Pkcs7
}

  public static encrypt(clear: string) {
    return AES.encrypt(clear, this.secret, this.options).toString()
  }

  public static decrypt (cipher: string) {
    return AES.decrypt(cipher, this.secret, this.options).toString(enc.Utf8)
  }
}

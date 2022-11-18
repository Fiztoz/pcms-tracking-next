import { useRouter } from "next/router"

export type UserCB = (user: User, error: any) => void

export type User = {
  address: string
  token: string
}

export class Auth {

  user: User
  error: { message: string } | null
  cb: UserCB

  constructor() {
    this.user = null
    this.error = null
  }

  onAuthStateChanged(cb: UserCB) {
    this.cb = cb

    return () => {
      this.cb = null
    }
  }

  protected onUserChange(user: User | null, error?: { message: string }) {
    this.cb && this.cb(user, error)
  }

  manageUser(address,token) {
    
    return new Promise((resolve, reject) => { 
      this.user = {
        address: address,
        token: token
      }
      window.sessionStorage.setItem("user", JSON.stringify(this.user))
      this.onUserChange(this.user)
      resolve(this.user)
    })

  }

  signOut() {
   // console.log("sign out")
    window.sessionStorage.removeItem("user")
    this.user = null
    this.onUserChange(this.user)
    
  }

  resolveUser(timeout: number) {
    setTimeout(() => {
      if (window) {
        const signedInUser = window.sessionStorage.getItem("user")
        if (signedInUser) {
          this.user = JSON.parse(signedInUser)
        }
      } else {
        this.user = null
      }
      this.onUserChange(this.user)
    }, timeout)

    return this
  }
}

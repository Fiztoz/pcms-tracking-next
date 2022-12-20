import { useRouter } from "next/router"

export type UserCB = (user: User, error: any) => void

export type User = {
  //"sub": "f:05e81c36-1254-4c22-be97-b70186bb1a88:493766",
  name: string
  preferred_username: string
  given_name: string
  family_name: string
  email: string
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

  manageUser(name,preferred_username,given_name,family_name,email) {
    
    return new Promise((resolve, reject) => { 
      this.user = {
        name: name,
        preferred_username: preferred_username,
        given_name: given_name,
        family_name: family_name,
        email: email
      }
      window.sessionStorage.setItem("user", JSON.stringify(this.user))
      this.onUserChange(this.user)
      resolve(this.user)
    })

  }

  signOut() {
   // console.log("sign out")
    window.open('http://localhost:1337/keycloak/logout?redirectTo=http://localhost:3000', '_self');
    window.sessionStorage.removeItem("user")
    //this.user = null
    //this.onUserChange(this.user) 
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

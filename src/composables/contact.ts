import axios from "axios"

export interface EmeilDataItem {
  value: string, 
  isValid: boolean
}
// export interface EmailData {
//   'id-name': EmeilDataItem,
//   'id-surname': EmeilDataItem,
//   'id-email': EmeilDataItem,
//   'id-phone': EmeilDataItem,
//   'id-message': EmeilDataItem,
//   'subject': EmeilDataItem
// }
export interface EmailData {
  [key:string]: EmeilDataItem
}

const senEmailUrl = "https://us-central1-jeraby-84a7e.cloudfunctions.net/app/send-email"
// const senEmailUrl = "http://localhost:5001/send-email"

export const useContact = () => {
  const sendContact = async (token: string, emailData: EmailData) => {
    if (token) {
      try {
        const payload = {
          token,
          contact: {
            ...emailData
          }
        }
        const response = await axios.post(senEmailUrl, payload)
        // const response = await axios.post(senEmailUrl, {})
        console.log('🚀 ~ file: contact.ts:36 ~ sendContact ~ response:', response)
      } catch(e) {
        console.log('🚀 ~ file: contact.ts:37 ~ sendContact ~ e:', e)
        throw e
      }
      
    }
  }

  return {
    sendContact
  }
}

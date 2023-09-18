// https://us-central1-jeraby-84a7e.cloudfunctions.net/app
// https://us-central1-jeraby-84a7e.cloudfunctions.net/app/send-email
import axios from "axios"

// export interface EmailData {
//   subject: string;
//   message: string;
//   from: string;
// }

export interface EmeilDataItem {
  value: string, 
  isValid: boolean
}
export interface EmailData {
  'id-name': EmeilDataItem,
  'id-surname': EmeilDataItem,
  'id-email': EmeilDataItem,
  'id-phone': EmeilDataItem,
  'id-message': EmeilDataItem,
  [key: string]: EmeilDataItem
}

const senEmailUrl = "https://us-central1-jeraby-84a7e.cloudfunctions.net/app/send-email"
// const senEmailUrl = "http://localhost:5001/send-email"

export const useContact = () => {
  const sendContact = async (token: string, email: EmailData) => {
    if (token) {
      try {
        // const payload = JSON.stringify({
        //   token,
        //   contact: {
        //     ...email
        //   }
        // })
        const payload = {
          token,
          contact: {
            ...email
          }
        }
        const response = await axios.post(senEmailUrl, payload)
        // const response = await axios.post(senEmailUrl, {})
        console.log('🚀 ~ file: contact.ts:36 ~ sendContact ~ response:', response)
      } catch(e) {
        console.log('🚀 ~ file: contact.ts:37 ~ sendContact ~ e:', e)
        
      }
      
    }
  }

  return {
    sendContact
  }
}

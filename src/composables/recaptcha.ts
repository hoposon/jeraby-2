import {ref} from 'vue'

const recaptchaSiteKey = ref<String>("6Ld_gy4oAAAAAGX_xnwPwBDhXU5Bvhi7ruuyP9L3")
const recaptchaScriptId = "__RECAPTCHA_SCRIPT"
// test recaptcha with always valid site key
// const recaptchaSiteKey = ref<String>("6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI")


export const useRecaptcha = (recaptchaSiteKeyOverride?: string) => {
  if (recaptchaSiteKeyOverride) { recaptchaSiteKey.value = recaptchaSiteKeyOverride }

  const loadReCaptcha = (locale: string) => {
    // create captcha script tag - if it exists - delete and create new one
    if (document.getElementById(recaptchaScriptId)) {
      document.getElementById(recaptchaScriptId)?.remove();
    }
    const script = document.createElement("script");
    script.id = recaptchaScriptId;
    script.src = `https://www.google.com/recaptcha/api.js?hl=${
      locale
    }`;
    script.async = true;
    script.defer = true;

    document.head.appendChild(script);
  }

  const recaptcha = () => {
    try {
      // if (this.reCaptchaLoaded()) {
        // window.grecaptcha.reset();
        window.grecaptcha.execute();
      // } else if (this.recatchaWait < 1) {
      //   this.recatchaWait++;
      //   setTimeout(() => {
      //     this.validateAndCaptcha();
      //   }, 5000);
      // } else {
      //   // this.setError({message: 'error.general'})
      //   // log captcha no loaded error
      //   // window.dataLayer = window.dataLayer || [];
      //   // dataLayer.push({
      //   // 	'event' : 'reCaptchaError'
      //   // });
      //   err.errorData = { error: "recaptcha_execute_error" };
      //   err.trackerData = {
      //     waited: this.recatchaWait,
      //     reCaptchaLoaded: this.reCaptchaLoaded()
      //   };
      //   throw err;
      // }
    } catch (e) {
      console.log('🚀 ~ file: recaptcha.ts:33 ~ recaptcha ~ e:', e)
      throw e
      // this.setError({message: 'error.general'})
      // this.errorHandler(e);
    }
  }

  return {
    loadReCaptcha,
    recaptchaSiteKey,
    recaptcha
  }
}
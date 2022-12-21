import { useState } from 'react';
import Cookies from 'js-cookie';
import { CookieConsent } from 'react-cookie-consent';

const CookiesConsent = () => {
  const [consent, setConsent] = useState(Cookies.get('consent'));

  return (
    !consent && (
      <CookieConsent
        style={{ background: '#2B373B' }}
        buttonStyle={{ color: '#4e503b', fontSize: '13px' }}
        buttonText="Accept"
        onAccept={() => {
          Cookies.set('consent', true);
          setConsent(true);
        }}
        link={{ url: '/privacy-policy', text: 'Privacy Policy' }}
      >
        This website uses cookies to enhance the user experience. By continuing to use this website, you consent to the use of cookies.
      </CookieConsent>
    )
  );
};

export default CookiesConsent;
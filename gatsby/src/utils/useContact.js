import { useContext, useState } from 'react';
import LocaleContext from '../components/LocaleContext';
import { tr } from './translations';

export default function useContact({ inputs }) {
  const [locale, setLocale] = useContext(LocaleContext);

  // Local states for this hook
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Send this data to serverless function
  // Called when submitting form
  async function submitContact(event) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    setMessage('');

    // TODO: check whether form is subscribe-only
    const isContact = true;
    const isSubscribe = inputs.subscribe;
    let res;
    let contactText;
    let subscribeResult;
    let isError;

    // Submit contact request to serverless function
    if (isContact) {
      res = await fetch(`${process.env.GATSBY_SERVERLESS_BASE}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      });
      contactText = JSON.parse(await res.text());
    }

    // Submit contact request to serverless function
    if (isSubscribe) {
      res = await fetch(`${process.env.GATSBY_SERVERLESS_BASE}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      });
      subscribeResult = JSON.parse(await res.text());
    }

    if (
      (subscribeResult && subscribeResult.error) ||
      (res.status >= 400 && res.status < 600)
    ) {
      // HTTP response between 400 and 600 means something went wrong
      setError(
        `${tr('notices', 'contactError', locale)} 
        ${contactText.message ? ` ${contactText.message}` : ''}
        ${subscribeResult.error ? ` ${subscribeResult.error.title}` : ''}`
      );
    } else {
      setMessage(tr('notices', 'contactSuccess', locale));
    }
    setLoading(false);
  }

  return {
    error,
    loading,
    message,
    submitContact,
  };
}

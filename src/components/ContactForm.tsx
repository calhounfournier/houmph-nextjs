'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface ContactFormProps {
  isVisible: boolean;
  onClose: () => void;
  selectedDomain?: string;
}

interface FormData {
  fullname: string;
  email: string;
  message: string;
}

const schema = yup.object({
  fullname: yup.string().required('Please enter your name'),
  email: yup.string().email('Please enter a valid email address').required('Please enter your email address'),
  message: yup.string().required('Please let us know which domain you are interested in.')
});

export default function ContactForm({ isVisible, onClose, selectedDomain }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<string>('');
  const websiteRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, formState: { errors: formErrors }, reset, setValue } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (selectedDomain && isVisible) {
      setValue('message', `I’m interested in ${selectedDomain} domain`);
    }
  }, [selectedDomain, isVisible, setValue]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setErrors('');

    // Add honeypot value to submission
    const website = websiteRef.current?.value || '';

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, website }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        reset();
      } else {
        const errorData = await response.json();
        setErrors(errorData.error || 'Failed to submit form. Please try again.');
      }
    } catch {
      setErrors('An error occurred while submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setErrors('');
    reset();
    onClose();
  };

  if (!isVisible) return null;

  return (
    <fieldset id="form-over">
      <div className="wrapper">
        <div className="contact-form">
          <div id="close_box">
            <a className="close-form" onClick={handleClose}>x</a>
          </div>
          
          {!isSubmitting && !isSubmitted && (
            <form id="contact-form" onSubmit={handleSubmit(onSubmit)}>
              <h2>Thank you for filling out this form.</h2>

              {/* Honeypot field - hidden from users */}
              <input
                type="text"
                ref={websiteRef}
                name="website"
                style={{
                  position: 'absolute',
                  left: '-9999px',
                  width: '1px',
                  height: '1px',
                  opacity: 0,
                  pointerEvents: 'none'
                }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <input
                className="fullname"
                type="text"
                placeholder="Type your name here."
                {...register('fullname')}
              />
              {formErrors.fullname && <div className="error">{formErrors.fullname.message}</div>}

              <input
                className="email"
                type="email"
                placeholder="Type your email here."
                {...register('email')}
              />
              {formErrors.email && <div className="error">{formErrors.email.message}</div>}
              
              <textarea 
                className="message" 
                placeholder="Let us know which domain or domain family you are interested in."
                {...register('message')}
              />
              {formErrors.message && <div className="error">{formErrors.message.message}</div>}
              
              <div id="errors">{errors}</div>
              
              <input className="button btn-envoyer" type="submit" value="SEND" />
              <div className="annuler">
                <a className="btn-annuler close-form underline" onClick={handleClose}>Close</a>
              </div>
            </form>
          )}

          {isSubmitting && (
            <div id="msg_submitting">
              <h2>Submitting...</h2>
            </div>
          )}

          {isSubmitted && (
            <div id="msg_submitted">
              <h2>Thank you!</h2>
              <h3>Your message has been sent successfully.</h3>
              <p>We will get back to you shortly.</p>
              <div className="annuler">
                <a className="btn-annuler close-form underline" onClick={handleClose}>Close</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </fieldset>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { gsap } from 'gsap';

interface ContactFormProps {
  isVisible: boolean;
  onClose: () => void;
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

export default function ContactForm({ isVisible, onClose }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<string>('');

  const { register, handleSubmit, formState: { errors: formErrors }, reset } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (isSubmitting) {
      const submitText = document.getElementById('h2_submitting');
      if (submitText) {
        const chars = submitText.textContent?.split('') || [];
        gsap.fromTo(chars, 
          { y: "-15" },
          { 
            y: 0,
            duration: 0.6,
            yoyo: true,
            repeat: -1,
            stagger: 0.2,
            ease: "power2.inOut"
          }
        );
      }
    }
  }, [isSubmitting]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setErrors('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
        reset();
      } else {
        const errorData = await response.text();
        setErrors(errorData);
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
              <h2>Submitting<span id="h2_submitting">...</span></h2>
            </div>
          )}

          {isSubmitted && (
            <div id="msg_submitted">
              <h2>Thank you!</h2>
              <h3>Your informations were successfully transmitted.</h3>
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

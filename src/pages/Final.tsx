import React, { createRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Template from '../components/Template';
import Transition from '../components/Transition';
import { useAppSelector } from '../store/hooks';

function Final() {
  const { form } = useAppSelector((state) => state);
  const router = useNavigate();

  useEffect(() => {
    if (form.templateId === 0) {
      router('/app');
    } else {
    }
  }, []);

  return (
    <Transition>
      <div className="px-8">
        <div className="px-0 lg:px-32 flex flex-col items-center">
          <h1 className="text-3xl font-bold">
            You're all set! your resume is now ready!!
          </h1>
          <p className="mt-2 mb-10">
            Download it below! Thank you for using our app : )
          </p>
          <Template form={form} />
        </div>
      </div>
    </Transition>
  );
}

export default Final;

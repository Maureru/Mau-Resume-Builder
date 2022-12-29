import React from 'react';
import { MdCheckBoxOutlineBlank, MdDarkMode, MdCheckBox } from 'react-icons/md';

import { IoMdSunny } from 'react-icons/io';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleTheme } from '../reducers/themeSlice';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const { theme, form } = useAppSelector((state) => state);

  const steps = [
    {
      step: 1,
      name: 'Personal Info',
    },
    {
      step: 2,
      name: 'Experience',
    },
    {
      step: 3,
      name: 'Education',
    },
    {
      step: 4,
      name: 'Skill',
    },
    {
      step: 5,
      name: 'Summary',
    },
  ];

  const dispatch = useAppDispatch();

  return (
    <div className="h-16 px-8 flex justify-between items-center">
      <a className="" href="/">
        <div id="logo" className="select-none">
          <img
            className="h-[2.5rem] lg:h-[3.5rem]"
            loading="lazy"
            src="/assets/logo.png"
            alt=""
          />
        </div>
      </a>
      <div className="flex gap-2 lg:gap-4 items-center">
        {form.templateId === 0 ? null : (
          <>
            <div className="hidden lg:flex gap-2">
              {steps.map((step, i) => (
                <div className="flex gap-2 items-center" key={i}>
                  {step.step <= form.step ? (
                    <MdCheckBox className="text-green-500 text-xl" />
                  ) : (
                    <MdCheckBoxOutlineBlank />
                  )}
                  <p>{step.name}</p>
                </div>
              ))}
            </div>
            <div className="flex lg:hidden">
              {steps.map((step, i) => {
                if (step.step === form.step) {
                  return (
                    <div className="flex gap-2 items-center" key={i}>
                      <MdCheckBox className="text-green-500 text-xl" />
                      <p>{step.name}</p>
                    </div>
                  );
                } else {
                  return <></>;
                }
              })}
            </div>
          </>
        )}
        {/* ================ theme mode toggle ============= */}
        <div
          onClick={() => {
            dispatch(toggleTheme());
          }}
          id="toogle"
          className="p-2 hover:bg-slate-500 rounded-md"
        >
          {theme.darkMode ? (
            <IoMdSunny className="text-white" />
          ) : (
            <MdDarkMode />
          )}
        </div>
        {/* ================================================== */}
      </div>
    </div>
  );
}

export default Navbar;

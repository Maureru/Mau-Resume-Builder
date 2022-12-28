import React, { useEffect, useRef, useState } from 'react'
import { BsFillTrash2Fill } from 'react-icons/bs'
import { AiTwotoneEdit } from 'react-icons/ai'
import { countries, months, year } from '../data/countries'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { addEducation, addExperience, addPersonalInfo, addSkill, addSummary, nextStep, prevStep, removeEducation, removeExperience, removeSkill } from '../reducers/formSlice'
import { useNavigate } from 'react-router-dom'

function Apps() {
  const {form} = useAppSelector(state => state)
  const sc = useRef<HTMLDivElement>(null)
  const sce = useRef<HTMLButtonElement>(null)
  const dispatch = useAppDispatch()
  const router = useNavigate()

  const [loading, setLoading] = useState(false)

  type skill = {
    id: number,
    name: string,
    level: number
  }[]


  useEffect(() => {
    if (form.templateId === 0) {
      router("/")
    }
  }, [])

  const [forms ,setForms] = useState(
    {
      personalInfo: form.personalInfo ? form.personalInfo : {
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        country: '',
        zip: 0,
        email: '',
        phone: 0
      },
      experience: form.experience.length > 0 ? form.experience : [],
      education: form.education.length > 0 ? form.education : [],
      skills: form.skills.length > 0 ? form.skills : [
        {
          id: 0,
          name: '',
          level: 0,
        }
      ],
      summary: form.summary ? form.summary : ''

    }
  )

  console.log(form.skills.length);
  

  const [experience, setExperience] = useState({
    employer: '',
    jobTitle: '',
    jobDescription: '',
    city: '',
    state: '',
    startDate: 0,
    endDate: 0,
    workPresent: false
  })
  const [education, setEducation] = useState({
    schoolName: '',
    city: '',
    state: '',
    degree: '',
    fieldStudy: '',
    graduationYear: 0,
    studyPresent: false
  })



  const [isAddOrEdit, setIsAddOrEdit] = useState(forms.experience.length > 0 ? "no" : "add")
  const [isEduAddOrEdit, setEduIsAddOrEdit] = useState(forms.education.length > 0 ? "no" : "add")

  const [array, setArray] = useState<skill>([
    {
      id: 0,
      name: '',
      level: 0,
    }
  ])


  const handleChangeInfo = (e: any) => {
    setForms({...forms, personalInfo: {
      ...forms.personalInfo, [e.target.name]: e.target.value
    }})
  }

  const handleChangeExp = (e: any) => {
    setExperience({
      ...experience,
      [e.target.name]: e.target.value
    })
  }
  const handleChangeEduc = (e: any) => {
    setEducation({
      ...education,
      [e.target.name]: e.target.value
    })
  }


  console.log(experience);
  
  const addExp = () => {
    if (experience.jobDescription !== '' && experience.jobTitle !== '' && experience.employer !== '' && experience.city !== '' && experience.state !== '' && experience.startDate !== 0) {
      dispatch(addExperience(experience))
      setIsAddOrEdit("no")
    } else {
      console.log("fill all fields");
      
    }
  }
  const addEdu = () => {
    if (education.schoolName !== '' && education.state !== '' && education.city !== '' && education.degree !== '' && education.fieldStudy !== '') {
      dispatch(addEducation(education))
      setEduIsAddOrEdit("no")
      setEducation({
        schoolName: '',
        city: '',
        state: '',
        degree: '',
        fieldStudy: '',
        graduationYear: 0,
        studyPresent: false
      })
    } else {
      console.log("fill all fields");
      
    }
  }

  console.log(forms.skills);
  const scroll = () => {
    sc.current?.scrollIntoView({behavior: 'smooth'})
    sce.current?.scrollIntoView({behavior: 'smooth'})
  }
  
  const renderMultiStepForm = () => {
    if (form.step === 1) {
      return (
        <div className='flex-1'>
          <h1 className='text-2xl'>COMPLETE YOUR <span className='font-bold'>RESUME HEADING</span></h1>
          <p>Employers will use this information to contact you.</p>
          <div className='mt-8 grid grid-cols-2 gap-4'>
            <div>
              <p className='text-[12px]'>First Name</p>
              <input value={forms.personalInfo.firstName} onChange={handleChangeInfo} name='firstName' type="text" placeholder='eg. John' className='mt-1 rounded-sm p-2 w-full bg-transparent border'/>
            </div>
            <div>
              <p className='text-[12px]'>Last Name</p>
              <input value={forms.personalInfo.lastName} onChange={handleChangeInfo} name='lastName' type="text" placeholder='eg. Doe' className='mt-1 rounded-sm p-2  w-full bg-transparent border'/>
            </div>
          </div>
          <div className='mt-4'>
              <p className='text-[12px]'>Address</p>
              <input value={forms.personalInfo.address} onChange={handleChangeInfo} name='address' type="text" placeholder='eg. 50, Emerald st.' className='mt-1 rounded-sm p-2  w-full bg-transparent border'/>
          </div>
          <div className='mt-8 block lg:grid grid-cols-2 gap-4'>
            <div>
              <p className='text-[12px]'>City</p>
              <input value={forms.personalInfo.city} onChange={handleChangeInfo} name='city' type="text" placeholder='eg. Cleveland' className='mt-1 rounded-sm p-2 w-full bg-transparent border'/>
            </div>
            <div className='flex mt-4 lg:mt-0 gap-4'>
              <div>
                <p className='text-[12px]'>Country</p>
                <select value={forms.personalInfo.country} onChange={handleChangeInfo} name='country' className='mt-1 rounded-md w-40 text-black p-2 text-center bg-[#E8DDCC]'>
                  <option value="">--Select Country--</option>
                  {
                    countries.map((country, i) => (
                      <option key={i} value={country.name}>{country.name}</option>
                    ))
                  }
                </select>
              </div>
              <div className='flex-1'>
                <p className='text-[12px]'>Zip Code</p>
                <input value={forms.personalInfo.zip} onChange={handleChangeInfo} name='zip' type="number" placeholder='eg. 8313' className='mt-1 rounded-sm p-2  w-full bg-transparent border'/>
              </div>
            </div>
          </div>
          <div className='mt-8 grid grid-cols-2 gap-4'>
            <div>
              <p className='text-[12px]'>Email</p>
              <input value={forms.personalInfo.email} onChange={handleChangeInfo} name='email' type="text" placeholder='eg. john@gmail.com' className='mt-1 rounded-sm p-2 w-full bg-transparent border'/>
            </div>
            <div>
              <p className='text-[12px]'>Phone Number</p>
              <input value={forms.personalInfo.phone} onChange={handleChangeInfo} name='phone' type="number" placeholder='eg. 09234672812' className='mt-1 rounded-sm p-2  w-full bg-transparent border'/>
            </div>
          </div>
        </div>
      )
    }
    if (form.step === 2) {
      return (
        <div className='flex-1'>
          <h1 className='text-2xl font-bold'>EXPERIENCE</h1>
          <p>List your work experience, from the most recent to the oldest. Feel free to use our pre-written examples.</p>
          {
            form.experience.map((exp, i) => (
              <div key={i} className='my-4'>
                <div className='outline p-2 flex items-center rounded-lg justify-between'>
                  <div>
                    <p className='font-bold'>{exp.jobTitle} <span className='font-thin text-sm'>{exp.employer}</span></p>
                    <p className='text-sm font-mono'>{exp.city} <span>{exp.startDate} - {exp.endDate}</span></p>
                  </div>
                  <div className='flex pr-3 gap-4 text-xl'>
                    <AiTwotoneEdit className='cursor-pointer'/>
                    <BsFillTrash2Fill onClick={() => {
                      dispatch(removeExperience(exp))
                      if (form.experience.length < 1) {
                        setIsAddOrEdit("add")
                      }
                    }} className='text-red-400 cursor-pointer'/>
                  </div>
                </div>
              </div>
            ))
          }
          {
            isAddOrEdit === "add" || isAddOrEdit === "edit" ? (
              <div>
                <div className='mt-8 block lg:grid grid-cols-2 gap-4'>
            <div>
              <p className='text-[12px]'>Job Title</p>
              <input name='jobTitle' onChange={handleChangeExp} type="text" placeholder='eg. Software ENGINEER' className='mt-1 rounded-sm p-2 w-full bg-transparent border'/>
            </div>
            <div className='mt-4 lg:mt-0'>
              <p className='text-[12px]'>Employer</p>
              <input name='employer' onChange={handleChangeExp} type="text" placeholder='eg. Facebook' className='mt-1 rounded-sm p-2  w-full bg-transparent border'/>
            </div>
          </div>
          <div className='mt-8 block lg:grid grid-cols-2 gap-4'>
            <div>
              <p className='text-[12px]'>City</p>
              <input name='city' onChange={handleChangeExp} type="text" placeholder='eg. Cleveland' className='mt-1 rounded-sm p-2 w-full bg-transparent border'/>
            </div>
            <div className='mt-4 lg:mt-0'>
              <p className='text-[12px]'>States</p>
              <input name='state' onChange={handleChangeExp} type="text" placeholder='eg. Ohio' className='mt-1 rounded-sm p-2  w-full bg-transparent border'/>
            </div>
          </div>
          <div className='block lg:grid gap-4 grid-cols-2'>
            <div className='mt-8 grid grid-cols-1 gap-4'>
              <div className=''>
                <p className='text-[12px]'>Start Date</p>
                <div className='grid gap-4 grid-cols-2'>
                  <select className='mt-1 rounded-md text-black p-2 text-center bg-[#E8DDCC]'>
                    <option value="">Month</option>
                    {
                      months.map((month, i) => (
                        <option value={month} key={i}>{month}</option>
                      ))
                    }
                  </select>
                  <select name='startDate' value={experience.startDate} onChange={handleChangeExp} className='mt-1 rounded-md text-black p-2 text-center bg-[#E8DDCC]'>
                    <option value={0}>Year</option>
                    {
                      year().reverse().map((y, i) => (
                        <option key={i} value={y}>{y}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
              
              <div className='flex gap-2'>
                <input onClick={() => {
                  setExperience({...experience, workPresent: !experience.workPresent, endDate: 0})
                }} checked={experience.workPresent} type="checkbox"/>
                <label>I currently work here.</label>
              </div>

            </div>
            <div className={`mt-8 grid grid-cols-1 ${experience.workPresent ? 'opacity-50 pointer-events-none' : null} gap-4`}>
              <div className=''>
                <p className='text-[12px]'>End Date</p>
                <div className='grid gap-4 grid-cols-2'>
                  <select className='mt-1 rounded-md text-black p-2 text-center bg-[#E8DDCC]'>
                    <option value="">Month</option>
                    {
                      months.map((month, i) => (
                        <option value={month} key={i}>{month}</option>
                      ))
                    }
                  </select>
                  <select name='endDate' value={experience.endDate} onChange={handleChangeExp} className='mt-1 rounded-md text-black p-2 text-center bg-[#E8DDCC]'>
                    <option value={0}>Year</option>
                    {
                      year().reverse().map((y, i) => (
                        <option key={i} value={y}>{y}</option>
                      ))
                    }
                  </select>
                </div>
              </div>

            </div>
            
          </div>
          <div  className='mt-8'>
            <p className='text-[12px]'>Job Description</p>
            <textarea name='jobDescription' onChange={handleChangeExp} value={experience.jobDescription} className='w-full p-2 rounded-md min-h-[12rem] resize-y bg-transparent mt-1 border'></textarea>
          </div>
          <div id='sc' ref={sc} className='mb-[4rem] lg:mb-0 flex justify-end my-4'>
              <button onClick={addExp} className='py-2 px-4 text-white bg-green-500 rounded-md'>{isAddOrEdit === "add" ? 'ADD' : "EDIT"}</button>
          </div>
              </div>
            ) : null
          }
          {
            form.experience.length > 0 && isAddOrEdit === "no"? (
              <div className='flex mt-4 justify-center'>
            <button onClick={() => {
              
              setIsAddOrEdit("add");
              setTimeout(scroll, 100)
              

            }} className='py-2 px-4 bg-green-500 rounded-md text-white'>+ Add Another Position</button>
          </div>
            ) : null
          }
        </div>
      )
    }
    if (form.step === 3) {
      return (
        <div className='flex-1'>
          <h1 className='text-2xl font-bold'>EDUCATION</h1>
          <p>Add information about your educational background.</p>
          <div className='my-4'>
            {
              form.education.map((educ, i) => (
                <div key={i}>
                  <div className='outline p-2 my-4 flex items-center rounded-lg justify-between'>
              <div>
                <p className='font-bold'>{educ.degree} - {educ.fieldStudy} <span className='font-thin text-sm'>{educ.graduationYear}</span></p>
                <p className='text-sm font-mono'>{educ.schoolName} <span>{educ.city}</span></p>
              </div>
              <div className='flex pr-3 gap-4 text-xl'>
                <AiTwotoneEdit className='cursor-pointer'/>
                <BsFillTrash2Fill onClick={() => {
                  dispatch(removeEducation(educ))
                }} className='text-red-400 cursor-pointer'/>
              </div>
            </div>
                </div>
              ))
            }
          </div>
          
          {
            isEduAddOrEdit === "add" || isEduAddOrEdit === "edit" ? (
              <>
                <div className='mt-8 block lg:grid grid-cols-2 gap-4'>
            <div>
              <p className='text-[12px]'>School Name</p>
              <input name='schoolName' value={education.schoolName} onChange={handleChangeEduc} type="text" placeholder='eg. Harvard University' className='mt-1 rounded-sm p-2 w-full bg-transparent border'/>
            </div>
            <div className='mt-4 lg:mt-0'>
              <p className='text-[12px]'>State/Province</p>
              <input name='state' value={education.state} onChange={handleChangeEduc} type="text" placeholder='eg. Ohio' className='mt-1 rounded-sm p-2  w-full bg-transparent border'/>
            </div>
          </div>
          <div className='mt-8 block lg:grid grid-cols-2 gap-4'>
            <div>
              <p className='text-[12px]'>City</p>
              <input name='city' value={education.city} onChange={handleChangeEduc} type="text" placeholder='eg. Cleveland' className='mt-1 rounded-sm p-2 w-full bg-transparent border'/>
            </div>
            <div className='mt-4 lg:mt-0'>
              <p className='text-[12px]'>Degree</p>
              <input name='degree' value={education.degree} onChange={handleChangeEduc} type="text" placeholder='eg. Bachelor of Science (Only type Acronym)' className='mt-1 rounded-sm p-2  w-full bg-transparent border'/>
            </div>
          </div>
          <div className='block lg:grid gap-4 grid-cols-2'>
            <div className='mt-8'>
                <p className='text-[12px]'>Field of Study</p>
                <input name='fieldStudy' value={education.fieldStudy} onChange={handleChangeEduc} type="text" placeholder='eg. Engineering' className='mt-1 rounded-sm p-2  w-full bg-transparent border'/>
              </div>
            <div className={`mt-8 grid grid-cols-1 gap-4 ${education.studyPresent ? 'opacity-50 pointer-events-none' : null}`}>
              <div className=''>
                <p className='text-[12px]'>Year Graduated</p>
                <div className='grid gap-4 grid-cols-2'>
                  <select className='mt-1 rounded-md text-black p-2 text-center bg-[#E8DDCC]'>
                    <option value="">Month</option>
                    {
                      months.map((month, i) => (
                        <option value={month} key={i}>{month}</option>
                      ))
                    }
                  </select>
                  <select name='graduationYear' value={education.graduationYear} onChange={handleChangeEduc} className='mt-1 rounded-md text-black p-2 text-center bg-[#E8DDCC]'>
                    <option value="">Year</option>
                    {
                      year().reverse().map((y, i) => (
                        <option key={i} value={y}>{y}</option>
                      ))
                    }
                  </select>
                </div>
              </div>

            </div>
            <div className='flex gap-2'>
                <input onChange={() => {
                  setEducation({...education, graduationYear: 0, studyPresent: !education.studyPresent})
                }} checked={education.studyPresent} type="checkbox"/>
                <label>I currently study here.</label>
              </div>
            
          </div>
          <div className='flex mb-[5rem] lg:mb-0 justify-end my-2'>
              <button ref={sce} onClick={addEdu} className='py-2 px-4 text-white bg-green-500 rounded-md'>{isEduAddOrEdit === "add" ? 'ADD' : "EDIT"}</button>
          </div>
              </>
            ) : null
          }
          {
            form.education.length > 0 && isEduAddOrEdit === "no"? (
              <div className='flex mt-4 justify-center'>
            <button onClick={() => {
              setEduIsAddOrEdit("add")
              setTimeout(scroll, 100)
            }} className='py-2 px-4 bg-green-500 rounded-md text-white'>+ Add Another Education</button>
          </div>
            ) : null
          }
          
        </div>
      )
    }
    if (form.step === 4) {
      return (
        <div className='flex-1'>
          <h1 className='text-2xl font-bold'>SKILLS</h1>
          <p>Highlight 6-8 of your top skills.</p>
          <div className='mt-8 grid grid-cols-2 gap-4'>
            <div>
              <p className='text-[12px]'>Skill Name</p>
              <input type="text" value={forms.skills[0].name} name='name' onChange={handleChangeSkillOne} placeholder='eg. Javascript' className='mt-1 rounded-sm p-2 w-full bg-transparent border'/>
            </div>
            <div>
              <p className='text-[12px]'>Level</p>
              <select name='level' value={forms.skills[0].level} onChange={handleChangeSkillOne} className='p-2 dark:bg-gray-900 border mt-1 w-full'>
                <option value={0}>Select your skill level</option>
                <option value={1} className='Novice'>Novice</option>
                <option value={2} className='Beginner'>Beginner</option>
                <option value={3} className='Skillful'>Skillful</option>
                <option value={4} className='Experience'>Experience</option>
                <option value={5} className='Expert'>Expert</option>
              </select>
            </div>
          </div>
          {
            forms.skills.map((arr, i) => {
              if (i === 0) {
                return (
                  null
                )
              } else {
                return (
                  <div key={i} className='mt-3 relative grid grid-cols-2 gap-4'>
                    <div>
                      <p className='text-[12px]'>Skill Name</p>
                      <input type="text" value={arr.name} name='name' onChange={handleChangeSkill(i)} placeholder='eg. Javascript' className='mt-1 rounded-sm p-2 w-full bg-transparent border'/>
                    </div>
                    <div>
                      <p className='text-[12px]'>Level</p>
                      <select value={arr.level} onChange={handleChangeSkill(i)} name='level' className='p-2 dark:bg-gray-900 border mt-1 w-full'>
                        <option value={0}>Select your skill level</option>
                        <option value={1} className='Novice'>Novice</option>
                        <option value={2} className='Beginner'>Beginner</option>
                        <option value={3} className='Skillful'>Skillful</option>
                        <option value={4} className='Experience'>Experience</option>
                        <option value={5} className='Expert'>Expert</option>
                      </select>
                    </div>
                    <BsFillTrash2Fill onClick={() => {
                      dispatch(removeSkill(arr))
                      setForms({...forms, skills: forms.skills.filter(ar => ar.id !== arr.id)})
                    }} className='absolute top-[50%] cursor-pointer right-[-1.5rem] lg:right-[-2rem]'/>
                  </div>
                )
              }
              
            })
          }
          <div className='flex mb-[5rem] lg:mb-0 mt-4 justify-center'>
            <button onClick={() => {
              setSkillId((skill) => skill + 1)
              setForms({...forms, skills: [...forms.skills, {id: skillId,name: '', level: 0}]})
            }} className='py-2 px-4 bg-green-500 rounded-md text-white'>+ Add Another Skill</button>
          </div>
          
        </div>
      )
    }
    if (form.step === 5) {
      return (
        <div className='mb-[5rem] lg:mb-0 flex-1'>
          <h1 className='text-2xl font-normal'>PROFESSIONAL <span className='font-bold'>SUMMARY</span></h1>
          <p>Write a short summary telling more about yourself, your strengths and experience. Feel free to use our pre-written examples.</p>
          <div className='mt-8 '>
              <p className='text-[12px]'>Summary</p>
              <textarea value={forms.summary} onChange={(e:any) => {
                setForms({...forms, summary: e.target.value})
              }} placeholder='Write a short summary about yourself, your experience, skills and achievements.' className='p-2 w-full mt-1 bg-transparent min-h-[200px] resize-y border'>

              </textarea>
            </div>
        </div>
      )
    }
  }


  const handleNextAndSubmit = async () => {

  }

  const handleNext = () => {
    if (form.step === 1) {
      setLoading(true)
      setTimeout(() => {
        if (forms.personalInfo.firstName !== '' && forms.personalInfo.lastName !== '' && forms.personalInfo.address !== '' && forms.personalInfo.city !== '' && forms.personalInfo.country !== '' && forms.personalInfo.zip !== 0 && forms.personalInfo.email !== '' && forms.personalInfo.phone !== 0) {
          dispatch(addPersonalInfo(forms.personalInfo));
          setLoading(false);
          dispatch(nextStep());
        }
        else {
          console.log("fill all required fields");
          setLoading(false);
        }
      }, 200)
    }

    if (form.step === 2) {
      
      setLoading(true)
      setTimeout(() => {
        if (form.experience.length > 0) {
          dispatch(nextStep())
          setLoading(false);
        } else {
          console.log("have at least 1 experience");
          setLoading(false);
          
        }
      }, 200)
    }
    if (form.step === 3) {
      
      setLoading(true)
      setTimeout(() => {
        if (form.education.length > 0) {
          setLoading(false);
          dispatch(nextStep())
        } else {
          console.log("have at least 1 education");
          setLoading(false);
        }
  
      }, 200)
    }

    if (form.step === 4) {
      

      setLoading(true)
      setTimeout(() => {
        const allFilled = forms.skills.filter((skill) => (skill.name === ''))
      const allFilled2 = forms.skills.filter((skill) => (skill.level === 0))
      if (allFilled.length === 0 && allFilled2.length === 0) {
        dispatch(addSkill(forms.skills))
        setLoading(false)
        dispatch(nextStep())
        
      } else {
        console.log("fill all fields");
        setLoading(false)
        
      }
  
      }, 200)
    }

    if (form.step === 5) {
      

      setLoading(true)
      setTimeout(() => {
        if (forms.summary !== '') {
          router('/app/final')
          setLoading(false)
          dispatch(addSummary(forms.summary))
          
        } else {
          setLoading(false)
        }
      }, 200)
    }
  }

  const handlePrev = () => {
    setLoading(true)
    if (form.step === 1) {
      setTimeout(() => {
        router("/")
        setLoading(false)
      }, 200)
    }
    
    setTimeout(() => {
      dispatch(prevStep())
      setLoading(false)
    }, 200)
  }
  
  const [skillId, setSkillId] = useState(1)

  const handleChangeSkillOne = (e: any) => {
    let newArray = [...forms.skills]
    newArray[0] = {
      ...forms.skills[0],
      [e.target.name]: e.target.value
    }

    setForms({...forms, skills: newArray})
  }

  const handleChangeSkill = (index: number) => (e: any) => {
    let newArray = [...forms.skills]
    newArray[index] = {
      ...forms.skills[index],
      [e.target.name]: e.target.value
    }

    setForms({...forms, skills: newArray})
  }


  return (
    <div className='px-8'>
      {
        loading ? (
          <div className='fixed top-0 left-0 z-40 w-full h-full flex justify-center items-center bg-white/50 dark:bg-gray-800/50'>
        <img src='/assets/loading.svg'/>
      </div>
        ) : null
      }
      <div className='px-0 lg:px-32 relative py-2 w-full flex flex-col min-h-[calc(100vh-4rem)]'>
        {
          renderMultiStepForm()
        }
        <div className='fixed bg-white dark:bg-gray-800 lg:relative py-2 px-4 lg:px-0 w-full flex bottom-0 left-0 justify-between'>
          <button onClick={handlePrev} className='py-3 uppercase rounded-sm px-8 bg-transparent border'>Back</button>
          <button onClick={handleNext} className='py-3 text-white uppercase rounded-sm px-8 bg-[#9333EA]'>SAVE & Next</button>
        </div>
      </div>
    </div>
  )
}

export default Apps



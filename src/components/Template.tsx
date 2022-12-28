import React, { useRef } from 'react'
import { useAppSelector } from '../store/hooks'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { BsInstagram } from 'react-icons/bs'
import { BsGithub } from 'react-icons/bs'
import { FaFacebook, FaGlobeAsia } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa'
import { ImLocation2 } from 'react-icons/im'
import { MdEmail } from 'react-icons/md'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'


function Template({form}: {form:any}) {

    const ref = useRef<HTMLDivElement>(null!)
    

    var doc = new jsPDF();

    const download = () => {
        console.log(ref.current);
        
        html2canvas(ref.current,
        { scale: 1 }
    ).then(canvas => {
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
        pdf.save(`${form.personalInfo.lastName}.pdf`);
    });
    }

    if (form.templateId === 1) {
        return (
            <>
            <div className='scale-[0.35] lg:scale-100 origin-top'>
            <div ref={ref} className='flex text-black flex-col aspect-[8.5/11] w-[1000px] bg-white'>
            <div className='w-full h-10 bg-gray-400'></div>
            <div className='flex-1 flex flex-col px-8'>
                <h1 className='text-center text-6xl font-bold p-10'>{form.personalInfo.firstName} {form.personalInfo.lastName}</h1>
                <div className='w-full h-[1px] bg-gray-400'/>
                <div className='px-3 py-2 flex gap-2 items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <div className='p-3 text-lg bg-gray-400 rounded-full'>
                            <ImLocation2 className='text-white'/>
                        </div>
                        <div className='text-[12px]'>
                            <p>{form.personalInfo.address}</p>
                            <p>{form.personalInfo.city}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-3'>
                        <div className='p-3 text-lg bg-gray-400 rounded-full'>
                            <MdEmail className='text-white'/>
                        </div>
                        <div className='text-[12px]'>
                            <p>{form.personalInfo.email}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-3'>
                        <div className='p-3 text-lg bg-gray-400 rounded-full'>
                            <BsFillTelephoneFill className='text-white'/>
                        </div>
                        <div className='text-[12px]'>
                            <p>Mobile: {form.personalInfo.phone}</p>

                        </div>
                    </div>

                </div>
                <div className='w-full h-[1px] bg-gray-400'/>

                <div className='flex-1  flex gap-1 w-full py-2'>
                    <div className='w-[250px] flex flex-col justify-between'>
                        <div>
                            <div className='p-2 font-bold bg-gray-300'>
                                EDUCATION
                            </div>
                            {
                                form.education.map((edu:any, i:number) => (
                                    <div key={i}>
                                        <p className='mt-2 text-sm font-semibold'>{edu.degree} - {edu.fieldStudy}</p>
                                        <p className='text-[13px]'>{edu.schoolName}</p>
                                        <p className='text-[13px]'>{edu.graduationYear}</p>
                                    </div>
                                ))
                            }
                            
                        </div>

                        <div>
                            <div className='mt-2 p-2 font-bold bg-gray-300'>
                                SKILLS
                            </div>
                            {
                                form.skills.map((skill: any, i:number) => (
                                    <div key={i} className='grid grid-cols-2 px-2 py-1 gap-3 items-center'>
                                        <p className=''>{skill.name}</p>
                                        <div className='bg-gray-300 h-2 w-full overflow-hidden rounded-md'>
                                            <div className='h-full w-16 bg-black'/>
                                        </div>
                                    </div>
                                ))
                            }
                            
                        </div>
                        
                        <div>
                            <div className='mt-2 p-2 font-bold bg-gray-300'>
                                SOCIAL
                            </div>
                            <div className='flex p-2 items-center gap-2'>
                                <BsInstagram className='text-xl'/>
                                <p className='text-sm'>@nicee_u</p>
                            </div>
                            <div className='flex p-2 items-center gap-2'>
                                <FaTwitter className='text-xl'/>
                                <p className='text-sm'>@nicee_u</p>
                            </div>
                            <div className='flex p-2 items-center gap-2'>
                                <FaGlobeAsia className='text-xl'/>
                                <p className='text-sm'>www.niceeu.cf</p>
                            </div>
                        </div>
                        
                    </div>
                    <div className='w-[1px] h-full bg-gray-400'/>
                    <div className='flex-1 flex flex-col'>

                        <div>
                            <div className='p-2 font-bold bg-gray-400'>
                                    PROFILE
                            </div>
                            <div className='p-4'>
                                <p className='text-sm'>{form.summary}</p>
                            </div>
                        </div>
                        <div>
                            <div className='p-2 font-bold bg-gray-400'>
                                    EXPERIENCE
                            </div>
                            {
                                form.experience.map((exp: any, i: number) => (
                                    <div className='p-4'>
                                        <p className='font-semibold uppercase'>{exp.jobTitle}</p>
                                        <p className='text-[12px]'>{exp.employer} | {exp.startDate} - {exp.endDate === 0 ? 'Present' : exp.endDate}</p>
                                        <p className='mt-2 text-sm'>
                                            {exp.jobDescription}
                                        </p>
                                    </div>
                                ))
                            }
                            
                        </div>

                    </div>
                </div>
            </div>
            <div className='w-full h-10 bg-gray-900'></div>

        </div>
        
            </div>
            <div className='my-4'>
                <button onClick={download} className='bg-green-500 py-2 px-4 rounded-md'>Download</button>
            </div>
            </>
        )
    }

  return (
    <div></div>
  )
}

export default Template
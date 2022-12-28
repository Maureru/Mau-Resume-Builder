import { motion } from 'framer-motion'
import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { staggeredItemCard, staggerTemplateCard, templateModal } from '../config/animations'
import { templatesData } from '../data/templatesData'
import { setStep, setTemplate } from '../reducers/formSlice'
import { useAppDispatch } from '../store/hooks'

function TemplateModal({close, isOpen = false}: {close: () => void, isOpen: boolean}) {

    const modalRef = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch()
    const router = useNavigate()
    

    useEffect(() => {
        const closeModal = (e: any) => {
            if (!modalRef.current?.contains(e.target)) {
                close()
            }
        }

        addEventListener('mousedown', closeModal);
        return () => removeEventListener('mousedown', closeModal);
        
    }, [])


  return (
    <div id='templateModal' className={`fixed flex justify-center items-center top-0 left-0 z-40 w-full h-full`}>
        <motion.div variants={templateModal} initial="hide" animate="show" exit="hide" ref={modalRef} style={{
            boxShadow: '0px 0px 16px 15px rgba(0,0,0,0.1)'
        }} className='w-[90%] h-[97%] flex flex-col rounded-md overflow-hidden bg-gray-100 dark:bg-gray-900'>
            <div className='flex-1 overflow-y-auto py-4 px-8'>
                <h1 className='uppercase text-center text-4xl font-bold'>Resume Template</h1>
                
                <motion.div variants={staggerTemplateCard} initial="hide" animate="show" className='flex mt-8 flex-wrap gap-8 justify-center'>
                    
                    {
                        templatesData.map((template, i) => (
                            <motion.div key={i} variants={staggeredItemCard} className='group object-cover relative rounded-sm overflow-hidden aspect-[8.5/11] lg:hover:scale-[1.5] hover:z-50 transition-all w-[300px] '>
                                <img className='w-full h-full object-cover' src={`../src/assets/${template.image}`} alt=''/>
                                <div className='w-full h-full hidden group-hover:flex justify-center items-center bg-black/30 absolute top-0 left-0 z-20'>
                                    <button onClick={() => {
                                        dispatch(setTemplate(template.id));
                                        dispatch(setStep(1))
                                        router("/app")
                                    }} className='py-2 hover:scale-110 transition-all font-semibold px-4 bg-[#9333EA] rounded-md uppercase'>Choose Template</button>
                                </div>
                            </motion.div>
                        ))
                    }
                    
                </motion.div>
            </div>
            <div className='py-2 px-4 flex justify-end'>
                <p className=' text-[12px]'>* More Template Will Be Soon Available</p>
            </div>
        </motion.div>
    </div>
  )
}

export default TemplateModal
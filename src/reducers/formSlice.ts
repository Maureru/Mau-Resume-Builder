import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
    step: number,
    templateId: number,
    personalInfo: {
        firstName: string,
        lastName: string,
        address: string,
        city: string,
        country: string,
        zip: number,
        email: string,
        phone: number
    },
    experience: {
        employer: string,
        jobTitle: string,
        jobDescription: string,
        city: string,
        state: string,
        startDate: number,
        endDate: number,
        workPresent: boolean
    }[],
    education: {
        schoolName: string,
        city: string,
        state: string,
        degree: string,
        fieldStudy: string,
        graduationYear: number,
        studyPresent: boolean
    }[],
    skills: {
        id: number,
        name: string,
        level: number
    }[],
    summary: string


} = {
    step: localStorage.getItem("step") ? JSON.parse(localStorage.getItem('step') || '1') : 1,
    templateId: localStorage.getItem("template") ? JSON.parse(localStorage.getItem('template') || '0') : 0,
    personalInfo: localStorage.getItem("personalInfo") ? JSON.parse(localStorage.getItem("personalInfo") || '{}') : {
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        country: '',
        zip: 0,
        email: '',
        phone: 0
    },
    experience: localStorage.getItem("experience") ? JSON.parse(localStorage.getItem("experience") || '[]') : [],
    education: localStorage.getItem("education") ? JSON.parse(localStorage.getItem("education") || '[]') : [],
    skills: localStorage.getItem("skill") ? JSON.parse(localStorage.getItem("skill") || '[]') : [],
    summary: localStorage.getItem('summary') ? JSON.parse(localStorage.getItem("summary") || '') : ''
}

export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setTemplate: (state, action) => {
            state.templateId = action.payload
            localStorage.setItem("template", JSON.stringify(action.payload))
        },
        setStep: (state, action) => {
            localStorage.setItem("step", JSON.stringify(action.payload));
            state.step = action.payload
        },
        nextStep: (state) => {
            localStorage.setItem('step', JSON.stringify(state.step+1))
            state.step += 1
        },
        prevStep: (state) => {
            if (state.step !== 1) {
                localStorage.setItem('step', JSON.stringify(state.step-1))
                state.step -= 1
            }
            
        },
        addPersonalInfo: (state, action) => {
            localStorage.setItem("personalInfo", JSON.stringify(action.payload))
            state.personalInfo = action.payload
        },
        addExperience: (state, action) => {
            const newExperience = [...state.experience, action.payload]
            localStorage.setItem('experience', JSON.stringify(newExperience))
            state.experience = newExperience
        },
        removeExperience: (state, action) => {
            const newExperience = state.experience.filter((exp) => exp.employer !== action.payload.employer && exp.jobTitle !== action.payload.jobTitle)
            localStorage.setItem('experience', JSON.stringify(newExperience))
            state.experience = newExperience
        },
        addEducation: (state, action) => {
            const newEducation = [...state.education, action.payload]
            localStorage.setItem('education', JSON.stringify(newEducation))
            state.education = newEducation
        },
        removeEducation: (state, action) => {
            const newEducation = state.education.filter(educ => educ.fieldStudy !== action.payload.fieldStudy)
            localStorage.setItem('education', JSON.stringify(newEducation))
            state.education = newEducation
        },
        addSkill: (state, action) => {
            const newSkill = action.payload
            localStorage.setItem('skill', JSON.stringify(newSkill))
            state.skills = newSkill
        },
        removeSkill: (state, action) => {
            const newSkill = state.skills.filter((skill) => skill.id !== action.payload.id)
            localStorage.setItem('skill', JSON.stringify(newSkill))
            state.skills = newSkill
        },
        addSummary: (state, action) => {
            localStorage.setItem("summary", JSON.stringify(action.payload))
            state.summary = action.payload
        }

    }
})

export const {
    addPersonalInfo,
    addExperience,
    removeExperience,
    addEducation,
    removeEducation,
    addSkill,
    removeSkill,
    addSummary,
    nextStep,
    prevStep,
    setTemplate,
    setStep,
} = formSlice.actions

export default formSlice.reducer
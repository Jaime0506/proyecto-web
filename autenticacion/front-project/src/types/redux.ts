import type { AuthError } from '@supabase/supabase-js'
import type { Dayjs } from 'dayjs'

export interface ScheduleItemType {
    day: number // Usualmente un número de 0 (domingo) a 6 (sábado)
    timeStart: Dayjs // Hora de inicio de la clase
    timeEnd: Dayjs   // Hora de fin de la clase

}

export interface SchedulesType {
    schedules: ScheduleItemType[] // Lista de sesiones por día y horas
}

export interface SubjectType {
    id: string
    name: string
    credits: number
    image: string
    data_subject: SchedulesType
    available: number
}

export interface CareerType {
    id: string
    name: string
    n_semesters: number
    subjects: [SubjectType[]]
    total_credits: number
}

export interface UserType {
    id: string
    name: string | null
    email: string | undefined
    role: string | undefined
}

export interface AuthType {
    status: "checking" | "not-authenticated" | "authenticated"
    user: UserType | null
    error: AuthError | null
}

export interface SessionType {
    date: string
}

export interface SubjectsType {
    subject_id: string
    name: string
    image: string
    description: string
    sessions: SessionType[]
}

export interface AttendanceType {
    attendance_id: string
    user_id: string
    subject_id: string
    metadata: MetadataType[]
}

export interface MetadataType {
    date: string
    status: string
}

export interface DataType {
    subjects: SubjectsType[] | null
    attendance: AttendanceType[] | null
    currentSubject: SubjectsType | null
}

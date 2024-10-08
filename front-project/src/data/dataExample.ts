import dayjs from "dayjs";
import { CareerType, UserType } from "../types/redux";
import { v4 as uuidv4 } from 'uuid';

import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const exampleCareer: CareerType[] = [
    {
        id: 'CARR123',
        name: 'Ingeniería en Sistemas',
        n_semesters: 8,
        total_credits: 240,
        subjects: [
            [
                {
                    id: 'MAT101',
                    name: 'Matemáticas Básicas',
                    credits: 5,
                    available: 20,
                    data_subject: {
                        schedules: [
                            {
                                day: 1, // Lunes
                                timeStart: dayjs('08:00', 'HH:mm'), // 8:00 AM
                                timeEnd: dayjs('10:00', 'HH:mm')    // 10:00 AM
                            },
                            {
                                day: 3, // Miércoles
                                timeStart: dayjs('08:00', 'HH:mm'),
                                timeEnd: dayjs('10:00', 'HH:mm')
                            },
                            {
                                day: 5, // Viernes
                                timeStart: dayjs('08:00', 'HH:mm'),
                                timeEnd: dayjs('10:00', 'HH:mm')
                            }
                        ]
                    }
                },
                {
                    id: 'FIS101',
                    name: 'Física I',
                    credits: 4,
                    available: 20,
                    data_subject: {
                        schedules: [
                            {
                                day: 2, // Martes
                                timeStart: dayjs('10:00', 'HH:mm'), // 10:00 AM
                                timeEnd: dayjs('12:00', 'HH:mm')    // 12:00 PM
                            },
                            {
                                day: 4, // Jueves
                                timeStart: dayjs('10:00', 'HH:mm'),
                                timeEnd: dayjs('12:00', 'HH:mm')
                            },
                            {
                                day: 6, // Sábado
                                timeStart: dayjs('09:00', 'HH:mm'),
                                timeEnd: dayjs('11:00', 'HH:mm')
                            }
                        ]
                    }
                },
                {
                    id: 'PROG101',
                    name: 'Introducción a la Programación',
                    credits: 5,
                    available: 20,
                    data_subject: {
                        schedules: [
                            {
                                day: 1, // Lunes
                                timeStart: dayjs('14:00', 'HH:mm'), // 2:00 PM
                                timeEnd: dayjs('16:00', 'HH:mm')    // 4:00 PM
                            },
                            {
                                day: 3, // Miércoles
                                timeStart: dayjs('14:00', 'HH:mm'),
                                timeEnd: dayjs('16:00', 'HH:mm')
                            },
                            {
                                day: 5, // Viernes
                                timeStart: dayjs('14:00', 'HH:mm'),
                                timeEnd: dayjs('16:00', 'HH:mm')
                            }
                        ]
                    }
                },
                {
                    id: 'QUI101',
                    name: 'Química General',
                    credits: 4,
                    available: 20,
                    data_subject: {
                        schedules: [
                            {
                                day: 2, // Martes
                                timeStart: dayjs('08:00', 'HH:mm'), // 8:00 AM
                                timeEnd: dayjs('10:00', 'HH:mm')    // 10:00 AM
                            },
                            {
                                day: 4, // Jueves
                                timeStart: dayjs('08:00', 'HH:mm'),
                                timeEnd: dayjs('10:00', 'HH:mm')
                            },
                            {
                                day: 6, // Sábado
                                timeStart: dayjs('11:00', 'HH:mm'),
                                timeEnd: dayjs('13:00', 'HH:mm')
                            }
                        ]
                    }
                },
                {
                    id: 'INF101',
                    name: 'Introducción a la Informática',
                    credits: 3,
                    available: 20,
                    data_subject: {
                        schedules: [
                            {
                                day: 3, // Miércoles
                                timeStart: dayjs('10:00', 'HH:mm'), // 10:00 AM
                                timeEnd: dayjs('12:00', 'HH:mm')    // 12:00 PM
                            },
                            {
                                day: 5, // Viernes
                                timeStart: dayjs('10:00', 'HH:mm'),
                                timeEnd: dayjs('12:00', 'HH:mm')
                            },
                            {
                                day: 6, // Sábado
                                timeStart: dayjs('12:00', 'HH:mm'),
                                timeEnd: dayjs('14:00', 'HH:mm')
                            }
                        ]
                    }
                },
                {
                    id: 'EDU101',
                    name: 'Educación Física',
                    credits: 2,
                    available: 20,
                    data_subject: {
                        schedules: [
                            {
                                day: 1, // Lunes
                                timeStart: dayjs('16:00', 'HH:mm'), // 4:00 PM
                                timeEnd: dayjs('18:00', 'HH:mm')    // 6:00 PM
                            },
                            {
                                day: 3, // Miércoles
                                timeStart: dayjs('16:00', 'HH:mm'),
                                timeEnd: dayjs('18:00', 'HH:mm')
                            },
                            {
                                day: 5, // Viernes
                                timeStart: dayjs('16:00', 'HH:mm'),
                                timeEnd: dayjs('18:00', 'HH:mm')
                            }
                        ]
                    }
                }
            ]
        ]
    }
];

export const userExample: UserType = {
    id: uuidv4(),
    email: "ejemplo@gmail.com",
    name: "Pepe",
    career_id: "CARR123",
    semester: 1
}
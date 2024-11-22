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
                    image:"https://www.ibolivia.net/sites/default/files/2020-07/matematicas_basicas_portada_1.jpg",
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
                    image:"https://jrgarciaa.milaulas.com/pluginfile.php/21/course/summary/pagina%20inicial.jpg?time=1566310367939",
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
                    image:"https://concepto.de/wp-content/uploads/2014/08/programacion-2-e1551291144973.jpg",
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
                    image:"https://concepto.de/wp-content/uploads/2014/08/quimica-1-e1589576962905.jpg",
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
                    image:"https://ecuador.unir.net/wp-content/uploads/sites/8/2022/06/diverse-office-enthusiastic-white-it-programmer-working-on-desktop-picture-id1354205065.jpg",
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
                    image:"https://entreprofesweb.com/wp-content/uploads/2019/09/1515586430.png",
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
    role: "role",
    photoURL: null,
    is_super_admin: false
}
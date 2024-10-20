import { useEffect, useState } from "react";

import { CareerType, SubjectType } from "../../src/types/redux";
import { exampleCareer } from "../data/dataExample";
import { useAuth } from "./useAuth";

export const useSubjects = () => {
  const { user } = useAuth();
  const [dataCareer, setDataCareer] = useState<CareerType | null>();
  const [subjects, setSubjects] = useState<SubjectType[] | null>();

  const handlerDataCareer = () => {
    if (!user) return [];

    const subjects = dataCareer ? dataCareer.subjects[user?.semester - 1] : [];

    setSubjects(subjects);
  };

  useEffect(() => {
    if (user) {
      const temp = exampleCareer.filter(
        (career) => career.id === user?.career_id
      )[0];
      setDataCareer(temp);
    }
  }, [user]);

  useEffect(() => {
    handlerDataCareer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataCareer]);

  return {
    dataCareer,
    subjects,
  };
};

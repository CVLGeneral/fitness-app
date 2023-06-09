import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import {
  FetchData,
  ExerciseOptions,
} from "../utlis/FetchData";
import Detail from "../components/Detail";
import SimilarExercises from "../components/SimilarExercises";
import Loader from "../components/Loader";
const ExerciseDetail = () => {
  const [exerciseDetail, setExercisesDetail] = useState({});
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const { id } = useParams();
  const [loaded, setLoaded] = useState(true);

  
  // This useEffect hook fetches the exercise details, as well as the exercises that target the same muscle group and use the same equipment.
  
  useEffect(() => {
    const fetchExercisesData = async () => {
      const exerciseDBURL = "https://exercisedb.p.rapidapi.com";


      const ExerciseDetailData = await FetchData(
        `${exerciseDBURL}/exercises/exercise/${id}`,
        ExerciseOptions
      );
      setExercisesDetail(ExerciseDetailData);


      const targetMuscleExercisesData = await FetchData(
        `${exerciseDBURL}/exercises/target/${ExerciseDetailData.target}`,
        ExerciseOptions
      );
      setTargetMuscleExercises(targetMuscleExercisesData);
      const equipmentExercisesData = await FetchData(
        `${exerciseDBURL}/exercises/equipment/${ExerciseDetailData.equipment}`,
        ExerciseOptions
      );
      setEquipmentExercises(equipmentExercisesData);
    };
    fetchExercisesData();

    window.scrollTo(0, -250); //// Scrolls to the top of the page

  }, [id]);

  // The component returns the exercise details and related exercises, as well as a loading spinner that is shown for 4 seconds when the page is loading.
// If the loaded state is false, the spinner is shown. Otherwise, the exercise details are displayed.

  useEffect(() => {
    let timer = setTimeout(() => setLoaded(false), 4000);
    return () => {
      setLoaded(true);
      clearTimeout(timer);
    };
  }, [id]);



  return (
    <div>
      {loaded ? (
        <Loader />
      ) : (
        <Box>
          <Detail exerciseDetail={exerciseDetail} />

          <SimilarExercises
            targetMuscleExercises={targetMuscleExercises}
            equipmentExercises={equipmentExercises}
          />
        </Box>
      )}
    </div>
  );
};

export default ExerciseDetail;
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSpecificBuilding } from '../Redux/actions/buildingsActions';

export const useBuildings = (buildingId) => {
  const [buildingData, setBuildingData] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    setBuildingData(dispatch(getSpecificBuilding(buildingId)));
  }, [buildingId]);
  return { buildingData };
};

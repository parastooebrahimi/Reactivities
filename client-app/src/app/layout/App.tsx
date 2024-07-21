
import { Fragment, useEffect, useState } from 'react'
import axios from 'axios';
import {  Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';



function App() {

  const [activities,setActivities]= useState<Activity[]>([]);
  const [selectedActivity,setSelectedActivity]= useState<Activity | undefined>(undefined)
  const [isEditMode,setIsEditMode] = useState(false)

  useEffect(()=>{
    axios.get<Activity[]>("http://localhost:5000/api/activities")
    .then(response=>{
      setActivities(response.data)
  })

  },[])

  function handleSelectActivity (id:string){
    setSelectedActivity(activities.find(a=>a.id===id));
  }

  function handleCancelSelectedActivity(){
    setSelectedActivity(undefined)
  }

  function handleFormOpen(){
    setIsEditMode(true);
  }

  function handleFormClose(){
    setIsEditMode(false);
  }

  function handleCreateOrEditActivity(activity:Activity){
    activity. id 
    ? setActivities([...activities.filter(x=> x.id !== activity.id), activity])
    : setActivities([...activities, {...activity, id: uuid()}])
    setIsEditMode(false);
    setSelectedActivity(activity)
  }

  function handleDeleteActivity(id: string){
    setActivities([...activities.filter(a=> a.id !== id)]);
  }

  return (
    <Fragment>
        <NavBar handleFormOpen={handleFormOpen} />
        <Container style={{marginTop:"7em"}} >
       <ActivityDashboard 
       activities={activities}
       selectedActivity={selectedActivity}
       handleSelectActivity={handleSelectActivity}
       handleCancelSelectedActivity={handleCancelSelectedActivity}
       isEditMode = {isEditMode}
       handleFormOpen={handleFormOpen}
       handleFormClose={handleFormClose}
       handleCreateOrEditActivity={handleCreateOrEditActivity}
       handleDeleteActivity={handleDeleteActivity}
       />
        </Container>

    </Fragment>
  )
}

export default App

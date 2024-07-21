import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';

interface Props{
    activities :Activity[];
    selectedActivity : Activity | undefined ;
    handleCancelSelectedActivity: () => void;
    handleSelectActivity : (id:string)=> void;
    isEditMode: boolean;
    handleFormOpen : (id: string) => void;
    handleFormClose: () => void;
    handleCreateOrEditActivity: (activity: Activity)=> void;
    handleDeleteActivity: (id:string) => void;
    submitting : boolean;
}

export default function ActivityDashboard({
    activities, 
    selectedActivity,
    handleCancelSelectedActivity,
    handleSelectActivity, 
    isEditMode, 
    handleFormOpen,
    handleFormClose, 
    handleCreateOrEditActivity,
    handleDeleteActivity,
    submitting
}:Props ){
    return (
        <Grid>
            <Grid.Column width="10">
          <ActivityList 
          activities={activities} 
          handleSelectActivity={handleSelectActivity} 
          handleDeleteActivity={handleDeleteActivity}
          submitting={submitting}
           />
            </Grid.Column>
            <Grid.Column width="6">
          {selectedActivity && !isEditMode &&
          <ActivityDetails 
          activity={selectedActivity} 
          handleCancelSelectedActivity={handleCancelSelectedActivity}
          handleFormOpen ={handleFormOpen}
           /> }
         {
            isEditMode &&
            <ActivityForm 
            handleFormClose={handleFormClose} 
            selectedActivity={selectedActivity} 
            handleCreateOrEditActivity={handleCreateOrEditActivity} 
            submitting={submitting} />
         }
            </Grid.Column>
        </Grid>
    )
}
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { ChangeEvent, useState } from "react";

interface Props{
    selectedActivity: Activity | undefined;
    handleFormClose: ()=> void;
    handleCreateOrEditActivity : (activity: Activity)=> void;
    submitting : boolean;
}

export default function ActivityForm ({selectedActivity, handleFormClose, handleCreateOrEditActivity, submitting}: Props){

const initialState = selectedActivity ?? {
    id: '',
    title: '',
    category: '',
    date: '',
    city: '',
    venue: '',
    description: ''
}

const [activity,setActivities]= useState(initialState);

function handleSubmit() {
    console.log(activity)
    handleCreateOrEditActivity(activity)
}

function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    setActivities({...activity,[event.target.name]: event.target.value})
}

   return(
    <Segment clearing>
    <Form onSubmit={handleSubmit} autoComplete='off'>
        <Form.Input placeholder="Title" value={activity.title} name="title" onChange={handleInputChange} />
        <Form.TextArea placeholder="Description" value={activity.description} name="description" onChange={handleInputChange}  />
        <Form.Input placeholder="Category" value={activity.category} name="category" onChange={handleInputChange}  />
        <Form.Input type="date" placeholder="Date" value={activity.date} name="date" onChange={handleInputChange}  />
        <Form.Input placeholder="City" value={activity.city} name="city" onChange={handleInputChange}  />
        <Form.Input placeholder="Venue" value={activity.venue} name="venue" onChange={handleInputChange}  />
        <Button loading={submitting} floated="right" positive type="submit" content="Submit" />
        <Button onClick={handleFormClose} floated="right"  type="button" content="Cancel" />
    </Form>
</Segment>
   )
}
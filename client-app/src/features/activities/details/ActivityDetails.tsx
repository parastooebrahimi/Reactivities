import { Button, Card, CardContent, CardDescription, CardHeader, CardMeta,Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props{
    activity: Activity;
    handleCancelSelectedActivity: ()=> void;
    handleFormOpen : (id:string) => void;
}

export default function ActivityDetails({activity,handleCancelSelectedActivity,handleFormOpen}: Props){
    return(
        <Card fluid>
        <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
        <CardContent>
          <CardHeader>{activity.title}</CardHeader>
          <CardMeta>
            <span>{activity.date}</span>
          </CardMeta>
          <CardDescription>
            {activity.description}
          </CardDescription>
        </CardContent>
        <CardContent extra>
            <Button.Group widths="2">
                <Button onClick={()=> handleFormOpen(activity.id)} basic color="blue" content="Edit" />
                <Button onClick={handleCancelSelectedActivity} basic color="grey" content="Cancel" />
            </Button.Group>
       
        </CardContent>
      </Card>
    )
}
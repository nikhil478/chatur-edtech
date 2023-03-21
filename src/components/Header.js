import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import Fab from '@mui/material/Fab';
import {styled} from '@mui/material/styles';
import CanvasDraw from "react-canvas-draw";
import LinearProgress from '@mui/material/LinearProgress';
import AssessmentForm from "./Assessment-form";
import CompletionPage from "./Completion";

export default function HeaderBar(props) {

    const [value, setValue] = React.useState(0);
    const [isConfirm, setIsConfirm] = React.useState(false);
    const [answer, setAnswer] = React.useState("");
    const [questionRemaining,setQuestionRemaining] = React.useState(5);


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        if (newValue != 0) {
            props.active(false);
        } else {
            props.active(true);
        }
        setValue(newValue);
    };

    const onSubmit = (e) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({query: e.target.value})
        };
        fetch('http://192.168.43.107:5000/query', requestOptions)
            .then(response => response.json())
            .then((data) => {
                setAnswer(data.answer);
                console.log(data.answer);
            });
    }

    const messages = [
        {
            id: 7,
            primary: 'Summer BBQ',
            secondary: `Who wants to have a cookout this weekend? I just got some furniture
      for my backyard and would love to fire up the grill.`,
            person: '/static/images/avatar/1.jpg',
        },
    ];

    const handleSubmit = () => {
        setIsConfirm(true);
    }


    return (
        <Box sx={{flexGrow: 1}}>
            <LinearProgress/>
            <Tabs value={value} onChange={handleChange} aria-label="nav tabs example" className="nav nav-pills">
                <Tab label="Feed Back"/>
                <Tab label="Assessment"/>
                <Tab label="Creator Options"/>
            </Tabs>
            {value === 0 ? <>
                <List sx={{mb: 2}}>
                    {messages.map(({id, primary, secondary, person}) => (
                        <React.Fragment key={id}>
                            {id === 1 && (
                                <ListSubheader sx={{bgcolor: 'background.paper'}}>
                                    Today
                                </ListSubheader>
                            )}
                            {id === 3 && (
                                <ListSubheader sx={{bgcolor: 'background.paper'}}>
                                    Yesterday
                                </ListSubheader>
                            )}
                            <ListItem button>
                                <ListItemAvatar>
                                    <Avatar alt="Profile Picture" src={person}/>
                                </ListItemAvatar>
                                <ListItemText primary={primary} secondary={secondary}/>
                            </ListItem>
                        </React.Fragment>
                    ))}
                </List>
            </> : null}
            {value === 1 ? <div>
                {isConfirm ?
                    <form onSubmit={onSubmit}>
                        <input type="text" id="dialogName" name="dialog-name" placeholder="...write your name here"/>
                        <input type="tel" id="dialogTel" name="dialog-phone"
                               placeholder="...Write your Whatsapp Number here"/>
                        <button onClick={onSubmit}> Confirm</button>
                    </form> :
                    <div className="row">
                        { questionRemaining && questionRemaining > 0 ?
                            <><div  style={{display:'flex', justifyContent:'left'}} className="col-md-6">
                            <AssessmentForm setQuestionRemaining={setQuestionRemaining} questionRemaining={questionRemaining} />
                        </div>
                        <div style={{border:'solid-dark'}} className="col-md-6">
                            <CanvasDraw hideGridX hideGridY brushColor={'#add8e6'} canvasWidth={600} brushRadius={6} className="w-80 p-3 border border-dark"/>
                        </div></> :
                         <div>
                            <CompletionPage />
                        </div> }
                    </div>}
            </div> : null}
        </Box>
    );
}

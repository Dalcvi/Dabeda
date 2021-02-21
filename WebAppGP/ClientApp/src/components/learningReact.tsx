import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as RB from 'react-bootstrap';
import '../styles/learningReact.css';

export const LearningReact = () => {

    return (
        <RB.Container fluid>
            <RB.Row>
                <RB.Col lg={4} xl={3} id="programList">
                    <div style={{margin: "10px"}}>
                        <div style={{width: "100%", marginTop: '1rem'}} className="d-flex justify-content-end">
                            <RB.Button variant="success">Add program</RB.Button>
                        </div>
                        <RB.ListGroup className="my-2">
                            <RB.ListGroup.Item action variant="light" className="listItem">This ListGroup</RB.ListGroup.Item>
                            <RB.ListGroup.Item action variant="light" className="listItem">renders vertically</RB.ListGroup.Item>
                            <RB.ListGroup.Item action variant="light" className="listItem">on</RB.ListGroup.Item>
                            <RB.ListGroup.Item action variant="light" className="listItem">and above!</RB.ListGroup.Item>
                        </RB.ListGroup>
                    </div>
                </RB.Col>
                <RB.Col lg={8} xl={9} id="workout">
                    <div id="workoutPlate">

                    </div>
                </RB.Col>
            </RB.Row>
        </RB.Container>
    )
}


export default (LearningReact);


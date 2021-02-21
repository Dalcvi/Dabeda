import * as React from 'react';
import { Container } from 'react-bootstrap';

export default (props: { children?: React.ReactNode }) => (
    <React.Fragment>
        {props.children}
    </React.Fragment>
);

import  React  from 'react';
import { Container, Nav } from 'react-bootstrap';
import {  HashRouter, Link } from 'react-router-dom';


export class MainManuItem {
    text: string = '';
    link: string = '#';

    constructor(text: string, link: string){
        this.text = text;
        this.link = link;
    }
}

interface MainMauProperties{
    items: MainManuItem[];
}
interface MainManuState{
    items: MainManuItem[];
}

export class MainManu extends React.Component<MainMauProperties>{
    state: MainManuState;

    constructor(props: MainMauProperties | Readonly<MainMauProperties>){
        super(props);

        this.state = {
            items: props.items,
        };
    }

    setItems(items: MainManuItem[]){
        this.setState({
            items: items,
        });
    }

    render(){
        return(
            <Container>
                <Nav variant="tabs">
                    <HashRouter>
                    { this.state.items.map(this.makeNavLink) }
                    </HashRouter>
                </Nav>
            </Container>
        );
    }
    private makeNavLink(item: MainManuItem){
        return(
            <Link to={item.link} className="nav-link">
                {item.text}
            </Link>
            
        );
    }
}
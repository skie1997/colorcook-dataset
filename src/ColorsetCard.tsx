import React from 'react';
import './ColorsetCard.css';

export interface CardProps {
    info: {
        id: string;
        rgbs: string[];
        aesthetics: number;
        distinctiveness: number;
        specificity: number[];
        specificities: object;
    }
    industryFilter: string[];
}

export interface CardState {

}

export default class ColorsetCard extends React.PureComponent<CardProps, CardState> {
    // eslint-disable-next-line
    constructor(props: CardProps) {
        super(props);
    }

    enterColor = (e: any) => {
     
        // for(let i in e.target.parentElement.childNodes) {
        //     console.log(e.target.parentElement.childNodes[i].style)
        //     e.target.parentElement.childNodes[i].style.setProperty('display', 'flex');
        //     e.target.parentElement.childNodes[i].style.setProperty('flex', '0');
        // }
        // let previousSibling = e.target.previousSibling;
        // while(previousSibling) {
        //     console.log('111')
        //     e.target.previousSibling.style.flex = 0
        //     previousSibling = previousSibling.previousSibling
        // }

        // let eles = document.querySelectorAll<HTMLElement>('.' + e.target.classList[1]);
        // for(let i = 0; i < eles.length; i++) {
        //     console.log('eles', eles[i])
        //     eles[i]['style']['flex'] = 0;
        // }
        

    }
    
    render() {
        return (
            <div className = 'colorset-card'>
            {this.props.info.rgbs.map((rgb, index) => {
                return <div className = {`colorset-unit ${index === 0 ? 'colorset-unit-first' : ''} ${index === (this.props.info.rgbs.length - 1) ? 'colorset-unit-last' : ''}` + ` ${this.props.info.id}`} style ={{backgroundColor: rgb}} onMouseEnter={this.enterColor}></div>
            })}
            </div>
        )
    }
}
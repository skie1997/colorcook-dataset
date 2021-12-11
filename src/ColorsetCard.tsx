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
    
    render() {
        return (
            <div className = 'colorset-card'>
            {this.props.info.rgbs.map((rgb, index) => {
                return <div className = {`colorset-unit ${index === 0 ? 'colorset-unit-first' : ''} ${index === (this.props.info.rgbs.length - 1) ? 'colorset-unit-last' : ''}`} style ={{backgroundColor: rgb}}></div>
            })}
            </div>
        )
    }
}
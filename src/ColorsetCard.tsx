import React from 'react';
import './ColorsetCard.sass';
import { Alert } from 'antd';
import { FileImageOutlined, FileTextOutlined, EyeOutlined} from '@ant-design/icons';
import html2canvas from 'html2canvas';

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

    rgbToHex = (rgb: string) => {
        let rgbArr = rgb.split(/[(),]/);
        return '#' + parseInt(rgbArr[1]).toString(16) + parseInt(rgbArr[2]).toString(16) + parseInt(rgbArr[3]).toString(16);
    }

    copyColor = async(e: any, hex: string) => {
        try {
            await navigator.clipboard.writeText(hex);
            let alertEle = document.getElementsByClassName('copy-alert')[0] as HTMLElement;
            if(alertEle) {
                console.log('sucess')
                console.log('alertEle', alertEle)
                alertEle.style.animationName = 'fadeOut';
                setTimeout(() => {
                    alertEle.style.animationName = '';
                }, 2000)

            }
          } catch (err) {
            console.error('Failed to copy: ', err);
          }
    }

    downImg = (e: any) => {
        let ele = e.target.parentElement.parentElement.parentElement.parentElement.previousSibling;
        html2canvas(ele).then((canvas) => {
            let imgData = canvas.toDataURL("image/png");
            let aLink = document.createElement("a");
            aLink.style.display = "none";
            aLink.href = imgData;
            aLink.download = "colorset.png";
            document.body.appendChild(aLink);
            aLink.click();
            document.body.removeChild(aLink);
        })
    }
    
    render() {
        return (
            <div className = 'colorset-card'>
                <div className = 'colorset'>
                    {this.props.info.rgbs.map((rgb, index) => {
                        const hex = this.rgbToHex(rgb);
                        return (
                            <div className = {`colorset-unit ${index === 0 ? 'colorset-unit-first' : ''} ${index === (this.props.info.rgbs.length - 1) ? 'colorset-unit-last' : ''}`} style ={{backgroundColor: rgb}} >
                                <span className= 'colorset-value-span' onClick = {(e) => this.copyColor(e, hex)}>{hex}</span>
                            </div>)

                    })}
                </div>
                <div className = 'download'>
                    <div className = 'downImg'>
                        <div className = 'downImg-back'>
                            <FileImageOutlined style = {{fontSize: 15, color: '#222'}} onClick = {this.downImg}/>
                        </div>
                    </div>
                    <div className = 'downJson' >
                        <div className = 'downJson-back'>
                            <FileTextOutlined style = {{fontSize: 15, color: '#222'}}/>
                        </div>
                    </div>
                    <div className = 'viewImg' >
                        <div className = 'viewImg-back'>
                            <EyeOutlined style = {{fontSize: 15, color: '#222'}}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
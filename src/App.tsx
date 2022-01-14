import React from 'react';
import { Layout, Menu, Checkbox, Alert } from 'antd';
// import { BulbOutlined, StockOutlined } from '@ant-design/icons';
import './App.sass';
import { colorStyle } from './assets/palettes/colorStyle_all_2_ok3';
import ColorsetCard from './ColorsetCard';
// import SubMenu from 'antd/lib/menu/SubMenu';
// import Sider from 'antd/lib/layout/Sider';
const { SubMenu } = Menu;
const { Sider, Header, Footer, Content } = Layout;
const CheckboxGroup = Checkbox.Group;

export interface AppState {
  industryFilter: string[];
  indeterminate: boolean;
  checkAll: boolean;
  mode: string,
  rank: string
}

const industryOperation = ['business', 'education', 'healthcare', 'finance', 'manufacturing', 'social', 'sports', 'technology'];

class App extends React.Component<{}, AppState> {
  // eslint-disable-next-line
  constructor(props: any) {
      super(props);
      this.state = {
        industryFilter: ['business', 'education', 'healthcare', 'finance', 'manufacturing', 'social', 'sports', 'technology'],
        indeterminate: true,
        checkAll: false,
        mode: 'light',
        rank: 'aesthetics'
      }

  }

  onRankChange = (e: any) => {
    console.log(e)
    this.setState({
      rank: e.key
    })
  }

  onModeChange = (e: any) => {
    if(e.key === 'dark') {
      document.getElementsByTagName('body')[0].style.setProperty('--backColor','#121212');
      document.getElementsByTagName('body')[0].style.setProperty('--fontColor','#fff');
      document.getElementsByTagName('body')[0].style.setProperty('--surfaceColor','#1e1e1e');
      document.getElementsByTagName('body')[0].style.setProperty('--shadowColor', 'none');
      document.getElementsByTagName('body')[0].style.setProperty('--onBackColor','#d6d6d6');
      document.getElementsByTagName('body')[0].style.setProperty('--onSurfaceColor','#e1e1e1');
      document.getElementsByTagName('body')[0].style.setProperty('--highlightColor','#363636');
      document.getElementsByTagName('body')[0].style.setProperty('--borderColor','rgba(0,0,0,0)');
    } else {
      document.getElementsByTagName('body')[0].style.setProperty('--backColor','#fff');
      document.getElementsByTagName('body')[0].style.setProperty('--fontColor','#333');
      document.getElementsByTagName('body')[0].style.setProperty('--surfaceColor','#fff');
      document.getElementsByTagName('body')[0].style.setProperty('--shadowColor', '#ddd');
      document.getElementsByTagName('body')[0].style.setProperty('--onBackColor','#333');
      document.getElementsByTagName('body')[0].style.setProperty('--onSurfaceColor','#333');
      document.getElementsByTagName('body')[0].style.setProperty('--highlightColor','#f0f0f0');
      document.getElementsByTagName('body')[0].style.setProperty('--borderColor','rgba(0,0,0,0)');
    }
    
  }
  
  onIndustryChange = (industryFilter: any) => {
    this.setState({
      industryFilter: industryFilter,
      indeterminate: !!industryFilter.length && industryFilter.length < industryOperation.length,
      checkAll: industryFilter.length === industryOperation.length
    })
  }

  onCheckAllChange = (e: any) => {
    this.setState({
      industryFilter: e.target.checked? industryOperation : [],
      indeterminate: false,
      checkAll: e.target.checked
    })
  }


  render() {
    
    // const defaultIndustryFilter = ['business', 'education', 'healthcare', 'finance', 'manufacturing', 'social media', 'sports', 'technology'];
    const { industryFilter, indeterminate, checkAll, mode, rank} = this.state;
    console.log('111', colorStyle.filter((colorset) => industryFilter.indexOf(colorset.industryName)!== -1).sort((a, b) => rank === 'aesthetics'? a.aesthetics - b.aesthetics : a.distinctiveness - b.distinctiveness))
    
    return(
    <div className="App">
      <Alert
          className = "copy-alert"
          message="copy sucess"
          // description="copy sucess"
          type="success"
          showIcon
        />
      <Layout>
        <Header className = 'header' style={{height: "auto", backgroundColor: '#FFF'}}>
          <h2 className = 'header-title'>Domain-Associated Palettes Dataset</h2>
          <h3 className = 'header-description' style={{lineHeight: 1.5}}>
          We collected a manually curated dataset of 115 domain-associated palettes, which serves as a palette library in ColorCook and helps users expressively colorize a dashboard based on its domain. 
          To create such a dataset for our system, we first identified common domains of dashboards by investigating existing dashboard tools. We then collected graphic designs (illustrations) that depict scenarios of the identified domains and extracted corresponding color palettes from these designs. Each palette in our dataset is scored in terms of distinctiveness (0-5), aesthetics (0-5), and specificity (0-5). The dataset is released to support the design of future data-driven color design tools.
          </h3>
        </Header>
        <Layout>
          <Sider className = 'sider' width={'15%'} style={{background: 'white'}}>
          <Menu mode = "inline" defaultOpenKeys = {['mode']} defaultSelectedKeys = {[mode]} style = {{ height: '100%' }} onClick = {this.onModeChange}>
                <SubMenu className = 'content-side-submenu' key = "mode" title = "Mode" >
                  <Menu.Item key = "dark" >dark</Menu.Item>
                  <Menu.Item key = "light" >light</Menu.Item>
                </SubMenu>
              </Menu>

              <Menu mode = "inline" defaultOpenKeys = {['rank']} defaultSelectedKeys = {[rank]} style = {{ height: '100%' }} onClick = {this.onRankChange}>
                <SubMenu className = 'content-side-submenu' key = "rank" title = "Rank">
                  <Menu.Item key = "aesthetics" >aesthetics</Menu.Item>
                  <Menu.Item key = "distinctiveness" >distinctiveness</Menu.Item>
                </SubMenu>
              </Menu>

              <Menu mode = "inline" defaultOpenKeys = {['industry']}>
                <SubMenu className = 'content-side-submenu industry-check' key = "industry" title = "Domains">
                  <Checkbox indeterminate={indeterminate} onChange={this.onCheckAllChange} checked={checkAll}>
                    Check all
                  </Checkbox>
                  <CheckboxGroup options={industryOperation} value={industryFilter} onChange={this.onIndustryChange} />
                </SubMenu>
              </Menu>
          </Sider>
          <Content className = 'content'>
            <div className = 'content-main'>
              {colorStyle.filter((colorset) => industryFilter.indexOf(colorset.industryName)!== -1).sort((a, b) => rank === 'aesthetics'? b.aesthetics - a.aesthetics : b.distinctiveness - a.distinctiveness).map((colorset) => {
                  return <ColorsetCard info = {colorset} industryFilter = {this.state.industryFilter} />
                })}
            </div>
          </Content>
        </Layout>
        <Footer className = 'footer'>Copyright © 2021-2021 IDVx Lab. All rights reserved.</Footer>
      </Layout>
    </div>
    )
  };
}

export default App;

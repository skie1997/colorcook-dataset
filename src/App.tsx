import React from 'react';
import { Layout, Menu, Checkbox } from 'antd';
// import { BulbOutlined, StockOutlined } from '@ant-design/icons';
import './App.css';
import { colorStyle } from './assets/palettes/colorStyle_all_2_ok2';
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
      <Layout>
        <Header className = 'header' style={{height: 240, backgroundColor: '#FFF'}}>
          <h1 className = 'header-title'>Palettes Gallery Of ColorCook</h1>
          <h3 className = 'header-description' style={{lineHeight: 2}}>
            We collected graphic designs(illustrations) that depict scenarios of the identified domains and extracted corresponding color palettes from these
            designs. We also validated the dataset from three aspects, including distinctiveness, aesthetics, and specificity. The
            final dataset contains 115 manually curated palettes and is released to support the design of future data-driven color
            authoring tools. 
          </h3>
        </Header>
        <Layout>
          <Sider className = 'sider' width={'20%'} style={{background: 'white'}}>
          <Menu mode = "inline" defaultOpenKeys = {['mode']} defaultSelectedKeys = {[mode]} style = {{ height: '100%' }} >
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

              <Menu mode = "inline" defaultOpenKeys = {['industry']} style = {{ height: '100%' }} >
                <SubMenu className = 'content-side-submenu' key = "industry" title = "Industry">
                  <Checkbox indeterminate={indeterminate} onChange={this.onCheckAllChange} checked={checkAll}>
                    Check all
                  </Checkbox>
                  <CheckboxGroup options={industryOperation} value={industryFilter} onChange={this.onIndustryChange} />
                </SubMenu>
              </Menu>
          </Sider>
          <Content className = 'content'>
            <div className = 'content-main'>
              {colorStyle.filter((colorset) => industryFilter.indexOf(colorset.industryName)!== -1).sort((a, b) => rank === 'aesthetics'? a.aesthetics - b.aesthetics : a.distinctiveness - b.distinctiveness).map((colorset) => {
                  return <ColorsetCard info = {colorset} industryFilter = {this.state.industryFilter} />
                })}
            </div>
          </Content>
        </Layout>
        <Footer className = 'footer'>Copyright © 2021-2021 Siji Chen. All rights reserved.</Footer>
      </Layout>
    </div>
    )
  };
}

export default App;
